	function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
	}
	/*鼠标滑动时候出现*/
	window.onload = function(){
		var navU = $('nav').getElementsByTagName("li");
		var divN = $('main').getElementsByTagName("div");
		if(navU.length != divN.length){
			return;
		}

		for(var i=0; i<navU.length; i++){
			navU[i].id = i;
			navU[i].addEventListener("mouseover",function(){
				for(var j=0; j<navU.length; j++){
					navU[j].className = '';	
					divN[j].style.display = "none";
				}
				this.className = 'select';
				divN[this.id].style.display = "block";
				//console.log(i);
			});
		} 
	}