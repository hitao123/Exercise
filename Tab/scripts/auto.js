	function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
	}
	/*自动切换*/
	window.onload = function(){
		//鼠标移开添加定时器，鼠标移入清除定时器
		var navU = $('nav').getElementsByTagName("li");
		var divN = $('main').getElementsByTagName("div");
		var index =0;
		var timer = null;
		if(navU.length != divN.length){
			return;
		}

		for(var i=0; i<navU.length; i++){
			navU[i].id = i;
			navU[i].addEventListener("mouseover",function(){
				clearInterval(timer);
				changeOption(this.id);
			});
			navU[i].addEventListener("mouseout",function(){
				timer = setInterval(autoPlay,1000);
			});

		} 

		function autoPlay(){
			index++;
			if(index >= navU.length){
				index = 0;
			}
			changeOption(index);
		}
		function changeOption(currentIndex){
			
			for(var j=0; j<navU.length; j++){
					navU[j].className = '';	
					divN[j].style.display = "none";
			}
			navU[currentIndex].className = 'select';
			divN[currentIndex].style.display = "block";
			index = currentIndex;
		}

	}