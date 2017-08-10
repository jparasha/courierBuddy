var xhr = new XMLHttpRequest();
xhr.open('GET', "https://couriermgmt.herokuapp.com", true);
xhr.send();
var availableStorage = true;
var init = '<table class= "table table-bordered table-hover table-responsive" ><thead><tr class="tablePadding"><td>Courier Name</td><td>Tracking code </td><td colspan="2">Action</td></tr><thead><tbody class="trackerTableBody">';
var term = '</tbody></table>';
var ul= "herokuapp";
if (typeof (Storage) !== "undefined") {
	var retrievedObject = localStorage.getItem('courierObj');
	var checkObj = JSON.parse(retrievedObject);
	if (checkObj === null || checkObj.slug.length === 0) {} else {
		var tracker = document.getElementById('tracker');
		var sMsg = document.getElementById('sMsg');
		tracker.classList.remove('hidden');
		sMsg.classList.remove('hidden');
		getTable();
	}
} else {
	availableStorage = false;
	console.log("not available");
}

function knowMore(x){
	if (x=== 'gotoDemo'){
		var goto = document.getElementById('demo');
		$('html, body').animate({scrollTop: $(goto).offset().top -50 }, 'slow');
	}
	else if(x==='gotoCreate'){
		var goto = document.getElementById('create');
		$('html, body').animate({scrollTop: $(goto).offset().top -50 }, 'slow');
	}
}
function createTracking() {
	var element1 = document.getElementById("spinner");
	var element2 = document.getElementById("bounce1");
	var element3 = document.getElementById("bounce2");
	var element4 = document.getElementById("bounce3");
	var errors = document.getElementById("errors");
	var tracker = document.getElementById("tracker");
	document.getElementById("exp2").innerHTML = "";
	document.getElementById("exp").innerHTML = "";
	document.getElementById("exp3").innerHTML = "";
	var code = document.getElementById("code").value;
	var slug = document.getElementById("slug").value;
	if (code === "" || code === "null" || code.length < 8) {
		document.getElementById("data").innerHTML = "";
		document.getElementById("errors").innerHTML = "<strong class='strng'>PLEASE&nbsp;ENTER&nbsp;A &nbsp;VALID&nbsp;TRACKING&nbsp;CODE!</strong>";
	} else {
		document.getElementById("data").innerHTML = "";
		document.getElementById("exp").innerHTML = "";
		element1.classList.add("spinner");
		element2.classList.add("bounce1");
		element3.classList.add("bounce2");
		element4.classList.add("bounce3");
		errors.innerHTML = "";
		var url = "https://couriermgmt."+ul+".com/createTracking";
		var bod = {
			"slug": slug,
			"tracking_number": code
		};
		
		//try wether fetch is supported 
		try{
			fetch(url, {
				method: "post",
				json: true,
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(bod)
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				var successMsg = "Great! We have created your " + data.slug + " tracking! "
				element1.classList.remove("spinner");
				element2.classList.remove("bounce1");
				element3.classList.remove("bounce2");
				element4.classList.remove("bounce3");
				var doc = document.getElementById("topMsg");
				tracker.classList.remove('hidden');
				doc.innerHTML = '<strong style="color:orange;margin-bottom:2%;font-size:140% !important;">' + successMsg + '</strong>';
				addCookies(data);
			}).catch(function () {
				var errorMsg = "Something Went Wrong in processing your request."
				element1.classList.remove("spinner");
				element2.classList.remove("bounce1");
				element3.classList.remove("bounce2");
				element4.classList.remove("bounce3");
				var doc = document.getElementById("exp");
				doc.innerHTML = '<strong style="color:red; margin-top:2%; margin-left:2%;">' + errorMsg + '</strong>';
			});
		}
		catch(error){
			element1.classList.remove("spinner");
			element2.classList.remove("bounce1");
			element3.classList.remove("bounce2");
			element4.classList.remove("bounce3");
			console.log("SOME ERROR:"+error);
			var errorDoc = document.getElementById("errors");
			var errormsg= "OUR BAD:( Your Browser's version is not currently supported! Please use Chrome for best results. Thanks :)";
			errorDoc.innerHTML = '<strong style="color:orange; margin-top:2%; margin-left:2%;">' + errormsg + '</strong>';
		}
	}
}

