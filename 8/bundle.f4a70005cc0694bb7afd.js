(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",s=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),s&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),s&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,s,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var u=this[a][0];null!=u&&(o[u]=!0)}for(var l=0;l<t.length;l++){var c=[].concat(t[l]);s&&o[c[0]]||(void 0!==r&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=r),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),e.push(c))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",u="month",l="quarter",c="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},$={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,u),r=n-i<0,o=e.clone().add(s+(r?-1:1),u);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:c,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",_={};_[y]=v;var g=function(t){return t instanceof w},E=function t(e,n,s){var i;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();_[r]&&(i=r),n&&(_[r]=n,i=r);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;_[a]=e,i=a}return!s&&i&&(y=i),i||!s&&y},b=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},M=$;M.l=E,M.i=g,M.w=function(t,e){return b(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=E(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=b(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return b(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<b(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,l=!!M.u(e)||e,h=M.p(t),f=function(t,e){var s=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return l?s:s.endOf(o)},p=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,$=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case c:return l?f(1,0):f(31,11);case u:return l?f(1,m):f(0,m+1);case a:var _=this.$locale().weekStart||0,g=(v<_?v+7:v)-_;return f(l?$-g:$+(6-g),m);case o:case d:return p(y+"Hours",0);case r:return p(y+"Minutes",1);case i:return p(y+"Seconds",2);case s:return p(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,l=M.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[u]=h+"Month",a[c]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[l],p=l===o?this.$D+(e-this.$W):e;if(l===u||l===c){var v=this.clone().set(d,1);v.$d[f](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(n,l){var d,h=this;n=Number(n);var f=M.p(l),p=function(t){var e=b(h);return M.w(e.date(e.date()+Math.round(t*n)),h)};if(f===u)return this.set(u,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var v=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,u=n.weekdays,l=n.months,c=n.meridiem,d=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},f=function(t){return M.s(r%12||12,t,"0")},v=c||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(p,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return M.s(e.$y,4,"0");case"M":return a+1;case"MM":return M.s(a+1,2,"0");case"MMM":return d(n.monthsShort,a,l,3);case"MMMM":return d(l,a);case"D":return e.$D;case"DD":return M.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,u,2);case"ddd":return d(n.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(r);case"HH":return M.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return v(r,o,!0);case"A":return v(r,o,!1);case"m":return String(o);case"mm":return M.s(o,2,"0");case"s":return String(e.$s);case"ss":return M.s(e.$s,2,"0");case"SSS":return M.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var f,p=this,v=M.p(d),m=b(n),$=(m.utcOffset()-this.utcOffset())*t,y=this-m,_=function(){return M.m(p,m)};switch(v){case c:f=_()/12;break;case u:f=_();break;case l:f=_()/3;break;case a:f=(y-$)/6048e5;break;case o:f=(y-$)/864e5;break;case r:f=y/e;break;case i:f=y/t;break;case s:f=y/1e3;break;default:f=y}return h?f:M.a(f)},m.daysInMonth=function(){return this.endOf(u).$D},m.$locale=function(){return _[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=E(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),C=w.prototype;return b.prototype=C,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",u],["$y",c],["$D",d]].forEach((function(t){C[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),b.extend=function(t,e){return t.$i||(t(e,w,b),t.$i=!0),b},b.locale=E,b.isDayjs=g,b.unix=function(t){return b(1e3*t)},b.en=_[y],b.Ls=_,b.p={},b}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,u=2592e6,l=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:a,months:u,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof y},h=function(t,e,n){return new y(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},v=function(t){return p(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},$=function(t,e){return t?p(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},y=function(){function p(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*c[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(l);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/a),t%=a,this.$d.months=v(t/u),t%=u,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/i),t%=i,this.$d.minutes=v(t/s),t%=s,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=$(n,"D"),i=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=$(o,"S"),u=t.negative||e.negative||s.negative||i.negative||r.negative||a.negative,l=i.format||r.format||a.format?"T":"",c=(u?"-":"")+"P"+t.format+e.format+s.format+l+i.format+r.format+a.format;return"P"===c||"-P"===c?"P0D":c},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(s[t])}))},m.as=function(t){return this.$ms/c[f(t)]},m.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/c[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var s;return s=e?t*c[f(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return h(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.valueOf=function(){return this.asMilliseconds()},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}(),_=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return h(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)?_(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)?_(this,t,-1):o.bind(this)(t,e)}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,s=0;s<e.length;s++)if(e[s].identifier===t){n=s;break}return n}function s(t,s){for(var r={},o=[],a=0;a<t.length;a++){var u=t[a],l=s.base?u[0]+s.base:u[0],c=r[l]||0,d="".concat(l," ").concat(c);r[l]=c+1;var h=n(d),f={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==h)e[h].references++,e[h].updater(f);else{var p=i(f,s);s.byIndex=a,e.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var r=s(t=t||[],i=i||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var u=s(t,i),l=0;l<r.length;l++){var c=n(r[l]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}r=u}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var s=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={id:s,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";function t(t,e,n="beforeend"){if(!(t instanceof _))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function e(t,e){if(!(t instanceof _&&e instanceof _))throw new Error("Can replace only components");const n=t.element,s=e.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function s(t){if(null!==t){if(!(t instanceof _))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}var i=n(379),r=n.n(i),o=n(795),a=n.n(o),u=n(569),l=n.n(u),c=n(565),d=n.n(c),h=n(216),f=n.n(h),p=n(589),v=n.n(p),m=n(10),$={};$.styleTagTransform=v(),$.setAttributes=d(),$.insert=l().bind(null,"head"),$.domAPI=a(),$.insertStyleElement=f(),r()(m.Z,$),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class _{#t=null;constructor(){if(new.target===_)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),t?.()}),600)}}const g=["taxi","bus","train","drive","flight","check-in","sightseeing","restaurant"],E=["Geneva","Chamonix","Paris","Milano"],b=["everything","future","present","past"];class M extends _{get template(){return`<div class="trip-controls__filters">\n            <h2 class="visually-hidden">Filter events</h2>\n            <form class="trip-filters" action="#" method="get">\n\n                ${b.map((t=>function(t){return`<div class="trip-filters__filter">\n            <input id="filter-${t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" ${"past"===t?"checked":""}>\n            <label class="trip-filters__filter-label" for="filter-${t}">${t}</label>\n          </div>`}(t))).join("")}\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n            </form>\n          </div>`}}class w extends _{#e=[];#n=null;constructor({sorts:t,onSortChange:e}){super(),this.#e=t,this.#n=e,this.element.addEventListener("click",this.#s)}get template(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            ${this.#e.map((t=>function(t){return`<div class="trip-sort__item  trip-sort__item--${t.name}">\n            <input id="sort-${t.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t.name}" ${t.isEnabled?"":"disabled"} ${"day"===t.name?"checked":""}>\n            <label class="trip-sort__btn" for="sort-${t.name}">${t.name}</label>\n          </div>`}(t))).join("")}\n          </form>`}#s=t=>{"INPUT"===t.target.tagName&&this.#n(t.target.value)}}class C extends _{get template(){return'<ul class="trip-events__list"></ul>'}}class S extends _{get template(){return'<p class="trip-events__msg">Click New Event to create your first point</p>'}}var k=n(484),D=n.n(k),T=n(646),A=n.n(T);const x="HH-mm",O="DD/MM/YY HH:mm",F="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.";function L(t){return t[Math.floor(Math.random()*t.length)]}function H(t){return Y(t,x)}function B(t){return Y(t,O)}function Y(t,e){return t?D()(t).format(e):""}function P(t,e){return Math.floor(Math.random()*(e-t)+t)}function I(){let t=0;return function(){return t++,t}}function j(t){const e=F.split(".");let n="";for(let s=0;s<t;s++)n+=0===s?`${L(e)}.`:` ${L(e)}.`;return n}function N(t){return`/img/icons/${t}.png`}function q(t,e){return t.map((t=>t.id===e.id?e:t))}D().extend(A());class R extends _{#i=null;#r=[];#o=null;#a=null;#u=null;constructor({tripEvent:t,offers:e,destination:n,onClick:s,onClickFavoriteButton:i}){super(),this.#i=t,this.#r=e,this.#o=n,this.#a=s,this.#u=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#c)}#l=()=>{this.#a()};#c=()=>{this.#u()};get template(){const t=function({tripEvent:t,offers:e}){const n=e.find((e=>e.type===t.type)).offers.filter((e=>t.offers.includes(e.id)));return n.length>0?`<h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${n.map((t=>`<li class="event__offer">\n                <span class="event__offer-title">${t.title}</span> &plus;&euro;&nbsp;\n                <span class="event__offer-price">${t.price}</span>\n             </li>`)).join("")}\n        </ul>`:""}({tripEvent:this.#i,offers:this.#r});return function({tripEvent:t,destination:e,offers:n}){return`<li class="trip-events__item">\n        <div class="event">\n        <time class="event__date" datetime="2019-03-18">${s=t.dateFrom,Y(s,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="${N(t.type)}" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${e.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="2019-03-18T10:30">${H(t.dateFrom)}</time>\n              &mdash;\n            <time class="event__end-time" datetime="2019-03-18T11:00">${H(t.dateTo)}</time>\n          </p>\n          <p class="event__duration">${function(t,e){if(!t||!e)return"";t=D()(t);const n=(e=D()(e)).diff(t),s=D().duration(e.diff(t));let i="";return n>=864e5&&(i="D[D]"),s.hours()&&(i+=0!==i.length?" H[H]":"H[H]"),s.minutes()&&(i+=0!==i.length?" m[M]":"m[M]"),0!==i.length?s.format(i):""}(t.dateFrom,t.dateTo)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${t.basePrice}</span>\n        </p>\n\n        ${n}\n\n        <button class="event__favorite-btn ${t.isFavorite?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var s}({tripEvent:this.#i,destination:this.#o,offers:t})}}const W={id:1,basePrice:null,dateFrom:new Date,dateTo:new Date,destination:null,isFavorite:!1,offers:[],type:"taxi"};class U extends _{#i=null;#d=[];#r=[];#h=null;#f=null;constructor({tripEvent:t,offers:e,destinations:n,onSubmit:s,onClickRollupButton:i=W}){super(),this.#i=t,this.#d=n,this.#r=e,this.#h=s,this.#f=i,this.element.addEventListener("submit",this.#p),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#v)}#p=t=>{t.preventDefault(),this.#h(),this.element.removeEventListener("submit",this.#h)};#v=()=>{this.#f(),this.element.removeEventListener("submit",this.#h)};get template(){return function(t,e,n){const s=e.find((e=>e.id===t.destination));return`<form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-${t.id}">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="${N(t.type)}" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${t.id}" type="checkbox">\n\n                    ${function(t,e){return`<div class="event__type-list">\n      <fieldset class="event__type-group">\n        <legend class="visually-hidden">Event type</legend>\n\n        ${t.map((t=>function(t,e){return`<div class="event__type-item">\n        <input id="event-type-${t}${e?`-${e}`:""}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}${e?`-${e}`:""}">${t}</label>\n    </div>`}(t.type,e))).join("")}\n\n      </fieldset>\n    </div>`}(n,t.id)}\n\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-${t.id}">\n                      ${t.type}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-${t.destination}" type="text" name="event-destination" value="${t.destination?e[t.destination].name:""}" list="destination-list-1">\n                    <datalist id="destination-list-${t.id}">\n                      ${e.map((t=>`<option value="${t.name}">${t.name}</option>`)).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-${t.id}">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-${t.id}" type="text" name="event-start-time" value="${B(t.dateFrom)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-${t.id}">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-${t.id}" type="text" name="event-end-time" value="${B(t.dateTo)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-${t.id}">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-${t.id}" type="text" name="event-price" value="${t.price??""}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                        ${function(t,e){return e.find((e=>e.type===t.type)).offers.map((e=>`<div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${t.id}" type="checkbox" name="event-offer-luggage"\n                ${t.offers.includes(e.id)?"checked":""}>\n            <label class="event__offer-label" for="event-offer-luggage-${t.id}">\n                <span class="event__offer-title">${e.title}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${e.price}</span>\n            </label>\n          </div>`)).join("")}(t,n)}\n                    </div>\n                  </section>\n\n                  ${t.destination?`<section class="event__section  event__section--destination">\n                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                        <p class="event__destination-description">${s.name}</p>\n\n                        ${s.pictures.length>0?(i=s.pictures,`<div class="event__photos-container">\n            <div class="event__photos-tape">\n                ${i.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`))}\n            </div>\n          </div>`):""}\n\n                       </section>`:""}\n\n                </section>\n              </form>`;var i}(this.#i,this.#d,this.#r)}}class Z{#i=null;#r=[];#d=[];#m=null;#u=null;#$=null;#y=null;#_=null;#g=!1;constructor({offers:t,destinations:e,eventsListContainer:n,onClickFavoriteButton:s,onOpenEditForm:i}){this.#r=t,this.#d=e,this.#m=n,this.#u=s,this.#_=i}init(n){this.#i=n;const i=this.#$,r=this.#y,o=this.#d.find((t=>t.id===this.#i.destination)),a=this.#m.element;this.#$=new R({tripEvent:this.#i,offers:this.#r,destination:o,onClick:this.#E,onClickFavoriteButton:this.#b}),this.#y=new U({tripEvent:this.#i,offers:this.#r,destinations:this.#d,onSubmit:this.#M,onClickRollupButton:this.#M}),null!==i&&null!==r?(e(this.#$,i),s(i),s(r)):t(this.#$,a)}#w=t=>{"Escape"!==t.key&&"Esc"!==t.key||(t.preventDefault(),this.#M(),document.removeEventListener("keydown",this.#w))};#b=()=>{this.#u({...this.#i,isFavorite:!this.#i.isFavorite})};#E=()=>{this.#_(),e(this.#y,this.#$),document.addEventListener("keydown",this.#w),this.#g=!0};#M=()=>{e(this.#$,this.#y),document.removeEventListener("keydown",this.#w),this.#g=!1};reset=()=>{this.#g&&this.#M()};destroy(){s(this.#$),s(this.#y)}}function z(t,e){return e.basePrice-t.basePrice}function J(t,e){const n=X(t);return X(e)-n}function X(t){return D()(t.dateTo).diff(D()(t.dateFrom))}function K(){const t=P(0,4),e=[];for(let n=0;n<t;n++)e.push(P(1,5));return e}function V(t){const e=[];for(let n=0;n<t;n++)e.push({src:"http://picsum.photos/300/200?r="+P(1,200),description:j(1)});return e}const G=["Upgrade to a business class","Order Uber","Add luggage","Switch to comfort","Rent a car","Add breakfast","Book tickets","Lunch in city"],Q=I(),tt=new class{getTripEvents(){return function(t){const e=I(),n=[];for(let t=0;t<5;t++){const t=(s=new Date(2023,1,1),i=new Date,new Date(s.getTime()+Math.random()*(i.getTime()-s.getTime())));n.push({id:e(),basePrice:P(50,2e3),dateFrom:t,dateTo:new Date(t.getTime()+6e4*P(15,4320)),destination:P(1,E.length),isFavorite:Math.random()<.5,offers:K(),type:L(g)})}var s,i;return n}()}},et=new class{getDestinations(){return function(){const t=[],e=I();for(let n=0;n<E.length;n++){const n=P(0,5);t.push({id:e(),description:j(P(1,3)),name:L(E),pictures:V(n)})}return t}()}},nt=new class{getOffers(){return function(){const t=[];return g.map((e=>{const n=[];for(let t=0;t<5;t++)n.push({id:Q(),title:L(G),price:P(10,200)});t.push({type:e,offers:n})})),t}()}},st=new class{#C=[];#S=[];#d=[];#r=[];#e=[];#k=null;#D=null;#T=null;#A=document.querySelector(".trip-controls__filters");#x=document.querySelector(".trip-events");#O=new C;#F=new Map;#L="sort-day";constructor({tripEventModel:t,destinationModel:e,offerModel:n,sorts:s}){this.#k=t,this.#D=e,this.#T=n,this.#e=[...s]}init(){this.#C=[...this.#k.getTripEvents()],this.#S=[...this.#C],this.#d=[...this.#D.getDestinations()],this.#r=[...this.#T.getOffers()],t(new M,this.#A),this.#C.length>0?(t(new w({sorts:this.#e,onSortChange:this.#H}),this.#x),this.#B()):t(new S,this.#x)}#B(){t(this.#O,this.#x);for(const t of this.#C){const e=new Z({offers:this.#r,destinations:this.#d,eventsListContainer:this.#O,onClickFavoriteButton:this.#Y,onOpenEditForm:this.#P});this.#F.set(t.id,e),e.init(t)}}#Y=t=>{this.#C=q(this.#C,t),this.#S=q(this.#S,t),this.#F.get(t.id).init(t)};#P=()=>{this.#F.forEach((t=>t.reset()))};#H=t=>{t!==this.#L&&(this.#I(t),this.#j(),this.#B())};#I=t=>{switch(t){case"sort-day":this.#C=[...this.#S];break;case"sort-time":this.#C.sort(J);break;case"sort-price":this.#C.sort(z)}this.#L=t};#j(){this.#F.forEach((t=>t.destroy())),this.#F.clear()}}({tripEventModel:tt,destinationModel:et,offerModel:nt,sorts:[{name:"day",isEnabled:!0},{name:"event",isEnabled:!1},{name:"time",isEnabled:!0},{name:"price",isEnabled:!0},{name:"offer",isEnabled:!1}]});st.init()})()})();
//# sourceMappingURL=bundle.f4a70005cc0694bb7afd.js.map