// 兼职上帝（part-time-god）宿主半边。
// 被动监听每个 agent 的用户消息，把消息打乱成“密码”，交给当前默认模型
// 破译成一条对世界友善、合理的改动，写入按会话持久化的 JSON，并通过
// webServer 路由把世界状态暴露给浏览器半边。
function apply(ctx) {
  const encoder = new TextEncoder()

  function fnv1a(input) {
    let h = 0x811c9dc5
    const bytes = encoder.encode(String(input))
    for (let i = 0; i < bytes.length; i++) {
      h ^= bytes[i]
      h = Math.imul(h, 0x01000193)
    }
    return h >>> 0
  }

  function scramble(text, seed) {
    let cleaned = text.replace(/[\s\p{P}\p{Z}]/gu, '')
    if (!cleaned) cleaned = text.replace(/[\s\p{Z}]/gu, '')
    const chars = Array.from(cleaned)
    let a = seed >>> 0
    const rng = function () {
      a = (a + 0x6d2b79f5) | 0
      let t = Math.imul(a ^ (a >>> 15), 1 | a)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      const t = chars[i]
      chars[i] = chars[j]
      chars[j] = t
    }
    return chars.join('')
  }

  // 预设基础世界：64×48 大岛，海洋环绕，沙滩/山脉/河流/森林/田野/港口（固定布局不受密码影响）
  const BASE_COLS = 64
  const BASE_ROWS = 48
  const grid = []
  for (let y = 0; y < BASE_ROWS; y++) grid.push(new Array(BASE_COLS).fill('~'))
  const CX = 31.5
  const CY = 23.5
  const RX = 29
  const RY = 21
  for (let y = 0; y < BASE_ROWS; y++) {
    for (let x = 0; x < BASE_COLS; x++) {
      const dx = (x - CX) / RX
      const dy = (y - CY) / RY
      const d2 = dx * dx + dy * dy
      const n = (fnv1a('island:' + x + ':' + y) % 100) / 100
      if (d2 <= 1 - 0.18 * n) grid[y][x] = '.'
    }
  }
  for (let y = 0; y < BASE_ROWS; y++) {
    for (let x = 0; x < BASE_COLS; x++) {
      if (grid[y][x] !== '.') continue
      let coast = false
      for (const dd of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dd[0]
        const ny = y + dd[1]
        if (nx < 0 || ny < 0 || nx >= BASE_COLS || ny >= BASE_ROWS || grid[ny][nx] === '~') {
          coast = true
          break
        }
      }
      if (coast) grid[y][x] = 'b'
    }
  }
  for (let y = 8; y <= 15; y++) {
    for (let x = 8; x <= 17; x++) {
      if (grid[y][x] !== '.') continue
      const n = (fnv1a('mt:' + x + ':' + y) % 100) / 100
      if (n < 0.62) grid[y][x] = 'M'
    }
  }
  const riverPts = [[17, 15], [17, 20], [20, 24], [23, 28], [27, 32], [31, 36], [34, 40], [36, 44], [37, 46]]
  for (let i = 0; i < riverPts.length - 1; i++) {
    const x0 = riverPts[i][0]
    const y0 = riverPts[i][1]
    const x1 = riverPts[i + 1][0]
    const y1 = riverPts[i + 1][1]
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
    for (let s = 0; s <= steps; s++) {
      const x = Math.round(x0 + ((x1 - x0) * s) / steps)
      const y = Math.round(y0 + ((y1 - y0) * s) / steps)
      if (x >= 0 && y >= 0 && x < BASE_COLS && y < BASE_ROWS && grid[y][x] !== '~') grid[y][x] = 'r'
    }
  }
  for (let y = 12; y <= 40; y++) if (grid[y][30] === '.' || grid[y][30] === 'b') grid[y][30] = '#'
  for (let x = 14; x <= 50; x++) if (grid[24][x] === '.' || grid[24][x] === 'b') grid[24][x] = '#'
  for (let x = 50; x <= 52; x++) if (grid[23][x] === '.' || grid[23][x] === 'b') grid[23][x] = '#'

  const buildings = [
    { s: 'house', x: 25, y: 21 },
    { s: 'hut', x: 27, y: 19 },
    { s: 'barn', x: 24, y: 26 },
    { s: 'shop', x: 34, y: 21 },
    { s: 'church', x: 29, y: 20 },
    { s: 'tower', x: 20, y: 22 },
    { s: 'forge', x: 34, y: 25 },
    { s: 'sawmill', x: 26, y: 26 },
    { s: 'fishhut', x: 50, y: 22 },
    { s: 'gatherhut', x: 18, y: 26 },
  ]
  const crops = [
    { s: 'carrot', x: 23, y: 19 }, { s: 'strawberry', x: 24, y: 19 }, { s: 'carrot', x: 25, y: 19 },
    { s: 'strawberry', x: 23, y: 20 }, { s: 'carrot', x: 24, y: 20 }, { s: 'strawberry', x: 25, y: 20 },
    { s: 'carrot', x: 36, y: 26 }, { s: 'strawberry', x: 37, y: 26 }, { s: 'carrot', x: 38, y: 26 },
    { s: 'strawberry', x: 36, y: 27 }, { s: 'carrot', x: 37, y: 27 }, { s: 'strawberry', x: 38, y: 27 },
  ]
  const npcs = [
    { s: 'farmer', x: 25, y: 21, speed: 0.6, amp: 14 },
    { s: 'dog', x: 30, y: 23, speed: 0.9, amp: 18 },
    { s: 'cat', x: 27, y: 20, speed: 0.5, amp: 10 },
    { s: 'cow', x: 24, y: 27, speed: 0.4, amp: 8 },
    { s: 'chicken', x: 33, y: 27, speed: 0.7, amp: 15 },
    { s: 'villager', x: 34, y: 22, speed: 0.55, amp: 12 },
    { s: 'blacksmith', x: 34, y: 25, speed: 0.5, amp: 10 },
    { s: 'carpenter', x: 27, y: 26, speed: 0.5, amp: 10 },
    { s: 'gatherer', x: 18, y: 25, speed: 0.6, amp: 12 },
    { s: 'fisher', x: 50, y: 23, speed: 0.55, amp: 12 },
  ]
  const occupied = new Set()
  for (const b of buildings) occupied.add(b.x + ',' + b.y)
  for (const c of crops) occupied.add(c.x + ',' + c.y)
  for (const n of npcs) occupied.add(n.x + ',' + n.y)
  const blocked = (x, y) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (occupied.has((x + dx) + ',' + (y + dy))) return true
      }
    }
    return false
  }
  const trees = []
  for (let y = 5; y <= 41; y++) {
    for (let x = 3; x <= 58; x++) {
      if (grid[y][x] !== '.') continue
      if (blocked(x, y)) continue
      const n = (fnv1a('tree:' + x + ':' + y) % 1000) / 1000
      const th = x < 24 ? 0.07 : 0.03
      if (n < th) trees.push({ s: n < th / 2 ? 'tree' : 'pine', x, y })
    }
  }
  const flowers = [[28, 22], [29, 22], [31, 22], [32, 22], [28, 26], [29, 26], [31, 26], [32, 26], [23, 17], [24, 17], [36, 20], [37, 20], [44, 21], [45, 21], [26, 28], [27, 28]]
  for (const f of flowers) if (grid[f[1]][f[0]] === '.') grid[f[1]][f[0]] = '*'
  const stones = [[21, 25], [22, 26], [33, 23], [27, 28], [40, 22], [44, 23], [15, 22], [20, 29]]
  for (const s of stones) if (grid[s[1]][s[0]] === '.') grid[s[1]][s[0]] = 'o'
  const vehicles = [
    { s: 'cart', route: [[36, 24], [48, 24]] },
    { s: 'boat', route: [[62, 25], [62, 30]] },
    { s: 'boat', route: [[61, 31], [61, 36]] },
  ]
  const BASE = {
    map: grid.map((row) => row.join('')),
    buildings,
    trees,
    crops,
    npcs,
    vehicles,
  }

  function freeTiles() {
    const occupied = new Set()
    for (const b of BASE.buildings) occupied.add(b.x + ',' + b.y)
    for (const t of BASE.trees) occupied.add(t.x + ',' + t.y)
    for (const c of BASE.crops) occupied.add(c.x + ',' + c.y)
    for (const n of BASE.npcs) occupied.add(n.x + ',' + n.y)
    const free = []
    for (let y = 0; y < BASE.map.length; y++) {
      const row = BASE.map[y]
      for (let x = 0; x < row.length; x++) {
        const ch = row[x]
        if (ch !== '.' && ch !== '*') continue
        if (occupied.has(x + ',' + y)) continue
        free.push({ x, y })
      }
    }
    return free
  }

  const THEMES = ['迷雾森林', '沙漠集市', '海底之城', '云端浮岛', '机械废墟', '蘑菇王国', '冰川雪原', '熔岩地窟']

  // 模型没画出像素画时显示的占位符（暴露问题，而不是假图）
  const PLACEHOLDER_PX = ['..yyyyyyy.......', '.yyyyyyyyy......', 'yyyyy...yyyy....', 'yyyy.....yyy....', 'yyyy.....yyy....', '......yyyy......', '.....yyyy.......', '.....yyy........', '.....yyy........', '................', '.....yyy........', '.....yyy........', '................', '................', '................', '................']

  const VALID_CHARS = new Set(['k', 'w', 'm', 'g', 'f', 'r', 'a', 'b', 'y', 'o', 'p', 'e', 's', 'q', 'v', '.'])
  function sanitizePixels(rows) {
    const out = []
    for (let i = 0; i < 16; i++) {
      const row = rows && rows[i] != null ? String(rows[i]) : ''
      let line = ''
      for (let j = 0; j < 16; j++) {
        const ch = row[j]
        line += ch && VALID_CHARS.has(ch) ? ch : '.'
      }
      out.push(line)
    }
    return out
  }
  function pixelsEmpty(rows) {
    if (!rows) return true
    for (const r of rows) if (String(r || '').replace(/\./g, '').length > 0) return false
    return true
  }

  // 按语义就近摆放：路/湖/花圃/广场/村口/田野/树林
  function dist(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
  }
  function resolvePlace(place, world, seed) {
    const all = freeTiles()
    const used = new Set()
    for (const f of world.features) used.add(f.x + ',' + f.y)
    const avail = all.filter((t) => !used.has(t.x + ',' + t.y))
    const base = avail.length ? avail : all
    const nearChar = (chars) => {
      const out = base.filter((t) => {
        for (const dd of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = t.x + dd[0]
          const ny = t.y + dd[1]
          if (ny >= 0 && ny < BASE.map.length && nx >= 0 && nx < BASE.map[0].length && chars.includes(BASE.map[ny][nx])) return true
        }
        return false
      })
      return out.length ? out : base
    }
    const nearObj = (objs, maxD) => {
      const out = base.filter((t) => objs.some((o) => dist(t, o) <= maxD))
      return out.length ? out : base
    }
    const p = String(place || '')
    let pool
    if (p.includes('海') || p.includes('滩') || p.includes('沙')) pool = nearChar(['b', '~'])
    else if (p.includes('河')) pool = nearChar(['r'])
    else if (p.includes('山')) pool = nearChar(['M'])
    else if (p.includes('湖') || p.includes('水')) pool = nearChar(['~', 'r'])
    else if (p.includes('路')) pool = nearChar(['#'])
    else if (p.includes('花')) pool = nearChar(['*'])
    else if (p.includes('广场')) pool = nearObj([{ x: 30, y: 24 }], 3)
    else if (p.includes('村口')) pool = nearObj([{ x: 25, y: 21 }], 3)
    else if (p.includes('田') || p.includes('农')) pool = nearObj(BASE.crops, 2)
    else if (p.includes('树') || p.includes('林')) pool = nearObj(BASE.trees, 2)
    else pool = base
    return pool[fnv1a(String(seed) + ':pos') % pool.length]
  }

  const worlds = new Map()
  const queues = new Map()
  const busy = new Set()

  function freshWorld(sid) {
    return {
      version: 9,
      sessionId: sid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      theme: null,
      messageCount: 0,
      base: BASE,
      features: [],
      log: [],
    }
  }

  function normalizeWorld(w) {
    const world = freshWorld(w.sessionId)
    if (typeof w.createdAt === 'number') world.createdAt = w.createdAt
    if (typeof w.updatedAt === 'number') world.updatedAt = w.updatedAt
    if (typeof w.theme === 'string' && w.theme) world.theme = w.theme
    if (typeof w.messageCount === 'number') world.messageCount = w.messageCount
    if (Array.isArray(w.features)) {
      world.features = w.features
        .filter((f) => f && typeof f.text === 'string' && (Array.isArray(f.pixels) || typeof f.sprite === 'string'))
        .slice(-60)
    }
    if (Array.isArray(w.log)) {
      world.log = w.log.filter((e) => e && typeof e.text === 'string').slice(-60)
    }
    return world
  }

  function persistTarget(sid) {
    const policy = ctx.get('sandboxPolicy')
    if (!policy) return { path: undefined, policy: undefined }
    let session
    const sessions = ctx.get('sessions')
    if (sessions && typeof sessions.get === 'function') {
      try {
        session = sessions.get(sid)
      } catch (err) {
        session = undefined
      }
    }
    let resolved
    try {
      resolved = policy.resolve(session ? { session: session } : {})
    } catch (err) {
      try {
        resolved = policy.resolve()
      } catch (err2) {
        resolved = undefined
      }
    }
    const root =
      resolved && typeof resolved.workspaceRoot === 'string' && resolved.workspaceRoot
        ? resolved.workspaceRoot
        : typeof policy.workspaceRoot === 'string'
          ? policy.workspaceRoot
          : undefined
    if (!root) return { path: undefined, policy: undefined }
    return { path: root + '/.gameworlds/gameworld-' + sid + '.json', policy: resolved }
  }

  async function loadWorld(sid) {
    const fs = ctx.get('fs')
    if (fs) {
      const { path } = persistTarget(sid)
      if (path) {
        try {
          const target = await fs.resolve(path)
          const info = await fs.stat(target)
          if (info) {
            const raw = await fs.readText(target)
            const parsed = JSON.parse(raw)
            if (parsed && parsed.sessionId === sid && parsed.version === 9) {
              return normalizeWorld(parsed)
            }
          }
        } catch (err) {}
      }
    }
    return freshWorld(sid)
  }

  function saveWorld(sid, world) {
    const fs = ctx.get('fs')
    if (!fs) return
    const { path, policy } = persistTarget(sid)
    if (!path) return
    fs.resolve(path)
      .then((target) => fs.writeText(target, JSON.stringify(world), undefined, undefined, policy))
      .catch((err) => {
        console.error('part-time-god: save failed', sid, String((err && err.message) || err))
      })
  }

  async function streamText(llm, options) {
    let text = ''
    const stream = llm.stream(options)
    for await (const chunk of stream) {
      if (chunk && chunk.type === 'text-delta' && typeof chunk.text === 'string') {
        text += chunk.text
      } else if (chunk && (chunk.type === 'error' || chunk.type === 'aborted')) {
        throw new Error('llm stream ' + chunk.type)
      }
    }
    return text.trim()
  }

  async function decodeWithLlm(llm, adm, garble) {
    const selection = adm.currentSelection()
    if (!selection || typeof selection.provider !== 'string' || typeof selection.model !== 'string') {
      throw new Error('no default model selection')
    }
    const system = '你是一位平行世界的造物主。\n\n下面是一串由用户消息打乱重排而成的密码乱码，人类无法直接阅读。这串乱码共有 ' + garble.length + ' 个字符。\n\n请分两步完成：\n1. 把这串乱码真正地“破译”成一句对这个世界的小改动。要求：\n   - 必须从这串乱码本身出发去想象，句子的长短要呼应乱码的长短：乱码长，句子就长；乱码短，句子就短。长度在 4 到 28 个字之间浮动，绝不要每次都差不多长。\n   - 千奇百怪、出人意料、充满想象力；禁止套用任何常见句式，禁止输出和常见生活描述雷同的句子。\n   - 对这座宁静的海岛小镇（有港口、森林、山脉、河流）和其中的 NPC 友善、有益、无害（可以有温和的神秘生物，禁止破坏、灾难、伤害、恐怖、战争、吃人）。\n2. 把这句改动真正实现进小镇：为它创作一幅 16×16 的原创像素画——用下面调色板的字符，每格一个字符，共 16 行、每行恰好 16 个字符，\'.\' 表示透明；再决定类型 kind（building / plant / npc / object 之一）和放置位置 place（路边 / 湖边 / 海边 / 河边 / 山上 / 花圃 / 广场 / 村口 / 田野 / 树林 / 任意空地 之一，按这句话的语义选）。\n\n调色板：k 深黑、w 白、m 浅白、g 绿、f 深绿、r 红、a 深红、b 棕、y 黄、o 橙、p 粉、e 米白、s 灰、q 蓝、v 紫、. 透明。\n\n只输出一个 JSON 对象，不要输出任何其他文字或解释：\n{"sentence":"...","kind":"...","place":"...","pixels":["...16行..."]}'
    let t = await streamText(llm, {
      provider: selection.provider,
      model: selection.model,
      reasoningEffort: 'off',
      system,
      messages: [{ role: 'user', content: [{ type: 'text', text: garble.length > 400 ? garble.slice(0, 400) : garble }] }],
      temperature: 1.1,
      maxTokens: 900,
    })
    t = t.replace(/^```[a-zA-Z]*\s*/m, '').replace(/\s*```$/m, '').trim()
    const start = t.indexOf('{')
    const end = t.lastIndexOf('}')
    let parsed = null
    if (start >= 0 && end > start) {
      try {
        parsed = JSON.parse(t.slice(start, end + 1))
      } catch (err) {
        parsed = null
      }
    }
    if (!parsed || typeof parsed.sentence !== 'string' || !parsed.sentence.trim()) {
      if (!t) throw new Error('模型未返回任何内容')
      return { sentence: t.replace(/[\r\n]+/g, ' ').trim().slice(0, 28), kind: 'object', place: '任意空地', pixels: PLACEHOLDER_PX }
    }
    const kind = ['building', 'plant', 'npc', 'object'].includes(parsed.kind) ? parsed.kind : 'object'
    const pixels = Array.isArray(parsed.pixels) ? sanitizePixels(parsed.pixels) : null
    return {
      sentence: String(parsed.sentence).trim().slice(0, 28),
      kind,
      place: typeof parsed.place === 'string' ? parsed.place : '任意空地',
      pixels: pixels && !pixelsEmpty(pixels) ? pixels : PLACEHOLDER_PX,
    }
  }

  function makeFeature(world, seed, id, impl, now) {
    const pixels = impl.pixels && !pixelsEmpty(impl.pixels) ? impl.pixels : PLACEHOLDER_PX
    const pos = resolvePlace(impl.place, world, seed)
    const z = 0.9 + (fnv1a(String(seed) + ':z') % 40) / 100
    return { id, text: impl.sentence, kind: impl.kind, pixels, x: pos.x, y: pos.y, z, at: now }
  }

  async function processJob(sid, job) {
    let world = worlds.get(sid)
    if (!world) {
      world = await loadWorld(sid)
      worlds.set(sid, world)
    }
    const mode = world.theme ? 'feature' : 'theme'
    const idx = (world.messageCount || 0) + 1
    const seed = fnv1a(sid + ':' + job.text + ':' + idx)
    const garble = scramble(job.text, seed)
    if (!garble) return

    const now = Date.now()
    if (mode === 'theme') {
      let decoded = null
      let errMsg = ''
      try {
        const llm = ctx.get('llm')
        const adm = ctx.get('agentDefaultModel')
        if (!llm || !adm) throw new Error('LLM 服务不可用')
        const sel = adm.currentSelection()
        decoded = await streamText(llm, {
          provider: sel.provider,
          model: sel.model,
          reasoningEffort: 'off',
          system: '你是一位平行世界的造物主。下面是一串由用户消息打乱重排而成的密码乱码，人类无法直接阅读。请把它破译成一句话：为这个世界起一个温暖、有趣的名字（例如：星露山谷、深海之城、会说话的蘑菇森林）。只输出名字本身，简体中文，8 个字以内，不要解释、不要引号、不要标点。',
          messages: [{ role: 'user', content: [{ type: 'text', text: garble.slice(0, 400) }] }],
          temperature: 0.9,
          maxTokens: 60,
        })
      } catch (err) {
        decoded = null
        errMsg = String((err && err.message) || err)
      }
      if (decoded) {
        world.theme = decoded
        world.log.push({ type: 'theme', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: decoded })
      } else {
        world.log.push({ type: 'error', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: '⚠️ 主题破译失败：' + (errMsg || '模型未返回内容') })
      }
    } else {
      try {
        const llm = ctx.get('llm')
        const adm = ctx.get('agentDefaultModel')
        if (!llm || !adm) throw new Error('LLM 服务不可用')
        const impl = await decodeWithLlm(llm, adm, garble)
        const feat = makeFeature(world, seed, idx, impl, now)
        world.features.push(feat)
        world.log.push({ type: 'feature', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: feat.text, pixels: feat.pixels, kind: feat.kind, id: idx })
        if (world.features.length > 60) world.features = world.features.slice(-60)
      } catch (err) {
        const msg = String((err && err.message) || err)
        console.error('part-time-god: decode failed', sid, msg)
        world.log.push({ type: 'error', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: '⚠️ 破译失败：' + msg })
      }
    }
    world.messageCount = idx
    world.updatedAt = now
    if (world.log.length > 60) world.log = world.log.slice(-60)
    saveWorld(sid, world)
  }

  function drain(sid) {
    if (busy.has(sid)) return
    const q = queues.get(sid)
    if (!q || q.length === 0) return
    busy.add(sid)
    const job = q.shift()
    processJob(sid, job)
      .catch((err) => {
        console.error('part-time-god: process failed', sid, String((err && err.message) || err))
      })
      .finally(() => {
        busy.delete(sid)
        drain(sid)
      })
  }

  ctx.on('agent/inbox/inserted', (payload) => {
    const agent = payload && payload.agent
    const sid =
      (agent && typeof agent.id === 'string' && agent.id) ||
      (agent && agent.session && typeof agent.session.id === 'string' && agent.session.id) ||
      undefined
    let text = ''
    const message = payload && payload.message
    if (message && typeof message === 'object') {
      const content = message.content
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block && typeof block === 'object' && block.type === 'text' && typeof block.text === 'string') {
            text += block.text
          }
        }
      } else if (typeof message.text === 'string') {
        text = message.text
      }
    }
    text = text.trim()
    if (!sid || !text) return
    let q = queues.get(sid)
    if (!q) {
      q = []
      queues.set(sid, q)
    }
    q.push({ text })
    drain(sid)
  })

  async function getWorld(sid) {
    let world = worlds.get(sid)
    if (!world) {
      world = await loadWorld(sid)
      worlds.set(sid, world)
    }
    return world
  }

  async function removeWorld(sid, fid) {
    const world = await getWorld(sid)
    const before = world.features.length
    world.features = world.features.filter((f) => f.id !== fid)
    const changed = world.features.length !== before
    if (changed) {
      world.log = world.log.filter((e) => !(e.type === 'feature' && e.id === fid))
      world.updatedAt = Date.now()
      saveWorld(sid, world)
    }
    return { ok: true, world, changed }
  }

  const webServer = ctx.get('webServer')
  if (webServer) {
    ctx.effect(() => webServer.register({
      kind: 'prefix',
      path: '/api/part-time-god',
      handler: async (req, res) => {
        const send = (status, obj) => {
          res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify(obj))
        }
        try {
          const u = new URL(req.url, 'http://localhost')
          if (u.pathname === '/api/part-time-god/world') {
            const sid = u.searchParams.get('sessionId') || ''
            if (!sid) return send(400, { ok: false, error: 'missing sessionId' })
            return send(200, { ok: true, world: await getWorld(sid) })
          }
          if (u.pathname === '/api/part-time-god/remove') {
            const sid = u.searchParams.get('sessionId') || ''
            const fid = Number(u.searchParams.get('featureId'))
            if (!sid || !Number.isFinite(fid)) return send(400, { ok: false, error: 'missing args' })
            return send(200, await removeWorld(sid, fid))
          }
          return send(404, { ok: false, error: 'not found' })
        } catch (err) {
          return send(500, { ok: false, error: String((err && err.message) || err) })
        }
      },
    }), 'part-time-god: api route')
  }
}

export { apply }
