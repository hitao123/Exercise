var WINDOW_HEIGHT = 768;
var WINDOW_WIDTH  = 1024;
var RADIUS        = 10;
var MARGIN_TOP    = 20;
var MARGIN_LEFT   = 10;

var  endTime = new Date();
endTime.setTime(endTime.getTime()+2*3600*1000); //设置倒计时
var curShowTimeSeconds = null;
var balls = []; //用来存储小球对象
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


window.onload = function(){
     WINDOW_WIDTH  = document.body.clientWidth;
     WINDOW_HEIGHT = document.body.clientHeight;
     RADIUS        = Math.round(WINDOW_WIDTH *4 /5 /108)-1; //
     MARGIN_TOP    = Math.round(WINDOW_HEIGHT / 5); //
     MARGIN_LEFT   = Math.round(WINDOW_WIDTH  / 10); //
     var canvas = document.getElementById('canvas'); //
     var cxt    = canvas.getContext('2d');
     canvas.width  = WINDOW_WIDTH;
     canvas.height = 600; 

     curShowTimeSeconds = getCurrentShowTimeSeconds(); //这里获取的是倒计时2小时的秒数
     console.log(curShowTimeSeconds);
     var timer = setInterval(function(){
     	 render(cxt);
     	 updateDigit();
         
     }, 50); //设置定时器
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret /1000);  //计算距离倒计时的毫秒数
	return ret >0 ? ret : 0 ;
}

function RenderDigit (x,  y,  num,  cxt){
	cxt.fillStyle = "rgba(0,102,153,0.9)";
	for (var i = 0; i < digit[num].length; i++) {
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
				cxt.closePath();
				cxt.fill();
			}
		}
	}

}

function addBalls(x,  y,  num){

	for (var i = 0; i < digit[num].length; i++) {
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
			var ball = {
			   	x     : x+j*2*(RADIUS+1)+(RADIUS+1), 
			   	y     : y+i*2*(RADIUS+1)+(RADIUS+1),
			   	vx 	  : Math.pow(-1, Math.floor(Math.random()*1000))*4,
			   	vy    : -5,
			   	g     : 1.5+Math.random(),
			   	color : colors[Math.floor(Math.random()*colors.length)]
            }
            balls.push(ball);
			}
		}
	}
}

function updateDigit(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds(); //

	var nextHours   = parseInt(nextShowTimeSeconds/3600); 
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
	var nextSeconds = parseInt(nextShowTimeSeconds%60);
    
	var curHours   = parseInt(curShowTimeSeconds/3600); 
	var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = parseInt(curShowTimeSeconds%60);

	if(nextShowTimeSeconds != curShowTimeSeconds){
         
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

	}
	curShowTimeSeconds = nextShowTimeSeconds;
	updateBall();
	console.log(balls.length);
	
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,600);

    var Hours   = parseInt(curShowTimeSeconds / 3600, 10);
    var Minutes = parseInt((curShowTimeSeconds - Hours*3600)/60, 10);
    var Seconds = parseInt(curShowTimeSeconds%60, 10);

    RenderDigit (MARGIN_LEFT,                MARGIN_TOP,  parseInt(Hours/10),  cxt);
    RenderDigit (MARGIN_LEFT+15*(RADIUS+1),  MARGIN_TOP,  parseInt(Hours%10),  cxt);
    RenderDigit (MARGIN_LEFT+30*(RADIUS+1),  MARGIN_TOP,  10,  cxt); //分号
    RenderDigit (MARGIN_LEFT+39*(RADIUS+1),  MARGIN_TOP,  parseInt(Minutes/10),  cxt);
    RenderDigit (MARGIN_LEFT+54*(RADIUS+1),  MARGIN_TOP,  parseInt(Minutes%10),  cxt);
    RenderDigit (MARGIN_LEFT+69*(RADIUS+1),  MARGIN_TOP,  10,  cxt); //分号
    RenderDigit (MARGIN_LEFT+78*(RADIUS+1),  MARGIN_TOP,  parseInt(Seconds/10),  cxt);
    RenderDigit (MARGIN_LEFT+93*(RADIUS+1),  MARGIN_TOP,  parseInt(Seconds%10),  cxt);
    for (var i = 0; i < balls.length; i++) {
    	cxt.fillStyle = balls[i].color,
    	cxt.beginPath();
    	cxt.arc(balls[i].x , balls[i].y , RADIUS , 0,2*Math.PI);
    	cxt.closePath();
    	cxt.fill();
    }
}
function updateBall(){

	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y >= 600-RADIUS){
         balls[i].y  = 600-RADIUS;
         balls[i].vy = -balls[i].vy*0.75;
	    }

	}
	//边界以及性能控制
	var count = 0;

	for (var i = 0; i < balls.length; i++) {

		if(balls[i].x+RADIUS > 0 && balls[i].x-RADIUS < WINDOW_WIDTH){
		balls[count++] = balls[i]; //将在视野范围内的小球存储起来
	    }
	}
	
	while(balls.length > count){ //假如数组存储小球个数，即不在视野内，弹出
		balls.pop();
	}

}


