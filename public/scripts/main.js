window.addEventListener("load", function(){
    // link it
    var script = document.createElement("script");
    script.src = "../private/scripts/chess.js";
    document.head.appendChild(script);

});

// TODO sort of a searchbar engine :)
function handle(event) {
    self = document.getElementById("searchbar");
    if(self.value == 13) { // Enter
        // what do you do now?
    }
    else { // here I could make something to show current hits

    }
}
