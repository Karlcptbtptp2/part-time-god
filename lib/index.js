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

  // 预设基础世界（28×20，程序化生成，固定布局不受密码影响）
  const BASE_COLS = 28
  const BASE_ROWS = 20
  const grid = []
  for (let y = 0; y < BASE_ROWS; y++) grid.push(new Array(BASE_COLS).fill('.'))
  for (let y = 1; y <= 3; y++) for (let x = 3; x <= 6; x++) grid[y][x] = '~'
  for (let y = 4; y <= 19; y++) grid[y][14] = '#'
  for (let x = 0; x < BASE_COLS; x++) grid[10][x] = '#'
  const flowers = [[5, 6], [6, 6], [5, 7], [6, 7], [20, 5], [21, 5], [20, 6], [21, 6], [5, 13], [6, 13], [5, 14], [6, 14], [20, 12], [21, 12], [20, 13], [21, 13]]
  for (const f of flowers) grid[f[1]][f[0]] = '*'
  const stones = [[1, 9], [2, 9], [25, 9], [26, 9], [0, 17], [27, 17], [8, 18], [12, 18], [16, 18], [20, 18]]
  for (const s of stones) grid[s[1]][s[0]] = 'o'
  const BASE = {
    map: grid.map((row) => row.join('')),
    buildings: [
      { s: 'house', x: 8, y: 2 },
      { s: 'hut', x: 11, y: 2 },
      { s: 'barn', x: 24, y: 3 },
      { s: 'shop', x: 19, y: 6 },
      { s: 'church', x: 11, y: 12 },
      { s: 'tower', x: 3, y: 14 },
    ],
    trees: [
      { s: 'tree', x: 0, y: 0 }, { s: 'pine', x: 27, y: 0 }, { s: 'tree', x: 0, y: 19 }, { s: 'pine', x: 27, y: 19 },
      { s: 'tree', x: 0, y: 7 }, { s: 'pine', x: 27, y: 7 }, { s: 'tree', x: 0, y: 13 }, { s: 'pine', x: 27, y: 13 },
      { s: 'tree', x: 2, y: 5 }, { s: 'pine', x: 25, y: 5 }, { s: 'tree', x: 2, y: 15 }, { s: 'pine', x: 25, y: 15 },
      { s: 'tree', x: 4, y: 8 }, { s: 'pine', x: 23, y: 8 }, { s: 'tree', x: 4, y: 12 }, { s: 'pine', x: 23, y: 12 },
      { s: 'tree', x: 10, y: 7 }, { s: 'pine', x: 18, y: 7 }, { s: 'tree', x: 10, y: 15 }, { s: 'pine', x: 18, y: 15 },
    ],
    crops: [
      { s: 'carrot', x: 6, y: 4 }, { s: 'strawberry', x: 7, y: 4 }, { s: 'carrot', x: 8, y: 4 }, { s: 'strawberry', x: 6, y: 5 }, { s: 'carrot', x: 7, y: 5 }, { s: 'strawberry', x: 8, y: 5 },
      { s: 'carrot', x: 20, y: 3 }, { s: 'strawberry', x: 21, y: 3 }, { s: 'carrot', x: 22, y: 3 }, { s: 'strawberry', x: 20, y: 4 }, { s: 'carrot', x: 21, y: 4 }, { s: 'strawberry', x: 22, y: 4 },
    ],
    npcs: [
      { s: 'farmer', x: 8, y: 6, speed: 0.6, amp: 14 },
      { s: 'dog', x: 17, y: 8, speed: 0.9, amp: 18 },
      { s: 'cat', x: 9, y: 3, speed: 0.5, amp: 10 },
      { s: 'cow', x: 25, y: 6, speed: 0.4, amp: 8 },
      { s: 'chicken', x: 20, y: 8, speed: 0.7, amp: 15 },
      { s: 'villager', x: 11, y: 9, speed: 0.55, amp: 12 },
    ],
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
  const FEATURES = [
    '村口多了一座凉亭', '湖里多了几条锦鲤', '旧磨坊重新转动起来', '一只温和的小怪兽搬来同住', '村民种下了一片向日葵',
    '街边亮起了暖黄的路灯', '孩子们有了一座小秋千', '最大的树上建了树屋', '会发光的小蝴蝶出现了', '村民学会了烤面包',
    '小桥上挂满了风铃', '一朵会唱歌的花开了', '集市多了个卖蜂蜜的摊子', '温柔的龙来帮忙看管庄稼', '池塘边多了几只白鹭',
  ]
  const KINDS = ['building', 'plant', 'npc', 'object']
  const KIND_SPRITES = {
    building: ['shop', 'church', 'tower', 'hut'],
    plant: ['bush', 'mushroom', 'flower', 'pine'],
    npc: ['wizard', 'villager', 'sheep', 'bird', 'monster', 'dragon'],
    object: ['well', 'fountain', 'chest', 'lamp', 'ufo'],
  }

  function localDecode(seed, mode) {
    const pool = mode === 'theme' ? THEMES : FEATURES
    return pool[fnv1a(String(seed)) % pool.length]
  }

  const worlds = new Map()
  const queues = new Map()
  const busy = new Set()

  function freshWorld(sid) {
    return {
      version: 5,
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
        .filter((f) => f && typeof f.text === 'string' && typeof f.sprite === 'string')
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
            if (parsed && parsed.sessionId === sid) {
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

  async function decodeWithLlm(llm, adm, garble, mode) {
    let selection
    try {
      selection = adm.currentSelection()
    } catch (err) {
      selection = undefined
    }
    if (!selection || typeof selection.provider !== 'string' || typeof selection.model !== 'string') {
      throw new Error('no default model selection')
    }
    const system =
      mode === 'theme'
        ? '你是一位平行世界的造物主。下面是一串由用户消息打乱重排而成的密码乱码，人类无法直接阅读。请把它破译成一句话：为这个世界起一个温暖、有趣的名字（例如：星露山谷、深海之城、会说话的蘑菇森林）。只输出名字本身，简体中文，8 个字以内，不要解释、不要引号、不要标点。'
        : '你是一位平行世界的造物主。下面是一串由用户消息打乱重排而成的密码乱码，人类无法直接阅读。请把它破译成一条给这个世界的新改动：一个有趣、友善、合理的小改动。它必须符合这座宁静农场世界的设定，对这个世界和生活在其中的 NPC 友好、有益、无害；可以是建造设施、美化环境、改善村民生活，也可以是村民与动物或神秘生物的友好互动（例如：村口多了一座凉亭、湖里多了几条锦鲤、一只温和的小怪兽搬来和村民和平同住、温柔的龙帮忙看管庄稼）。禁止任何破坏、灾难、伤害、吃人、恐怖、战争等负面内容。只输出这条改动本身，简体中文，20 个字以内，不要解释、不要引号、不要标点。'
    let text = ''
    const limited = garble.length > 400 ? garble.slice(0, 400) : garble
    const stream = llm.stream({
      provider: selection.provider,
      model: selection.model,
      system,
      messages: [{ role: 'user', content: [{ type: 'text', text: limited }] }],
      temperature: 0.9,
      maxTokens: 100,
    })
    for await (const chunk of stream) {
      if (chunk && chunk.type === 'text-delta' && typeof chunk.text === 'string') {
        text += chunk.text
      } else if (chunk && (chunk.type === 'error' || chunk.type === 'aborted')) {
        throw new Error('llm stream ' + chunk.type)
      }
    }
    text = text.trim()
    if (!text) throw new Error('empty decode')
    return text
  }

  function makeFeature(world, seed, id, text, now) {
    const kind = KINDS[fnv1a(String(seed) + ':kind') % KINDS.length]
    const pool = KIND_SPRITES[kind]
    const sprite = pool[fnv1a(String(seed) + ':sprite') % pool.length]
    const z = 0.9 + (fnv1a(String(seed) + ':z') % 40) / 100
    const used = new Set()
    for (const f of world.features) used.add(f.x + ',' + f.y)
    const all = freeTiles()
    const candidates = all.filter((t) => !used.has(t.x + ',' + t.y))
    const pool2 = candidates.length ? candidates : all
    const pos = pool2[fnv1a(String(seed) + ':pos') % pool2.length]
    return { id, text, kind, sprite, x: pos.x, y: pos.y, z, at: now }
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

    let decoded
    try {
      const llm = ctx.get('llm')
      const adm = ctx.get('agentDefaultModel')
      if (llm && adm) {
        decoded = await decodeWithLlm(llm, adm, garble, mode)
      } else {
        decoded = localDecode(seed, mode)
      }
    } catch (err) {
      console.error('part-time-god: decode failed, using local fallback', String((err && err.message) || err))
      decoded = localDecode(seed, mode)
    }

    const now = Date.now()
    if (mode === 'theme') {
      world.theme = decoded
      world.log.push({ type: 'theme', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: decoded })
    } else {
      const feat = makeFeature(world, seed, idx, decoded, now)
      world.features.push(feat)
      world.log.push({ type: 'feature', at: now, userText: job.text.slice(0, 200), garble: garble.slice(0, 200), text: decoded, sprite: feat.sprite, kind: feat.kind, id: idx })
      if (world.features.length > 60) world.features = world.features.slice(-60)
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
