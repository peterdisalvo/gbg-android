(function(){if("ontouchstart"in window&&!/chrome/i.test(navigator.userAgent)){var g,h,i,e=function(a,c){return 5<Math.abs(a[0]-c[0])||5<Math.abs(a[1]-c[1])},m=function(a,c){for(var b=a,f=c.toUpperCase();b!==document.body;){if(!b||b.nodeName===f)return b;b=b.parentNode}return null};document.addEventListener("touchstart",function(a){this.startXY=[a.touches[0].clientX,a.touches[0].clientY];this.treshold=!1},!1);document.addEventListener("touchmove",function(a){if(this.treshold)return!1;this.threshold=
e(this.startXY,[a.touches[0].clientX,a.touches[0].clientY])},!1);document.addEventListener("touchend",function(a){if(!this.treshold&&!e(this.startXY,[a.changedTouches[0].clientX,a.changedTouches[0].clientY])){var c=a.changedTouches[0],b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null);b.simulated=!0;a.target.dispatchEvent(b)}},!1);document.addEventListener("click",function(a){var c=Date.now(),b=c-g,f=a.clientX,
e=a.clientY,j=[Math.abs(h-f),Math.abs(i-e)],d=m(a.target,"A")||a.target,k="A"===d.nodeName,l=window.navigator.standalone&&k&&a.target.getAttribute("href");g=c;h=f;i=e;if(!a.simulated&&(500>b||1500>b&&50>j[0]&&50>j[1])||l)if(a.preventDefault(),a.stopPropagation(),!l)return!1;window.navigator.standalone&&k&&d.getAttribute("href")&&(window.location=d.getAttribute("href"));d&&d.classList&&(d.classList.add("m-focus"),window.setTimeout(function(){d.classList.remove("m-focus")},150))},!0)}})();
