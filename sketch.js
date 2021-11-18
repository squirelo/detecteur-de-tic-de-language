// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Speech Object
let speech;
let counter = 0;

let lastDecharge = Date.now();

function setup() {
  noCanvas();
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr-FR', gotSpeech);

  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = true;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  let output = select('#speech');
  let delaiMin = 4000;

  // Speech recognized event
  function gotSpeech() {

    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      console.log(said);
      if(said.toLowerCase().includes("et compagnie") && Date.now() - lastDecharge > delaiMin && said.length < 20){
        console.log("BOOOOM");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://192.168.137.74/PULSE=1", false ); // false for synchronous request
        xmlHttp.send( null );
        counter += 1;
        lastDecharge = Date.now();
        output.html("BOOM "+counter.toString());
      
      }
    }
  }
}