function addCookies(data) {
	var courierObj = {
		"slug": [],
		"tracking": []
	};
	courierObj.slug.push(data.slug);
	courierObj.tracking.push(data.tracking_code);
	if (availableStorage === true) {
		var retrievedObject = localStorage.getItem('courierObj');
		if (retrievedObject === undefined || retrievedObject === null) {
			var rowId = 0;
			localStorage.setItem('courierObj', JSON.stringify(courierObj));
			var mid = '<tr id="' + rowId + '"><td id="'+courierObj.slug+'">' + courierObj.slug + '</td><td id="' +courierObj.tracking +'">' + courierObj.tracking + '</td><td id="getTracking" class="getTracking" onClick="getTracking(this.parentNode)"style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit; ; "><strong>TRACK</strong></td><td class="delete" id="deleteTracking" onClick="deleteTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit ; "><strong>Delete</strong></td></tr>';
			rowId++;
			var table = init + mid + term;
			createView(table);
		} else {
			retrievedObject = JSON.parse(retrievedObject);
			var isAvailable = false;
			for (var i = 0; i < retrievedObject.tracking.length; i++) {
				if (retrievedObject.tracking[i] === data.tracking_code) {
					console.log("already added!");
					isAvailable = true;
				} else {}
			}
			if (isAvailable === false) {
				retrievedObject.slug.push(data.slug);
				retrievedObject.tracking.push(data.tracking_code);
				localStorage.setItem('courierObj', JSON.stringify(retrievedObject));
				///console.log(localStorage.courierObj);
			} else {}
			getTable();
		}
	} else {
		console.log("No localStorage Support!");
	}
}

function getTable() {
	var tableObj = localStorage.getItem('courierObj');
	tableObj = JSON.parse(tableObj);
	var mid = '';
	var rowId = 0;
	for (var x = tableObj.tracking.length - 1; x >= 0; --x) {
		addMid = '<tr id = "' + rowId + '"><td id="'+tableObj.slug[x]+'">' + tableObj.slug[x] + '</td><td id="'+ tableObj.tracking[x] +'">' + tableObj.tracking[x] + '</td><td id="getTracking" onClick="getTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid #inherit ; "><strong>TRACK</strong></td><td class="delete" id="deleteTracking" onClick="deleteTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid inherit ; "><strong>Delete</strong></td></tr>';
		mid = mid + addMid;
		rowId++;
	}
	var table = init + mid + term;
	createView(table);
}

function createView(table) {
	var jsView = document.getElementById('trackTable');
	jsView.innerHTML = table;
	var sc= document.getElementById('tracker');
	//sc.scrollIntoView();
	$('html, body').animate({scrollTop: $(sc).offset().top -50 }, 'slow');
}

function deleteTracking(x) {
	var tData = {
		"slug": "",
		"track": ""
	};
	var tr = document.getElementById(x.id);
	var td = tr.getElementsByTagName("td");
	tData.slug = td[0].id;
	tData.track = td[1].id;
	console.log(tData);
	var index;
	var isAvailable = false;
	var deleteObj = localStorage.getItem('courierObj');
	deleteObj = JSON.parse(deleteObj);
	for (var i = 0; i < deleteObj.tracking.length; i++) {
		if (deleteObj.tracking[i] === tData.track) {
			isAvailable = true;
			index = i;
		} else {
			console.log("That's an Error!!");
		}
	}
	if (index > -1) {
		deleteObj.tracking.splice(index, 1);
		deleteObj.slug.splice(index, 1);
	}
	localStorage.setItem('courierObj', JSON.stringify(deleteObj));
	var row = x;
	var row = x;//
	var parent = x.parentNode;
	var pClass = parent.classList;
	var tbody = document.getElementsByClassName(pClass);
	var bChild = tbody[0].childElementCount;
	var tRow = document.getElementsByTagName("tr");
	if (bChild === 1) {
		var tracker = document.getElementById('tracker');
		var sMsg = document.getElementById('sMsg');
		tracker.classList.add('hidden');
		sMsg.classList.add('hidden');
	} else {
		row.parentNode.removeChild(row);
		var doc = document.getElementById("topMsg");
		var msg = "Your " + tData.slug + " tracking deleted successfully ";
		doc.innerHTML = '<strong style="color:#5377d6;margin-bottom:2%;">' + msg + '</strong>';
	}
}

