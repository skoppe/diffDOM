var diffDOM=function(e){"use strict";var t={media:["muted","autoplay","loop","controls","defaultMuted"],html:["translate","hidden","draggable","spellcheck"],ol:["reversed"],img:["isMap"],iframe:["allowFullscreen","allowPaymentRequest"],object:["typeMustMatch"],video:["playsInline"],track:["default"],form:["noValidate"],input:["autofocus","checked","disabled","formNoValidate","indeterminate","multiple","readOnly","required"],button:["autofocus","disabled","formNoValidate"],select:["autofocus","disabled","multiple","required"],optgroup:["disabled"],option:["disabled","selected"],textarea:["autofocus","disabled","readOnly","required"],fieldset:["disabled"],details:["open"],dialog:["open"],script:["noModule","async","defer"],frame:["noResize"]};function n(e,o){var a=e.nodeName.toLowerCase();if("#text"===a||"#comment"===a)return{nodeName:a,data:e.data};var i={nodeName:a,attributes:{}};e.attributes&&e.attributes.length>0&&Array.prototype.slice.call(e.attributes).filter((function(t){return!1!==e[t.name]})).forEach((function(e){i.attributes[e.name]=e.value}));if(void 0!==e.value&&(i.value=e.value),e.childNodes&&e.childNodes.length>0){var r=Array.prototype.slice.call(e.childNodes);i.childNodes=r.map((function(e){return n(e)}))}var l=t[a];return l&&l.filter((function(t){return e[t]})).forEach((function(e){return i.attributes[e]=!0})),t.html.filter((function(t){return e[t]})).forEach((function(e){return i.attributes[e]=!0})),i}function o(e,n,a){var i=e.nodeName.toLowerCase();if("#text"===i)return a.document.createTextNode(e.data);if("#comment"===i)return a.document.createComment(e.data);var r=function(e,t,n){return e?t.document.createElementNS("http://www.w3.org/2000/svg",n):"svg"===n?t.document.createElementNS("http://www.w3.org/2000/svg","svg"):t.document.createElement(n)}(n,a,i);e.attributes&&Object.entries(e.attributes).forEach((function(e){var t=e[0],n=e[1];return r.setAttribute(t,n)})),e.childNodes&&e.childNodes.forEach((function(e){return r.appendChild(o(e,n||"svg"===i,a))})),e.value&&(r.value=e.value);var l=t[i];return l&&l.filter((function(t){return e[t]})).forEach((function(e){return r[e]=!0})),t.html.filter((function(t){return e[t]})).forEach((function(e){return r[e]=!0})),r}function a(e,t){for(t=t.slice();t.length>0;){if(!e.childNodes)return!1;var n=t.splice(0,1)[0];e=e.childNodes[n]}return e}function i(e,t,n){var i,r,l,u,s=n._const,d=a(e,t[s.route]),c={diff:t,node:d};if(n.preDiffApply(c))return!0;switch(t[s.action]){case s.addAttribute:if(!d||!d.setAttribute)return!1;!0===t[s.value]?(d[t[s.name]]=!0,d.setAttribute(t[s.name],"")):d.setAttribute(t[s.name],t[s.value]);break;case s.modifyAttribute:if(!d||!d.setAttribute)return!1;d.setAttribute(t[s.name],t[s.newValue]),"INPUT"===d.nodeName&&"value"===t[s.name]&&(d.value=t[s.newValue]);break;case s.removeAttribute:if(!d||!d.removeAttribute)return!1;!0===t[s.value]&&(d[t[s.name]]=!1),d.removeAttribute(t[s.name]);break;case s.modifyTextElement:if(!d||3!==d.nodeType)return!1;n.textDiff(d,d.data,t[s.oldValue],t[s.newValue]);break;case s.modifyValue:if(!d||void 0===d.value)return!1;d.value=t[s.newValue];break;case s.modifyComment:if(!d||void 0===d.data)return!1;n.textDiff(d,d.data,t[s.oldValue],t[s.newValue]);break;case s.modifyChecked:if(!d||void 0===d.checked)return!1;d.checked=t[s.newValue];break;case s.modifySelected:if(!d||void 0===d.selected)return!1;d.selected=t[s.newValue];break;case s.replaceElement:d.parentNode.replaceChild(o(t[s.newValue],"http://www.w3.org/2000/svg"===d.namespaceURI,n),d);break;case s.relocateGroup:Array.apply(void 0,new Array(t.groupLength)).map((function(){return d.removeChild(d.childNodes[t[s.from]])})).forEach((function(e,n){0===n&&(r=d.childNodes[t[s.to]]),d.insertBefore(e,r||null)}));break;case s.removeElement:d.parentNode.removeChild(d);break;case s.addElement:u=(l=t[s.route].slice()).splice(l.length-1,1)[0],(d=a(e,l)).insertBefore(o(t[s.element],"http://www.w3.org/2000/svg"===d.namespaceURI,n),d.childNodes[u]||null);break;case s.removeTextElement:if(!d||3!==d.nodeType)return!1;d.parentNode.removeChild(d);break;case s.addTextElement:if(u=(l=t[s.route].slice()).splice(l.length-1,1)[0],i=n.document.createTextNode(t[s.value]),!(d=a(e,l))||!d.childNodes)return!1;d.insertBefore(i,d.childNodes[u]||null);break;default:console.log("unknown action")}return c.newNode=i,n.postDiffApply(c),!0}function r(e,t,n){var o=e[t];e[t]=e[n],e[n]=o}function l(e,t,n){t.length||(t=[t]),(t=t.slice()).reverse(),t.forEach((function(t){!function(e,t,n){var o=n._const;switch(t[o.action]){case o.addAttribute:t[o.action]=o.removeAttribute,i(e,t,n);break;case o.modifyAttribute:r(t,o.oldValue,o.newValue),i(e,t,n);break;case o.removeAttribute:t[o.action]=o.addAttribute,i(e,t,n);break;case o.modifyTextElement:case o.modifyValue:case o.modifyComment:case o.modifyChecked:case o.modifySelected:case o.replaceElement:r(t,o.oldValue,o.newValue),i(e,t,n);break;case o.relocateGroup:r(t,o.from,o.to),i(e,t,n);break;case o.removeElement:t[o.action]=o.addElement,i(e,t,n);break;case o.addElement:t[o.action]=o.removeElement,i(e,t,n);break;case o.removeTextElement:t[o.action]=o.addTextElement,i(e,t,n);break;case o.addTextElement:t[o.action]=o.removeTextElement,i(e,t,n);break;default:console.log("unknown action")}}(e,t,n)}))}function u(e){var t=[];return t.push(e.nodeName),"#text"!==e.nodeName&&"#comment"!==e.nodeName&&e.attributes&&(e.attributes.class&&t.push(e.nodeName+"."+e.attributes.class.replace(/ /g,".")),e.attributes.id&&t.push(e.nodeName+"#"+e.attributes.id)),t}function s(e){var t={},n={};return e.forEach((function(e){u(e).forEach((function(e){var o=e in t;o||e in n?o&&(delete t[e],n[e]=!0):t[e]=!0}))})),t}function d(e,t){var n=s(e),o=s(t),a={};return Object.keys(n).forEach((function(e){o[e]&&(a[e]=!0)})),a}function c(e){return delete e.outerDone,delete e.innerDone,delete e.valueDone,!e.childNodes||e.childNodes.every(c)}function f(e,t){if(!["nodeName","value","checked","selected","data"].every((function(n){return e[n]===t[n]})))return!1;if(Boolean(e.attributes)!==Boolean(t.attributes))return!1;if(Boolean(e.childNodes)!==Boolean(t.childNodes))return!1;if(e.attributes){var n=Object.keys(e.attributes),o=Object.keys(t.attributes);if(n.length!==o.length)return!1;if(!n.every((function(n){return e.attributes[n]===t.attributes[n]})))return!1}if(e.childNodes){if(e.childNodes.length!==t.childNodes.length)return!1;if(!e.childNodes.every((function(e,n){return f(e,t.childNodes[n])})))return!1}return!0}function h(e,t,n,o,a){if(!e||!t)return!1;if(e.nodeName!==t.nodeName)return!1;if("#text"===e.nodeName)return!!a||e.data===t.data;if(e.nodeName in n)return!0;if(e.attributes&&t.attributes){if(e.attributes.id){if(e.attributes.id!==t.attributes.id)return!1;if(e.nodeName+"#"+e.attributes.id in n)return!0}if(e.attributes.class&&e.attributes.class===t.attributes.class)if(e.nodeName+"."+e.attributes.class.replace(/ /g,".")in n)return!0}if(o)return!0;var i=e.childNodes?e.childNodes.slice().reverse():[],r=t.childNodes?t.childNodes.slice().reverse():[];if(i.length!==r.length)return!1;if(a)return i.every((function(e,t){return e.nodeName===r[t].nodeName}));var l=d(i,r);return i.every((function(e,t){return h(e,r[t],l,!0,!0)}))}function m(e){return JSON.parse(JSON.stringify(e))}function p(e,t,n,o){var a=0,i=[],r=e.length,l=t.length,s=Array.apply(void 0,new Array(r+1)).map((function(){return[]})),c=d(e,t),f=r===l;f&&e.some((function(e,n){var o=u(e),a=u(t[n]);return o.length!==a.length?(f=!1,!0):(o.some((function(e,t){if(e!==a[t])return f=!1,!0})),!f||void 0)}));for(var m=0;m<r;m++)for(var p=e[m],g=0;g<l;g++){var v=t[g];n[m]||o[g]||!h(p,v,c,f)?s[m+1][g+1]=0:(s[m+1][g+1]=s[m][g]?s[m][g]+1:1,s[m+1][g+1]>=a&&(a=s[m+1][g+1],i=[m+1,g+1]))}return 0!==a&&{oldValue:i[0]-a,newValue:i[1]-a,length:a}}function g(e,t){return Array.apply(void 0,new Array(e)).map((function(){return t}))}var v=function(){this.list=[]};function b(e,t){var n,o,a=e;for(t=t.slice();t.length>0;){if(!a.childNodes)return!1;o=t.splice(0,1)[0],n=a,a=a.childNodes[o]}return{node:a,parentNode:n,nodeIndex:o}}function N(e,t,n){return t.forEach((function(t){!function(e,t,n){var o,a,i,r=n._const,l=b(e,t[r.route]),u=l.node,s=l.parentNode,d=l.nodeIndex,c=[],f={diff:t,node:u};if(n.preVirtualDiffApply(f))return!0;switch(t[r.action]){case r.addAttribute:u.attributes||(u.attributes={}),!0===t[r.value]?(u[t[r.name]]=!0,u.attributes[t[r.name]]=!0):u.attributes[t[r.name]]=t[r.value],"value"===t[r.name]&&(u.value=t[r.value]);break;case r.modifyAttribute:u.attributes[t[r.name]]=t[r.newValue];break;case r.removeAttribute:delete u.attributes[t[r.name]],0===Object.keys(u.attributes).length&&delete u.attributes,"checked"===t[r.name]?u.checked=!1:"selected"===t[r.name]?delete u.selected:"INPUT"===u.nodeName&&"value"===t[r.name]&&delete u.value;break;case r.modifyTextElement:u.data=t[r.newValue];break;case r.modifyValue:u.value=t[r.newValue];break;case r.modifyComment:u.data=t[r.newValue];break;case r.modifyChecked:u.checked=t[r.newValue];break;case r.modifySelected:u.selected=t[r.newValue];break;case r.replaceElement:(o=m(t[r.newValue])).outerDone=!0,o.innerDone=!0,o.valueDone=!0,s.childNodes[d]=o;break;case r.relocateGroup:u.childNodes.splice(t[r.from],t.groupLength).reverse().forEach((function(e){return u.childNodes.splice(t[r.to],0,e)})),u.subsets&&u.subsets.forEach((function(e){if(t[r.from]<t[r.to]&&e.oldValue<=t[r.to]&&e.oldValue>t[r.from]){e.oldValue-=t.groupLength;var n=e.oldValue+e.length-t[r.to];n>0&&(c.push({oldValue:t[r.to]+t.groupLength,newValue:e.newValue+e.length-n,length:n}),e.length-=n)}else if(t[r.from]>t[r.to]&&e.oldValue>t[r.to]&&e.oldValue<t[r.from]){e.oldValue+=t.groupLength;var o=e.oldValue+e.length-t[r.to];o>0&&(c.push({oldValue:t[r.to]+t.groupLength,newValue:e.newValue+e.length-o,length:o}),e.length-=o)}else e.oldValue===t[r.from]&&(e.oldValue=t[r.to])}));break;case r.removeElement:s.childNodes.splice(d,1),s.subsets&&s.subsets.forEach((function(e){e.oldValue>d?e.oldValue-=1:e.oldValue===d?e.delete=!0:e.oldValue<d&&e.oldValue+e.length>d&&(e.oldValue+e.length-1===d?e.length--:(c.push({newValue:e.newValue+d-e.oldValue,oldValue:d,length:e.length-d+e.oldValue-1}),e.length=d-e.oldValue))})),u=s;break;case r.addElement:a=t[r.route].slice(),i=a.splice(a.length-1,1)[0],u=b(e,a).node,(o=m(t[r.element])).outerDone=!0,o.innerDone=!0,o.valueDone=!0,u.childNodes||(u.childNodes=[]),i>=u.childNodes.length?u.childNodes.push(o):u.childNodes.splice(i,0,o),u.subsets&&u.subsets.forEach((function(e){if(e.oldValue>=i)e.oldValue+=1;else if(e.oldValue<i&&e.oldValue+e.length>i){var t=e.oldValue+e.length-i;c.push({newValue:e.newValue+e.length-t,oldValue:i+1,length:t}),e.length-=t}}));break;case r.removeTextElement:s.childNodes.splice(d,1),"TEXTAREA"===s.nodeName&&delete s.value,s.subsets&&s.subsets.forEach((function(e){e.oldValue>d?e.oldValue-=1:e.oldValue===d?e.delete=!0:e.oldValue<d&&e.oldValue+e.length>d&&(e.oldValue+e.length-1===d?e.length--:(c.push({newValue:e.newValue+d-e.oldValue,oldValue:d,length:e.length-d+e.oldValue-1}),e.length=d-e.oldValue))})),u=s;break;case r.addTextElement:a=t[r.route].slice(),i=a.splice(a.length-1,1)[0],(o={}).nodeName="#text",o.data=t[r.value],(u=b(e,a).node).childNodes||(u.childNodes=[]),i>=u.childNodes.length?u.childNodes.push(o):u.childNodes.splice(i,0,o),"TEXTAREA"===u.nodeName&&(u.value=t[r.newValue]),u.subsets&&u.subsets.forEach((function(e){if(e.oldValue>=i&&(e.oldValue+=1),e.oldValue<i&&e.oldValue+e.length>i){var t=e.oldValue+e.length-i;c.push({newValue:e.newValue+e.length-t,oldValue:i+1,length:t}),e.length-=t}}));break;default:console.log("unknown action")}u.subsets&&(u.subsets=u.subsets.filter((function(e){return!e.delete&&e.oldValue!==e.newValue})),c.length&&(u.subsets=u.subsets.concat(c))),f.newNode=o,n.postVirtualDiffApply(f)}(e,t,n)})),!0}v.prototype.add=function(e){var t;(t=this.list).push.apply(t,e)},v.prototype.forEach=function(e){this.list.forEach((function(t){return e(t)}))};var V=/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,y=Object.create?Object.create(null):{},w=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function E(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}var k={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuItem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function x(e){var t={nodeName:"",attributes:{}},n=e.match(/<\/?([^\s]+?)[/\s>]/);if(n&&(t.nodeName=n[1].toLowerCase(),(k[n[1]]||"/"===e.charAt(e.length-2))&&(t.voidElement=!0),t.nodeName.startsWith("!--"))){var o=e.indexOf("--\x3e");return{type:"comment",data:-1!==o?e.slice(4,o):""}}for(var a=new RegExp(w),i=null,r=!1;!r;)if(null===(i=a.exec(e)))r=!0;else if(i[0].trim())if(i[1]){var l=i[1].trim(),u=l.indexOf("=");if(-1===u)t.attributes[l]=!0;else{var s=l.slice(0,u),d=l.slice(u+1);t.attributes[s]=d,a.lastIndex--}}else i[2]&&(t.attributes[i[2]]=i[3].trim().substring(1,i[3].length-1));return t}function A(e){return function e(t){return delete t.voidElement,t.childNodes&&t.childNodes.forEach((function(t){return e(t)})),t}(function(e,t){void 0===t&&(t={components:y});var n,o=[],a=-1,i=[],r=!1;return e.replace(V,(function(l,u){if(r){if(l!=="</"+n.nodeName+">")return;r=!1}var s,d="/"!==l.charAt(1),c=l.startsWith("\x3c!--"),f=u+l.length,h=e.charAt(f);if(c){var m=x(l);return a<0?(o.push(m),o):((s=i[a])&&(s.childNodes||(s.childNodes=[]),s.childNodes.push(m)),o)}if(d&&(n=x(l),a++,"tag"===n.type&&t.components[n.nodeName]&&(n.type="component",r=!0),n.voidElement||r||!h||"<"===h||(n.childNodes||(n.childNodes=[]),n.childNodes.push({nodeName:"#text",data:E(e.slice(f,e.indexOf("<",f)))})),0===a&&o.push(n),(s=i[a-1])&&(s.childNodes||(s.childNodes=[]),s.childNodes.push(n)),i[a]=n),(!d||n.voidElement)&&(a--,!r&&"<"!==h&&h)){s=-1===a?o:i[a].childNodes||[];var p=e.indexOf("<",f),g=E(e.slice(f,-1===p?void 0:p));s.push({nodeName:"#text",data:g})}})),o[0]}(e))}var D=function(e,t,o){this.options=o,this.t1=e instanceof HTMLElement?n(e,this.options):"string"==typeof e?A(e,this.options):JSON.parse(JSON.stringify(e)),this.t2=t instanceof HTMLElement?n(t,this.options):"string"==typeof t?A(t,this.options):JSON.parse(JSON.stringify(t)),this.diffcount=0,this.foundAll=!1,this.debug&&(this.t1Orig=n(e,this.options),this.t2Orig=n(t,this.options)),this.tracker=new v};D.prototype.init=function(){return this.findDiffs(this.t1,this.t2)},D.prototype.findDiffs=function(e,t){var n;do{if(this.options.debug&&(this.diffcount+=1,this.diffcount>this.options.diffcap))throw window.diffError=[this.t1Orig,this.t2Orig],new Error("surpassed diffcap:"+JSON.stringify(this.t1Orig)+" -> "+JSON.stringify(this.t2Orig));0===(n=this.findNextDiff(e,t,[])).length&&(f(e,t)||(this.foundAll?console.error("Could not find remaining diffs!"):(this.foundAll=!0,c(e),n=this.findNextDiff(e,t,[])))),n.length>0&&(this.foundAll=!1,this.tracker.add(n),N(e,n,this.options))}while(n.length>0);return this.tracker.list},D.prototype.findNextDiff=function(e,t,n){var o,a;if(this.options.maxDepth&&n.length>this.options.maxDepth)return[];if(!e.outerDone){if(o=this.findOuterDiff(e,t,n),this.options.filterOuterDiff&&(a=this.options.filterOuterDiff(e,t,o))&&(o=a),o.length>0)return e.outerDone=!0,o;e.outerDone=!0}if(!e.innerDone){if((o=this.findInnerDiff(e,t,n)).length>0)return o;e.innerDone=!0}if(!e.valueDone){if((o=this.findValueDiff(e,t,n)).length>0)return e.valueDone=!0,o;e.valueDone=!0}return[]},D.prototype.findOuterDiff=function(e,t,n){var o,a,i,r,l,u,s,d,c,f,h,p=[],g=this.options._const;if(e.nodeName!==t.nodeName){if(!n.length)throw new Error("Top level nodes have to be of the same kind.");return[(o={},o[g.action]=g.replaceElement,o[g.oldValue]=m(e),o[g.newValue]=m(t),o[g.route]=n,o)]}if(n.length&&this.options.maxNodeDiffCount<Math.abs((e.childNodes||[]).length-(t.childNodes||[]).length))return[(a={},a[g.action]=g.replaceElement,a[g.oldValue]=m(e),a[g.newValue]=m(t),a[g.route]=n,a)];if(e.data!==t.data)return"#text"===e.nodeName?[(i={},i[g.action]=g.modifyTextElement,i[g.route]=n,i[g.oldValue]=e.data,i[g.newValue]=t.data,i)]:[(r={},r[g.action]=g.modifyComment,r[g.route]=n,r[g.oldValue]=e.data,r[g.newValue]=t.data,r)];f=e.attributes?Object.keys(e.attributes).sort():[],h=t.attributes?Object.keys(t.attributes).sort():[];for(var v=0,b=0;;){if(v===f.length){for(;b<h.length;b++){var N=h[b],V=((l={})[g.action]=g.addAttribute,l[g.route]=n,l[g.name]=N,l[g.value]=t.attributes[N],l);p.push(V)}break}if(b===h.length){for(;v<f.length;v++){var y=f[v];p.push(((u={})[g.action]=g.removeAttribute,u[g.route]=n,u[g.name]=y,u[g.value]=e.attributes[y],u))}break}if(f[v]===h[b]){var w=f[v],E=e.attributes[w],k=t.attributes[w]||!0;""===E&&(E=!1!==e[w]),E!==k&&p.push(((s={})[g.action]=g.modifyAttribute,s[g.route]=n,s[g.name]=w,s[g.oldValue]=E,s[g.newValue]=k,s)),v++,b++}else if(f[v]<h[b]){var x=f[v];p.push(((d={})[g.action]=g.removeAttribute,d[g.route]=n,d[g.name]=x,d[g.value]=e.attributes[x],d)),v++}else{var A=h[b];p.push(((c={})[g.action]=g.addAttribute,c[g.route]=n,c[g.name]=A,c[g.value]=t.attributes[A],c)),b++}}return p},D.prototype.findInnerDiff=function(e,t,n){var o,a,i,r,l,u,s,d=e.childNodes?e.childNodes.slice():[],c=t.childNodes?t.childNodes.slice():[],h=Math.max(d.length,c.length),v=Math.abs(d.length-c.length),b=[],N=0,V=this.options._const;if(!this.options.maxChildCount||h<this.options.maxChildCount){var y=e.subsets&&e.subsetsAge--?e.subsets:e.childNodes&&t.childNodes?function(e,t){for(var n=e.childNodes?e.childNodes:[],o=t.childNodes?t.childNodes:[],a=g(n.length,!1),i=g(o.length,!1),r=[],l=!0,u=function(){return arguments[1]};l;){if(l=p(n,o,a,i))r.push(l),Array.apply(void 0,new Array(l.length)).map(u).forEach((function(e){return t=e,a[l.oldValue+t]=!0,void(i[l.newValue+t]=!0);var t}))}return e.subsets=r,e.subsetsAge=100,r}(e,t):[];if(y.length>0&&(b=this.attemptGroupRelocation(e,t,y,n)).length>0)return b}for(var w=0;w<h;w+=1){var E=d[w],k=c[w];v&&(E&&!k?"#text"===E.nodeName?(b.push(((o={})[V.action]=V.removeTextElement,o[V.route]=n.concat(N),o[V.value]=E.data,o)),N-=1):(b.push(((a={})[V.action]=V.removeElement,a[V.route]=n.concat(N),a[V.element]=m(E),a)),N-=1):k&&!E&&("#text"===k.nodeName?b.push(((i={})[V.action]=V.addTextElement,i[V.route]=n.concat(N),i[V.value]=k.data,i)):b.push(((r={})[V.action]=V.addElement,r[V.route]=n.concat(N),r[V.element]=m(k),r)))),E&&k&&(!this.options.maxChildCount||h<this.options.maxChildCount?b=b.concat(this.findNextDiff(E,k,n.concat(N))):f(E,k)||(d.length>c.length?(b=b.concat([(l={},l[V.action]=V.removeElement,l[V.element]=m(E),l[V.route]=n.concat(N),l)]),d.splice(w,1),N-=1,v-=1):d.length<c.length?(b=b.concat([(u={},u[V.action]=V.addElement,u[V.element]=m(k),u[V.route]=n.concat(N),u)]),d.splice(w,0,{}),v-=1):b=b.concat([(s={},s[V.action]=V.replaceElement,s[V.oldValue]=m(E),s[V.newValue]=m(k),s[V.route]=n.concat(N),s)]))),N+=1}return e.innerDone=!0,b},D.prototype.attemptGroupRelocation=function(e,t,n,o){for(var a,i,r,l,u,s,d,c,f,p,v,b,N=function(e,t,n){var o=e.childNodes?g(e.childNodes.length,!0):[],a=t.childNodes?g(t.childNodes.length,!0):[],i=0;return n.forEach((function(e){for(var t=e.oldValue+e.length,n=e.newValue+e.length,r=e.oldValue;r<t;r+=1)o[r]=i;for(var l=e.newValue;l<n;l+=1)a[l]=i;i+=1})),{gaps1:o,gaps2:a}}(e,t,n),V=N.gaps1,y=N.gaps2,w=Math.min(V.length,y.length),E=[],k=this.options._const,x=0,A=0;x<w;A+=1,x+=1)if(!0===V[x])if("#text"===(p=e.childNodes[A]).nodeName)if("#text"===t.childNodes[x].nodeName){if(p.data!==t.childNodes[x].data){for(b=A;e.childNodes.length>b+1&&"#text"===e.childNodes[b+1].nodeName;)if(b+=1,t.childNodes[x].data===e.childNodes[b].data){v=!0;break}if(!v)return E.push(((a={})[k.action]=k.modifyTextElement,a[k.route]=o.concat(x),a[k.oldValue]=p.data,a[k.newValue]=t.childNodes[x].data,a)),E}}else E.push(((i={})[k.action]=k.removeTextElement,i[k.route]=o.concat(x),i[k.value]=p.data,i)),V.splice(x,1),w=Math.min(V.length,y.length),x-=1;else E.push(((r={})[k.action]=k.removeElement,r[k.route]=o.concat(x),r[k.element]=m(p),r)),V.splice(x,1),w=Math.min(V.length,y.length),x-=1;else if(!0===y[x])"#text"===(p=t.childNodes[x]).nodeName?(E.push(((l={})[k.action]=k.addTextElement,l[k.route]=o.concat(x),l[k.value]=p.data,l)),V.splice(x,0,!0),w=Math.min(V.length,y.length),A-=1):(E.push(((u={})[k.action]=k.addElement,u[k.route]=o.concat(x),u[k.element]=m(p),u)),V.splice(x,0,!0),w=Math.min(V.length,y.length),A-=1);else if(V[x]!==y[x]){if(E.length>0)return E;if(f=n[V[x]],(c=Math.min(f.newValue,e.childNodes.length-f.length))!==f.oldValue){d=!1;for(var D=0;D<f.length;D+=1)h(e.childNodes[c+D],e.childNodes[f.oldValue+D],[],!1,!0)||(d=!0);if(d)return[(s={},s[k.action]=k.relocateGroup,s.groupLength=f.length,s[k.from]=f.oldValue,s[k.to]=c,s[k.route]=o,s)]}}return E},D.prototype.findValueDiff=function(e,t,n){var o,a=[],i=this.options._const;return(e.value||t.value)&&e.value!==t.value&&"OPTION"!==e.nodeName&&a.push(((o={})[i.action]=i.modifyValue,o[i.oldValue]=e.value||"",o[i.newValue]=t.value||"",o[i.route]=n,o)),a};var O={debug:!1,diffcap:10,maxDepth:!1,maxChildCount:50,textDiff:function(e,t,n,o){e.data=o},preVirtualDiffApply:function(){},postVirtualDiffApply:function(){},preDiffApply:function(){},postDiffApply:function(){},filterOuterDiff:null,compress:!1,_const:!1,document:!(!window||!window.document)&&window.document},T=function(e){var t=this;if(void 0===e&&(e={}),this.options=e,Object.entries(O).forEach((function(e){var n=e[0],o=e[1];Object.prototype.hasOwnProperty.call(t.options,n)||(t.options[n]=o)})),!this.options._const){var n=["addAttribute","modifyAttribute","removeAttribute","modifyTextElement","relocateGroup","removeElement","addElement","removeTextElement","addTextElement","replaceElement","modifyValue","modifyChecked","modifySelected","modifyComment","action","route","oldValue","newValue","element","group","from","to","name","value","data","attributes","nodeName","childNodes","checked","selected"];this.options._const={},this.options.compress?n.forEach((function(e,n){return t.options._const[e]=n})):n.forEach((function(e){return t.options._const[e]=e}))}this.DiffFinder=D};T.prototype.apply=function(e,t){return function(e,t,n){return t.every((function(t){return i(e,t,n)}))}(e,t,this.options)},T.prototype.undo=function(e,t){return l(e,t,this.options)},T.prototype.diff=function(e,t){return new this.DiffFinder(e,t,this.options).init()};var C=function(e){var t=this;void 0===e&&(e={}),this.pad="│   ",this.padding="",this.tick=1,this.messages=[];var n=function(e,n){var o=e[n];e[n]=function(){for(var a=[],i=arguments.length;i--;)a[i]=arguments[i];t.fin(n,Array.prototype.slice.call(a));var r=o.apply(e,a);return t.fout(n,r),r}};for(var o in e)"function"==typeof e[o]&&n(e,o);this.log("┌ TRACELOG START")};return C.prototype.fin=function(e,t){this.padding+=this.pad,this.log("├─> entering "+e,t)},C.prototype.fout=function(e,t){this.log("│<──┘ generated return value",t),this.padding=this.padding.substring(0,this.padding.length-this.pad.length)},C.prototype.format=function(e,t){return function(e){for(e=""+e;e.length<4;)e="0"+e;return e}(t)+"> "+this.padding+e},C.prototype.log=function(){var e=Array.prototype.slice.call(arguments),t=function(e){return e?"string"==typeof e?e:e instanceof HTMLElement?e.outerHTML||"<empty>":e instanceof Array?"["+e.map(t).join(",")+"]":e.toString()||e.valueOf()||"<unknown>":"<falsey>"};e=e.map(t).join(", "),this.messages.push(this.format(e,this.tick++))},C.prototype.toString=function(){for(var e="└───";e.length<=this.padding.length+this.pad.length;)e+="×   ";var t=this.padding;return this.padding="",e=this.format(e,this.tick),this.padding=t,this.messages.join("\n")+"\n"+e},e.DiffDOM=T,e.TraceLogger=C,e.nodeToObj=n,e.stringToObj=A,e}({});
//# sourceMappingURL=diffDOM.js.map
