function knowMore(e){if("gotoDemo"===e){var t=document.getElementById("demo");$("html, body").animate({scrollTop:$(t).offset().top-50},"slow")}else if("gotoCreate"===e){var t=document.getElementById("create");$("html, body").animate({scrollTop:$(t).offset().top-50},"slow")}}function createTracking(){var e=document.getElementById("spinner"),t=document.getElementById("bounce1"),n=document.getElementById("bounce2"),r=document.getElementById("bounce3"),o=document.getElementById("errors"),s=document.getElementById("tracker");document.getElementById("exp2").innerHTML="",document.getElementById("exp").innerHTML="",document.getElementById("exp3").innerHTML="",document.getElementById("slugErr").innerHTML="";var a=document.getElementById("code").value,l=document.getElementById("slug").value;if(""===a||"null"===a||a.length<8)document.getElementById("data").innerHTML="",document.getElementById("errors").innerHTML="<strong class='strng'>PLEASE&nbsp;ENTER&nbsp;A &nbsp;VALID&nbsp;TRACKING&nbsp;CODE!</strong>";else{document.getElementById("data").innerHTML="",document.getElementById("exp").innerHTML="",e.classList.add("spinner"),t.classList.add("bounce1"),n.classList.add("bounce2"),r.classList.add("bounce3"),o.innerHTML="";var c="https://couriermgmt."+ul+".com/createTracking",i={slug:l,tracking_number:a};try{fetch(c,{method:"post",json:!0,headers:{"content-type":"application/json"},body:JSON.stringify(i)}).then(function(e){return e.json()}).then(function(o){var a="Great! We have created your "+o.slug+" tracking! You can Track from table above, in couple of minutes, Will then be available forever unless you delete :)";e.classList.remove("spinner"),t.classList.remove("bounce1"),n.classList.remove("bounce2"),r.classList.remove("bounce3");var l=document.getElementById("topMsg");s.classList.remove("hidden"),l.innerHTML='<strong style="color:orange;margin-bottom:2%;font-size:140% !important;">'+a+"</strong>",addCookies(o),$("html, body").animate({scrollTop:$("#topMsg").offset().top-100},"slow")})["catch"](function(){var o="Something Went Wrong in processing your request.";e.classList.remove("spinner"),t.classList.remove("bounce1"),n.classList.remove("bounce2"),r.classList.remove("bounce3");var s=document.getElementById("exp");s.innerHTML='<strong style="color:red; margin-top:2%; margin-left:2%;">'+o+"</strong>"})}catch(d){e.classList.remove("spinner"),t.classList.remove("bounce1"),n.classList.remove("bounce2"),r.classList.remove("bounce3"),console.log("SOME ERROR:"+d);var g=document.getElementById("errors"),m="OUR BAD:( Your Browser's version is not currently supported! Please use Chrome for best results. Thanks :)";g.innerHTML='<strong style="color:orange; margin-top:2%; margin-left:2%;">'+m+"</strong>"}}}function addCookies(e){var t={slug:[],tracking:[]};if(t.slug.push(e.slug),t.tracking.push(e.tracking_code),availableStorage===!0){var n=localStorage.getItem("courierObj");if(void 0===n||null===n){var r=0;localStorage.setItem("courierObj",JSON.stringify(t));var o='<tr id="'+r+'"><td id="'+t.slug+'">'+t.slug+'</td><td id="'+t.tracking+'">'+t.tracking+'</td><td id="getTracking" class="getTracking" onClick="getTracking(this.parentNode)"style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit; ; "><strong>TRACK</strong></td><td class="delete" id="deleteTracking" onClick="deleteTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit ; "><strong>Delete</strong></td></tr>';r++;var s=init+o+term;createView(s)}else{n=JSON.parse(n);for(var a=!1,l=0;l<n.tracking.length;l++)n.tracking[l]===e.tracking_code&&(console.log("already added!"),a=!0);a===!1&&(n.slug.push(e.slug),n.tracking.push(e.tracking_code),localStorage.setItem("courierObj",JSON.stringify(n))),getTable()}}else console.log("No localStorage Support!")}function getTable(){var e=localStorage.getItem("courierObj");e=JSON.parse(e);for(var t="",n=0,r=e.tracking.length-1;r>=0;--r)addMid='<tr id = "'+n+'"><td id="'+e.slug[r]+'">'+e.slug[r]+'</td><td id="'+e.tracking[r]+'">'+e.tracking[r]+'</td><td id="getTracking" onClick="getTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid #inherit ; "><strong>TRACK</strong></td><td class="delete" id="deleteTracking" onClick="deleteTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit ; "><strong>Delete</strong></td></tr>',t+=addMid,n++;var o=init+t+term;createView(o)}function createView(e){var t=document.getElementById("trackTable");t.innerHTML=e;var n=document.getElementById("tracker");$("html, body").animate({scrollTop:$(n).offset().top-50},"slow")}function deleteTracking(e){var t={slug:"",track:""},n=document.getElementById(e.id),r=n.getElementsByTagName("td");t.slug=r[0].id,t.track=r[1].id;var o,s=!1,a=localStorage.getItem("courierObj");a=JSON.parse(a);for(var l=0;l<a.tracking.length;l++)a.tracking[l]===t.track?(s=!0,o=l):console.log("That's an Error!!");o>-1&&(a.tracking.splice(o,1),a.slug.splice(o,1)),localStorage.setItem("courierObj",JSON.stringify(a));var c=e,c=e,i=e.parentNode,d=i.classList,g=document.getElementsByClassName(d),m=g[0].childElementCount;document.getElementsByTagName("tr");if(1===m){var u=document.getElementById("tracker"),p=document.getElementById("sMsg");u.classList.add("hidden"),p.classList.add("hidden")}else{c.parentNode.removeChild(c);var y=document.getElementById("topMsg"),b="Your "+t.slug+" tracking deleted successfully ";y.innerHTML='<strong style="color:#5377d6;margin-bottom:2%;">'+b+"</strong>"}}function getTracking(e){function t(){var e,l=[],i="https://couriermgmt."+ul+".com/tracking/"+m+"/"+g;fetch(i,{method:"get"}).then(function(e){return e.json()}).then(function(r){e=r;var o=document.getElementById("_spinner"),s=document.getElementById("_bounce1"),a=document.getElementById("_bounce2"),i=document.getElementById("_bounce3");if(429===r.meta.code){n++;var d=document.getElementById("breathe");5>n?(d.innerHTML='<strong style="color:#226194; margin-left:2%;">'+r.meta.message+"</strong>",t()):n>=5&&10>n?(d.innerHTML='<strong style="color:#226194; margin-left:2%;">'+r.meta.failingMsg+"</strong>",t()):(d.innerHTML='<strong style="color:#226194; margin-left:2%;">'+r.meta.failedMsg+"</strong>",o.classList.remove("_spinner"),s.classList.remove("_bounce1"),a.classList.remove("_bounce2"),i.classList.remove("_bounce3"))}else if(200===r.meta.code){for(var m,u=0;u<r.data.trackings.length;u++){var p=r.data.trackings[u].title;p.toUpperCase()===g.toUpperCase()&&0!=r.data.trackings[u].checkpoints.length&&(m=r.data.trackings[u])}if(void 0===m||0===m.checkpoints.length||void 0===m.checkpoints.length){var y=document.getElementById("exp"),b=document.getElementById("slugErr"),o=document.getElementById("_spinner"),s=document.getElementById("_bounce1"),a=document.getElementById("_bounce2"),i=document.getElementById("_bounce3");o.classList.remove("_spinner"),s.classList.remove("_bounce1"),a.classList.remove("_bounce2"),i.classList.remove("_bounce3"),b.innerHTML='<strong style="color:red; margin-top:2%;" class="strng">Snapp.. That looks like an error- tracking may have expired or not have been created yet! Do verify your Courier Service </strong>'}else{for(var u=0;u<m.checkpoints.length;u++)l.push(m.checkpoints[u]);var v,h=" Details updated at :  ",E="<div>Consignment Details  : ",k='<strong style="color:orange; text-align:right;">'+c.track+","+c.slug+" </strong>";v=void 0!=m.expected_delivery?m.expected_delivery:"Appears unavailable at this moment!",E=E+k+'</div><div> Expect delivery on : <strong style="color:orange; text-align:right;">'+v+"</strong></div>";var L=[],I='<hr style="margin-top: 1%; margin-bottom: 1%; border-top:1px solid #255277!important"><table class="table table-hover table-responsive table-bordered" style="padding:5%; border-color:#fff !important;"><thead><tr class="dataTable"><td>Time</td><td>City/Location</td><td>Status</td></tr></thead><tbody>',T="",f="  Consignment Status : ",B=r.data.trackings.length;if(console.log(m),"Delivered"===m.tag)f+='<strong style="color:green;">Package DELIVERED !</strong>';else if("InTransit"===m.tag)f+='<strong style="color:#9e9e9e;">Package is In-Transit !</strong>';else if("OutForDelivery"===m.tag)f+='<strong style="color:#8bc34a;">Package out for Delivery !</strong>';else if(null!==m.expected_delivery||"Delivered"===r.data.trackings[B-1].tag&&"InTransit"===r.data.trackings[B-1].tag&&"OutForDelivery"===r.data.trackings[B-1].tag){var M=new Date(r.data.trackings[B-1].expected_delivery);M.toLocaleDateString().replace(/\//g,"-"),f=f+'<strong style="color:orange;">'+M+"</strong>"}else f+='<strong style="color:orange;">CURRENTLY&nbsp;&nbsp;UNAVAILABLE!</strong>';for(var _=l.length-1;_>=0;--_){var H="";H=null===l[_].city?l[_].location:l[_].city;var x=new Date(l[_].checkpoint_time);x.toLocaleDateString().replace(/\//g,"-");var S="<tr><td>"+x+"</td><td>"+H+"</td><td>"+l[_].message+"</td></tr>";T+=S,L.push(l[_].created_at)}var O=new Date(L[0]);O.toLocaleDateString().replace(/\//g,"-"),h=h+'<strong style="color:orange; text-align:right;">'+O+"</strong>";var I=I+T+"</tbody></th></table>",o=document.getElementById("_spinner"),s=document.getElementById("_bounce1"),a=document.getElementById("_bounce2"),i=document.getElementById("_bounce3");o.classList.remove("_spinner"),s.classList.remove("_bounce1"),a.classList.remove("_bounce2"),i.classList.remove("_bounce3");var N=document.getElementById("exp"),C=document.getElementById("exp2"),y=document.getElementById("data"),D=document.getElementById("exp3"),w=document.getElementById("breathe");w.innerHTML="",N.innerHTML=f,C.innerHTML=h,y.innerHTML=I,D.innerHTML=E,$("html, body").animate({scrollTop:$("#exp3").offset().top-75},"slow")}}else{var d=document.getElementById("exp");d.innerHTML='<strong style="color:#226194; margin-top:2%;">Well, that is an error! try submitting request again..</strong>'}})["catch"](function(){console.log("error");var t="Looks like an error!";t=void 0===e?"Something went wrong!":e.meta.message;var n=document.getElementById("exp"),l=document.getElementById("breathe");l.innerHTML="",r.classList.remove("spinner"),o.classList.remove("bounce1"),s.classList.remove("bounce2"),a.classList.remove("bounce3"),n.innerHTML='<strong style="color:red; margin-top:2%; margin-left:2%;">'+t+"</strong>"})}var n=0,r=document.getElementById("_spinner"),o=document.getElementById("_bounce1"),s=document.getElementById("_bounce2"),a=document.getElementById("_bounce3"),l=document.getElementById("topMsg");document.getElementById("exp2").innerHTML="",document.getElementById("exp3").innerHTML="",document.getElementById("slugErr").innerHTML="",l.innerHTML="",$("html, body").animate({scrollTop:$("#topMsg").offset().top-150},"slow");var c={slug:"",track:""},i=document.getElementById(e.id),d=i.getElementsByTagName("td");c.slug=d[0].id,c.track=d[1].id,console.log(c.slug+"::"+c.track);var g=c.track,m=c.slug;""===g||"null"===g?(document.getElementById("data").innerHTML="",document.getElementById("exp").innerHTML="<strong style='margin-left:2%;' class='strng'>PLEASE&nbsp;&nbsp;ENTER&nbsp;&nbsp;A&nbsp;&nbsp;VALID&nbsp;&nbsp;TRACKING&nbsp;&nbsp;CODE&nbsp;!</strong>"):(document.getElementById("data").innerHTML="",document.getElementById("exp").innerHTML="",r.classList.add("_spinner"),o.classList.add("_bounce1"),s.classList.add("_bounce2"),a.classList.add("_bounce3"),$("html, body").animate({scrollTop:$("#exp3").offset().top-75},"slow"),t())}var xhr=new XMLHttpRequest;xhr.open("GET","https://couriermgmt.herokuapp.com",!0),xhr.send();var availableStorage=!0,init='<table class= "table table-bordered table-hover table-responsive" ><thead><tr class="tablePadding"><td>Courier Name</td><td>Tracking code </td><td colspan="2">Action</td></tr><thead><tbody class="trackerTableBody">',term="</tbody></table>",ul="herokuapp";if("undefined"!=typeof Storage){var retrievedObject=localStorage.getItem("courierObj"),checkObj=JSON.parse(retrievedObject);if(null===checkObj||0===checkObj.slug.length);else{var tracker=document.getElementById("tracker"),sMsg=document.getElementById("sMsg");tracker.classList.remove("hidden"),sMsg.classList.remove("hidden"),getTable()}}else availableStorage=!1,console.log("not available");