var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var bar;
var ball;
var score=0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c.font = "30px Arial";
c.fillStyle="red";
c.fillText("Keep the Ball Up",innerWidth/4,40);
var colors = ['#2C3E50','#FC4349','#D7DADB','#6DBCDB','#FFFFFF'];
window.addEventListener('keydown',function(event){
	canvas.key= event.keyCode;
})
window.addEventListener('keyup',function(){
	canvas.key=false;
})

function Circle(x,y,radius,dx,dy){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.dx=dx;
	this.dy=dy;
	this.color=colors[Math.floor(Math.random()*colors.length)];

	this.drawCircle=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,2*Math.PI);
		c.fillStyle = this.color;
		c.fill();
	}
	this.updateCircle=function(){
		if((this.x+this.radius)>innerWidth || (this.x-this.radius)<0){
			this.dx=-this.dx;
		}
		else if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy=-this.dy;

		}
		this.drawCircle();
		this.x+=this.dx;
		this.y+=this.dy;
	}
	this.collision = function(){
		var barline = bar.y-this.height;

		if((this.x +this.radius) < bar.x + bar.width && (this.x + this.radius) > bar.x &&
               (this.y+this.radius) < bar.y + bar.height && (this.radius + this.y) > bar.y){
				barLine = this.y+this.radius;
				this.dy = -(dy * 2);
				score++;
			}
			else if(this.y>bar.y){
				console.log("Game Over");
				alert("GAME OVER");
				score=0;
				//clearInterval(this.interval);
			}

	}


}


function Rectangle(x,y,color,width,height){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;

	this.drawRectangle=function(){
		this.fillStyle=this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
	this.updateRectangle = function(){
		if(canvas.key&&canvas.key==37){
			this.x-=10;
		}
		if(canvas.key&&canvas.key==39){
			this.x+=10;
		}
		this.drawRectangle();
	}
}

var ballx= Math.random()*innerWidth;
var bally= Math.random()*innerHeight;
bar = new Rectangle(innerWidth/4,innerHeight-30,'red',150,10);
ball = new Circle(ballx,bally,30,4,4);

function animate(){
	/*this function repeatedly calls animate function*/
	console.log('score',score);
	
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	ball.collision();
	ball.updateCircle();

	bar.updateRectangle();
	



}
animate();