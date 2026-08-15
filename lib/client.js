window.__ModuleLoader__.load({
  id: "part-time-god",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");

    var COLS = 28;
    var ROWS = 20;
    var TILE = 26;
    var VIEW_W = 288;
    var VIEW_H = 250;
    var CTRL = { x: 14.5, y: 10.5 };

    var P = {
      g: '#74b757', G: '#5f9d42',
      w: '#4f96cf', W: '#6ab8e6',
      d: '#c8a45f', D: '#b08a4a',
      s: '#8f8f99', S: '#a6a6b0',
      r: '#c84c3c', R: '#a83a2c',
      e: '#e8d8b8', E: '#cfbf9d',
      b: '#7a4a2a', B: '#5a3420',
      f: '#4f8a3f', F: '#38682f', L: '#6fb04f',
      p: '#e06aa0', y: '#f0c060',
      k: '#2a2a30', m: '#f4f4f4', c: '#b0b0b8',
      o: '#e88a3a', n: '#e8b890', h: '#6b4a2a',
      q: '#4a6ac8', v: '#7a5aa0', a: '#d04840',
      t: '#3a8a7a', x: '#e8e8e8'
    };

    var SPRITES = {
      'tile-grass': ['gggggggggggggggg', 'gGggggggggGggggg', 'ggggggGggggggggg', 'ggggggggggggggGg', 'Gggggggggggggggg', 'ggggggggGggggggg', 'gggGgggggggggggg', 'ggggggggggggGggg', 'gggggGgggggggggg', 'gggggggggggggggg', 'ggGgggggggGggggg', 'gggggggggggggggg', 'ggggggGggggggggg', 'GgggggggggggggGg', 'ggggggggGggggggg', 'ggGggggggggggggg'],
      'tile-water': ['wwwwwwwwwwwwwwww', 'wWwwwwwwwwWwwwww', 'wwwwwwWwwwwwwwww', 'wwwwwwwwwwwwwwWw', 'Wwwwwwwwwwwwwwww', 'wwwwwwwwWwwwwwww', 'wwwWwwwwwwwwwwww', 'wwwwwwwwwwwwWwww', 'wwwwwWwwwwwwwwww', 'wwwwwwwwwwwwwwww', 'wwWwwwwwwwwWwwww', 'wwwwwwwwwwwwwwww', 'wwwwwwWwwwwwwwww', 'WwwwwwwwwwwwwwWw', 'wwwwwwwwWwwwwwww', 'wwWwwwwwwwwwwwww'],
      'tile-dirt': ['dddddddddddddddd', 'dDddddddddDddddd', 'ddddddDddddddddd', 'ddddddddddddddDd', 'Dddddddddddddddd', 'ddddddddDddddddd', 'dddDdddddddddddd', 'ddddddddddddDddd', 'dddddDdddddddddd', 'dddddddddddddddd', 'ddDddddddddDdddd', 'dddddddddddddddd', 'ddddddDddddddddd', 'DdddddddddddddDd', 'ddddddddDddddddd', 'ddDddddddddddddd'],
      'tile-flower': ['gggggggggggggggg', 'gppggggggppggggg', 'gpyggggggpyggggg', 'gppggggggppggggg', 'gggggggggggggggg', 'gggggppggggggggg', 'gggggpygggggppgg', 'gggggppgggggpygg', 'ggggggggggggppgg', 'ggggppgggggggggg', 'ggggpygggggggggg', 'ggggppgggggggggg', 'gggggggggggggggg', 'ggppggggggppgggg', 'ggpyggggggpygggg', 'ggppggggggppgggg'],
      'tile-stone': ['ssssssssssssssss', 'sSssssssssSsssss', 'ssssssSsssssssss', 'ssssssssssssssSs', 'Ssssssssssssssss', 'ssssssssSsssssss', 'sssSssssssssssss', 'ssssssssssssSsss', 'sssssSssssssssss', 'ssssssssssssssss', 'ssSssssssssSssss', 'ssssssssssssssss', 'ssssssSsssssssss', 'SsssssssssssssSs', 'ssssssssSsssssss', 'ssSsssssssssssss'],
      house: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', 'eeeeeeeeeeeeeeee', 'eexxeeeeeeexxeee', 'eexxeeeeeeexxeee', 'eeeeeeeeeeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB'],
      hut: ['....yyyyyyyy....', '...yyyyyyyyyy...', '..yyyyyyyyyyyy..', '..yYyyyyyyyyYy..', '.yyyyyyyyyyyyyy.', '.yyyyyyyyyyyyyy.', 'yyyyyyyyyyyyyyyy', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeebbbbeeeeeee', 'eeeeebbbbeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB', '................', '................'],
      barn: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrr', 'rxxrrrrrrrrxxrrr', 'rxxrrrrrrrrxxrrr', 'rrrrrrrrrrrrrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrrrrrrrrrrrrr', 'BBBBBBBBBBBBBBBB'],
      tree: ['......fLf.......', '....fffffff.....', '...fffffffff....', '..fffffffffff...', '..ffLfffffff....', '.fffffLfffffff..', '.fffffffffffff..', '.ffffLffffffff..', '.fffffffffffff..', '..fffffffffff...', '..ffLffffffff...', '...fffffffff....', '....fffffff.....', '......fff.......', '......Bbb.......', '......BB........'],
      pine: ['.......ff.......', '......ffff......', '.....ffffff.....', '....ffffffff....', '....fLffffff....', '...ffffffffff...', '...fffLfffffff..', '..ffffffffffff..', '..ffffLfffffff..', '.ffffffffffffff.', '.ffffLfffffffff.', 'ffffffffffffffff', '.....ffff.......', '.....Bbb........', '.....BB.........', '................'],
      bush: ['....ffffffff....', '...ffffffffff...', '..ffffffffffff..', '..fLffffffffLf..', '.ffffffffffffff.', '.ffLffffffffLff.', '.ffffffffffffff.', '..ffffffffffff..', '..ffffLfffffff..', '...ffffffffff...', '....ffffffff....', '................', '................', '................', '................', '................'],
      flower: ['......pp........', '.....pppp.......', '......yy........', '......ff........', '......ff........', '......ff........', '.....f.ff.......', '....f...f.......', '................', '................', '................', '................', '................', '................', '................', '................'],
      mushroom: ['.....rrrrrr.....', '....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', '......eeee......', '......eeee......', '......eeee......', '.....eeeeee.....', '.....eeeeee.....', '.....eeeeee.....', '................', '................'],
      carrot: ['......ff........', '.....ffff.......', '....ffffff......', '.....ffff.......', '......ff........', '......oo........', '......ooo.......', '......oooo......', '......oooo......', '......ooo.......', '......oo........', '.....dddddd.....', '.....dddddd.....', '................', '................', '................'],
      strawberry: ['......ff........', '......ff........', '.....f..........', '.....aaaa.......', '....aaaaaa......', '...aaaaaaaa.....', '...aaaaaaaa.....', '...aaaaaaaa.....', '....aaaaaa......', '.....aaaa.......', '.....dddddd.....', '.....dddddd.....', '................', '................', '................', '................'],
      farmer: ['.....yyyyyy.....', '....yyyyyyyy....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....qqqq.......', '....qqqqqq......', '...nqqqqqqn.....', '...nqqqqqqn.....', '...nqqqqqqn.....', '....qqqqqq......', '.....qqqq.......', '....BB..BB......', '....BB..BB......', '....BB..BB......'],
      dog: ['.....bb.........', '....bbbb........', '...bbbbbb.......', '...bbbbbbb......', '..bbkbbbbbb.....', '..bbbbbbbbbb....', '..bbbbbbbbbb....', '...bbbbbbbbb....', '....bbbbbbbb....', '.....bbbbbb.....', '.....BB..BB.....', '.....BB..BB.....', '.....BB..BB.....', '................', '................', '................'],
      cat: ['....bbbbbb......', '...bbbbbbbb.....', '..bbkbbbbkbb....', '..bbbbbbbbbb....', '..bbbbbbbbbb....', '...bbbbbbbb.....', '....bbbbbb......', '.....bbbb.......', '.....BB..BB.....', '.....BB..BB.....', '................', '................', '................', '................', '................', '................'],
      cow: ['....mmmmmmmm....', '...mmmmmmmmmm...', '..mmkmmmmkmmm...', '..mmmkmmkmmmm...', '..mmmmmmmmmmmm..', '..mmkkmmmmmmmm..', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '...mm......mm...', '...mm......mm...', '...mm......mm...', '...mm......mm...', '................', '................', '................', '................'],
      chicken: ['.....mmmm.......', '....mmmmmm......', '....mmmmmm......', '....mkm.........', '....mmmm........', '...mmmmmm.......', '..mmmmmmmm......', '..mmmmmmmm......', '...mm..mm.......', '...mm..mm.......', '...mm..mm.......', '................', '................', '................', '................', '................'],
      wizard: ['.....vvvvvv.....', '....vvvvvvvv....', '....vvvvvvvv....', '.....nnnn........', '.....nknk........', '.....nnnn........', '......nn.........', '.....vvvv........', '....vvvvvv.......', '...vvvvvvvv......', '...nvvvvvvn......', '...nvvvvvvn......', '....vvvvvv.......', '....BB..BB.......', '....BB..BB.......', '.................'],
      villager: ['....hhhhhh......', '...hhhhhhhh.....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....tttt.......', '....tttttt......', '...nttttttn.....', '...nttttttn.....', '....tttttt......', '.....tttt.......', '....BB..BB......', '....BB..BB......', '....BB..BB......', '................'],
      sheep: ['....mmmmmmmm....', '...mmmmmmmmmm...', '..mmkmmmmkmmm...', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '...mmmmmmmmmm...', '....mmmmmmmm....', '....BB..BB......', '....BB..BB......', '....BB..BB......', '................', '................', '................', '................'],
      bird: ['......bb........', '.....bbbb.......', '....bbbbbb......', '....bbkbb.......', '......oo........', '....bbbbbb......', '...bbbbbbbb.....', '..bb......bb....', '................', '................', '................', '................', '................', '................', '................', '................'],
      monster: ['.....ffff........', '...ffffffff......', '..ffffffffff.....', '..ffffffffff.....', '.ffkffffffkff....', '.ffffffffffff....', '.ffffffffffff....', '..fffffffffff....', '..fffffffffff....', '...ffffffffff....', '....ffffffff.....', '.....ff..ff......', '.....f....f......', '................', '................', '................'],
      dragon: ['....ff..ff.......', '...ffffffffff....', '..ffffffffff.....', '..fkfffffffkf....', '..ffffffffff.....', '...ffffffff......', '...ffffffff......', '....ffffff.......', '....ff..ff.......', '....BB..BB.......', '....BB..BB.......', '................', '................', '................', '................', '................'],
      shop: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', 'eeeeeeeeeeeeeeee', 'eyeyeyeyeyeyeyey', 'eexxeeeeeeexxeee', 'eeeeeeeeeeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB'],
      church: ['......ssss......', '......ssss......', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '.....ssssss.....', '....ssssssss....', '....ssssssss....', '....ssssssss....', '.....ssssss.....', '.....ssssss.....', '................'],
      tower: ['.....rrrrrr.....', '....rrrrrrrr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....rssssssr....', '....ssssssss....', '....ssssssss....', '....ssssssss....', '....ssssssss....', '................', '................'],
      well: ['.....ssssss.....', '....ssssssss....', '...ss......ss...', '..ss..wwww..ss..', '..ss..wwww..ss..', '..ss..wwww..ss..', '..ss........ss..', '..ss........ss..', '...ss......ss...', '....ssssssss....', '.....ssssss.....', '................', '................', '................', '................', '................'],
      fountain: ['.....ssssss.....', '....ssssssss....', '...ss......ss...', '..ss..wwww..ss..', '..ss.wwwwww.ss..', '..ss.wwwwww.ss..', '..ss..wwww..ss..', '..ss........ss..', '...ss......ss...', '....ssssssss....', '.....ssssss.....', '................', '................', '................', '................', '................'],
      chest: ['.....yyyyyy.....', '.....yyyyyy.....', '.....yyyyyy.....', '....bbbbbbbb....', '...bbbbbbbbbb...', '...bbbbbbbbbb...', '...bbbbbbbbbb...', '...bbBbbbbBbb...', '...bbbbbbbbbb...', '...bbbbbbbbbb...', '...bbbbbbbbbb...', '....bbbbbbbb....', '................', '................', '................', '................'],
      lamp: ['......yy........', '.....ssss.......', '......ss........', '......ss........', '......ss........', '......ss........', '......ss........', '......ss........', '.....ssss.......', '....ssssss......', '....ssssss......', '................', '................', '................', '................', '................'],
      ufo: ['......cccc......', '.....cccccc.....', '....cccccccc....', '...cccccccccc...', '..ccmmmmmmmmcc..', '..cccccccccccc..', '...cccccccccc...', '....cccccccc....', '................', '................', '................', '................', '................', '................', '................', '................'],
      sun: ['........', '..yyyy..', '.yyyyyy.', '.yyyyyy.', '.yyyyyy.', '.yyyyyy.', '..yyyy..', '........'],
      moon: ['........', '..mmmm..', '.mmmmmm.', '.mmkmmm.', '.mmmmmm.', '..mmmm..', '........', '........'],
      bubble: ['........', '.k..k..k', '........', '........'],
      dflower: ['........', '...p....', '..ppp...', '...y....', '........', '........', '........', '........'],
      pebble: ['........', '........', '..ss....', '.ssss...', '..ss....', '........', '........', '........'],
      tuft: ['........', '...f....', '..ff....', '...f....', '........', '........', '........', '........'],
      target: ['..yyyy..', '.y....y.', 'y..kk..y', 'y.kkkk.y', 'y.kkkk.y', 'y..kk..y', '.y....y.', '..yyyy..']
    };

    function fnv1a(input) {
      var h = 0x811c9dc5;
      var s = String(input);
      for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        h ^= code & 0xff;
        h = Math.imul(h, 0x01000193);
        h ^= (code >>> 8) & 0xff;
        h = Math.imul(h, 0x01000193);
      }
      return h >>> 0;
    }

    function spriteCss(name, map) {
      var h = map.length;
      var w = map[0].length;
      var rects = [];
      for (var y = 0; y < h; y++) {
        var x = 0;
        while (x < w) {
          var ch = map[y][x];
          var run = 1;
          while (x + run < w && map[y][x + run] === ch) run++;
          var color = ch && ch !== '.' ? P[ch] : undefined;
          if (color) rects.push('<rect x="' + x + '" y="' + y + '" width="' + run + '" height="1" fill="' + color + '"/>');
          x += run;
        }
      }
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges">' + rects.join('') + '</svg>';
      return '.gw-spr-' + name + '{background-image:url("data:image/svg+xml,' + encodeURIComponent(svg) + '");}';
    }

    function earthTextureUrl() {
      var W = 256;
      var H = 128;
      var land = [];
      for (var y = 0; y < H; y++) land.push(new Array(W).fill(false));
      var blobs = [
        { cx: 52, cy: 56, r: 30 },
        { cx: 170, cy: 46, r: 22 },
        { cx: 120, cy: 102, r: 16 },
        { cx: 216, cy: 104, r: 12 },
        { cx: 34, cy: 106, r: 10 },
        { cx: 92, cy: 20, r: 8 },
        { cx: 202, cy: 16, r: 7 }
      ];
      for (var bi = 0; bi < blobs.length; bi++) {
        var b = blobs[bi];
        var x0 = Math.max(0, Math.floor(b.cx - b.r - 1));
        var x1 = Math.min(W - 1, Math.ceil(b.cx + b.r + 1));
        var y0 = Math.max(0, Math.floor(b.cy - b.r - 1));
        var y1 = Math.min(H - 1, Math.ceil(b.cy + b.r + 1));
        for (var yy = y0; yy <= y1; yy++) {
          for (var xx = x0; xx <= x1; xx++) {
            var dx = (xx - b.cx) / b.r;
            var dy = (yy - b.cy) / b.r;
            var d2 = dx * dx + dy * dy;
            var n = (fnv1a('e:' + xx + ':' + yy) % 1000) / 1000;
            if (d2 < 1 - 0.4 * n) land[yy][xx] = true;
          }
        }
      }
      var px = [];
      px.push('<rect width="' + W + '" height="' + H + '" fill="#247bd0"/>');
      for (var ry = 0; ry < H; ry++) {
        var rx = 0;
        while (rx < W) {
          if (!land[ry][rx]) { rx++; continue; }
          var run = 1;
          while (rx + run < W && land[ry][rx + run]) run++;
          var gn = (fnv1a('g:' + rx + ':' + ry) % 100) / 100;
          var fill = gn < 0.18 ? '#63d936' : '#3fb52a';
          px.push('<rect x="' + rx + '" y="' + ry + '" width="' + run + '" height="1" fill="' + fill + '"/>');
          rx += run;
        }
      }
      px.push('<rect width="' + W + '" height="5" y="0" fill="#dff0ff"/>');
      px.push('<rect width="' + W + '" height="5" y="123" fill="#dff0ff"/>');
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" shape-rendering="crispEdges">' + px.join('') + '</svg>';
      return 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    var css = [
      '.gw-panel{position:fixed;z-index:2147483000;width:306px;max-height:74vh;display:flex;flex-direction:column;border-radius:12px;background:rgba(15,19,27,0.94);color:#e8e8f0;box-shadow:0 10px 36px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.14);backdrop-filter:blur(10px);font-size:13px;user-select:none;overflow:hidden}',
      '.gw-header{display:flex;align-items:center;gap:6px;padding:8px 10px;cursor:grab;background:rgba(255,255,255,0.06)}',
      '.gw-header:active{cursor:grabbing}',
      '.gw-title{font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.gw-count{font-size:11px;color:#9aa6b8}',
      '.gw-close{border:none;background:transparent;color:#aab;cursor:pointer;font-size:14px;padding:2px 7px;border-radius:6px}',
      '.gw-close:hover{background:rgba(255,255,255,0.14);color:#fff}',
      '.gw-body{padding:9px;overflow-y:auto}',
      '.gw-map{position:relative;width:100%;height:250px;border-radius:6px;overflow:hidden;margin-bottom:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);cursor:grab;touch-action:none}',
      '.gw-map:active{cursor:grabbing}',
      '.gw-world{position:absolute;top:0;left:0;transform-origin:0 0}',
      '.gw-tiles{position:absolute;top:0;left:0;display:grid}',
      '.gw-tile{background-size:100% 100%;image-rendering:pixelated}',
      '.gw-night{position:absolute;inset:0;background:rgba(18,26,60,0.52);pointer-events:none}',
      '.gw-spr{background-repeat:no-repeat;background-size:100% 100%;image-rendering:pixelated}',
      '.gw-obj{position:absolute;line-height:1;transform:translate(-50%,-55%);filter:drop-shadow(0 2px 1px rgba(0,0,0,0.28));pointer-events:none}',
      '.gw-npc{pointer-events:auto;cursor:pointer;animation:gw-bob 2.2s ease-in-out infinite}',
      '@keyframes gw-bob{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,-54%)}}',
      '.gw-bubble{animation:gw-bubblepulse 1.2s ease-in-out infinite}',
      '@keyframes gw-bubblepulse{0%,100%{opacity:0.5}50%{opacity:1}}',
      '.gw-feat{filter:drop-shadow(0 0 3px rgba(255,215,90,0.95)) drop-shadow(0 2px 1px rgba(0,0,0,0.28))}',
      '.gw-feat-npc{filter:drop-shadow(0 0 2px rgba(255,215,90,0.7)) drop-shadow(0 2px 1px rgba(0,0,0,0.28))}',
      '.gw-toolbar{position:absolute;right:6px;bottom:6px;display:flex;flex-direction:column;gap:4px}',
      '.gw-tbtn{width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;padding:0}',
      '.gw-tbtn:hover{background:rgba(255,255,255,0.22)}',
      '.gw-tbtn .gw-spr{width:14px;height:14px;display:block}',
      '.gw-npc-tip{position:absolute;z-index:20;background:rgba(20,24,34,0.97);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 8px;display:flex;align-items:center;gap:6px;font-size:12px;box-shadow:0 4px 14px rgba(0,0,0,0.4);pointer-events:none;max-width:180px}',
      '.gw-tip-name{font-weight:700}',
      '.gw-tip-act{color:#cfe0ff;margin-top:1px}',
      '.gw-intent{position:absolute;z-index:18;background:rgba(28,34,48,0.97);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:4px 7px;font-size:11px;box-shadow:0 3px 10px rgba(0,0,0,0.4);pointer-events:none;white-space:nowrap;animation:gw-intent-in 0.18s ease-out}',
      '@keyframes gw-intent-in{from{opacity:0;margin-top:4px}to{opacity:1;margin-top:0}}',
      '.gw-intent-name{font-weight:700}',
      '.gw-intent-act{color:#cfe0ff}',
      '.gw-log{margin-top:8px;border-top:1px solid rgba(255,255,255,0.1);padding-top:6px;max-height:190px;overflow-y:auto;display:flex;flex-direction:column;gap:4px}',
      '.gw-entry{padding:4px 7px;border-radius:6px;background:rgba(255,255,255,0.05);cursor:pointer}',
      '.gw-entry:hover{background:rgba(255,255,255,0.09)}',
      '.gw-entry-main{font-weight:600;display:flex;align-items:center;gap:6px}',
      '.gw-entry-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.gw-thumb{width:16px;height:16px;flex:0 0 auto;image-rendering:pixelated}',
      '.gw-time{font-size:10px;color:#7a8698;flex:0 0 auto}',
      '.gw-del{flex:0 0 auto;width:16px;height:16px;line-height:14px;font-size:10px;border-radius:50%;background:rgba(208,72,64,0.85);color:#fff;border:none;cursor:pointer;text-align:center;padding:0;opacity:0.6}',
      '.gw-del:hover{opacity:1}',
      '.gw-prompt{font-size:11px;color:#93a0b5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}',
      '.gw-prompt-open{white-space:normal;overflow:visible;text-overflow:clip;word-break:break-all}',
      '.gw-garble{font-size:11px;color:#6b7688;word-break:break-all;margin-top:1px}',
      '.gw-footer{padding:6px 10px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:#9aa6b8;text-align:center}',
      '.gw-empty{padding:16px 10px;text-align:center;color:#9aa6b8;line-height:1.7}',
      '.gw-toggle{border:none;background:transparent;color:inherit;cursor:pointer;font-size:15px;padding:4px 8px;border-radius:8px;white-space:nowrap}',
      '.gw-toggle:hover{background:rgba(255,255,255,0.12)}',
      '.gw-pet{position:fixed;z-index:2147482999}',
      '.gw-earth{position:relative;width:96px;height:96px;border-radius:50%;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.5),inset 0 0 0 1px rgba(255,255,255,0.16);cursor:pointer;animation:gw-pet-bob 2.8s ease-in-out infinite}',
      '@keyframes gw-pet-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
      '.gw-earth-texture{position:absolute;inset:0;background-image:url("' + earthTextureUrl() + '");background-repeat:repeat-x;background-size:auto 100%;animation:gw-earthspin 6s linear infinite}',
      '@keyframes gw-earthspin{from{background-position:0 0}to{background-position:-192px 0}}',
      '.gw-earth-shade{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 33% 30%,rgba(255,255,255,0.34),rgba(255,255,255,0) 44%),radial-gradient(circle at 50% 50%,rgba(0,0,0,0) 58%,rgba(4,10,26,0.48) 100%);pointer-events:none}',
      '.gw-event-bubble{position:absolute;left:106px;top:14px;display:flex;align-items:center;gap:6px;background:rgba(28,34,48,0.97);border:1px solid rgba(255,255,255,0.22);border-radius:10px;padding:6px 9px;font-size:12px;max-width:200px;box-shadow:0 4px 14px rgba(0,0,0,0.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:gw-bubble-in 0.2s ease-out}',
      '.gw-event-bubble::before{content:\'\';position:absolute;left:-6px;top:20px;width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:6px solid rgba(28,34,48,0.97)}',
      '@keyframes gw-bubble-in{from{opacity:0;transform:translateX(-5px)}to{opacity:1;transform:none}}'
    ].join('');
    for (var sp in SPRITES) css += spriteCss(sp, SPRITES[sp]);

    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-plugin', 'part-time-god');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var DAYLEN = 600;
    var ROUTINES = {
      farmer: { name: '老周', home: { x: 8, y: 2 }, stops: [{ x: 8, y: 6, act: '在菜地浇水' }, { x: 6, y: 4, act: '给胡萝卜除草' }, { x: 7, y: 5, act: '采摘草莓' }, { x: 8, y: 4, act: '整理菜畦' }, { x: 8, y: 5, act: '休息一会儿' }] },
      dog: { name: '阿黄', home: { x: 24, y: 3 }, stops: [{ x: 17, y: 8, act: '在镇口巡逻' }, { x: 15, y: 8, act: '追蝴蝶' }, { x: 16, y: 9, act: '在广场晒太阳' }, { x: 17, y: 8, act: '休息' }] },
      cat: { name: '雪球', home: { x: 11, y: 2 }, stops: [{ x: 9, y: 3, act: '在村里散步' }, { x: 10, y: 4, act: '追蝴蝶' }, { x: 8, y: 4, act: '打盹' }, { x: 9, y: 3, act: '晒太阳' }] },
      cow: { name: '花斑', home: { x: 24, y: 3 }, stops: [{ x: 25, y: 6, act: '在草地上吃草' }, { x: 24, y: 7, act: '吃草' }, { x: 25, y: 7, act: '去水边喝水' }, { x: 25, y: 6, act: '发呆' }] },
      chicken: { name: '咕咕', home: { x: 20, y: 8 }, stops: [{ x: 20, y: 8, act: '在院里啄食' }, { x: 21, y: 8, act: '刨土' }, { x: 19, y: 8, act: '找虫子' }, { x: 20, y: 8, act: '回窝下蛋' }] },
      villager: { name: '小兰', home: { x: 19, y: 6 }, stops: [{ x: 11, y: 9, act: '去集市买东西' }, { x: 14, y: 10, act: '在广场聊天' }, { x: 15, y: 9, act: '散步' }, { x: 11, y: 9, act: '看花' }] }
    };

    function routePos(n, i, tick) {
      var r = ROUTINES[n.s];
      if (!r) return { x: n.x, y: n.y, busy: false, name: '?', act: '发呆' };
      var tod = (((tick % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
      if (tod >= 0.62) return { x: r.home.x, y: r.home.y, busy: false, name: r.name, act: '回家睡觉' };
      var stops = r.stops;
      var cnt = stops.length;
      var tt = tick + i * 17;
      var seg = Math.floor(tt / 50);
      var a = stops[seg % cnt];
      var b = stops[(seg + 1) % cnt];
      var t = (tt % 50) / 50;
      if (t < 0.6) return { x: a.x, y: a.y, busy: true, name: r.name, act: '正在：' + a.act };
      var u = (t - 0.6) / 0.4;
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, busy: false, name: r.name, act: '准备去：' + b.act };
    }

    function featureNpcPos(f, tick) {
      return {
        x: f.x + Math.sin(f.id * 1.3 + tick * 0.5) * 0.28,
        y: f.y + Math.cos(f.id * 1.7 + tick * 0.4) * 0.2
      };
    }

    function nightOpacity(tick) {
      var tod = (((tick % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
      if (tod < 0.55) return 0;
      if (tod < 0.68) return ((tod - 0.55) / 0.13) * 0.55;
      if (tod < 0.92) return 0.55;
      return 0.55 - ((tod - 0.92) / 0.08) * 0.55;
    }

    function fmtTime(ts) {
      if (typeof ts !== 'number') return '';
      var d = new Date(ts);
      if (isNaN(d.getTime())) return '';
      var h = d.getHours();
      var m = d.getMinutes();
      return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    }

    var inject = ["slots"];

    function apply(ctx) {
      var WORLD_W = COLS * TILE;
      var WORLD_H = ROWS * TILE;
      var latestBase = null;
      var lastSeen = { sessionId: null, count: 0 };

      var store = {
        open: false,
        pos: { x: 16, y: 64 },
        drag: null,
        pan: null,
        petPos: { x: 20, y: 140 },
        petDrag: null,
        petMoved: false,
        tick: 0,
        refresh: 0,
        zoom: 1,
        cam: { x: VIEW_W / 2 - CTRL.x * TILE, y: VIEW_H / 2 - CTRL.y * TILE },
        selectedNpc: null,
        selectedFeat: null,
        expanded: {},
        intents: {},
        eventBubble: null,
        listeners: new Set()
      };

      function setStore(patch) {
        Object.assign(store, patch);
        store.listeners.forEach(function (fn) { fn(); });
      }
      function useStoreVersion() {
        var v = React.useState(0);
        React.useEffect(function () {
          var fn = function () { v[1](function (x) { return x + 1; }); };
          store.listeners.add(fn);
          return function () { store.listeners.delete(fn); };
        }, []);
      }

      function clampCam(x, y) {
        return {
          x: Math.min(VIEW_W - 40, Math.max(40 - WORLD_W * store.zoom, x)),
          y: Math.min(VIEW_H - 40, Math.max(40 - WORLD_H * store.zoom, y))
        };
      }
      function zoomAt(cx, cy, factor) {
        var z2 = Math.min(2, Math.max(0.6, store.zoom * factor));
        var k = z2 / store.zoom;
        setStore({ zoom: z2, cam: clampCam(cx - (cx - store.cam.x) * k, cy - (cy - store.cam.y) * k) });
      }
      function recenter() {
        setStore({ cam: clampCam(VIEW_W / 2 - CTRL.x * TILE * store.zoom, VIEW_H / 2 - CTRL.y * TILE * store.zoom) });
      }

      function useWorld(sessionId, refresh) {
        var s = React.useState(null);
        React.useEffect(function () {
          var alive = true;
          var poll = function () {
            if (!sessionId) { s[1](null); return; }
            fetch('/api/part-time-god/world?sessionId=' + encodeURIComponent(sessionId))
              .then(function (r) { return r.json(); })
              .then(function (res) {
                if (!alive) return;
                if (res && res.ok && res.world) s[1](res.world); else s[1](null);
              })
              .catch(function () { if (alive) s[1](null); });
          };
          poll();
          var timer = ctx.get('timer');
          var dispose;
          if (timer) dispose = timer.interval(poll, 2500);
          return function () { alive = false; if (dispose) dispose(); };
        }, [sessionId, refresh]);
        return s[0];
      }

      function GameWorldToggle(props) {
        useStoreVersion();
        return React.createElement('button', {
          className: 'gw-toggle',
          title: '兼职上帝：对话的同时，你也兼职作为上帝，创造一个自己的世界',
          onClick: function () { setStore({ open: !store.open }); }
        }, props.wide ? '🎮 兼职上帝' : '🎮');
      }

      function GameWorldPet() {
        useStoreVersion();
        if (store.open) return null;
        var pos = store.petPos;
        var onDown = function (e) {
          e.preventDefault();
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
          setStore({ petDrag: { active: true, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }, petMoved: false });
        };
        var onMove = function (e) {
          if (!store.petDrag || !store.petDrag.active) return;
          var dx = e.clientX - store.petDrag.sx;
          var dy = e.clientY - store.petDrag.sy;
          setStore({
            petPos: { x: store.petDrag.ox + dx, y: store.petDrag.oy + dy },
            petMoved: store.petMoved || Math.abs(dx) > 4 || Math.abs(dy) > 4
          });
        };
        var onUp = function () { if (store.petDrag) setStore({ petDrag: { active: false } }); };
        var onClick = function () { if (!store.petMoved) setStore({ open: true, eventBubble: null }); };

        var bubble = null;
        if (store.eventBubble && store.eventBubble.until > Date.now()) {
          var b = store.eventBubble;
          bubble = React.createElement('div', { className: 'gw-event-bubble' },
            b.sprite ? React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + b.sprite }) : null,
            React.createElement('span', null, b.text)
          );
        }

        return React.createElement('div', { className: 'gw-pet', style: { left: pos.x + 'px', top: pos.y + 'px' } },
          React.createElement('div', { className: 'gw-earth', title: '兼职上帝 · 点击展开世界', onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp, onClick: onClick },
            React.createElement('div', { className: 'gw-earth-texture' }),
            React.createElement('div', { className: 'gw-earth-shade' })
          ),
          bubble
        );
      }

      function tileClass(ch) {
        switch (ch) {
          case '~': return 'gw-spr-tile-water';
          case '#': return 'gw-spr-tile-dirt';
          case '*': return 'gw-spr-tile-flower';
          case 'o': return 'gw-spr-tile-stone';
          default: return 'gw-spr-tile-grass';
        }
      }

      function buildDecor(sessionId, base) {
        var occupied = new Set();
        base.buildings.forEach(function (b) { occupied.add(b.x + ',' + b.y); });
        base.trees.forEach(function (t) { occupied.add(t.x + ',' + t.y); });
        base.crops.forEach(function (c) { occupied.add(c.x + ',' + c.y); });
        base.npcs.forEach(function (n) { occupied.add(n.x + ',' + n.y); });
        var kinds = ['dflower', 'pebble', 'tuft', 'dflower', 'tuft', 'pebble'];
        var deco = [];
        for (var y = 0; y < ROWS; y++) {
          for (var x = 0; x < COLS; x++) {
            if (base.map[y][x] !== '.') continue;
            if (occupied.has(x + ',' + y)) continue;
            var h = fnv1a(sessionId + ':d:' + x + ':' + y);
            if (h % 100 < 30) deco.push({ s: kinds[h % kinds.length], x: x, y: y });
          }
        }
        return deco;
      }

      function MapView(props) {
        var base = props.base, features = props.features, tick = props.tick, sessionId = props.sessionId;
        var cam = store.cam;
        var zoom = store.zoom;
        var deco = buildDecor(sessionId, base);

        var tiles = [];
        for (var r = 0; r < ROWS; r++) {
          for (var c = 0; c < COLS; c++) {
            tiles.push(React.createElement('div', { key: r + ',' + c, className: 'gw-tile gw-spr ' + tileClass(base.map[r][c]) }));
          }
        }

        var obj = function (o, size, lift) {
          return {
            left: (o.x + 0.5) * TILE + 'px',
            top: (o.y + 0.5) * TILE + 'px',
            width: size + 'px',
            height: size + 'px',
            transform: 'translate(-50%, -' + lift + '%)'
          };
        };

        var onPanStart = function (e) {
          var t = e.target;
          if (t && t.closest && (t.closest('.gw-npc') || t.closest('.gw-toolbar'))) return;
          e.preventDefault();
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
          setStore({ pan: { active: true, startX: e.clientX, startY: e.clientY, camX: store.cam.x, camY: store.cam.y }, selectedNpc: null, selectedFeat: null });
        };
        var onPanMove = function (e) {
          if (!store.pan || !store.pan.active) return;
          setStore({ cam: clampCam(store.pan.camX + (e.clientX - store.pan.startX), store.pan.camY + (e.clientY - store.pan.startY)) });
        };
        var onPanEnd = function () { if (store.pan) setStore({ pan: { active: false } }); };

        var now = Date.now();
        var intentBubbles = [];
        base.npcs.forEach(function (n, i) {
          var it = store.intents && store.intents[i];
          if (!it || it.until < now) return;
          if (store.selectedNpc === i) return;
          var rp = routePos(n, i, tick);
          var vx = (rp.x + 0.5) * TILE * zoom + cam.x;
          var vy = (rp.y + 0.5) * TILE * zoom + cam.y;
          intentBubbles.push(React.createElement('div', { key: 'intent' + i, className: 'gw-intent', style: { left: Math.min(VIEW_W - 8, Math.max(60, vx)), top: Math.min(VIEW_H - 6, Math.max(26, vy - 26)), transform: 'translate(-50%, -100%)' } },
            React.createElement('span', { className: 'gw-intent-name' }, it.name),
            React.createElement('span', { className: 'gw-intent-act' }, ' ' + it.act)
          ));
        });

        var tooltip = null;
        if (store.selectedNpc != null && base.npcs[store.selectedNpc]) {
          var n = base.npcs[store.selectedNpc];
          var rp = routePos(n, store.selectedNpc, tick);
          var tvx = (rp.x + 0.5) * TILE * zoom + cam.x;
          var tvy = (rp.y + 0.5) * TILE * zoom + cam.y;
          tooltip = React.createElement('div', { className: 'gw-npc-tip', style: { left: Math.min(VIEW_W - 170, Math.max(6, tvx)), top: Math.min(VIEW_H - 56, Math.max(6, tvy - 44)) } },
            React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + n.s }),
            React.createElement('div', null,
              React.createElement('div', { className: 'gw-tip-name' }, rp.name),
              React.createElement('div', { className: 'gw-tip-act' }, rp.act)
            )
          );
        }

        var featTooltip = null;
        if (store.selectedFeat != null) {
          var sf = null;
          for (var fi = 0; fi < features.length; fi++) { if (features[fi].id === store.selectedFeat) { sf = features[fi]; break; } }
          if (sf) {
            var fp = featureNpcPos(sf, tick);
            var fvx = (fp.x + 0.5) * TILE * zoom + cam.x;
            var fvy = (fp.y + 0.5) * TILE * zoom + cam.y;
            featTooltip = React.createElement('div', { className: 'gw-npc-tip', style: { left: Math.min(VIEW_W - 170, Math.max(6, fvx)), top: Math.min(VIEW_H - 56, Math.max(6, fvy - 44)) } },
              React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + sf.sprite }),
              React.createElement('div', null,
                React.createElement('div', { className: 'gw-tip-name' }, '新居民'),
                React.createElement('div', { className: 'gw-tip-act' }, sf.text)
              )
            );
          }
        }

        return React.createElement('div', { className: 'gw-map', onPointerDown: onPanStart, onPointerMove: onPanMove, onPointerUp: onPanEnd, onPointerCancel: onPanEnd },
          React.createElement('div', { className: 'gw-world', style: { width: WORLD_W + 'px', height: WORLD_H + 'px', transform: 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + zoom + ')' } },
            React.createElement('div', { className: 'gw-tiles', style: { gridTemplateColumns: 'repeat(' + COLS + ',' + TILE + 'px)', gridTemplateRows: 'repeat(' + ROWS + ',' + TILE + 'px)' } }, tiles),
            deco.map(function (dd, i) { return React.createElement('div', { key: 'deco' + i, className: 'gw-obj gw-spr gw-spr-' + dd.s, style: obj(dd, 16, 40) }); }),
            base.crops.map(function (c, i) { return React.createElement('div', { key: 'crop' + i, className: 'gw-obj gw-spr gw-spr-' + c.s, style: obj(c, 24, 40) }); }),
            base.trees.map(function (t, i) { return React.createElement('div', { key: 'tree' + i, className: 'gw-obj gw-spr gw-spr-' + t.s, style: obj(t, 48, 60) }); }),
            base.buildings.map(function (b, i) { return React.createElement('div', { key: 'bld' + i, className: 'gw-obj gw-spr gw-spr-' + b.s, style: obj(b, 58, 62) }); }),
            features.map(function (f) {
              if (f.kind === 'npc') {
                var fp = featureNpcPos(f, tick);
                return React.createElement('div', {
                  key: 'feat' + f.id,
                  className: 'gw-obj gw-spr gw-spr-' + f.sprite + ' gw-npc gw-feat-npc',
                  style: { left: (fp.x + 0.5) * TILE + 'px', top: (fp.y + 0.5) * TILE + 'px', width: '34px', height: '34px', transform: 'translate(-50%, -50%)' },
                  title: f.text,
                  onClick: function (e) { e.stopPropagation(); setStore({ selectedFeat: store.selectedFeat === f.id ? null : f.id, selectedNpc: null }); }
                });
              }
              return React.createElement('div', { key: 'feat' + f.id, className: 'gw-obj gw-spr gw-spr-' + f.sprite + ' gw-feat', style: obj(f, 38 * (f.z || 1), 52), title: f.text });
            }),
            base.npcs.map(function (n, i) {
              var pos = routePos(n, i, tick);
              var parts = [React.createElement('div', {
                key: 'npc' + i,
                className: 'gw-obj gw-spr gw-spr-' + n.s + ' gw-npc',
                style: { left: (pos.x + 0.5) * TILE + 'px', top: (pos.y + 0.5) * TILE + 'px', width: '34px', height: '34px', transform: 'translate(-50%, -50%)' },
                onClick: function (e) { e.stopPropagation(); setStore({ selectedNpc: store.selectedNpc === i ? null : i, selectedFeat: null }); }
              })];
              if (pos.busy) {
                parts.push(React.createElement('div', { key: 'bub' + i, className: 'gw-obj gw-spr gw-spr-bubble gw-bubble', style: { left: (pos.x + 0.5) * TILE + 'px', top: (pos.y + 0.5) * TILE + 'px', width: '14px', height: '14px', transform: 'translate(-50%, -200%)' } }));
              }
              return React.createElement(React.Fragment, { key: 'npcw' + i }, parts);
            })
          ),
          React.createElement('div', { className: 'gw-night', style: { opacity: nightOpacity(tick) } }),
          React.createElement('div', { className: 'gw-toolbar' },
            React.createElement('button', { className: 'gw-tbtn', title: '放大', onClick: function (e) { e.stopPropagation(); zoomAt(VIEW_W / 2, VIEW_H / 2, 1.25); } }, '+'),
            React.createElement('button', { className: 'gw-tbtn', title: '缩小', onClick: function (e) { e.stopPropagation(); zoomAt(VIEW_W / 2, VIEW_H / 2, 1 / 1.25); } }, '−'),
            React.createElement('button', { className: 'gw-tbtn', title: '回到城镇中心', onClick: function (e) { e.stopPropagation(); recenter(); } }, React.createElement('span', { className: 'gw-spr gw-spr-target' }))
          ),
          intentBubbles,
          tooltip,
          featTooltip
        );
      }

      function GameWorldPanel(props) {
        useStoreVersion();
        var sessionId = props.useSessions ? props.useSessions(function (s) { return s ? s.current : undefined; }) : undefined;
        var world = useWorld(sessionId, store.refresh);
        latestBase = world ? world.base : null;

        React.useEffect(function () {
          var timer = ctx.get('timer');
          var dispose;
          if (timer) {
            dispose = timer.interval(function () {
              var tick = (store.tick || 0) + 1;
              var patch = { tick: tick };
              if (latestBase && latestBase.npcs) {
                var intents = Object.assign({}, store.intents || {});
                var now = Date.now();
                latestBase.npcs.forEach(function (n, i) {
                  var rp = routePos(n, i, tick);
                  var prev = intents[i];
                  if (!prev) { intents[i] = { act: rp.act, name: rp.name, s: n.s, until: 0 }; }
                  else if (prev.act !== rp.act) { intents[i] = { act: rp.act, name: rp.name, s: n.s, until: now + 3000 }; }
                });
                patch.intents = intents;
              }
              setStore(patch);
            }, 450);
          }
          return function () { if (dispose) dispose(); };
        }, []);

        var count = world ? world.messageCount : 0;
        React.useEffect(function () {
          if (!world) return;
          var c = world.messageCount || 0;
          if (world.sessionId !== lastSeen.sessionId) { lastSeen = { sessionId: world.sessionId, count: c }; return; }
          if (c > lastSeen.count) {
            lastSeen.count = c;
            if (!store.open && world.log && world.log.length) {
              var newest = world.log[world.log.length - 1];
              setStore({ eventBubble: { text: newest.text, sprite: newest.sprite || null, until: Date.now() + 4000 } });
            }
          }
        }, [count]);

        var removeFeature = function (featureId) {
          if (!sessionId) return;
          fetch('/api/part-time-god/remove?sessionId=' + encodeURIComponent(sessionId) + '&featureId=' + encodeURIComponent(String(featureId)))
            .then(function () { setStore({ refresh: (store.refresh || 0) + 1 }); })
            .catch(function () {});
        };

        if (!store.open) return null;

        var themeTitle = world && world.theme ? world.theme : '未命名世界';
        var tod = (((store.tick % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
        var isNight = tod >= 0.62;
        var lastAt = world && typeof world.updatedAt === 'number' ? world.updatedAt : 0;
        var secSince = lastAt ? Math.max(0, Math.floor((Date.now() - lastAt) / 1000)) : 0;

        var onDragStart = function (e) {
          e.preventDefault();
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
          setStore({ drag: { active: true, offsetX: e.clientX - store.pos.x, offsetY: e.clientY - store.pos.y } });
        };
        var onDragMove = function (e) {
          if (!store.drag || !store.drag.active) return;
          setStore({ pos: { x: Math.max(0, e.clientX - store.drag.offsetX), y: Math.max(0, e.clientY - store.drag.offsetY) } });
        };
        var onDragEnd = function () { if (store.drag) setStore({ drag: { active: false } }); };

        var body;
        if (!sessionId) {
          body = React.createElement('div', { className: 'gw-empty' }, '还没有打开的对话。\n打开一个对话，说点什么——\n你的每一句话都会变成密码，\n在这里创造一个你自己的世界。');
        } else if (!world) {
          body = React.createElement('div', { className: 'gw-empty' }, '世界加载中……');
        } else {
          body = React.createElement('div', { className: 'gw-body' },
            React.createElement(MapView, { base: world.base, features: world.features, tick: store.tick, sessionId: world.sessionId }),
            React.createElement('div', { className: 'gw-log' },
              world.log.slice().reverse().map(function (entry, i) {
                var expanded = !!(store.expanded && store.expanded[entry.at]);
                return React.createElement('div', {
                  className: 'gw-entry',
                  key: 'log-' + i,
                  onClick: function () {
                    var next = Object.assign({}, store.expanded);
                    if (next[entry.at]) delete next[entry.at]; else next[entry.at] = true;
                    setStore({ expanded: next });
                  }
                },
                  React.createElement('div', { className: 'gw-entry-main' },
                    entry.sprite ? React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + entry.sprite }) : React.createElement('span', null, '●'),
                    React.createElement('span', { className: 'gw-entry-text' }, entry.text),
                    React.createElement('span', { className: 'gw-time' }, fmtTime(entry.at)),
                    entry.type === 'feature' && entry.id != null
                      ? React.createElement('button', { className: 'gw-del', title: '删除这条改动', onClick: function (e) { e.stopPropagation(); removeFeature(entry.id); } }, '✕')
                      : null
                  ),
                  React.createElement('div', { className: expanded ? 'gw-prompt gw-prompt-open' : 'gw-prompt' }, '「' + entry.userText + '」'),
                  expanded ? React.createElement('div', { className: 'gw-garble' }, '乱码: ' + entry.garble) : null
                );
              })
            )
          );
        }

        return React.createElement('div', { className: 'gw-panel', style: { left: store.pos.x, top: store.pos.y } },
          React.createElement('div', { className: 'gw-header', onPointerDown: onDragStart, onPointerMove: onDragMove, onPointerUp: onDragEnd, onPointerCancel: onDragEnd },
            React.createElement('div', { className: 'gw-spr gw-spr-' + (isNight ? 'moon' : 'sun'), style: { width: '16px', height: '16px' } }),
            React.createElement('span', { className: 'gw-title' }, themeTitle),
            React.createElement('span', { className: 'gw-count' }, world ? '#' + world.messageCount : ''),
            React.createElement('button', { className: 'gw-close', title: '缩略成地球', onClick: function (e) { e.stopPropagation(); setStore({ open: false }); } }, '—')
          ),
          body,
          React.createElement('div', { className: 'gw-footer' }, '距离上帝上一次降临已经过去了 ' + secSince + ' 秒')
        );
      }

      ctx.slots.inject('shell.overlay', function () { return ctx.slots.register({ name: 'shell.overlay', id: 'gameworld-pet', order: 90, label: '兼职上帝' }, GameWorldPet); });
      ctx.slots.inject('shell.overlay', function () { return ctx.slots.register({ name: 'shell.overlay', id: 'gameworld-panel', order: 100, label: '兼职上帝' }, GameWorldPanel); });
      ctx.slots.inject('sidebar.footer.action', function () { return ctx.slots.register({ name: 'sidebar.footer.action', id: 'gameworld-toggle', order: 100, label: '兼职上帝' }, GameWorldToggle); });
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
