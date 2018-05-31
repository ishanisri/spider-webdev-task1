var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tank1img = document.getElementById("tank1");  
var mountimg=document.getElementById("mount");
var tank2img=document.getElementById("tank2");
 
var score=0;
var chances=0;

function startGame() {

	
	ctx.drawImage(mountimg,0,0,580,320);
    ctx.drawImage(tank1img,480,220,100,100);
    
    
    
    ctx.drawImage(tank2img,0,220,100,100);
    scorecount("20px",'Consolas',"red",530,50,0);
    

    
    
}


      


canvas.addEventListener("mousedown",move,false);
 function move(event){
 	if(chances<10){
 	chances=chances+1;
 	
	var x=event.clientX;
	var y=event.clientY;
	console.log(x+" "+y);
    
 
	update(x,y);

	collision(x,y);
	scorecount("20px","Consolas",'red',530,50,score);
    
	console.log("hi");}
	else
	{
		ctx.clearRect(0,0,580,320,false);
		ctx.fillStyle = 'white';
      ctx.fillText('Game Over', (580/2)-20, (320/2));


	}
	

}


function update(x,y){
	
    ctx.clearRect(0,0,580,320);
    var image = new Image();
    var str=canvas.toDataURL();
    image.src=str ;
    image.crossOrigin= 'anonymous';
    ctx.drawImage(image,0,0,580,320);
    
   
  	ctx.beginPath();
  	ctx.moveTo(50,270);
  	ctx.lineTo(x,y);
  	ctx.strokeStyle = 'red';
    ctx.stroke();   
}


function scorecount(width,height,color,x,y,text){
	    ctx.font = width + " " +height;
      ctx.fillStyle = color;
      ctx.fillText(text.toString(), x, y);
      console.log("hi");
}


function collision(x,y){
	console.log("Checking collision");
	if(x>=480&&x<=580&&y>=220&&y<=320){
		console.log("Collision detected");
		score=score+1;
		
	}
    for(var x1=50;x1<=x;x1++)
    { var m=(y-270)/(x-50);
    	var y1=m*x1+(270-(m*50));
    	var p=ctx.getImageData(x1,y1,1,1).data;
    	var r=p[0];
    	var g=p[1];
    	var b=p[2];
    	if(r==0&&g==255&&b==0)
    		{console.log("Collision with mountain");
    	break;}


}




}




//function to generate mountains randomly
/*
  function mountain()
  {
  	var stx=50;
  	var sty=320;
  	var endx=530;
  	var endy=320;
  	ctx.beginPath();
  	for(var i=stx;i<=endx;i=i+5)
  	{
  		var y=Math.floor(Math.random()*320);

  		ctx.moveTo(stx,sty);
	   ctx.lineTo(i,y);
	   sty=y;
	   stx=i;
	   ctx.strokeStyle = "green";
	   ctx.stroke();
  	}


  }*/





