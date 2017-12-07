var canvas = document.getElementById('canvas');

var bar;
var ball;
var score=0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');
var ctx= canvas.getContext('2d');
ctx.font = "30px Arial";
ctx.fillStyle="red";
ctx.fillText("Keep the Ball Up",innerWidth/4,40);
var colors = ['#2C3E50','#FC4349','#D7DADB','#6DBCDB','#FFFFFF'];

window.addEventListener('keydown',function(event){
	canvas.key= event.keyCode;
})
window.addEventListener('keyup',function(event){
	canvas.key=false;
})


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




var ballx= Math.random()*innerWidth;
var bally= Math.random()*innerHeight;
bar = new Rectangle(innerWidth/4,innerHeight-30,'blue',150,20);
ball = new Circle(ballx,bally,30,4,4,true);

function animate(){
	/*this function repeatedly calls animate function*/
	console.log('score',score);
	ctx.font="30px Arial";
    ctx.fillStyle="#FC4349"
    ctx.fillText(score,10,50);
	
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	ball.collision();
	bar.updateRectangle();
	ball.updateCircle();

	
	



}
animate();