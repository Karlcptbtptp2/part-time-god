window.__ModuleLoader__.load({
  id: "part-time-god",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");

    var COLS = 64;
    var ROWS = 48;
    var TILE = 26;
    var VIEW_W = 300;
    var VIEW_H = 280;
    var CTRL = { x: 30.5, y: 24.5 };

    var P = {
      g: '#74b757', G: '#6ca94f',
      w: '#4f96cf', W: '#5aa4d6',
      d: '#c8a45f', D: '#bd9954',
      s: '#8f8f99', S: '#9a9aa3',
      r: '#c84c3c', R: '#a83a2c',
      e: '#e8d8b8', E: '#ddcdad',
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
      'tile-river': ['wwwwwwwwwwwwwwww', 'wWwwwwwwwwWwwwww', 'wwwwwwWwwwwwwwww', 'wwwwwwwwwwwwwwWw', 'Wwwwwwwwwwwwwwww', 'wwwwwwwwWwwwwwww', 'wwwWwwwwwwwwwwww', 'wwwwwwwwwwwwWwww', 'wwwwwWwwwwwwwwww', 'wwwwwwwwwwwwwwww', 'wwWwwwwwwwwWwwww', 'wwwwwwwwwwwwwwww', 'wwwwwwWwwwwwwwww', 'WwwwwwwwwwwwwwWw', 'wwwwwwwwWwwwwwww', 'wwWwwwwwwwwwwwww'],
      'tile-dirt': ['dddddddddddddddd', 'dDddddddddDddddd', 'ddddddDddddddddd', 'ddddddddddddddDd', 'Dddddddddddddddd', 'ddddddddDddddddd', 'dddDdddddddddddd', 'ddddddddddddDddd', 'dddddDdddddddddd', 'dddddddddddddddd', 'ddDddddddddDdddd', 'dddddddddddddddd', 'ddddddDddddddddd', 'DdddddddddddddDd', 'ddddddddDddddddd', 'ddDddddddddddddd'],
      'tile-sand': ['eeeeeeeeeeeeeeee', 'eEeeeeeeeeEeeeee', 'eeeeeeEeeeeeeeee', 'eeeeeeeeeeeeeeEe', 'Eeeeeeeeeeeeeeee', 'eeeeeeeeEeeeeeee', 'eeeEeeeeeeeeeeee', 'eeeeeeeeeeeeEeee', 'eeeeeEeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'eeEeeeeeeeeEeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeEeeeeeeeee', 'EeeeeeeeeeeeeeEe', 'eeeeeeeeEeeeeeee', 'eeEeeeeeeeeeeeee'],
      'tile-mountain': ['....ffff........', '...ffffff.......', '..ffffffff......', '.ffffffffff.....', '.fSfffffffff....', '.sssssssssss....', '.ssSssssssss....', 'sssssssssssss...', 'sssSsssssssss...', 'sssssssssssss...', 'ssSssssssssss...', 'sssssssssssss...', 'sSsssssssssss...', 'sssssssssssss...', 'sSsssssssssss...', 'sssssssssssss...'],
      'tile-flower': ['gggggggggggggggg', 'gppggggggppggggg', 'gpyggggggpyggggg', 'gppggggggppggggg', 'gggggggggggggggg', 'gggggppggggggggg', 'gggggpygggggppgg', 'gggggppgggggpygg', 'ggggggggggggppgg', 'ggggppgggggggggg', 'ggggpygggggggggg', 'ggggppgggggggggg', 'gggggggggggggggg', 'ggppggggggppgggg', 'ggpyggggggpygggg', 'ggppggggggppgggg'],
      'tile-stone': ['ssssssssssssssss', 'sSssssssssSsssss', 'ssssssSsssssssss', 'ssssssssssssssSs', 'Ssssssssssssssss', 'ssssssssSsssssss', 'sssSssssssssssss', 'ssssssssssssSsss', 'sssssSssssssssss', 'ssssssssssssssss', 'ssSssssssssSssss', 'ssssssssssssssss', 'ssssssSsssssssss', 'SsssssssssssssSs', 'ssssssssSsssssss', 'ssSsssssssssssss'],
      house: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', 'eeeeeeeeeeeeeeee', 'eexxeeeeeeexxeee', 'eexxeeeeeeexxeee', 'eeeeeeeeeeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeebbeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB'],
      hut: ['....yyyyyyyy....', '...yyyyyyyyyy...', '..yyyyyyyyyyyy..', '..yYyyyyyyyyYy..', '.yyyyyyyyyyyyyy.', '.yyyyyyyyyyyyyy.', 'yyyyyyyyyyyyyyyy', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeebbbbeeeeeee', 'eeeeebbbbeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB', '................', '................'],
      barn: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '..rRrrrrrrrrRr..', '.rrrrrrrrrrrrrr.', 'rrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrr', 'rxxrrrrrrrrxxrrr', 'rxxrrrrrrrrxxrrr', 'rrrrrrrrrrrrrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrbbbbbbbbrrrr', 'rrrrrrrrrrrrrrrr', 'BBBBBBBBBBBBBBBB'],
      forge: ['.....ssssss.....', '....ssssssss....', '...ssssssssss...', '...sSssssssSs...', '..ssssssssssss..', '..ssssssssssss..', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', '..rrxxrrrrxxrr..', '..rrxxrrrrxxrr..', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', '..rrrrrrbbbrrr..', '..rrrrrrbbbrrr..', '..kk..yyyoo.....', '..kk..yooyo.....'],
      sawmill: ['....bbbbbbbb....', '...bbbbbbbbbb...', '..bbbbbbbbbbbb..', '..bBbbbbbbbbBb..', '.bbbbbbbbbbbbbb.', '.bbbbbbbbbbbbbb.', 'bbbbbbbbbbbbbbbb', 'yyyyyyyyyyyyyyyy', 'yyxxyyyyyyyxxyyy', 'yyxxyyyyyyyxxyyy', 'yyyyyyyyyyyyyyyy', 'ybbbyyyyyyybbbby', 'ybbbyyyyyyybbbby', 'yyyyyyyyyyyyyyyy', 'yyyyyyyyyyyyyyyy', 'BBBBBBBBBBBBBBBB'],
      fishhut: ['....qqqqqqqq....', '...qqqqqqqqqq...', '..qqqqqqqqqqqq..', '..qQqqqqqqqqQq..', '.qqqqqqqqqqqqqq.', '.qqqqqqqqqqqqqq.', 'qqqqqqqqqqqqqqqq', 'eeeeeeeeeeeeeeee', 'eexxeeeeeeexxeee', 'eexxeeeeeeexxeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeooeeeeeee', 'eeeeeeeooeeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB'],
      gatherhut: ['....ffffffff....', '...ffffffffff...', '..ffffffffffff..', '..fFffffffffFf..', '.ffffffffffffff.', '.ffffffffffffff.', 'ffffffffffffffff', 'eeeeeeeeeeeeeeee', 'eexxeeeeeeexxeee', 'eexxeeeeeeexxeee', 'eeeeeeeeeeeeeeee', 'eeeebbbbbbeeeeee', 'eeeebbbbbbeeeeee', 'eeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeee', 'BBBBBBBBBBBBBBBB'],
      lighthouse: ['.....wwwwww.....', '....wwwwwwww....', '....wwqqqqww....', '....wwqqqqww....', '....wwwwwwww....', '....wwqqqqww....', '....wwqqqqww....', '....wwwwwwww....', '.....wwwwww.....', '.....wwwwww.....', '......yyyy......', '.....yyyyyy.....', '......yyyy......', '................', '................', '................'],
      flag: ['..kk............', '..kky...........', '..kkyyy.........', '..kkyyyyy.......', '..kkyyyyyyy.....', '..kkyyy.........', '..kk............', '................', '................', '................', '................', '................', '................', '................', '................', '................'],
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
      butterfly: ['......y..y......', '.....yy..yy.....', '...yyppppppyy...', '..ypppkkkkpppy..', '..ypppkkkkpppy..', '..yppppkkppppy..', '...yyppppppyy...', '.....yy..yy.....', '......y..y......', '................', '................', '................', '................', '................', '................', '................'],
      fish: ['................', '......oo........', '.....oooo.......', '....oookoo......', '...oooooooo.....', '..oooooooooo....', '...oooooooo.....', '....oooooo......', '.....oo.oo......', '.....o...o......', '................', '................', '................', '................', '................', '................'],
      blacksmith: ['.....hhhhhh.....', '....hhhhhhhh....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....ssss.......', '....ssssss......', '...nssssssn.....', '...nssssssn.....', '...nssssssn.....', '....ssssss......', '....nssssn......', '....BB..BB......', '....BB..BB......', '....BB..BB......'],
      carpenter: ['.....hhhhhh.....', '....hhhhhhhh....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....bbbb.......', '....bbbbbb......', '...nbbbbbbn.....', '...nbbbbbbn.....', '...nbbbbbbn.....', '....bbbbbb......', '....bssssb......', '....BB..BB......', '....BB..BB......', '....BB..BB......'],
      gatherer: ['.....ffffff.....', '....ffffffff....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....ffff.......', '....ffffff......', '...nffffffn.....', '...nffffffn.....', '...nffffffn.....', '....ffffff......', '....bbbbbb......', '....BB..BB......', '....BB..BB......', '....BB..BB......'],
      fisher: ['.....qqqqqq.....', '....qqqqqqqq....', '....nnnnnn......', '....nknknk......', '....nnnnnn......', '......nn........', '.....qqqq.......', '....qqqqqq......', '...nqqqqqqn.....', '...nqqqqqqn.....', '...nqqqqqqn.....', '....qqqqqq......', '....qsssq.......', '....BB..BB......', '....BB..BB......', '....BB..BB......'],
      boat: ['.....ee.........', '.....ee.........', '....eeee........', '...eeeeee.......', '...eeeeee.......', '..bebbbbee......', '.bbbbbbbbbb.....', '.bbbbbbbbbb.....', 'wwwwwwwwwwww....', '..wwwwwwwwwww...', '................', '................', '................', '................', '................', '................'],
      cart: ['................', '................', '................', '................', '................', '....bbbbbbbb....', '...bbbbbbbbbb...', '...byybbbbbyb...', '..byyyybbbyyyb..', '..byyyybbbyyyb..', '..bbbbbbbbbbbb..', '..ss........ss..', '..kk........kk..', '................', '................', '................'],
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

    var SPRITE_SCALE = 2;
    var DYN_PALETTE = { k: '#2a2a30', w: '#f4f4f4', m: '#e8e8e8', g: '#74b757', f: '#4f8a3f', r: '#c84c3c', a: '#d04840', b: '#7a4a2a', y: '#f0c060', o: '#e88a3a', p: '#e06aa0', e: '#e8d8b8', s: '#8f8f99', q: '#4a6ac8', v: '#7a5aa0' };
    var dynCache = new Map();
    function dynUrl(pixels) {
      if (!pixels || !pixels.length) return undefined;
      var key = pixels.join('|');
      if (dynCache.has(key)) return dynCache.get(key);
      var rects = [];

      for (var y = 0; y < 16; y++) {
        var row = String(pixels[y] || '');
        var x = 0;
        while (x < 16) {
          var ch = row[x];
          var run = 1;
          while (x + run < 16 && row[x + run] === ch) run++;
          var color = ch && ch !== '.' ? DYN_PALETTE[ch] : undefined;
          if (color) rects.push('<rect x="' + (x * SPRITE_SCALE) + '" y="' + (y * SPRITE_SCALE) + '" width="' + (run * SPRITE_SCALE) + '" height="' + SPRITE_SCALE + '" fill="' + color + '"/>');
          x += run;
        }
      }
      var url = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">' + rects.join('') + '</svg>');
      dynCache.set(key, url);
      return url;
    }

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
          if (color) rects.push('<rect x="' + (x * SPRITE_SCALE) + '" y="' + (y * SPRITE_SCALE) + '" width="' + (run * SPRITE_SCALE) + '" height="' + SPRITE_SCALE + '" fill="' + color + '"/>');
          x += run;
        }
      }
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + (w * SPRITE_SCALE) + '" height="' + (h * SPRITE_SCALE) + '" viewBox="0 0 ' + (w * SPRITE_SCALE) + ' ' + (h * SPRITE_SCALE) + '" shape-rendering="crispEdges">' + rects.join('') + '</svg>';
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
      '.gw-panel{position:fixed;z-index:2147483000;width:322px;max-height:76vh;display:flex;flex-direction:column;border-radius:12px;background:rgba(15,19,27,0.94);color:#e8e8f0;box-shadow:0 10px 36px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.14);backdrop-filter:blur(10px);font-size:13px;user-select:none;overflow:hidden}',
      '.gw-header{display:flex;align-items:center;gap:6px;padding:8px 10px;cursor:grab;background:rgba(255,255,255,0.06)}',
      '.gw-header:active{cursor:grabbing}',
      '.gw-title{font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.gw-count{font-size:11px;color:#9aa6b8}',
      '.gw-close{border:none;background:transparent;color:#aab;cursor:pointer;font-size:14px;padding:2px 7px;border-radius:6px;pointer-events:auto}',
      '.gw-close:hover{background:rgba(255,255,255,0.14);color:#fff}',
      '.gw-body{padding:9px;overflow-y:auto}',
      '.gw-map{position:relative;width:100%;height:280px;border-radius:6px;overflow:hidden;margin-bottom:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);cursor:grab;touch-action:none}',
      '.gw-map:active{cursor:grabbing}',
      '.gw-world{position:absolute;top:0;left:0;transform-origin:0 0}',
      '.gw-tiles{position:absolute;top:0;left:0;display:grid}',
      '.gw-tile{background-size:100% 100%;image-rendering:pixelated}',
      '.gw-grade{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply}',
      '.gw-glint{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;background:linear-gradient(115deg,rgba(255,255,255,0) 42%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0) 58%);background-size:320% 100%;animation:gw-glint 9s linear infinite}',
      '@keyframes gw-glint{from{background-position:130% 0}to{background-position:-60% 0}}',
      '.gw-sway{transform-origin:50% 88%;animation:gw-sway 3.2s ease-in-out infinite}',
      '@keyframes gw-sway{0%,100%{transform:translate(-50%,-60%) rotate(-1.4deg)}50%{transform:translate(-50%,-60%) rotate(1.4deg)}}',
      '.gw-flag{animation:gw-flagwave 1.6s ease-in-out infinite}',
      '@keyframes gw-flagwave{0%,100%{transform:translate(-50%,-60%) skewY(-2deg)}50%{transform:translate(-50%,-60%) skewY(2deg)}}',
      '.gw-boatrock{animation:gw-boatrock 3.2s ease-in-out infinite}',
      '@keyframes gw-boatrock{0%,100%{transform:translate(-50%,-55%) rotate(-2deg)}50%{transform:translate(-50%,-55%) rotate(2deg)}}',
      '.gw-lit{filter:drop-shadow(0 0 5px rgba(255,190,90,0.75)) drop-shadow(0 2px 1px rgba(0,0,0,0.28))}',
      '.gw-smoke{position:absolute;width:8px;height:8px;border-radius:50%;background:rgba(200,200,210,0.5);pointer-events:none;animation:gw-smoke 3s ease-out infinite}',
      '@keyframes gw-smoke{0%{transform:translateY(0) scale(0.6);opacity:0.55}100%{transform:translateY(-16px) scale(1.5);opacity:0}}',
      '.gw-beam{position:absolute;width:240px;height:26px;pointer-events:none;background:linear-gradient(90deg,rgba(255,240,160,0.5),rgba(255,240,160,0));transform-origin:left center;animation:gw-beamswing 5s ease-in-out infinite alternate}',
      '@keyframes gw-beamswing{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}',
      '.gw-feat{animation:gw-featpulse 2.4s ease-in-out infinite}',
      '.gw-feat-npc{animation:gw-bob 2.2s ease-in-out infinite,gw-featpulse 2.4s ease-in-out infinite}',
      '@keyframes gw-featpulse{0%,100%{filter:drop-shadow(0 0 3px rgba(255,215,90,0.85)) drop-shadow(0 2px 1px rgba(0,0,0,0.28))}50%{filter:drop-shadow(0 0 9px rgba(255,230,130,1)) drop-shadow(0 2px 1px rgba(0,0,0,0.28))}}',
      '.gw-spr{background-repeat:no-repeat;background-size:100% 100%;image-rendering:pixelated}',
      '.gw-obj{position:absolute;line-height:1;transform:translate(-50%,-55%);filter:drop-shadow(0 2px 1px rgba(0,0,0,0.28));pointer-events:none}',
      '.gw-click{pointer-events:auto;cursor:pointer}',
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
      '.gw-npc-tip{position:absolute;z-index:20;background:rgba(20,24,34,0.97);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 8px;display:flex;align-items:center;gap:6px;font-size:12px;box-shadow:0 4px 14px rgba(0,0,0,0.4);pointer-events:none;max-width:200px}',
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
      '.gw-entry-error{background:rgba(208,72,64,0.12);border-left:2px solid rgba(208,72,64,0.8)}',
      '.gw-prompt{font-size:11px;color:#93a0b5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}',
      '.gw-prompt-open{white-space:normal;overflow:visible;text-overflow:clip;word-break:break-all}',
      '.gw-garble{font-size:11px;color:#6b7688;word-break:break-all;margin-top:1px}',
      '.gw-footer{padding:6px 10px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:#9aa6b8;text-align:center}',
      '.gw-empty{padding:16px 10px;text-align:center;color:#9aa6b8;line-height:1.7}',
      '.gw-foot-btn{position:relative;width:100%;height:49px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:0 8px 0 6px;font-family:inherit;font-size:14px;display:inline-flex;overflow:hidden}',
      '.gw-foot-btn:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}',
      '.gw-foot-btn-rail{border-radius:50%;justify-content:center;gap:0;width:36px;height:36px;padding:0}',
      '.gw-foot-earth{width:22px;height:22px;border-radius:50%;overflow:hidden;flex:none;position:relative;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.22)}',
      '.gw-foot-earth-tex{position:absolute;inset:0;background-image:url("' + earthTextureUrl() + '");background-repeat:repeat-x;background-size:auto 100%;animation:gw-footspin 8s linear infinite}',
      '@keyframes gw-footspin{from{background-position:0 0}to{background-position:-44px 0}}',
      '.gw-foot-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}',
      '.gw-foot-dot{position:absolute;top:7px;left:25px;width:7px;height:7px;border-radius:50%;background:#f0c060;box-shadow:0 0 4px #f0c060;animation:gw-bubblepulse 1.2s ease-in-out infinite}',
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
    var SEG = 28;
    var ROUTINES = {
      farmer: { name: '老周', home: { x: 25, y: 21 }, stops: [{ x: 24, y: 19, act: '在菜地浇水' }, { x: 25, y: 19, act: '给胡萝卜除草' }, { x: 23, y: 20, act: '采摘草莓' }, { x: 25, y: 21, act: '整理农具' }] },
      dog: { name: '阿黄', home: { x: 24, y: 26 }, stops: [{ x: 30, y: 23, act: '在广场巡逻' }, { x: 28, y: 23, act: '追蝴蝶' }, { x: 33, y: 25, act: '在市场看摊' }, { x: 30, y: 23, act: '休息' }] },
      cat: { name: '雪球', home: { x: 27, y: 19 }, stops: [{ x: 26, y: 22, act: '在村里散步' }, { x: 24, y: 20, act: '追蝴蝶' }, { x: 25, y: 23, act: '打盹' }, { x: 27, y: 19, act: '晒太阳' }] },
      cow: { name: '花斑', home: { x: 24, y: 26 }, stops: [{ x: 22, y: 27, act: '在草地上吃草' }, { x: 23, y: 26, act: '吃草' }, { x: 21, y: 25, act: '去河边喝水' }, { x: 24, y: 26, act: '发呆' }] },
      chicken: { name: '咕咕', home: { x: 33, y: 27 }, stops: [{ x: 33, y: 26, act: '在院里啄食' }, { x: 34, y: 27, act: '刨土' }, { x: 32, y: 26, act: '找虫子' }, { x: 33, y: 27, act: '回窝下蛋' }] },
      villager: { name: '小兰', home: { x: 34, y: 21 }, stops: [{ x: 30, y: 24, act: '去广场聊天' }, { x: 28, y: 24, act: '逛集市' }, { x: 32, y: 21, act: '看花' }, { x: 34, y: 21, act: '回家做饭' }] },
      blacksmith: { name: '铁匠老陈', home: { x: 34, y: 25 }, stops: [{ x: 34, y: 25, act: '在铁匠铺打铁' }, { x: 32, y: 23, act: '给农具淬火' }, { x: 30, y: 24, act: '在广场叫卖锄头' }, { x: 34, y: 25, act: '打磨镰刀' }] },
      carpenter: { name: '木匠老李', home: { x: 26, y: 26 }, stops: [{ x: 26, y: 26, act: '在木工坊锯木头' }, { x: 29, y: 25, act: '给马车修轮子' }, { x: 29, y: 20, act: '给教堂打长椅' }, { x: 26, y: 26, act: '刨木板' }] },
      gatherer: { name: '采集者小满', home: { x: 18, y: 26 }, stops: [{ x: 16, y: 24, act: '进森林采蘑菇' }, { x: 18, y: 22, act: '采草药' }, { x: 20, y: 20, act: '摘浆果' }, { x: 18, y: 26, act: '晾晒收成' }] },
      fisher: { name: '渔夫阿海', home: { x: 50, y: 22 }, stops: [{ x: 52, y: 23, act: '去码头钓鱼' }, { x: 53, y: 24, act: '划船下网' }, { x: 51, y: 25, act: '晒鱼干' }, { x: 50, y: 22, act: '补渔网' }] }
    };

    var BUILDING_INFO = {
      house: { name: '老周的农舍', detail: '老周一家住在这里，门前就是菜地' },
      hut: { name: '雪球的小窝', detail: '猫咪雪球的安身之处，垫着干草' },
      barn: { name: '花斑的谷仓', detail: '存放草料和农具，花斑晚上回这里' },
      shop: { name: '集市杂货铺', detail: '卖种子和日用品，小兰常来逛' },
      church: { name: '小镇教堂', detail: '钟声按时响起，长椅是木匠老李打的' },
      tower: { name: '海边哨塔', detail: '守望着海岸线，夜里亮着灯' },
      lighthouse: { name: '灯塔', detail: '夜里亮起光束，指引航船和晚归的人回家' },
      forge: { name: '老陈的铁匠铺', detail: '炉火日夜不息，叮叮当当打铁声' },
      sawmill: { name: '老李的木工坊', detail: '锯木声伴着刨花香，马车轮子都在这修' },
      fishhut: { name: '阿海的渔家小屋', detail: '挂着渔网、晒着鱼干，出门就是码头' },
      gatherhut: { name: '小满的采集小屋', detail: '屋檐下晾着蘑菇和草药' }
    };
    var VEHICLE_INFO = {
      boat: { name: '小渔船', detail: '阿海的渔船，在近海轻轻漂着' },
      cart: { name: '运货马车', detail: '往返于集市与码头，运鱼和山货' }
    };
    var DECO_INFO = {
      dflower: { name: '野花', detail: '路边的小野花，风一吹就点头' },
      pebble: { name: '卵石', detail: '一块圆滚滚的石头' },
      tuft: { name: '草丛', detail: '一丛小草，可能有虫子在唱歌' }
    };

    function routePos(n, i, tick) {
      var r = ROUTINES[n.s];
      if (!r) return { x: n.x, y: n.y, busy: false, name: '?', act: '发呆' };
      var tod = (((tick % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
      if (tod >= 0.62) return { x: r.home.x, y: r.home.y, busy: false, name: r.name, act: '回家睡觉' };
      var stops = r.stops;
      var cnt = stops.length;
      var tt = tick + i * 11;
      var seg = Math.floor(tt / SEG);
      var a = stops[seg % cnt];
      var b = stops[(seg + 1) % cnt];
      var t = (tt % SEG) / SEG;
      if (t < 0.55) return { x: a.x, y: a.y, busy: true, name: r.name, act: '正在：' + a.act };
      var u = (t - 0.55) / 0.45;
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, busy: false, name: r.name, act: '准备去：' + b.act };
    }

    function featureNpcPos(f, tick) {
      return {
        x: f.x + Math.sin(f.id * 1.3 + tick * 0.7) * 0.35,
        y: f.y + Math.cos(f.id * 1.7 + tick * 0.6) * 0.26
      };
    }

    function vehiclePos(v, tick) {
      var pts = v.route;
      if (!pts || pts.length < 2) return { x: v.x, y: v.y };
      var total = 110;
      var cycle = total * 2;
      var t = ((tick % cycle) + cycle) % cycle;
      var k = t < total ? t / total : (cycle - t) / total;
      return { x: pts[0][0] + (pts[1][0] - pts[0][0]) * k, y: pts[0][1] + (pts[1][1] - pts[0][1]) * k };
    }

    function todOf(tick) {
      return (((tick % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
    }
    function gradeFor(tick) {
      var tod = todOf(tick);
      if (tod < 0.10) return 'rgba(64, 88, 140, 0.30)';
      if (tod < 0.32) return 'rgba(96, 140, 120, 0.12)';
      if (tod < 0.52) return 'rgba(0, 0, 0, 0)';
      if (tod < 0.68) return 'rgba(255, 140, 60, 0.30)';
      return 'rgba(16, 24, 70, 0.58)';
    }
    function isNightAt(tick) {
      return todOf(tick) >= 0.66;
    }
    function beamOpacity(tick) {
      var tod = todOf(tick);
      if (tod < 0.60) return 0;
      if (tod < 0.66) return (tod - 0.60) / 0.06;
      return 1;
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

    function objInfo(sel, base, tick, features, deco) {
      if (!sel) return null;
      if (sel.type === 'crop') {
        var c = base.crops && base.crops[sel.i];
        if (!c) return null;
        var stages = ['刚播下种子', '冒出嫩芽', '长势正旺', '快成熟了'];
        var st = stages[fnv1a('stage:' + c.x + ':' + c.y) % 4];
        return { x: c.x, y: c.y, name: c.s === 'carrot' ? '胡萝卜地' : '草莓地', detail: '老周家的菜地 · ' + st, sprite: c.s };
      }
      if (sel.type === 'tree') {
        var t = base.trees && base.trees[sel.i];
        if (!t) return null;
        var planters = ['自然长成', '老周种的', '老李种的', '小满种的'];
        var planter = planters[fnv1a('planter:' + t.x + ':' + t.y) % 4];
        var age = 3 + (fnv1a('age:' + t.x + ':' + t.y) % 40);
        return { x: t.x, y: t.y, name: t.s === 'pine' ? '松树' : '橡树', detail: planter + ' · 树龄 ' + age + ' 年', sprite: t.s };
      }
      if (sel.type === 'building') {
        var b = base.buildings && base.buildings[sel.i];
        if (!b) return null;
        var binfo = BUILDING_INFO[b.s] || { name: '小屋', detail: '岛民的小屋' };
        return { x: b.x, y: b.y, name: binfo.name, detail: binfo.detail, sprite: b.s };
      }
      if (sel.type === 'vehicle') {
        var v = base.vehicles && base.vehicles[sel.i];
        if (!v) return null;
        var vinfo = VEHICLE_INFO[v.s] || { name: '交通工具', detail: '在岛上往来' };
        var vp = vehiclePos(v, tick);
        return { x: vp.x, y: vp.y, name: vinfo.name, detail: vinfo.detail, sprite: v.s };
      }
      if (sel.type === 'deco') {
        var d = deco && deco[sel.i];
        if (!d) return null;
        var dinfo = DECO_INFO[d.s] || { name: '小景致', detail: '岛上的一处小景致' };
        return { x: d.x, y: d.y, name: dinfo.name, detail: dinfo.detail, sprite: d.s };
      }
      if (sel.type === 'feature') {
        var f = null;
        for (var fi = 0; fi < features.length; fi++) { if (features[fi].id === sel.id) { f = features[fi]; break; } }
        if (!f) return null;
        return { x: f.x, y: f.y, name: '上帝的手笔', detail: '由你的一句话创造 · ' + fmtTime(f.at), pixels: f.pixels, sprite: f.sprite };
      }
      return null;
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
        selectedObj: null,
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
        var z2 = Math.min(2, Math.max(0.15, store.zoom * factor));
        var k = z2 / store.zoom;
        setStore({ zoom: z2, cam: clampCam(cx - (cx - store.cam.x) * k, cy - (cy - store.cam.y) * k) });
      }
      function recenter() {
        setStore({ cam: clampCam(VIEW_W / 2 - CTRL.x * TILE * store.zoom, VIEW_H / 2 - CTRL.y * TILE * store.zoom) });
      }
      function fitIsland() {
        var z = Math.min(VIEW_W / WORLD_W, VIEW_H / WORLD_H) * 0.98;
        setStore({ zoom: z, cam: { x: (VIEW_W - WORLD_W * z) / 2, y: (VIEW_H - WORLD_H * z) / 2 } });
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
        var hasEvent = !!(store.eventBubble && store.eventBubble.until > Date.now());
        return React.createElement('button', {
          type: 'button',
          className: props.wide ? 'gw-foot-btn' : 'gw-foot-btn gw-foot-btn-rail',
          title: '兼职上帝：对话的同时，你也兼职作为上帝，创造一个自己的世界',
          onClick: function () { setStore({ open: !store.open }); }
        },
          React.createElement('span', { className: 'gw-foot-earth' },
            React.createElement('span', { className: 'gw-foot-earth-tex' })
          ),
          props.wide ? React.createElement('span', { className: 'gw-foot-label' }, '兼职上帝') : null,
          props.wide && hasEvent ? React.createElement('span', { className: 'gw-foot-dot' }) : null
        );
      }

      function tileClass(ch) {
        switch (ch) {
          case '~': return 'gw-spr-tile-water';
          case 'r': return 'gw-spr-tile-river';
          case '#': return 'gw-spr-tile-dirt';
          case 'b': return 'gw-spr-tile-sand';
          case 'M': return 'gw-spr-tile-mountain';
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
            if (h % 100 < 20) deco.push({ s: kinds[h % kinds.length], x: x, y: y });
          }
        }
        return deco;
      }

      function featBg(f) {
        if (f.pixels) {
          var url = dynUrl(f.pixels);
          if (url) return { backgroundImage: 'url("' + url + '")' };
        }
        if (f.sprite) return { backgroundImage: undefined, spriteClass: 'gw-spr-' + f.sprite };
        return { backgroundImage: undefined, spriteClass: undefined };
      }

      function MapView(props) {
        var base = props.base, features = props.features, tick = props.tick, sessionId = props.sessionId;
        var cam = store.cam;
        var zoom = store.zoom;
        var deco = buildDecor(sessionId, base);
        var nightNow = isNightAt(tick);
        var gradeColor = gradeFor(tick);
        var beamA = beamOpacity(tick);
        var lighthouse = null;
        for (var bi = 0; bi < base.buildings.length; bi++) { if (base.buildings[bi].s === 'lighthouse') { lighthouse = base.buildings[bi]; break; } }
        var SMOKES = [{ x: 34, y: 24 }, { x: 50, y: 21 }];
        var FLAGS = [[52, 21], [29, 18]];

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

        var pickObj = function (sel) { setStore({ selectedObj: sel, selectedNpc: null, selectedFeat: null }); };

        var onPanStart = function (e) {
          var t = e.target;
          if (t && t.closest && (t.closest('.gw-npc') || t.closest('.gw-click') || t.closest('.gw-toolbar'))) return;
          e.preventDefault();
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
          setStore({ pan: { active: true, startX: e.clientX, startY: e.clientY, camX: store.cam.x, camY: store.cam.y }, selectedNpc: null, selectedFeat: null, selectedObj: null });
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

        var makeTip = function (info) {
          if (!info) return null;
          var vx = (info.x + 0.5) * TILE * zoom + cam.x;
          var vy = (info.y + 0.5) * TILE * zoom + cam.y;
          var thumb = null;
          if (info.pixels) thumb = React.createElement('div', { className: 'gw-thumb gw-spr', style: { backgroundImage: 'url("' + dynUrl(info.pixels) + '")' } });
          else if (info.sprite) thumb = React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + info.sprite });
          else thumb = React.createElement('span', null, '●');
          return React.createElement('div', { className: 'gw-npc-tip', style: { left: Math.min(VIEW_W - 190, Math.max(6, vx)), top: Math.min(VIEW_H - 60, Math.max(6, vy - 48)) } },
            thumb,
            React.createElement('div', null,
              React.createElement('div', { className: 'gw-tip-name' }, info.name),
              React.createElement('div', { className: 'gw-tip-act' }, info.detail)
            )
          );
        };

        var tooltip = null;
        if (store.selectedNpc != null && base.npcs[store.selectedNpc]) {
          var n = base.npcs[store.selectedNpc];
          var rp = routePos(n, store.selectedNpc, tick);
          tooltip = makeTip({ x: rp.x, y: rp.y, name: rp.name, detail: rp.act, sprite: n.s });
        }

        var featTooltip = null;
        if (store.selectedFeat != null) {
          var sf = null;
          for (var fi = 0; fi < features.length; fi++) { if (features[fi].id === store.selectedFeat) { sf = features[fi]; break; } }
          if (sf) {
            var fp = featureNpcPos(sf, tick);
            featTooltip = makeTip({ x: fp.x, y: fp.y, name: sf.text, detail: '在岛上生活着', pixels: sf.pixels, sprite: sf.sprite });
          }
        }

        var objTip = makeTip(objInfo(store.selectedObj, base, tick, features, deco));

        return React.createElement('div', { className: 'gw-map', onPointerDown: onPanStart, onPointerMove: onPanMove, onPointerUp: onPanEnd, onPointerCancel: onPanEnd },
          React.createElement('div', { className: 'gw-world', style: { width: WORLD_W + 'px', height: WORLD_H + 'px', transform: 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + zoom + ')' } },
            React.createElement('div', { className: 'gw-tiles', style: { gridTemplateColumns: 'repeat(' + COLS + ',' + TILE + 'px)', gridTemplateRows: 'repeat(' + ROWS + ',' + TILE + 'px)' } }, tiles),
            deco.map(function (dd, i) { return React.createElement('div', { key: 'deco' + i, className: 'gw-obj gw-spr gw-spr-' + dd.s + ' gw-click', style: obj(dd, 16, 40), onClick: function (e) { e.stopPropagation(); pickObj({ type: 'deco', i: i }); } }); }),
            (base.vehicles || []).map(function (v, i) {
              var vp = vehiclePos(v, tick);
              var bob = v.s === 'boat' ? Math.sin(tick * 0.25 + i * 1.7) * 2 : 0;
              return React.createElement('div', { key: 'veh' + i, className: 'gw-obj gw-spr gw-spr-' + v.s + ' gw-click' + (v.s === 'boat' ? ' gw-boatrock' : ''), style: { left: (vp.x + 0.5) * TILE + 'px', top: (vp.y + 0.5) * TILE + 'px' + bob, width: '44px', height: '44px', transform: 'translate(-50%, -55%)' }, onClick: function (e) { e.stopPropagation(); pickObj({ type: 'vehicle', i: i }); } });
            }),
            base.crops.map(function (c, i) { return React.createElement('div', { key: 'crop' + i, className: 'gw-obj gw-spr gw-spr-' + c.s + ' gw-click', style: obj(c, 24, 40), onClick: function (e) { e.stopPropagation(); pickObj({ type: 'crop', i: i }); } }); }),
            base.trees.map(function (t, i) { return React.createElement('div', { key: 'tree' + i, className: 'gw-obj gw-spr gw-spr-' + t.s + ' gw-click gw-sway', style: obj(t, 48, 60), onClick: function (e) { e.stopPropagation(); pickObj({ type: 'tree', i: i }); } }); }),
            base.buildings.map(function (b, i) { return React.createElement('div', { key: 'bld' + i, className: 'gw-obj gw-spr gw-spr-' + b.s + ' gw-click' + (nightNow ? ' gw-lit' : ''), style: obj(b, 58, 62), onClick: function (e) { e.stopPropagation(); pickObj({ type: 'building', i: i }); } }); }),
            features.map(function (f) {
              var isNpc = f.kind === 'npc';
              var bg = featBg(f);
              var baseCls = 'gw-obj gw-spr' + (bg.spriteClass ? ' ' + bg.spriteClass : '') + (isNpc ? ' gw-npc gw-feat-npc' : ' gw-feat gw-click');
              if (isNpc) {
                var fp = featureNpcPos(f, tick);
                var st = { left: (fp.x + 0.5) * TILE + 'px', top: (fp.y + 0.5) * TILE + 'px', width: '34px', height: '34px', transform: 'translate(-50%, -50%)' };
                if (bg.backgroundImage) st.backgroundImage = bg.backgroundImage;
                return React.createElement('div', {
                  key: 'feat' + f.id,
                  className: baseCls,
                  style: st,
                  title: f.text,
                  onClick: function (e) { e.stopPropagation(); setStore({ selectedFeat: store.selectedFeat === f.id ? null : f.id, selectedNpc: null, selectedObj: null }); }
                });
              }
              var st2 = obj(f, 38 * (f.z || 1), 52);
              if (bg.backgroundImage) st2.backgroundImage = bg.backgroundImage;
              return React.createElement('div', { key: 'feat' + f.id, className: baseCls, style: st2, title: f.text, onClick: function (e) { e.stopPropagation(); pickObj({ type: 'feature', id: f.id }); } });
            }),
            base.npcs.map(function (n, i) {
              var pos = routePos(n, i, tick);
              var parts = [React.createElement('div', {
                key: 'npc' + i,
                className: 'gw-obj gw-spr gw-spr-' + n.s + ' gw-npc',
                style: { left: (pos.x + 0.5) * TILE + 'px', top: (pos.y + 0.5) * TILE + 'px', width: '34px', height: '34px', transform: 'translate(-50%, -50%)' },
                onClick: function (e) { e.stopPropagation(); setStore({ selectedNpc: store.selectedNpc === i ? null : i, selectedFeat: null, selectedObj: null }); }
              })];
              if (pos.busy) {
                parts.push(React.createElement('div', { key: 'bub' + i, className: 'gw-obj gw-spr gw-spr-bubble gw-bubble', style: { left: (pos.x + 0.5) * TILE + 'px', top: (pos.y + 0.5) * TILE + 'px', width: '14px', height: '14px', transform: 'translate(-50%, -200%)' } }));
              }
              return React.createElement(React.Fragment, { key: 'npcw' + i }, parts);
            })
          ),
          React.createElement('div', { className: 'gw-grade', style: { backgroundColor: gradeColor } }),
          React.createElement('div', { className: 'gw-glint' }),
          FLAGS.map(function (fp, i) { return React.createElement('div', { key: 'flag' + i, className: 'gw-obj gw-spr gw-spr-flag gw-flag', style: { left: (fp[0] + 0.5) * TILE + 'px', top: (fp[1] + 0.5) * TILE + 'px', width: '20px', height: '20px', transform: 'translate(-50%, -60%)' } }); }),
          SMOKES.map(function (sp, i) {
            return React.createElement(React.Fragment, { key: 'smk' + i },
              React.createElement('div', { className: 'gw-smoke', style: { left: (sp.x + 0.5) * TILE + 2 + 'px', top: (sp.y + 0.5) * TILE - 26 + 'px', animationDelay: '0s' } }),
              React.createElement('div', { className: 'gw-smoke', style: { left: (sp.x + 0.5) * TILE - 2 + 'px', top: (sp.y + 0.5) * TILE - 30 + 'px', animationDelay: '1.5s' } })
            );
          }),
          lighthouse && beamA > 0
            ? React.createElement('div', { className: 'gw-beam', style: { left: (lighthouse.x + 0.5) * TILE + 'px', top: (lighthouse.y + 0.2) * TILE + 'px', opacity: beamA } })
            : null,
          React.createElement('div', { className: 'gw-toolbar' },
            React.createElement('button', { className: 'gw-tbtn', title: '放大', onClick: function (e) { e.stopPropagation(); zoomAt(VIEW_W / 2, VIEW_H / 2, 1.25); } }, '+'),
            React.createElement('button', { className: 'gw-tbtn', title: '缩小', onClick: function (e) { e.stopPropagation(); zoomAt(VIEW_W / 2, VIEW_H / 2, 1 / 1.3); } }, '−'),
            React.createElement('button', { className: 'gw-tbtn', title: '全岛视图', onClick: function (e) { e.stopPropagation(); fitIsland(); } }, '🌍'),
            React.createElement('button', { className: 'gw-tbtn', title: '回到城镇中心', onClick: function (e) { e.stopPropagation(); recenter(); } }, React.createElement('span', { className: 'gw-spr gw-spr-target' }))
          ),
          intentBubbles,
          tooltip,
          featTooltip,
          objTip
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
            }, 380);
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
              setStore({ eventBubble: { text: newest.text, pixels: newest.pixels || null, until: Date.now() + 4000 } });
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
        var isNight = tod >= 0.66;
        var lastAt = world && typeof world.updatedAt === 'number' ? world.updatedAt : 0;
        var secSince = lastAt ? Math.max(0, Math.floor((Date.now() - lastAt) / 1000)) : 0;

        var onDragStart = function (e) {
          var t = e.target;
          if (t && t.closest && t.closest('.gw-close')) return;
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
                var isError = entry.type === 'error';
                var thumb = null;
                if (entry.pixels) thumb = React.createElement('div', { className: 'gw-thumb gw-spr', style: { backgroundImage: 'url("' + dynUrl(entry.pixels) + '")' } });
                else if (entry.sprite) thumb = React.createElement('div', { className: 'gw-thumb gw-spr gw-spr-' + entry.sprite });
                else thumb = React.createElement('span', null, '●');
                return React.createElement('div', {
                  className: 'gw-entry' + (isError ? ' gw-entry-error' : ''),
                  key: 'log-' + i,
                  onClick: function () {
                    var next = Object.assign({}, store.expanded);
                    if (next[entry.at]) delete next[entry.at]; else next[entry.at] = true;
                    setStore({ expanded: next });
                  }
                },
                  React.createElement('div', { className: 'gw-entry-main' },
                    thumb,
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

      ctx.slots.inject('shell.overlay', function () { return ctx.slots.register({ name: 'shell.overlay', id: 'gameworld-panel', order: 100, label: '兼职上帝' }, GameWorldPanel); });
      ctx.slots.inject('sidebar.footer.action', function () { return ctx.slots.register({ name: 'sidebar.footer.action', id: 'gameworld-toggle', order: -10, label: '兼职上帝' }, GameWorldToggle); });
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
