var availableStorage = true;
var init = '<table class= "table table-bordered table-hover" ><thead><tr class="tablePadding"><td>Courier Name</td><td>Tracking code </td><td>Action</td></tr><thead><tbody>';
var term = '</tbody></table>';
if (typeof (Storage) !== "undefined") {
	// Code for localStorage/sessionStorage.
	var retrievedObject = localStorage.getItem('courierObj');
	if(retrievedObject === null){
		console.log("Its nothing here!");
	}
	else{
		
	
	//console.log(retrievedObject);
 	var tracker= document.getElementById('tracker');
 	var sMsg= document.getElementById('sMsg');
	tracker.classList.remove('hidden');
	sMsg.classList.remove('hidden');
	//var divdown= document.getElementById('divdown')
	//divup.classList.remove('hidden);
	getTable();
	}

} else {
	availableStorage = false;
	console.log("not available");
	// Sorry! No Web Storage support..
}

function createTracking() {
	var element1 = document.getElementById("spinner");
	var element2 = document.getElementById("bounce1");
	var element3 = document.getElementById("bounce2");
	var element4 = document.getElementById("bounce3");
	var errors = document.getElementById("errors");
	var tracker = document.getElementById("tracker");
	document.getElementById("exp2").innerHTML = "";
	var code = document.getElementById("code").value;
	var slug = document.getElementById("slug").value;
	if (code === "" || code === "null") {
		document.getElementById("data").innerHTML = "";
		document.getElementById("errors").innerHTML = "<strong class='strng'>PLEASE&nbsp;ENTER&nbsp;A &nbsp;VALID&nbsp;TRACKING&nbsp;CODE!</strong>";
	} else {
		document.getElementById("data").innerHTML = "";
		document.getElementById("exp").innerHTML = "";
		element1.classList.add("spinner");
		element2.classList.add("bounce1");
		element3.classList.add("bounce2");
		element4.classList.add("bounce3");
		errors.innerHTML="";

		var url = "https://couriermgmt.herokuapp.com/createTracking";
		//var url = "http://localhost:8000/createTracking";
		var bod = {
			"slug": slug,
			"tracking_number": code
		};
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
			console.log(data);
			//if(data.code !== 4003){
			console.log(data.message);
			var successMsg = "Great! We have created your " + data.slug + " tracking! "
			element1.classList.remove("spinner");
			element2.classList.remove("bounce1");
			element3.classList.remove("bounce2");
			element4.classList.remove("bounce3");
			var doc = document.getElementById("topMsg");
		//	var div1 = document.getElementById("divUp");
		//	var div2 = document.getElementById("divDown");
			
		//	div1.classList.add('hidden');
			tracker.classList.remove('hidden');
			doc.innerHTML = '<strong style="color:#5377d6;margin-bottom:2%;">' + successMsg + '</strong>';
			addCookies(data);
			//}
			//else{
			//	console.log(data);

			//}
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
			// Put the object into storage
			var rowId = 0;
			localStorage.setItem('courierObj', JSON.stringify(courierObj));
			var mid = '<tr id="' + rowId + '"><td>' + courierObj.slug + '</td><td>' + courierObj.tracking + '</td><td id="getTracking" class="getTracking" onClick="getTracking(this.parentNode)"style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid #fff; ; "><strong>T R A C K</strong></button></td></tr>';
			rowId++;
			var table = init + mid + term;
			createView(table);


		}

		// todo if already added remove div
		//if(localstorage hasValue) => display
		else {
			//var arr={
			//			slug:[],
			//			id  :[]
			//		};
			retrievedObject = JSON.parse(retrievedObject);
			//console.log(retrievedObject.tracking.length);


			var isAvailable = false;

			//check logic, important!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			for (var i = 0; i < retrievedObject.tracking.length; i++) {
				if (retrievedObject.tracking[i] === data.tracking_code) {
					console.log("already added!");
					isAvailable = true;

					//arr.slug.push(retrievedObject.slug[i]); ///for loop [1] returns null
					//arr.id.push(retrievedObject.tracking[i]);
					//getTable();
					//createView(arr);
				} else {
					console.log("nope");
					//retrievedObject.slug.push(data.slug);
					//retrievedObject.tracking.push(data.tracking_code);
					// Put the object into storage
					//localStorage.setItem('courierObj', JSON.stringify(retrievedObject));
					//console.log(localStorage.courierObj);

					//getTable();
					//createView(arr);
				}
			}
			if (isAvailable === false) {
				retrievedObject.slug.push(data.slug);
				retrievedObject.tracking.push(data.tracking_code);
				// Put the object into storage
				localStorage.setItem('courierObj', JSON.stringify(retrievedObject));
				console.log(localStorage.courierObj);
			} else {
				console.log("isAvailable");
			}
			getTable();
			//unnecessary function

		}
	} else {
		console.log("No localStorage Support!");
	}

	// Retrieve the object from storage

}

function getTable() {
	var tableObj = localStorage.getItem('courierObj');
	tableObj = JSON.parse(tableObj);
	//console.log(tableObj);
	var mid = '';
	var rowId = 0;
	for (var x = tableObj.tracking.length - 1; x >= 0; --x) {
		//console.log(tableObj.slug[x]);
		addMid = '<tr id = "' + rowId + '"><td>' + tableObj.slug[x] + '</td><td>' + tableObj.tracking[x] + '</td><td id="getTracking" onClick="getTracking(this.parentNode)" style="padding: 1% 4%; background-color:transparent; color:inherit; border : 1px solid #fff ; "><strong>T R A C K</strong></td></tr>';
		mid = mid + addMid;
		rowId++;
	}
	var table = init + mid + term;
	console.log(mid);
	createView(table);
}

