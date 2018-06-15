var myObstacles=[];
var shots=0;
var myScore;
var score=0;
var shotFlag=0;
var crashFlag=0;
var crashObstaclesFlag=0;
var myShots;
var pause=0;

function startGame() {
     
    tank1=new component(100,50,"green",0,myGameArea.height-50,"image");
    tank2=new component(100,50,"green",myGameArea.width-100,myGameArea.height-50,"text");
    myScore = new component("50px", "Consolas", "white", 550, 40, "text");
    gameOver=new component("50px","Consolas","white",200,250,"text");
    countDown=new component("100px","Consolas","white",800/2-50,500/2,"text");
    shoot=new component("50px","Consolas","red",100/2,50,"line");
    shootingLine=new component("50px","Consolas","red",100/2,50,"line");
    myShots=new component("50px","Consolas","white",5,40,"text");
    mySound=new sound("explode.mp3");
    
    myBells=new sound("bells.mp3");
    finalBell=new sound("final bell.mp3");
    
    
    
    if(window.confirm("do you want to play audio?"))
    { 
        init();
        myGameArea.start();
        makeObstacles();
        flagSound=1;var count = 4;
function anim() {

    if (count >= 0) {
        myGameArea.clear();
        if(count>0)
        {countDown.text=count;
            myBells.play();}

    else
        {countDown.text="GO!";
         finalBell.play();
     }
    
        countDown.update();

        count--;
        setTimeout(anim, 2000);

    }
    else {
    


   
    main();}
        
    }

anim();
}
else{ 
    init();
    flagSound=0;
    myGameArea.start();
    makeObstacles();
    var count=4;
    function anim() {
    if (count >= 0) {
        myGameArea.clear();
        if(count>0)
        {countDown.text=count;
            }

    else
        {countDown.text="GO!";
         
     }
    
        countDown.update();

        count--;
        setTimeout(anim, 2000);

    }
    
    

 else
    
    main();
        
    }

anim();
}


}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
       
        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
}



function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;
    var x1=x;
    var y1=y;
    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if(this.type=="circle"){
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.arc(this.x,this.y,this.width,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fillStyle=color;
            ctx.fill();



        }else if(this.type=="line")
        {
            ctx.beginPath();
        ctx.moveTo(100,myGameArea.canvas.height-50);
        ctx.lineTo(this.x,this.y);
        ctx.strokeStyle = 'red';
        ctx.stroke(); 
        shotFlag=1;  
            
   
    

        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    
    
    this.crashWith = function(otherobj) {
        var myx = this.x;
        
        var myy = this.y;
       
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        if ((myx>=otherleft)&&(myx<=otherright)&&(myy>=othertop)&&(myy<=otherbottom))
        {  crash= true;}

        return crash;
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function makeObstacles(){
   for(var i=100;i<=myGameArea.canvas.width-120;i=i+10){
    console.log(i);
    console.log(myGameArea.canvas.width);

        minHeight = 0;
        maxHeight = 350;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        

        myObstacles.push(new component(20, height, "green", i,myGameArea.canvas.height-height ));
        
        console.log(i);

}}


function generate(){
    for(var i=0;i<myObstacles.length;i++)
        myObstacles[i].update();
    init();
    ctx=myGameArea.context;
    ctx.drawImage(image1,0,myGameArea.canvas.height-50,100,50);
    ctx.drawImage(image2,myGameArea.canvas.width-100,myGameArea.canvas.height-50,100,50);
}


var image1=new Image();
var image2=new Image();
var imgcount=0;
function init(){
    image1.src="tank2.png";
    image2.src="myImage.jpg";
    

}



function move(event){
    
    var x=event.clientX;
    var y=event.clientY;
    shoot.x=x;
    shoot.y=y;
    if(shots<10){
        shoot.update();
        setTimeout(check,1000);}
        
        }



    function check(){

                            
    if(crashObstaclesFlag===0){
        tank1.x=100;
        tank1.y=myGameArea.canvas.height-50;
        console.log(tank1.x+" "+tank1.y);
    
    var m=(tank1.y-shoot.y)/(shoot.x-tank1.x);
    var c=tank1.y-(m*tank1.x);
    console.log(m);
    for(var i=0;i<myObstacles.length;i++)
    {for(var x=0;x<shoot.x;x++)
    {  
        var y=(m*x) +c;
        console.log(y);
        shootingLine.x=x;
        shootingLine.y=y;

        if(shootingLine.crashWith(myObstacles[i])){
            crashObstaclesFlag=1;
            console.log("crash happens");
            break;

        }}
        if(crashObstaclesFlag===1){
            shots++;
            break;
            }}}


                     

                           

                            if(shoot.crashWith(tank2)&&(crashObstaclesFlag===0)){
                            shots++;
                            score++;
                            crashFlag=1;
                            

                        }
                    



                            if((crashFlag===1)||(crashObstaclesFlag===1))
                            {mySound.play();
                            
                            myScore.text="Score :"+score;
                            myShots.text="shots over:"+shots;
                            myScore.update();
                            myShots.update();
                            shotFlag=0;
                            main();


                        

                     }else
                          {shots++;
                            shotFlag=0;
                            main();
                         }


               if(shots===10){

            myGameArea.clear();
            gameOver.text="Game over";
            gameOver.update();
            var p=document.getElementsByTagName("p")[0];
            var btn=document.createElement("button");
           // Create a <button> element
            var t = document.createTextNode("Reset");       // Create a text node
            btn.appendChild(t);                                // Append the text to <button>
            p.appendChild(btn);
            btn.setAttribute("onclick","reset()"); 
            console.log("reset");
            btn.setAttribute("style","background-color:red;border:1;text-align: center;display: inline-block;font-size: 16px;color:white;width:100px;height:50px");
             

               }
                    

                    
                    

                }





function main()
{myGameArea.canvas.addEventListener("mousedown",move,false);
    myGameArea.clear();
    myScore.text="Score :"+score;
    myShots.text="shots over :"+shots;
            myScore.update();
            myShots.update();
    
    generate();
    console.log(shots);
    crashObstaclesFlag=0;
    crashFlag=0;
    }
    


function reset()  
 {
    
    myScore.text="SCORE:0";
    myObstacles=[];
    myShots.text="shots over: 0";



    var button=document.getElementsByTagName("button")[0];
    button.parentNode.removeChild(button);
    var canvas=document.getElementsByTagName("canvas")[0];
    canvas.parentNode.removeChild(canvas);
    shots=0;
    score=0;
    startGame();
    console.log("hello");

    
 }      
    
   