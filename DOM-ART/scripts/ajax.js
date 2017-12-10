function getHttpObject() {
	 if (typeof XMLHttpRequest=="undefine") 
	 	XMLHttpRequest=function (){
	 		try {
	 			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
	 		} catch(e) {}
	 		try {
	 			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
	 		} catch(e) {}
	 		try {
	 			return new ActiveXObject("Msxml2.XMLHTTP");
	 		} catch(e) {}
	 		return false;
	 	}
	 	return new XMLHttpRequest();
} 
function dispalyAjaxLoading (element) {
	 while (element.hasChildNodes()) {
	 	elements.removeChild(element.lastChild);
	 }
	 var content=document.createElement("img");
	 content.setAttribute("src", "images/loading.gif");
	 content.setAttribute("alt", "Loading.......");
	 element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
	var request=getHttpObject();
	if(!request) return false;
	dispalyAjaxLoading(thetarget);
	var dataparts=[];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element=whichform.elements[i];
		dataparts[i]=element.name+'='+encodeURIComponent(element.value);

	}
	var data=dataparts.join("&");
	request.open('POST',whichform.getAttribute("acton"),true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState==4) {
		if (request.readyState == 4 && request.status == 200) {
			var matches = request.responseText.match(/<article>([\s\S+])<\/article>/);
			if(matches.length>0) {
				thetarget.innerHTML=matches[1];
			}else{
				thetarget.innerHTML='<p>Oops, there was a error sorry</p>';
			}
		}else{
			    thetarget.innerHTML='<p>'+request.statusText+'</p>';
		}
	}
	};
	
	request.send(data);
	return true;

}