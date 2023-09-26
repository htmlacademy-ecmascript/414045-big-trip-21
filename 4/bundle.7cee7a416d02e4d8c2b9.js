(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,a=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=v;var g=function(t){return t instanceof w},b=function t(e,n,s){var i;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(i=r),n&&(y[r]=n,i=r);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,i=o}return!s&&i&&($=i),i||!s&&$},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},D=_;D.l=b,D.i=g,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(h);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,u=!!D.u(e)||e,f=D.p(t),h=function(t,e){var s=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?s:s.endOf(a)},p=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case c:return u?h(1,0):h(31,11);case l:return u?h(1,m):h(0,m+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return h(u?_-g:_+(6-g),m);case a:case d:return p($+"Hours",0);case r:return p($+"Minutes",1);case i:return p($+"Seconds",2);case s:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,u=D.p(t),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[d]=f+"Date",o[l]=f+"Month",o[c]=f+"FullYear",o[r]=f+"Hours",o[i]=f+"Minutes",o[s]=f+"Seconds",o[n]=f+"Milliseconds",o)[u],p=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var v=this.clone().set(d,1);v.$d[h](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,u){var d,f=this;n=Number(n);var h=D.p(u),p=function(t){var e=M(f);return D.w(e.date(e.date()+Math.round(t*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===c)return this.set(c,this.$y+n);if(h===a)return p(1);if(h===o)return p(7);var v=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=n.meridiem,d=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},h=function(t){return D.s(r%12||12,t,"0")},v=c||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(p,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return D.s(e.$y,4,"0");case"M":return o+1;case"MM":return D.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return e.$D;case"DD":return D.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,l,2);case"ddd":return d(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(r);case"HH":return D.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return D.s(a,2,"0");case"s":return String(e.$s);case"ss":return D.s(e.$s,2,"0");case"SSS":return D.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var h,p=this,v=D.p(d),m=M(n),_=(m.utcOffset()-this.utcOffset())*t,$=this-m,y=function(){return D.m(p,m)};switch(v){case c:h=y()/12;break;case l:h=y();break;case u:h=y()/3;break;case o:h=($-_)/6048e5;break;case a:h=($-_)/864e5;break;case r:h=$/e;break;case i:h=$/t;break;case s:h=$/1e3;break;default:h=$}return f?h:D.a(h)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=b(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),S=w.prototype;return M.prototype=S,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof $},f=function(t,e,n){return new $(t,n,e.$l)},h=function(t){return e.p(t)+"s"},p=function(t){return t<0},v=function(t){return p(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},_=function(t,e){return t?p(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function p(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*c[h(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[h(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(u);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/o),t%=o,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/i),t%=i,this.$d.minutes=v(t/s),t%=s,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=_(n,"D"),i=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=_(a,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||o.negative,u=i.format||r.format||o.format?"T":"",c=(l?"-":"")+"P"+t.format+e.format+s.format+u+i.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(s[t])}))},m.as=function(t){return this.$ms/c[h(t)]},m.get=function(t){var e=this.$ms,n=h(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/c[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var s;return s=e?t*c[h(e)]:d(t)?t.$ms:f(t,this).$ms,f(this.$ms+s*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return f(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.valueOf=function(){return this.asMilliseconds()},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}(),y=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return f(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)?y(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)?y(this,t,-1):a.bind(this)(t,e)}}}()}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var s=n(484),i=n.n(s),r=n(646),a=n.n(r);const o=["taxi","bus","train","drive","flight","check-in","sightseeing","restaurant"],l=["Geneva","Chamonix","Paris","Milano"],u="HH-mm",c="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.";function d(t){return t[Math.floor(Math.random()*t.length)]}function f(t){return p(t,u)}function h(t){return p(t,"DD/MM/YY HH:mm")}function p(t,e){return t?i()(t).format(e):""}function v(t,e){return Math.floor(Math.random()*(e-t)+t)}function m(){let t=0;return function(){return t++,t}}function _(t){const e=c.split(".");let n="";for(let s=0;s<t;s++)n+=0===s?`${d(e)}.`:` ${d(e)}.`;return n}function $(t){return`/img/icons/${t}.png`}i().extend(a());const y={id:1,basePrice:null,dateFrom:new Date,dateTo:new Date,destination:null,isFavorite:!1,offers:[],type:"taxi"};class g{constructor({destinations:t,offers:e,tripEvent:n=y}){this.tripEvent=n,this.destinations=t,this.offers=e}getTemplate(){return function(t,e,n){const s=e.find((e=>e.id===t.destination));return`<form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-${t.id}">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="${$(t.type)}" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${t.id}" type="checkbox">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-${t.id}">\n                      ${t.type}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-${t.destination}" type="text" name="event-destination" value="${t.destinationId?e[t.destinationId].name:""}" list="destination-list-1">\n                    <datalist id="destination-list-${t.id}">\n                      ${e.map((t=>`<option value="${t.name}">${t.name}</option>`)).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-${t.id}">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-${t.id}" type="text" name="event-start-time" value="${h(t.dateFrom)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-${t.id}">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-${t.id}" type="text" name="event-end-time" value="${h(t.dateTo)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-${t.id}">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-${t.id}" type="text" name="event-price" value="${t.price??""}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                        ${function(t,e){return e.find((e=>e.type===t.type)).offers.map((e=>`<div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${t.id}" type="checkbox" name="event-offer-luggage"\n                ${t.offers.includes(e.id)?"checked":""}>\n            <label class="event__offer-label" for="event-offer-luggage-${t.id}">\n                <span class="event__offer-title">${e.title}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${e.price}</span>\n            </label>\n          </div>`)).join("")}(t,n,t.offerIds)}\n                    </div>\n                  </section>\n\n                  ${t.destination?`<section class="event__section  event__section--destination">\n                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                        <p class="event__destination-description">${s.name}</p>\n\n                        ${s.pictures.length?(i=s.pictures,`<div class="event__photos-container">\n            <div class="event__photos-tape">\n                ${i.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`))}\n            </div>\n          </div>`):""}\n\n                       </section>`:""}\n\n                </section>\n              </form>`;var i}(this.tripEvent,this.destinations,this.offers)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'\n    <div class="trip-controls__filters">\n              <h2 class="visually-hidden">Filter events</h2>\n              <form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>\n            </div>\n  '}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class M{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{constructor({tripEvent:t,offers:e,destination:n}){this.tripEvent=t,this.offers=e,this.destination=n}getTemplate(){return t=this.tripEvent,e=this.offers,n=this.destination,`<li class="trip-events__item">\n        <div class="event">\n        <time class="event__date" datetime="2019-03-18">${s=t.dateFrom,p(s,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="${$(t.type)}" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${n.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="2019-03-18T10:30">${f(t.dateFrom)}</time>\n              &mdash;\n            <time class="event__end-time" datetime="2019-03-18T11:00">${f(t.dateTo)}</time>\n          </p>\n          <p class="event__duration">${function(t,e){if(!t||!e)return"";t=i()(t);const n=(e=i()(e)).diff(t),s=i().duration(e.diff(t));let r="";return n>=864e5&&(r="D[D]"),s.hours()&&(r+=0!==r.length?" H[H]":"H[H]"),s.minutes()&&(r+=0!==r.length?" m[M]":"m[M]"),0!==r.length?s.format(r):""}(t.dateFrom,t.dateTo)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${t.basePrice}</span>\n        </p>\n\n        ${function(t){return t.length?`<h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${t.map((t=>`<li class="event__offer">\n                <span class="event__offer-title">${t.title}</span> &plus;&euro;&nbsp;\n                <span class="event__offer-price">${t.price}</span>\n             </li>`)).join("")}\n        </ul>`:""}(e)}\n\n        <button class="event__favorite-btn ${t.isFavorite?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var t,e,n,s}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class w{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{constructor({type:t}){this.type=t}getTemplate(){return`<div class="event__type-item">\n        <input id="event-type-${t=this.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${t}</label>\n    </div>`;var t}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class T{getTemplate(){return'<div class="event__type-list">\n      <fieldset class="event__type-group">\n        <legend class="visually-hidden">Event type</legend>\n      </fieldset>\n    </div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}function E(){const t=v(0,4),e=[];for(let n=0;n<t;n++)e.push(v(1,5));return e}function O(t){const e=[];for(let n=0;n<t;n++)e.push({src:"http://picsum.photos/300/200?r="+v(1,200),destination:_(1)});return e}const k=["Upgrade to a business class","Order Uber","Add luggage","Switch to comfort","Rent a car","Add breakfast","Book tickets","Lunch in city"],H=m(),Y=new class{getTripEvents(){return function(t){const e=m(),n=[];for(let t=0;t<5;t++){const t=(s=new Date(2023,1,1),i=new Date,new Date(s.getTime()+Math.random()*(i.getTime()-s.getTime())));n.push({id:e(),basePrice:v(50,2e3),dateFrom:t,dateTo:new Date(t.getTime()+6e4*v(15,4320)),destination:v(1,l.length),isFavorite:Math.random()<.5,offers:E(),type:d(o)})}var s,i;return n}()}},x=new class{getDestinations(){return function(){const t=[],e=m();for(let n=0;n<l.length;n++){const n=v(0,5);t.push({id:e(),destinations:_(v(1,3)),name:d(l),pictures:O(n)})}return t}()}},F=new class{getOffers(){return function(){const t=[];return o.map((e=>{const n=[];for(let t=0;t<5;t++)n.push({id:H(),title:d(k),price:v(10,200)});t.push({type:e,offers:n})})),t}()}},L=new class{filterContainer=document.querySelector(".trip-controls__filters");tripEventsContainer=document.querySelector(".trip-events");tripEventsList=new w;eventTypeList=new T;constructor({tripEventModel:t,destinationsModel:e,offersModel:n}){this.tripEvents=[...t.getTripEvents()],this.destinations=[...e.getDestinations()],this.offers=n.getOffers()}init(){e(new b,this.filterContainer),e(new M,this.tripEventsContainer),e(new g({destinations:this.destinations,offers:this.offers}),this.tripEventsContainer),e(this.eventTypeList,document.querySelector(".event__type-wrapper")),e(this.tripEventsList,this.tripEventsContainer);for(const t of this.offers)e(new S({type:t.type}),this.eventTypeList.getElement());for(const t of this.tripEvents){const n=this.destinations.find((e=>e.id===t.destination)),s=this.offers.find((e=>e.type===t.type)).offers.filter((e=>t.offers.includes(e.id)));e(new D({tripEvent:t,offers:s,destination:n}),this.tripEventsList.getElement())}}}({tripEventModel:Y,destinationsModel:x,offersModel:F});L.init()})()})();
//# sourceMappingURL=bundle.7cee7a416d02e4d8c2b9.js.map