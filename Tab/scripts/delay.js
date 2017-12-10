	function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
	}
	/*鼠标点击延时切换*/
	window.onload = function(){
		var navU = $('nav').getElementsByTagName("li");
		var divN = $('main').getElementsByTagName("div");
		var timer = null;
		if(navU.length != divN.length){
			return;
		}

		for(var i=0; i<navU.length; i++){
			navU[i].id = i;
			navU[i].addEventListener("click",function(){
				var that = this;
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					for(var j=0; j<navU.length; j++){
						navU[j].className = '';	
						divN[j].style.display = "none";
					}
					//这里由于匿名函数想访问外部函数，此时是闭包，
					//匿名环境this 指向 window 对象
					that.className = 'select';
					divN[that.id].style.display = "block";
				},50);

			});
			
		} 
	}		