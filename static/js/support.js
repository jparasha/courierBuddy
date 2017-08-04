function about (data){
	if (data==="offerings"){
		var offerings=document.getElementById('foot');
		offerings.scrollIntoView();
		
	}
	else if(data==='learnMore'){
		var text= "<h2>More Details Coming Soon!</h2>"
		var learnMore = document.getElementById('learnMore');
		var show = document.getElementById('learnMoreHide');
        show.classList.remove('hidden');
		learnMore.innerHTML=text;
	}
}
function contact(){
	var name= document.getElementById('name').value;
	var email=document.getElementById('email').value;
	var issue=document.getElementById('issue').value;
	var text=document.getElementById('text').value;
	var body = {
		"name":name,
		"email":email,
		"issue":issue,
		"text":text
	};//
	console.log(body);
	
	var success=document.getElementById('success');
	var successText="Query Added successfully! ";
	var form = document.getElementById("Form");
	//var url="http://localhost:8000/contact";
	var url="https://couriermgmt.herokuapp.com/contact";
	fetch(url, {
			method: "post",
			json: true,
			headers: {
				"content-type": "application/json",
				"json":true
			},
			body: JSON.stringify(body)
		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			success.innerHTML=successText;
			form.reset();
		}).catch( function(){
		var text="error occured!"
		success.innerHTML=text;
	});
	
}
//js

function trackDirect(){
    var code = document.getElementById("code").value;
	var slug = document.getElementById("slug").value;
    var obj ={
        "slug":slug,
        "code":code
    }
    console.log(obj +"hi");
}
