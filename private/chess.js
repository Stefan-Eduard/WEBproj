// var _ = require('underscore'); // !!!!
// var http = require('http'); // node.js
//     function myFunc(paramObject) {
//     var defaultParams = {
//         param1: "first string",
//         param2: "second string",
//         param3: "third string"
//     };
//
//     var finalParams = defaultParams;
//
//     // We iterate over each property of the paramObject
//     for (var key in paramObject) {
//         // If the current property wasn't inherited, proceed
//         if (paramObject.hasOwnProperty(key)) {
//             // If the current property is defined,
//             // add it to finalParams
//             if (paramObject[key] !== undefined) {
//                 finalParams[key] = paramObject[key];
//             }
//         }
//     }
//    // var finalParams = $.extend(defaultParams, paramObject);
//     console.log(finalParams.param1,
//                 finalParams.param2,
//                 finalParams.param3);
// }

// data structures used for moves, etc.

// start from the top, but be simple

// STEPS

function link_stylesheet(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

function create_div_append(id, param_obj) { // by using an object for the parameter, we get the advantage of using any order for the params


    var d = document.getElementById(id);
    var new_d = document.createElement("div");
    for (key in param_obj) {
        if (key === "style") { // we presume we get style as an object
            for (var style_elem in param_obj[key]) {
                new_d[key][style_elem] = param_obj[key][style_elem];
            }
        } else
            new_d[key] = param_obj[key];
    }
    d.appendChild(new_d);
}

function pre_init() {
    // we load the CSS's used for adding the divs used for the hidden grid-row
    // STEP 1: we set the divs (with nothing inside them)
    create_div_append("main_container", {
        className: 'hid0',
    });
    create_div_append("main_container", {
        className: 'hid2',
    });
    // STEP 2: we insert a style to fix up the grid


}

function init() {
    // new cdn'sm underscore is optional
    var cdn_underscore = document.createElement("script");
    cdn_underscore.src = "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js";
    document.head.appendChild(cdn_underscore);
    // new tags
    // var chess_div = document.createElement("div");
    // //end_div.innerHTML = "chess div";
    // chess_div.className = "chess";
    // chess_div.id = "chess_div";
    // document.body.appendChild(chess_div); /// !!!
    // //
    // we first insert a background: a blank, coloured div
    var blank_div = document.createElement("div");
    blank_div.width = "auto";
    blank_div.height = "auto";
    blank_div.style.color = "grey";
    blank_div.className = "chess_container";
    var main_container = document.getElementById("main_container");
    main_container.appendChild(blank_div); ///
    var chess_container = document.createElement("div");
    chess_container.id = "chess_container";
    chess_container.className = "chess_container";
    main_container.appendChild(chess_container);
    /* for (**) */
    // var style = document.createElement("style");
    // style.innerHTML = " .hid1 { grid: hid1; } ";
    // document.body.insertBefore(style, main_container);
    // */
    // table JS, part2
    var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var counter = 0;
    for (var j = 1; j < 9; j++) {
        for (var i in alpha) {
            counter++;
            if (counter % 2 !== 0) {
                create_div_append("chess_container", {
                    innerHTML: alpha[i] + j,
                    /* (*) - see about this and piece capturing in play() */
                    className: alpha[i] + j,
                    style: {
                        padding: 3,
                        borderRadius: "3px",
                        color: "#d90429",
                        backgroundColor: "#d90429"
                    },

                });
            } else {
                create_div_append("chess_container", {
                    innerHTML: alpha[i] + j,
                    /* (*) - see about this and piece capturing in play() */
                    className: alpha[i] + j,
                    style: {
                        padding: 3,
                        borderRadius: "3px",
                        color: "#edf2f4",
                        backgroundColor: "#edf2f4"
                    },

                });
            }
            //
        }
        counter++;
        // create_div_append("chess_container", {
        //     className: 'aux_div',
        //     hidden: "true"
        // });
    }
    // table css
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../private/chess_grid.css";
    document.head.appendChild(link);
    //
    var link = document.createElement("link");
    link.rel = "stylesheet";
    // document.getElementsByClassName("hid0").item(0).innerHTML = "hid0";
    // document.getElementsByClassName("hid2").item(0).innerHTML = "hid2";
    link.href = "../private/main_container.css";
    document.head.appendChild(link);
    document.getElementById("chess_btn").style.display = "none";
    // pieces js
    /*create_img_append("chess_container", { // first hop, I need a rather more all in all funtion

    }*/

    function insert_piece(div_cls, img_src, img_cls) {
        var img = document.createElement("img");
        img.className = "none";
        img.width = "34"; // attention to padding of zero for the divs
        img.height = "34";
        img.align = "center";
        img.src = img_src;
        img.className = img_cls;
        // img.align = "middle";
        var div = document.body.getElementsByClassName(div_cls).item(0);
        div.innerHTML = "";
        div.appendChild(img);
        // (*) make an array of functions
        // (*) the events will be hovering & cliking over a "rook", "knight", "king", etc. class element
    }


    // this is the variant with every piece having an id
    for (var i in alpha) {
        insert_piece(alpha[i] + 2, "../private/icons/icons8-pawn-80.png", "pawn");
        insert_piece(alpha[i] + 7, "../private/icons/icons8-pawn-80 (1).png", "pawn");
    }
    //
    insert_piece("a1", "../private/icons/icons8-rook-80.png", "rook");
    insert_piece("h1", "../private/icons/icons8-rook-80.png", "rook");
    insert_piece("a8", "../private/icons/icons8-rook-80 (1).png", "rook");
    insert_piece("h8", "../private/icons/icons8-rook-80 (1).png", "rook");
    //
    insert_piece("b1", "../private/icons/icons8-knight-80.png", "knight");
    insert_piece("g1", "../private/icons/icons8-knight-80.png", "knight");
    insert_piece("b8", "../private/icons/icons8-knight-80 (1).png", "knight");
    insert_piece("g8", "../private/icons/icons8-knight-80 (1).png", "knight");
    //
    insert_piece("c1", "../private/icons/icons8-bishop-80.png", "bishop");
    insert_piece("f1", "../private/icons/icons8-bishop-80.png", "bishop");
    insert_piece("c8", "../private/icons/icons8-bishop-80 (1).png", "bishop");
    insert_piece("f8", "../private/icons/icons8-bishop-80 (1).png", "bishop");
    //
    insert_piece("d1", "../private/icons/icons8-king-80.png", "king");
    insert_piece("e1", "../private/icons/icons8-queen-80.png", "queen");
    insert_piece("d8", "../private/icons/icons8-queen-80 (1).png", "queen");
    insert_piece("e8", "../private/icons/icons8-king-80 (1).png", "king");
    // nope // document.getElementById("chess_container").appendChild(pwn);

    // // last things:
    // // copy the margin of main_menu to the content
    // var menu_marg = document.getElementById("main_menu").style.marginTop;
    // console.log(menu_marg);
    // document.getElementsByClassName("content").item(0).style.marginTop = menu_marg;

    // lastly:
    // hid0 and hid1 interface adding
    /// hid0 creation, styling, and interface
    var hid0 = document.getElementsByClassName("hid0").item(0);
    hid0.style.alignSelf = "stretch";
    // hid0 contains a history of the
    hid0.style.overflowX = "hidden";
    hid0.style.overflowY = "scroll";
    // create a function used to write another div to the box
    function get_fn0() {
        var father = hid0;
        var counter = 1; // may bring unexpected modifications, but I'll do them
        // (*)also, if counter is odd/even, can add to a prev or next message
        // (*)yeah, should only keep the info from the present game and log the rest
        function increment(msg) {
            if (counter % 2 === 1) {
                var new_div = document.createElement("div");
                new_div.className = "msg"; // this ensures that every box is styles
                new_div.innerHTML = (counter + 1) / 2 + ". " + msg;
                father.appendChild(new_div);
                counter++;
            } else { // add to the last log
                var logs = hid0.getElementsByClassName("msg");
                logs.item(logs.length - 1).innerHTML = logs.item(logs.length - 1).innerHTML + ", " + msg;
                counter++;
            }
        }
        increment.reset = function() { // yet, it gave me an easy way to reset the counter for each game:)))
            counter = 0;
        }
        // increment.peek() { // fascinating, but unnecessary
        //     return counter;
        // }
        return increment;
    }
    var fn0 = get_fn0(); // this is a function to add a msg to the created div (hid0)
    // now we add the stylesheet

    [ // example of a template game
        'e4', 'c5', 'Nf3', 'g6', 'd4', 'b6', 'c3', 'f5', 'Bd3', 'h6', 'exf5', 'gxf5',
        'Bxf5', 'e6', 'Bg6+', 'Ke7', 'd5', 'exd5', 'Qxd5', 'Nc6', 'Bf4', 'h5', 'Qf7',
        "1-0"
    ].forEach(function(value, key) {
        fn0(value); // (*) check out the prof's variant, the answer lies there
    });
    link_stylesheet("../private/msg.css");
    /// hid2 creation, styling, and interface
    var hid2 = document.getElementsByClassName("hid2").item(0);
    hid2.innerHTML = "H2";
    hid2.style.alignSelf = "stretch";
    // now add the stylesheet

    link_stylesheet("../private/hid.css");
    var anchor = document.createElement("a");
    anchor.href = "#chessModerator";
    anchor.className = "centered";
    var img = document.createElement("img");
    img.src = "../private/icons/icons8-moderator-80.png";
    img.style.height = "64";
    img.style.width = "64";
    img.style.display = "inline-block";
    anchor.appendChild(img);
    document.getElementById("chess_btn").parentNode.appendChild(anchor);
    //
    // LAST STEP (*)
    // (*) now I try interchanging them :D

    // (*) auxiliary link_stylesheet
    link_stylesheet("../private/class_style.css")
    var pawns = document.getElementsByClassName("pawn");
    // let's only do it for two of them
    function context(index) {
        var self = pawns.item(index),
            parent = self.parentNode;
        var start = 1, // it didn't start
            white = 1; // it is white
        if (parent.className[1] == '2')
            console.log(1);
        else
            console.log(0);

        var fn = {}; // here we push the function that return all the possible (and impossible) positions to get to
        var move = {
            "pawn": [ // (****) // read as "YOU move A key"
                [ // when starting
                    [0, 0],
                    [0, 1],
                    [0, 2]
                ], // after starting
                [ // w/o capture
                    [0, 1]
                ],
                [ // w/. capture
                    [-1, 1],
                    [+1, 1]
                ] // take
            ],
            "knight": [ // (****) // read as "YOU move A key"
                // always
                [-2, -1],
                [-2, +1],
                [-1, -2],
                [-1, +2],
                [+1, -2],
                [+1, +2],
                [+2, -1],
                [+2, +1]
            ]
        };
        // (****) frame for general moving
        function nextChar(c, inc) {
            return String.fromCharCode(c.charCodeAt(0) + inc);
        } // beautiful
        function nextCode(orig, inc0, inc1) {
            // var copiedObject = jQuery.extend(true, {}, originalObject) --> maybe I bump into it
            return nextChar(orig[0], inc0) + nextChar(orig[1], inc1);
        }
        fn["pawn"] = function(self = "") {
            aux = {};
            for (var i in move["pawn"]) {
                var newCode = nextCode(className, move["pawn"][i][0], move["pawn"][i][1]);
                if (aux[newCode] === undefined) {
                    aux[newCode] = 1; // the value doesn't matter, I can later extract the key in an array
                }
            }
            ret = [];
            for (var i in aux) {
                if (true) //
                    ret.push(i);
            }
            // now, we check if they are actually good
            for (var next in ret) {
                if(self[1] === next[1]) { // same column
                    if(document.getElementsByClassName(ret[next]).item(0).children.length === 1) { // there is a piece here
                        ret.splice(next, 1);
                    }
                }
                else {
                    var children = document.getElementsByClassName(ret[next]).item(0).children;
                    if(children.length === 1)  {
                        var child = children[0];
                        if(child.className[child.className.length - 1] == 1)
                            ; // (*) here I remained
                    }
                }

            }
        };
    }
    //
    function listener() {
        var position = parent.className;
        if (1 === 1) { // (*)
            //console.log(parent.className); // just to verify, (/) ---> means delete afterwards
            // highlight

            var self_class = self.className;
            self.className = self_class + " chess_highlight"; //

            // var children = self.parentNode.parentNode.childNodes; // parent of parent is the .main_container div
            // var highlighted = Array.from(children);
            // //     for(var i = children.length; i--; highlighted.unshift(children[i]));
            // for (var i in highlighted)
            //     if (self.parentNode === highlighted[i]) {
            //         position = parseInt(i);
            //         break;
            //     }


            // (*)
            // var highlighted_to_be = [];
            // for (var i in for_pawn) {
            //     for (var j in for_pawn[i]) {
            //         var cls = self.parentNode.className;
            //         highlighted_to_be.push(nextCode(cls, for_pawn[i][j][0], for_pawn[i][j][1]));
            //         // (****) and I also have to check it to be inside the board, and the test of no piece over there :)
            //     }
            // }
            // for (var i in highlighted_to_be) {
            //     console.log(highlighted_to_be[i]);
            //     var elem = document.getElementsByClassName(highlighted_to_be[i]).item(0);
            //     var prev = elem.className;
            //     elem.className = prev + " chess_highlighted";
            // }

            // console.log(i);
            // console.log(highlighted[i]);
            // j = i; // look at this comedy, I literaly tried with this so as not to work with too many strings
            // console.log(j);
            // console.log(highlighted[j]);
            // (***) for rook:
            // regex("/" + self.parentNode.className[0] + "./");

            // highlighted[i+8].className = "chess_highlight";
            // highlighted[i + 16];
            // so, we did get all the divs in the "board", now we can do anything with them

            // push all of them
            console.log("timein"); //
            window.setTimeout(function() {
                self.className = self_class;
                console.log("timeout"); //
            }, 1000);
        } else {

        }
    }
    self.addEventListener("click", listener);

    for (var i = 0; i < pawns.length; i++)
        context(i);
    /*for(var i = 0; i < pawns.length; i++){
        var parent = pawns.item(i).parentNode; // only the last one remains
        var start = 1, // it didn't start
            white = 1; // it is white
        if(parent.className[1] == '2')
            console.log(1);
        else
            console.log(0);
        pawns.item(i).addEventListener("click", function() { // (*) it has parent, start, white in its context
            if (start === 1) {
                if(parent.className[1] == '2')
                    console.log(1);
                else
                    console.log(0);
            }
            else {

            }
        });
        console.log(parent.className);
    } */

    var fn = [];
    fn["pawn"] = function() {
        // we get the position -- the parent's class
        var pwn = document.getElementsByClassName("pawn").item(0);
    };
    fn["rook"] = function() {

    };
    fn["knight"] = function() {

    };
    fn["bishop"] = function() {

    };
    fn["queen"] = function() {

    };
    fn["king"] = function() {

    };
}



/*
function pre_play() {
    // set up the pieces

    //can you check if the board is ready?
    var pwn = document.createElement("img");
    pwn.src = "./icons/icons8-pawn-80.jpg";
    pwn.alt = "too bad";
    pwn.align = "center";
    pwn.width = 30px;
    var sqr = document.getElementsByClassName("a1").item(0);
    sqr.appendChild(pwn);
} */

function play() {

}

function end_game() {
    pre_init();
    // init(); // called by the pressed button,
    //pre_play();
    //play();
}

window.addEventListener("load", end_game);
window.addEventListener("load", function() {

});
//
/*
template
we get to identify the divs
we modify the contents
and we modify the classes
*/

// function select_div(cls = "") {
//     // we select a certain html div
//     var d document.getElementsByClassName(cls).item(0);
//     // now, we have the presumption of --- there is only one element with this class
//     // so we're only interested in the first one
//     return d;
//
// }

function test() { // out of function
    // var css_link = document.createElement("link");
    // css_link.rel = "stylesheet";
    // css_link.href = "../private/container1.css";
    // document.head.appendChild(css_link);
    // without on... for this (*)
    var d1 = document.getElementsByClassName("a1").item(0);
    var d2 = document.getElementsByClassName("a2").item(0);
    d1.addEventListener("mouseenter", function() {
        d1.className = "a2";
        d2.className = "a1";
    });
    d2.addEventListener("mouseenter", function() {
        d1.className = "a2";
        d2.className = "a1";
    });
    //
    var css_link = document.createElement("link");
    css_link.rel = "stylesheet";
    css_link.href = "../private/partial_container.css";
    document.head.appendChild(css_link);
}
