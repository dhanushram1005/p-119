function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
    }
    
    function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    background("aqua");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
    }
    
    function classifyCanvas(){
        classifier.classify(canvas,gotResult);
    }
    
    function clearCanvas() {
        background("aqua");
    }
    
    function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    }
    
    function gotResult(error,results){
        if(error){
            console.error(error);
        }
        console.log(results);
        document.getElementById("label").innerHTML="label:"+results[0].label;
        document.getElementById("confidence").innerHTML="confidence:"+Math.round(results[0].confidence*100)+"%";
        utterThis= new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }