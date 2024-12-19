(self.webpackChunkpomelette_nest=self.webpackChunkpomelette_nest||[]).push([[966],{2258:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return f},PageTemplate:function(){return d},default:function(){return g}});var l=n(1151),a=n(7294),r=n(4748),c=n(9573),m=n(8968),u=n(6011),E=n(3694),i=n(3972),p=n(7617),s=n(5238);function o(e){const t=Object.assign({h1:"h1",p:"p",h2:"h2",ul:"ul",li:"li",a:"a",ol:"ol"},(0,l.a)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.h1,null,"バトルランク（BR）とは"),"\n",a.createElement(r.Z,null,a.createElement(t.p,null,"ゲーム内において、用語は登場するものの定義が説明されない内部数値。",a.createElement("br"),"\r\n以下3種に細分化されます。"),a.createElement(r.Z,{sx:{ml:2,my:3}},a.createElement(t.h2,null,"現在バトルランク"),a.createElement(t.p,null,"味方の強さをバトル実績に基づいて数値化したもので、以下の特徴があります。"),a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"敵バトルランク、バトルの敵編成、イベント・バトルの獲得アイテム、バトル勝利以外でのステータス成長に影響する。"),"\n",a.createElement(t.li,null,"条件を満たすとバトル勝利後に上昇する。"),"\n",a.createElement(t.li,null,"初期値は1、最大値は200。"),"\n"),a.createElement(t.h2,null,"潜在バトルランク"),a.createElement(t.p,null,"味方の強さをステータスに基づいて数値化したもので、以下の特徴があります。"),a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"現在バトルランクの上昇量、敵バトルランクに影響する。"),"\n",a.createElement(t.li,null,"バトルパーティ（バトル参加メンバー）のステータスによって変動する。"),"\n",a.createElement(t.li,null,"理論最大値は176.625。"),"\n"),a.createElement(t.h2,null,"敵バトルランク"),a.createElement(t.p,null,"敵キャラクターの強さを数値化したもので、以下の特徴があります。"),a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"敵のステータス、ひらめき、バトル勝利でのステータス成長に影響する。"),"\n",a.createElement(t.li,null,"現在・潜在バトルランク、バトル難易度に基づいて決定される。"),"\n",a.createElement(t.li,null,"現在バトルランクを下回ることはなく、最大値は250。"),"\n")),a.createElement(t.p,null,"バトルランクに紐づく各種内部値については ",a.createElement(t.a,{href:"/saga-eb/data/battle-ranks"},"データ ＞ バトルランク")," を参照してください。")),"\n",a.createElement(t.h1,null,"現在バトルランクの上昇条件"),"\n",a.createElement(r.Z,null,a.createElement(t.p,null,"バトル難易度やバトル結果によっては現在バトルランクが上昇しない場合があります。",a.createElement("br"),"\r\n各種条件とバトルランク上昇の関係は下表の通りです。"),a.createElement(s.no,{align:"center"},a.createElement(c.Z,{sx:{width:"calc(104px * 4)",tableLayout:"fixed"}},a.createElement(u.Z,{sx:{position:"sticky",top:0}},a.createElement(E.Z,null,a.createElement(s.$v,{align:"center",colSpan:3},"条件"),a.createElement(s.$v,{align:"center",rowSpan:2},"バトルランク",a.createElement("br"),"上昇")),a.createElement(E.Z,null,a.createElement(s.$v,{align:"center"},"バトル難易度"),a.createElement(s.$v,{align:"center"},"再挑戦"),a.createElement(s.$v,{align:"center"},"戦闘不能者数"))),a.createElement(m.Z,null,a.createElement(s.aG,null,a.createElement(s.GI,{align:"center"},"楽勝"),a.createElement(s.GI,{align:"center"},"*"),a.createElement(s.GI,{align:"center"},"*"),a.createElement(s.GI,{align:"center",rowSpan:3},"なし")),a.createElement(s.aG,null,a.createElement(s.GI,{align:"center",rowSpan:3},"普通"),a.createElement(s.GI,{align:"center"},"あり"),a.createElement(s.GI,{align:"center"},"*")),a.createElement(s.aG,null,a.createElement(s.GI,{align:"center",rowSpan:2},"なし"),a.createElement(s.GI,{align:"center"},"2名以上")),a.createElement(s.aG,null,a.createElement(s.GI,{align:"center"},"2名未満"),a.createElement(s.GI,{align:"center",rowSpan:3},"あり")),a.createElement(s.aG,null,a.createElement(s.GI,{align:"center"},"強敵"),a.createElement(s.GI,{align:"center"},"*"),a.createElement(s.GI,{align:"center"},"*")),a.createElement(s.aG,null,a.createElement(s.GI,{align:"center"},"最凶"),a.createElement(s.GI,{align:"center"},"*"),a.createElement(s.GI,{align:"center"},"*"))))),a.createElement(i.Z,{sx:{width:"calc(104px * 4)",maxWidth:"100%",mt:-2,mx:"auto",textAlign:"right"}},a.createElement(t.p,null,"*：条件なし"))),"\n",a.createElement(t.h1,null,"現在バトルランクの上昇量"),"\n",a.createElement(r.Z,null,a.createElement(t.p,null,"特定の条件を満たしていればバトル勝利後に現在バトルランクが上昇します。",a.createElement("br"),"\r\nバトルランク上昇量は下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{BR上昇量}=\\begin{cases}1&(\\text{現在BR}\\geq\\text{潜在BR})\\\\1+\\text{ランク差ボーナス}&(\\text{現在BR}<\\text{潜在BR})\\end{cases}\\hspace{0.5em}"})),a.createElement(t.p,null,"バトルランクは基本的に1ずつ上昇しますが、潜在バトルランクが現在バトルランクを上回る場合は上昇量にボーナスが加わります。",a.createElement("br"),"\r\nランク差ボーナスは下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{ランク差ボーナス}=\\min(\\text{ランク差評価値},\\hspace{0.5em}\\text{潜在BR}-\\text{現在BR})\\hspace{0.5em}\\\\[1.3em]\r\n\\hspace{0.5em}\\text{ランク差評価値}=\\text{潜在BR}\\times \\frac{\\text{潜在BR}\\times 1.5-\\text{現在BR}}{\\text{潜在BR}\\times 10+\\text{現在BR}\\times 1.5}+1\\hspace{0.5em}"})),a.createElement(t.p,null,"ランク差評価値とランク差ボーナスの計算結果は小数点以下が切り捨てられます。",a.createElement("br"),"\r\n潜在バトルランクと現在バトルランクの間に大きな差分があるうちはランク差評価値をそのままボーナスとして上乗せしますが、それによって逆転が起こる場合は差分が埋まる程度のボーナスに修正します。")),"\n",a.createElement(t.h1,null,"現在バトルランクの上限"),"\n",a.createElement(r.Z,null,a.createElement(t.p,null,"現在バトルランクには暫定的な上限が存在します。",a.createElement("br"),"\r\nバトルランク上限を踏まえると、バトルランク上昇量加算後の現在バトルランクは下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{現在BR}_{next}=\\min(\\text{現在BR}+\\text{BR上昇量},\\hspace{0.5em}\\text{BR上限})\\hspace{0.5em}"})),a.createElement(t.p,null,"バトルランク上限は以下のタイミングで更新されます。"),a.createElement(t.ol,null,"\n",a.createElement(t.li,null,"ランク差ボーナス発生状態（現在BR ",a.createElement(p.InlineMath,null,"\\lt")," 潜在BR）でのバトルランク上昇量加算前"),"\n",a.createElement(t.li,null,"ワールド（連接領域含む）移動後"),"\n"),a.createElement(t.p,null,"それぞれのタイミングについて、新しいバトルランク上限は下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{BR上限}=\\begin{cases}\\text{現在BR}+10+\\text{ランク差ボーナス}&(\\text{1.})\\\\\r\n\\text{現在BR}+10&(\\text{2.})\\end{cases}\\hspace{0.5em}"})),a.createElement(t.p,null,"バトルランク上限の更新はワールドを移動しなくても可能ですが、潜在バトルランクを上昇させる（味方を成長させる）必要があるため時間がかかります。",a.createElement("br"),"\r\nまた、潜在バトルランクの理論最大値（176.625）は現在バトルランクの最大値（200）を大きく下回るため、バトルランク上限を最大値まで引き上げるにはワールド移動が必須です。")),"\n",a.createElement(t.h1,null,"潜在バトルランクの算出方法"),"\n",a.createElement(r.Z,null,a.createElement(t.p,null,"潜在バトルランクは下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{潜在BR}=\\sum_{m\\in BP} \\text{メンバー}m\\text{の強さ}\\hspace{0.5em}"})),a.createElement(t.p,null,"ここで、",a.createElement(p.InlineMath,{math:"BP"})," はバトルパーティを意味し、サポートメンバーや控えメンバーを含みません。",a.createElement("br"),"\r\nメンバーの強さは下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{メンバーの強さ}=\\text{HP評価値}+\\text{能力値評価値}+\\text{スキル評価値}\\hspace{0.5em}\\\\[1.3em]\r\n\\hspace{0.5em}\\text{HP評価値}=\\frac{(HP-140)\\times 18}{1000}\\hspace{0.5em}\\\\[1em]\r\n\\hspace{0.5em}\\text{能力値評価値}=\\frac{(\\max Stat-20)\\times 72}{1000}\\hspace{0.5em}\\\\[1em]\r\n\\hspace{0.5em}\\text{スキル評価値}=\\frac{(\\max SLv-5)\\times 315}{1000}\\hspace{0.5em}"})),a.createElement(t.p,null,"ここで、",a.createElement(p.InlineMath,{math:"\\max Stat"})," は能力値6種の中で装備補正込みで最も高い値、",a.createElement(p.InlineMath,{math:"\\max SLv"})," は所持スキルのレベルの中で最も高い値を意味します。",a.createElement("br"),"\r\n潜在バトルランクはバトル準備画面突入時点でのバトルパーティのステータスで算出されるため、バトル準備画面でメンバー・装備変更をしても変動しません。")),"\n",a.createElement(t.h1,null,"敵バトルランクの算出方法"),"\n",a.createElement(r.Z,{sx:{minHeight:{xs:"calc(100vh - 64px - 8px - 50px - 24px - 80px)",sm:"calc(100vh - 48px - 8px - 54px - 24px - 80px)"}}},a.createElement(t.p,null,"敵バトルランクはそれぞれの敵について下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{敵BR}=\\max(\\text{基本BR}+\\text{相対BR}+\\text{ひらめきレベル},\\hspace{0.5em}\\text{BR下限})\\hspace{0.5em}"})),a.createElement(t.p,null,"ここで、相対バトルランクとバトルランク下限はバトルに設定されている内部値で、ひらめきレベルは敵キャラクターに設定されている内部値です。",a.createElement("br"),"\r\n基本バトルランクは下式で算出されます。"),a.createElement(s._x,null,a.createElement(p.BlockMath,{math:"\\hspace{0.5em}\\text{基本BR}=\\begin{cases}\\text{現在BR}&(\\text{楽勝または普通})\\\\\r\n\\max(\\text{現在BR},\\hspace{0.5em}\\text{潜在BR}\\times 0.8)&(\\text{強敵})\\\\\r\n\\max(\\text{現在BR},\\hspace{0.5em}\\text{潜在BR})&(\\text{最凶})\\end{cases}\\hspace{0.5em}"})),a.createElement(t.p,null,"基本バトルランクの計算結果は小数点以下が切り捨てられます。")))}var h=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.a)(),e.components);return t?a.createElement(t,e,a.createElement(o,e)):o(e)},x=n(5935);const d=e=>{let{data:t,children:n,pageContext:l}=e;return"saga-eb"===l.layout?a.createElement(x.g,{data:t},n):a.createElement(a.Fragment,null,n)},f=e=>{let{data:t,pageContext:n}=e;return"saga-eb"===n.layout?a.createElement(x.q,{data:t}):a.createElement(a.Fragment)};function g(e){return a.createElement(d,e,a.createElement(h,e))}},7617:function(e,t,n){var l,a,r,c;c=function(e,t,n,l){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}function c(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var l={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in e)if("default"!==c&&Object.prototype.hasOwnProperty.call(e,c)){var m=a?Object.getOwnPropertyDescriptor(e,c):null;m&&(m.get||m.set)?Object.defineProperty(l,c,m):l[c]=e[c]}return l.default=e,n&&n.set(e,l),l}Object.defineProperty(e,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(e,{BlockMath:()=>p,InlineMath:()=>s}),t=c(t),n=a(n),l=a(l);const m=(e,{displayMode:a})=>{const r=({children:n,errorColor:r,math:c,renderError:m})=>{const u=null!=c?c:n,{html:E,error:i}=(0,t.useMemo)((()=>{try{return{html:l.default.renderToString(u,{displayMode:a,errorColor:r,throwOnError:!!m}),error:void 0}}catch(i){if(i instanceof l.default.ParseError||i instanceof TypeError)return{error:i};throw i}}),[u,r,m]);return i?m?m(i):t.default.createElement(e,{html:`${i.message}`}):t.default.createElement(e,{html:E})};return r.propTypes={children:n.default.string,errorColor:n.default.string,math:n.default.string,renderError:n.default.func},r},u={html:n.default.string.isRequired},E=({html:e})=>t.default.createElement("div",{"data-testid":"react-katex",dangerouslySetInnerHTML:{__html:e}});E.propTypes=u;const i=({html:e})=>t.default.createElement("span",{"data-testid":"react-katex",dangerouslySetInnerHTML:{__html:e}});i.propTypes=u;const p=m(E,{displayMode:!0}),s=m(i,{displayMode:!1})},"object"==typeof e.exports?c(t,n(7294),n(5697),n(527)):(a=[t,n(7294),n(5697),n(527)],void 0===(r="function"==typeof(l=c)?l.apply(t,a):l)||(e.exports=r))}}]);
//# sourceMappingURL=component---src-templates-docs-js-content-file-path-src-docs-saga-eb-logic-battle-ranks-mdx-c224e7b96d39a4cc11bd.js.map