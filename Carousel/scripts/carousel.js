function $(id) {
return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function(){
	var ulLinks = $('pic').getElementsByTagName("li");
	var olLinks = $('order').getElementsByTagName("li");
	var pic = $('pic');
	var index = 0;
	var timer = null;
	if(ulLinks.length != olLinks.length){
		return;
	}
	for(var i = 0; i < olLinks.length; i++){
		olLinks[i].id = i;
		olLinks[i].addEventListener('mouseover', function(){
			var that = this;
			clearInterval(timer);
			changeOption(that.id);
		});
		olLinks[i].addEventListener('mouseout', function(){
			timer = setInterval(autoPlay, 2000);
		});		
	}
	$('fl').getElementsByTagName('a')[0].addEventListener('click', function(){
		index--;
		if(index<0){
			index = olLinks.length-1;
		}
		changeOption(index);
	});
	$('fr').getElementsByTagName('a')[0].addEventListener('click', function(){
		index++;
		if(index >= olLinks.length){
			index = 0;
		}
		changeOption(index);
	});
	function autoPlay(){
		index++;
		if(index >= olLinks.length){
			index = 0;
		}
		changeOption(index);
	}
	function changeOption(currentIndex){
		for(var i = 0; i < olLinks.length; i++){
			olLinks[i].className = '';
		}
		olLinks[currentIndex].className = 'select';
		pic.style.top = -currentIndex*170 + 'px';
		index = currentIndex;		
	}
}