function createView(table) {
	//console.log(table);
	var jsView = document.getElementById('trackTable');
	jsView.innerHTML = table;
	document.getElementById('tracker').scrollIntoView();
}

function getTracking(x) {
	console.log(x);
	var nums = 0;
	var element1 = document.getElementById("_spinner");
	var element2 = document.getElementById("_bounce1");
	var element3 = document.getElementById("_bounce2");
	var element4 = document.getElementById("_bounce3");
	var element5 = document.getElementById("topMsg");
	document.getElementById("exp2").innerHTML = "";
	element5.innerHTML = "";

	var tData = {
		"slug": "",
		"track": ""
	};
	var tr = document.getElementById(x.id);
	var td = tr.getElementsByTagName("td");
	tData.slug = td[0].innerHTML;
	tData.track = td[1].innerHTML;
	//get 
	var code = tData.track;
	var slug = tData.slug;
	console.log("code is" + code);
	if (code === "" || code === "null") {
		document.getElementById("data").innerHTML = "";
		document.getElementById("exp").innerHTML = "<strong style='margin-left:2%;' class='strng'>P L E A S E &nbsp;&nbsp;  E N T E R &nbsp;&nbsp; A &nbsp;&nbsp;  V A L I D &nbsp;&nbsp; T R A C K I N G &nbsp;&nbsp; C O D E &nbsp;!</strong>";
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
			var url = "https://couriermgmt.herokuapp.com/tracking/"+slug+"/"+code;
			//var url = "http://localhost:8000/tracking/" + slug + "/" + code;
			fetch(url, {
				method: "get"				
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				//console.log(data);
				mainData = data;
				if (data.meta.code === 429) {
					nums++;
					//console.log("429");
					var trying = document.getElementById("breathe");
					if (nums < 5) {
						trying.innerHTML = '<strong style="color:lightCoral; margin-left:2%;">' + data.meta.message + '</strong>';
						call();
					} else if (nums >= 5 && nums <= 15) {
						trying.innerHTML = '<strong style="color:lightCoral; margin-left:2%;">' + data.meta.failingMsg + '</strong>';
						call();
					} else {
						trying.innerHTML = '<strong style="color:lightCoral; margin-left:2%;">' + data.meta.failedMsg + '</strong>';
						element1.classList.remove("_spinner");
						element2.classList.remove("_bounce1");
						element3.classList.remove("_bounce2");
						element4.classList.remove("_bounce3");
						//call();
					}
				} else if (data.meta.code === 200) {
					//console.log("200");
					var trackingArray;
					for (var i = 0; i < data.data.trackings.length; i++) {
						if (data.data.trackings[i].checkpoints.length != 0) {
							trackingArray = data.data.trackings[i];
						} else {
							//console.log("t-array empty");
						}
					}

					if (trackingArray.checkpoints.length === 0 || trackingArray.checkpoints.length === undefined) {
						var doc = document.getElementById("exp");
						element1.classList.remove("spinner");
						element2.classList.remove("bounce1");
						element3.classList.remove("bounce2");
						element4.classList.remove("bounce3");
						doc.innerHTML = '<strong style="color:red; margin-top:2%;" class="strng">Snapp.. That looks like an error/ tracking may have expired! </strong>';
					} else {
						for (var i = 0; i < trackingArray.checkpoints.length; i++) {
							arr.push(trackingArray.checkpoints[i])
						}
						var updateTime = " Details updated at :  ";
						var updateTimeArray = [];
						var htm = '<table class="table table-hover table-responsive table-bordered" style="padding:5%;"><thead><tr><td>Time</td><td>City/Location</td><td>Status</td></tr></thead><tbody>';
						var outer = '';
						var exp = '  Expected Date Of Delivery: ';
						if (data.data.trackings[0].expected_delivery === null && data.data.trackings[0].tag != "Delivered") {
							exp = exp + '<strong style="color:lightCoral;">C U R R E N T L Y &nbsp;&nbsp; U N A V A I L A B L E !</strong>';
						} else if (data.data.trackings[0].expected_delivery === null && data.data.trackings[0].tag === "Delivered") {
							exp = exp + '<strong style="color:lightCoral;">D E L I V E R E D !</strong>';
						} else {
							exp = exp + '<strong style="color:lightCoral;">' + data.data.trackings[0].expected_delivery + '</strong>';
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
						var d = new Date(updateTimeArray[updateTimeArray.length - 1]);
						d.toLocaleDateString().replace(/\//g, '-');
						updateTime = updateTime + '<strong style="color:lightCoral; text-align:right;">' + d + '</strong>';
						var htm = htm + outer + '</tbody></th></table>';
						element1.classList.remove("_spinner");
						element2.classList.remove("_bounce1");
						element3.classList.remove("_bounce2");
						element4.classList.remove("_bounce3");
						var doc1 = document.getElementById("exp");
						var doc2 = document.getElementById("exp2");
						var doc = document.getElementById("data");
						//var classless = document.getElementById("foot");
						var breather = document.getElementById("breathe");
						breather.innerHTML = "";
						//classless.classList.remove("foot");
						//classless.classList.add("footChanger");
						doc1.innerHTML = exp;
						doc2.innerHTML = updateTime;
						doc.innerHTML = htm;
						document.getElementById('exp').scrollIntoView();
					} //track();
				} else {
					//console.log("sorry!");
					var trying = document.getElementById("exp");
					trying.innerHTML = '<strong style="color:lightCoral; margin-top:2%;">Well, that is an error! try submitting request again..</strong>';
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
	} //else

} //js

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-99377211-2', 'auto');
  ga('send', 'pageview');
