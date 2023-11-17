function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function draw() {
    //Grosor de la linea
    strokeWeight(10);
    //color de la linea
    stroke(0);
    //condicion para crear dibujo
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }else{
        console.log(results);
        document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;
        document.getElementById('confidence').innerHTML = 'Presición: ' + Math.round(results[0].confidence * 100) + '%';
        utterThis= new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}


