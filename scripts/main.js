// do something for the main page (and app)



// do sth more: ( ;) )

window.addEventListener("load", function(){
    // link it
    var script = document.createElement("script");
    script.src = "../private/chess.js";
    document.head.appendChild(script);
});
function handle(event) {
    self = document.getElementById("search");
    if(self.value == 13) { // Enter
        // what do you do now?
    }
    else { // here I could make something to show current hits
        
    }
}
