"use strict";(self.webpackChunkpomelette_nest=self.webpackChunkpomelette_nest||[]).push([[720],{6945:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.AnchorLink=m;var r=i(n(7294)),a=n(4854),o=i(n(5697)),c=n(2284);function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){var t=e.to,n=e.title,o=e.children,i=e.className,l=e.stripHash,d=void 0!==l&&l,m=e.gatsbyLinkProps,p=void 0===m?{}:m,u=e.onAnchorLinkClick,f=d?c.handleStrippedLinkClick:c.handleLinkClick,b=s(s({},p),{},{to:d?(0,c.stripHashedLocation)(t):t,onClick:function(e){return f(t,e,u)}});return n&&(b.title=n),i&&(b.className=i),r.default.createElement(a.Link,b,o||n)}m.propTypes={to:o.default.string.isRequired,title:o.default.string,className:o.default.string,stripHash:o.default.bool,gatsbyLinkProps:o.default.object,onAnchorLinkClick:o.default.func,children:o.default.node}},3089:function(e,t,n){Object.defineProperty(t,"P",{enumerable:!0,get:function(){return r.AnchorLink}});var r=n(6945)},2313:function(e,t,n){n.r(t),n.d(t,{Head:function(){return d},PageTemplate:function(){return s},default:function(){return m}});var r=n(1151),a=n(7294),o=n(4748);function c(e){const t=Object.assign({h1:"h1",p:"p"},(0,r.a)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.h1,null,"調査状況"),"\n",a.createElement(o.Z,null,a.createElement(t.p,null,"50%調査済み。")))}var i=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.a)(),e.components);return t?a.createElement(t,e,a.createElement(c,e)):c(e)},l=n(5935);const s=e=>{let{data:t,children:n,pageContext:r}=e;return"saga-eb"===r.layout?a.createElement(l.g,{data:t},n):a.createElement(a.Fragment,null,n)},d=e=>{let{data:t,pageContext:n}=e;return"saga-eb"===n.layout?a.createElement(l.q,{data:t}):a.createElement(a.Fragment)};function m(e){return a.createElement(s,e,a.createElement(i,e))}},5935:function(e,t,n){n.d(t,{q:function(){return j},g:function(){return O}});var r=n(7294),a=n(4854),o=n(1151),c=n(4748),i=n(2440),l=n(3367),s=n(7133),d=n(3972),m=n(9357),p=n(7273),u=n(6411),f=n(8548),b=n(8584),g=n(2734),x=n(3089),h=n(3652);n(6275);const E=(0,s.ZP)(i.Z)((e=>{let{theme:t}=e;return{padding:"16px 0",background:"#2b4a66"}})),y=(0,s.ZP)(l.ZP)((e=>{let{theme:t}=e;return{display:"flex",height:"40px",margin:"2px 0",color:"#ffffff","&.active":{background:"linear-gradient(to right, #4eb89a00 4px, #4eb89a 4px, #4eb89a 9px, #4eb89a5f 9px, #4eb89a00 228px)"},"&:hover":{background:"linear-gradient(to right, #48759400 9px, #487594 40%, #487594 60%, #48759400 228px)"},"&.active:hover":{background:"linear-gradient(to right, #4eb89a00 4px, #4eb89a 4px, #4eb89a 9px, #4eb89a7f 9px, #487594 60%, #48759400 228px)"}}})),v=e=>{let{items:t}=e;const n=void 0===t?[]:t,a=(0,g.Z)(),o=(0,p.Z)(a.breakpoints.down("md")),[i,l]=r.useState(!1),s=e=>{e.forEach((e=>{if(e.isIntersecting){const t=document.querySelector("ul[id=tocList] .active");null!==t&&t.classList.remove("active");const n=document.querySelector(`a[id='${e.target.id}']`);null!==n&&n.classList.add("active")}}))};r.useEffect((()=>{if(!o){(0,h.UN)(document.querySelector("ul[id=tocList]").parentElement,{scrollbars:{theme:"os-theme-dark os-theme-tocbar",autoHide:"leave",autoHideDelay:100,clickScroll:!0}});const e=Array.from(document.querySelectorAll("description > div > h6"));for(let o in e)e[o].setAttribute("id","heading-"+o);console.log(e);const t=Array.from(document.querySelectorAll("description > div > div"));for(let o in t)t[o].setAttribute("id","section-"+o);console.log(t);const n=Array.from(document.querySelectorAll("ul[id=tocList] > a"));for(let o in n)n[o].setAttribute("id","section-"+o);console.log(n);const r={root:null,rootMargin:`-130px 0px -${document.documentElement.clientHeight-215}px 0px`,threshold:0},a=new IntersectionObserver(s,r);t.forEach((e=>a.observe(e)))}}),[o]);const m="undefined"==typeof window?r.createElement(r.Fragment,null):r.createElement(E,{id:"tocList"},n.map(((e,t)=>r.createElement(y,{component:x.P,disablePadding:!0,stripHash:!0,to:window.location.pathname+"#heading-"+t},r.createElement(f.Z,null,r.createElement(b.Z,{primary:e.title,primaryTypographyProps:{variant:"body2"}}))))));return r.createElement(u.ZP,{anchor:"right",onClose:()=>{l(!i)},open:!o||i,variant:o?"temporary":"permanent",ModalProps:{keepMounted:!0},PaperProps:{sx:{top:48,height:"calc(100% - 48px)",border:0}},sx:{flexShrink:0,width:256,"& .MuiDrawer-paper":{width:256,boxSizing:"border-box",background:"#1f3b53"}}},r.createElement(d.Z,{align:"center",component:"div",position:"fixed",variant:"h6",sx:{width:"240px",height:"40px",mt:2,ml:1,borderBottom:"2px solid",borderColor:"#98fde5",background:"linear-gradient(to top, #4eb89a 0%, #1f3b53 100%)",color:"#ffffff",lineHeight:"40px"}},"目次"),r.createElement(c.Z,{sx:{mt:7,mx:1,borderBottomLeftRadius:8,borderBottomRightRadius:8}},m))},k=()=>r.createElement(c.Z,{sx:{width:{xs:"100vw",md:"calc(100vw - 256px)",lg:"calc(100vw - 256px * 2)"},minHeight:80,background:"#1f3b53",color:"#b7b7b7"}},r.createElement(d.Z,{align:"center",variant:"body2",sx:{mx:"auto"}},r.createElement(c.Z,{sx:{pt:1}},"© SQUARE ENIX",r.createElement("br",null)),r.createElement(c.Z,null,"記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。"))),Z=(0,s.ZP)(d.Z)((e=>{let{theme:t}=e;return{margin:"32px 0 16px 0",padding:"4px 12px 2px 12px",background:"#44757e",[t.breakpoints.up("sm")]:{background:"\n      linear-gradient(135deg, #44757e calc(100% - 120px), #2b4a66 calc(100% - 120px), #2b4a66 calc(100% - 116px), #2b4a6600 calc(100% - 116px)),\n      linear-gradient(45deg, #44757e calc(100% - 92px), #2b4a66 calc(100% - 92px), #2b4a66 calc(100% - 88px), #2b4a6600 calc(100% - 88px)),\n      linear-gradient(135deg, #44757e calc(100% - 64px), #44757e00 calc(100% - 64px))\n    "}}})),P=(0,s.ZP)(d.Z)((e=>{let{theme:t}=e;return{margin:"32px 0 16px 0",padding:"4px 8px 2px 8px",borderTop:"1px solid",borderBottom:"1px solid",background:"#44757e5f",[t.breakpoints.up("sm")]:{borderImageSource:"linear-gradient(to right, #ffffff calc(100% - 320px), #ffffff00 calc(100% - 192px))",borderImageSlice:1,background:"linear-gradient(to right, #44757e5f calc(100% - 320px), #44757e00 calc(100% - 192px))"}}})),w={h1:e=>r.createElement(Z,Object.assign({variant:"h6"},e)),h2:e=>r.createElement(P,e),p:e=>r.createElement(d.Z,Object.assign({sx:{mb:2}},e)),ul:e=>r.createElement(i.Z,Object.assign({disablePadding:!0,sx:{mb:2,ml:3,listStyleType:"disc"}},e)),ol:e=>r.createElement(i.Z,Object.assign({disablePadding:!0,sx:{mb:2,ml:3,listStyleType:"decimal"}},e)),li:e=>r.createElement(l.ZP,Object.assign({disablePadding:!0,sx:{display:"list-item",mb:1}},e)),a:e=>r.createElement(a.Link,Object.assign({style:{color:"#e3aade"}},e))},O=e=>{let{data:t,children:n}=e;return r.createElement(c.Z,{sx:{display:"flex",flexGrow:1,justifyContent:"center",mt:{xs:8,sm:6},background:"#1f3b53",color:"#ffffff"}},r.createElement(c.Z,{component:"contents",sx:{width:"100%"}},r.createElement(c.Z,{component:"description",sx:{display:"block",minHeight:"calc(100% - 80px)",borderBottomRightRadius:{xs:0,md:8},background:"#2b4a66"}},r.createElement(c.Z,{sx:{maxWidth:"calc(680px + 24px * 2)",mx:"auto",p:3}},r.createElement(d.Z,{align:"center",variant:"h5"},t.mdx.frontmatter.title),r.createElement(d.Z,{align:"center",sx:{borderTop:1,borderColor:"#f8d36f",background:"linear-gradient(to right, #805f9200 10%, #805f92 30%, #805f92 70%, #805f9200 90%)"}},t.mdx.frontmatter.subtitle),r.createElement(o.Z,{components:w},n))),r.createElement(c.Z,{component:"footer"},r.createElement(k,null))),r.createElement(c.Z,{component:"toc"},r.createElement(v,{items:t.mdx.tableOfContents.items})))},j=e=>{let{data:t}=e;const n=t.mdx.frontmatter.title+" — サガ エメラルド ビヨンド システム解説",a="サガ エメラルド ビヨンド（サガエメ）のシステム解説サイト。"+t.mdx.frontmatter.description;return r.createElement(m.Z,{title:n,description:a})}},9357:function(e,t,n){var r=n(7294),a=n(4854);t.Z=function(e){var t,n;let{description:o,title:c,children:i}=e;const{site:l}=(0,a.useStaticQuery)("63159454"),s=o||l.siteMetadata.description,d=null===(t=l.siteMetadata)||void 0===t?void 0:t.title;return r.createElement(r.Fragment,null,r.createElement("title",null,d?`${c} | ${d}`:c),r.createElement("meta",{name:"description",content:s}),r.createElement("meta",{property:"og:title",content:c}),r.createElement("meta",{property:"og:description",content:s}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:creator",content:(null===(n=l.siteMetadata)||void 0===n?void 0:n.author)||""}),r.createElement("meta",{name:"twitter:title",content:c}),r.createElement("meta",{name:"twitter:description",content:s}),i)}},1151:function(e,t,n){n.d(t,{Z:function(){return i},a:function(){return c}});var r=n(7294);const a={},o=r.createContext(a);function c(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:c(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);
//# sourceMappingURL=component---src-templates-docs-js-content-file-path-src-docs-saga-eb-logic-glimmers-mdx-ff5fddc71b945dca81ce.js.map