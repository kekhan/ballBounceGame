var canvas = document.getElementById('canvas');

var bar;
var ball;
var score=0;
var level=0;
var bgMusic;
var ballSound;
var highestScore=0;
const total = 5;
var host = 'http://localhost:3000';
fetch(host + "/highscore").then(resp => resp.json()).then(obj => {
	highestScore = obj.data;
	console.log(obj)
})

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');
var ctx= canvas.getContext('2d');
ctx.font = "30px Arial";
ctx.fillStyle="red";
ctx.fillText("Keep the Ball Up",innerWidth/4,40);
var colors = ['#4AB94E','#5E5EB3','#823D45','#21A68D','#317BC5'];

window.addEventListener('keydown',function(event){
	canvas.key= event.keyCode;
})
window.addEventListener('keyup',function(event){
	canvas.key=false;
})


function sound(src){
	/* plays music or sound*/
	this.sound=document.getElementById('music');
	this.sound.src=src;
	this.sound.setAttribute('preload','auto');
	this.sound.style.display="none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop=function(){
		this.sound.pause();
	}
}


function Rectangle(x,y,color,width,height,type){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.type=type;
	this.drawRectangle=function(){
		this.fillStyle=this.color;
		c.fillRect(this.x,this.y,this.width,this.height);

	}

	this.updateRectangle = function(){
		if(this.x>innerWidth-100 || this.x<0){
			this.x=-this.x;

		}
		if(canvas.key&&canvas.key==37){
			this.x-=15;
		}
		if(canvas.key&&canvas.key==39){
			this.x+=15;
		}
		this.drawRectangle();
	}

}

function Circle(x,y,radius,dx,dy,isCircle){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.dx=dx;
	this.dy=dy;
	this.color=colors[Math.floor(Math.random()*colors.length)];

	this.drawCircle=function(){
		if(isCircle){
			c.beginPath();
			c.arc(this.x,this.y,this.radius,0,2*Math.PI);
			c.fillStyle = this.color;
			c.fill();
		}
	}

	this.collision = function(){
		var barline = bar.y-this.height;

		if((this.x + this.radius) < bar.x + bar.width + 45 && (this.x + this.radius) > bar.x &&
               (this.y+this.radius) < bar.y + bar.height && (this.radius + this.y) > bar.y){
				barLine = this.y+this.radius;
				this.dy = -(dy * 2);
				ballSound.play()

				score++;
				console.log(score);
			}
			else if(this.y>bar.y){
				if(score>=highestScore){

					fetch(host+'/highscore', {method:'POST', body:JSON.stringify({score:score}), headers:{'content-type':'Application/json'}})
					highestScore=score;

				}
				console.log("Game Over");
				//alert("GAME OVER");
				score=0;
				level=0;
				//clearInterval(this.interval);
			}

	}
		this.updateCircle=function(){
		if((this.x+this.radius)>innerWidth || (this.x-this.radius)<0){
			this.dx=-this.dx;
		}
		else if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy=-this.dy;

		}
		//this.collision();
		this.drawCircle();
		this.x+=this.dx;
		this.y+=this.dy;
	}
}

// declare new objects
var ballx= Math.random()*innerWidth;
var bally= Math.random()*innerHeight;
bar = new Rectangle(innerWidth/4,innerHeight-30,'blue',150,20);
ball = new Circle(ballx,bally,30,4,4,true);
Scoretext= new Rectangle("30px", "Consolas", "white", 280, 40, "text");
ballSound= new sound('bounce.mp3');
const ballArray = [];
for(let i=0; i<=total; i++){
	let x= Math.random()*innerWidth;
	let y= Math.random()*innerHeight;
	ballArray.push(new Circle(x,y,30,4,4,true));
	console.log(ballArray[i]);
}

function animate(){
	/*this function repeatedly calls animate function*/

	//console.log(highestScore);
	requestAnimationFrame(animate);

	c.clearRect(0,0,innerWidth,innerHeight);
	bar.updateRectangle();
	ctx.font="30px Arial";
  ctx.fillStyle="#5E5EB3"
  ctx.fillText("Score:"+score,10,50);
  ctx.fillText("Level:"+level,200,50);
  ctx.fillText("High Score:"+highestScore,400,50);

	for(var i=0; i<=ballArray.length;i++){
		ballArray[i].updateCircle();
		ballArray[i].collision();
	}
    if(score>=30){
    	ctx.fillText("Great Job!!!",innerWidth/2,innerHeight/2);
    	level=3;

    }
    else if (score>=20){
    	ctx.fillText("Almost Leveling up!!",innerWidth/2,innerHeight/2);
    	level=2
    }
    else if(score>=10){
    	ctx.fillText("WOO HOOO!!",innerWidth/2,innerHeight/2);
    	level=1;
    }
	ball.collision();
	ball.updateCircle();







}
animate();
