status="";
object=[];''


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
  
}

function modelLoad(){
    console.log("model loaded successfully");
    status=true;
  
}

function getResults(e,r){
if(e){
    console.error(e);
} 
else{
    console.log(r);
    object=r;
    document.getElementById("status").innerHTML="Objects Detected"
    document.getElementById("number_of_objects").innerHTML="number of objects are :"+r.length;   
}


}



function draw() {
image(video,0,0,380,380);
if(status!=""){
    cocossd.detect(video,getResults);
    for(i=0;i<object.length;i++){
        object_name=object[i].label;
        object_confidence=floor(object[i].confidence*100);
        object_width=object[i].width;
        object_height=object[i].height;
        object_x=object[i].x;
        object_y=object[i].y;
        fill("red");
         textSize(20);
        text(object_name+" "+object_confidence+"%",object_x,object_y);
        noFill()
        rect(object_x,object_y,object_width,object_height);
        if(finder_name==object_name){
            document.getElementById("status").innerHTML=finder_name+" found"
        }
        else{
            document.getElementById("status").innerHTML=finder_name+" not found"
        }
    }
}
// fill("red");
// textSize(20);
// text("dog",210,60);
// text("cat",330,100);
// noFill();
// rect(100,30,500,350);
// rect(300,80,300,310);
}


function start(){
    cocossd=ml5.objectDetector("cocossd",modelLoad);
document.getElementById("status").innerHTML="Started Detecting Objects";
finder_name=document.getElementById("text-input").value
}