function getTracking(x) {
	var nums = 0;
	var element1 = document.getElementById("_spinner");
	var element2 = document.getElementById("_bounce1");
	var element3 = document.getElementById("_bounce2");
	var element4 = document.getElementById("_bounce3");
	var element5 = document.getElementById("topMsg");
	document.getElementById("exp2").innerHTML = "";
	document.getElementById("exp3").innerHTML = "";
	element5.innerHTML = "";
	var tData = {
		"slug": "",
		"track": ""
	};
	var tr = document.getElementById(x.id);
	var td = tr.getElementsByTagName("td");
	tData.slug = td[0].id;
	tData.track = td[1].id;
	console.log(tData.slug +'::'+ tData.track);
	var code = tData.track;
	var slug = tData.slug;
	if (code === "" || code === "null") {
		document.getElementById("data").innerHTML = "";
		document.getElementById("exp").innerHTML = "<strong style='margin-left:2%;' class='strng'>PLEASE&nbsp;&nbsp;ENTER&nbsp;&nbsp;A&nbsp;&nbsp;VALID&nbsp;&nbsp;TRACKING&nbsp;&nbsp;CODE&nbsp;!</strong>";
	} else {
		document.getElementById("data").innerHTML = "";
		document.getElementById("exp").innerHTML = "";
		element1.classList.add("_spinner");
		element2.classList.add("_bounce1");
		element3.classList.add("_bounce2");
		element4.classList.add("_bounce3");
		call();

		function call() {
			var mainData;
			var arr = [];
			var url = "https://couriermgmt."+ul+".com/tracking/" + slug + "/" + code;
			fetch(url, {
				method: "get"
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				mainData = data;
				console.log(data);
				if (data.meta.code === 429) {
					nums++;
					var trying = document.getElementById("breathe");
					if (nums < 5) {
						trying.innerHTML = '<strong style="color:#226194; margin-left:2%;">' + data.meta.message + '</strong>';
						call();
					} else if (nums >= 5 && nums <= 15) {
						trying.innerHTML = '<strong style="color:#226194; margin-left:2%;">' + data.meta.failingMsg + '</strong>';
						call();
					} else {
						trying.innerHTML = '<strong style="color:#226194; margin-left:2%;">' + data.meta.failedMsg + '</strong>';
						element1.classList.remove("_spinner");
						element2.classList.remove("_bounce1");
						element3.classList.remove("_bounce2");
						element4.classList.remove("_bounce3");
					}
				} else if (data.meta.code === 200) {
					var trackingArray;
					for (var i = 0; i < data.data.trackings.length; i++) {
						var title = data.data.trackings[i].title;
						if (title.toUpperCase() === code.toUpperCase()) {
							if (data.data.trackings[i].checkpoints.length != 0) {
								trackingArray = data.data.trackings[i];
							} else {}
						} else {}
					}
					if ( trackingArray===undefined || trackingArray.checkpoints.length === 0 || trackingArray.checkpoints.length === undefined ) {
						var doc = document.getElementById("exp");
						var element1 = document.getElementById("_spinner");
						var element2 = document.getElementById("_bounce1");
						var element3 = document.getElementById("_bounce2");
						var element4 = document.getElementById("_bounce3");
						element1.classList.remove("_spinner");
						element2.classList.remove("_bounce1");
						element3.classList.remove("_bounce2");
						element4.classList.remove("_bounce3");
						doc.innerHTML = '<strong style="color:red; margin-top:2%;" class="strng">Snapp.. That looks like an error- tracking may have expired or not have been created yet! </strong>';
					} else {
						for (var i = 0; i < trackingArray.checkpoints.length; i++) {
							arr.push(trackingArray.checkpoints[i])
						}
						var updateTime = " Details updated at :  ";
						var trackDetails = '<div>Your Consignment Number  : ';
						var tracks = '<strong style="color:orange; text-align:right;">' + tData.track + '</strong>';
						trackDetails = trackDetails + tracks +'</div><div> Courier Name : <strong style="color:orange; text-align:right;">'+tData.slug+'</strong></div>';
						var updateTimeArray = [];
						var htm = '<hr style="margin-top: 1%; margin-bottom: 1%; border-top:1px solid #255277!important"><table class="table table-hover table-responsive table-bordered" style="padding:5%; border-color:#fff !important;"><thead><tr class="dataTable"><td>Time</td><td>City/Location</td><td>Status</td></tr></thead><tbody>';
						var outer = '';
						var exp = '  Expected Date Of Delivery : ';
						var len= data.data.trackings.length;
						//console.log(len);
						console.log(data.data.trackings[len-1].tag );
						if (data.data.trackings[len-1].tag === "Delivered") {
							exp = exp + '<strong style="color:green;">Package DELIVERED !</strong>';
						}else if (data.data.trackings[len-1].tag === "InTransit") {
							exp = exp + '<strong style="color:#9e9e9e;">Package is In-Transit !</strong>';
						}else if (data.data.trackings[len-1].tag === "OutForDelivery") {
							exp = exp + '<strong style="color:#8bc34a;">Package out for Delivery !</strong>';
						} else if ((data.data.trackings[len-1].expected_delivery === null) && ((data.data.trackings[len-1].tag !== "Delivered") || (data.data.trackings[len-1].tag !== "InTransit") || (data.data.trackings[len-1].tag !== "OutForDelivery"))) {
							exp = exp + '<strong style="color:orange;">CURRENTLY&nbsp;&nbsp;UNAVAILABLE!</strong>';
						}  
						else {
							var expD= new Date(data.data.trackings[len-1].expected_delivery);
							expD.toLocaleDateString().replace(/\//g, '-');
							exp = exp + '<strong style="color:orange;">' + expD + '</strong>';
						}
						for (var j = arr.length - 1; j >= 0; --j) {
							var city = '';
							if (arr[j].city === null) {
								city = arr[j].location;
							} else {
								city = arr[j].city;
							}
							var istDate = new Date(arr[j].checkpoint_time);
							istDate.toLocaleDateString().replace(/\//g, '-');
							var inner = '<tr><td>' + istDate + '</td><td>' + city + '</td><td>' + arr[j].message + '</td></tr>';
							outer = outer + inner;
							updateTimeArray.push(arr[j].created_at);
							
						}
						var d = new Date(updateTimeArray[0]);
						d.toLocaleDateString().replace(/\//g, '-');
						updateTime = updateTime + '<strong style="color:orange; text-align:right;">' + d + '</strong>';
						var htm = htm + outer + '</tbody></th></table>';
						var element1 = document.getElementById("_spinner");
						var element2 = document.getElementById("_bounce1");
						var element3 = document.getElementById("_bounce2");
						var element4 = document.getElementById("_bounce3");
                        element1.classList.remove("_spinner");
						element2.classList.remove("_bounce1");
						element3.classList.remove("_bounce2");
						element4.classList.remove("_bounce3");
						var doc1 = document.getElementById("exp");
						var doc2 = document.getElementById("exp2");
						var doc = document.getElementById("data");
						var doc3 = document.getElementById("exp3");
						var breather = document.getElementById("breathe");
						breather.innerHTML = "";
						doc1.innerHTML = exp;
						doc2.innerHTML = updateTime;
						doc.innerHTML = htm;
						doc3.innerHTML = trackDetails;
						//document.getElementById('exp3').scrollIntoView();
					 	
								$('html, body').animate({scrollTop: $('#exp3').offset().top -75 }, 'slow');
					}
				} else {
					var trying = document.getElementById("exp");
					trying.innerHTML = '<strong style="color:#226194; margin-top:2%;">Well, that is an error! try submitting request again..</strong>';
				}
			}).catch(function () {
				console.log("error");
				var text = "Looks like an error!";
				if (mainData === undefined) {
					text = "Something went wrong!";
				} else {
					text = mainData.meta.message;
				}
				var doc = document.getElementById("exp");
				var breather = document.getElementById("breathe");
				breather.innerHTML = "";
				element1.classList.remove("spinner");
				element2.classList.remove("bounce1");
				element3.classList.remove("bounce2");
				element4.classList.remove("bounce3");
				doc.innerHTML = '<strong style="color:red; margin-top:2%; margin-left:2%;">' + text + '</strong>';
			});
		}
	}
}
