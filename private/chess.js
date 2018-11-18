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
    for (key in param_obj)
        new_d[key] = param_obj[key];
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
    var main_container = document.getElementById("main_container");
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
    for (var j = 1; j < 9; j++) {
        for (var i in alpha) { // alpha.forEach
            create_div_append("chess_container", {
                innerHTML: alpha[i] + j, /* (*) - see about this and piece capturing in play() */
                className: alpha[i] + j,
                padding: 0
            });
            //
        }
        create_div_append("chess_container", {
            className: 'aux_div',
            hidden: "true"
        });
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

    var rules = [
        [
            null
        ],
        [
            null
        ],
        [
            null
        ],
        [
            null
        ],
        [
            null
        ],
        [
            null
        ]
        // 'pawn': [
        //     1, 2
        // ],
        // 'rook': [
        //     null
        // ],
        // 'knight': [
        //
        // ],
        // 'bishop': [
        //     null
        // ],
        // 'queen': [
        //     null
        // ],
        // 'king': [
        //     null
        // ],
    ];

    function insert_piece(div_cls, img_src, img_id) {
        var pwn = document.createElement("img");
        pwn.className = "none";
        pwn.width = "40"; // attention to padding of zero for the divs
        pwn.height = "40";
        pwn.align = "center";
        pwn.src = img_src;
        pwn.id = img_id;
        //pwn.align = "middle";
        var div = document.body.getElementsByClassName(div_cls).item(0);
        div.innerHTML = "";
        div.appendChild(pwn);

        return function(fnc_cls = div_cls) {
            // we have a general table (dictionary, probably) of rules, and her e we nly save the ones for this element :))
            // this function should select the element (highlight) and show the possible ways to move it
            // compute all posibilities

        }
    }
    for(var i in alpha) {
        insert_piece(alpha[i] + 2, "../private/icons/icons8-pawn-80.png", "p0" + (i + 1)); // player 0
        insert_piece(alpha[i] + 7, "../private/icons/icons8-pawn-80 (1).png", "p1" + (i + 1)); // player 1
    }
    //
    insert_piece("a1", "../private/icons/icons8-rook-80.png", "p08", "r01");
    insert_piece("h1", "../private/icons/icons8-rook-80.png", "r02");
    insert_piece("a8", "../private/icons/icons8-rook-80 (1).png", "r11");
    insert_piece("h8", "../private/icons/icons8-rook-80 (1).png", "r12");
    //
    insert_piece("b1", "../private/icons/icons8-knight-80.png", "k01");
    insert_piece("g1", "../private/icons/icons8-knight-80.png", "k02");
    insert_piece("b8", "../private/icons/icons8-knight-80 (1).png", "k11");
    insert_piece("g8", "../private/icons/icons8-knight-80 (1).png", "k12");
    //
    insert_piece("c1", "../private/icons/icons8-bishop-80.png", "b01");
    insert_piece("f1", "../private/icons/icons8-bishop-80.png", "b02");
    insert_piece("c8", "../private/icons/icons8-bishop-80 (1).png", "b11");
    insert_piece("f8", "../private/icons/icons8-bishop-80 (1).png", "b12");
    //
    insert_piece("d1", "../private/icons/icons8-king-80.png", "K0");
    insert_piece("e1", "../private/icons/icons8-queen-80.png", "Q0");
    insert_piece("d8", "../private/icons/icons8-queen-80 (1).png", "Q1");
    insert_piece("e8", "../private/icons/icons8-king-80 (1).png", "K1");

    // (*) now I try interchanging them :D


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
        return function (msg) {
            var new_div = document.createElement("div");
            new_div.className = "msg"; // this ensures that every box is styles
            new_div.innerHTML = msg;
            father.appendChild(new_div);
            counter++;
        }
    }
    var fn0 = get_fn0(); // this is a function to add a msg to the created div (hid0)
    // now we add the stylesheet
    link_stylesheet("../private/msg.css");
    [
        'e4', 'c5', 'Nf3', 'g6', 'd4', 'b6', 'c3', 'f5', 'Bd3', 'h6', 'exf5', 'gxf5',
        'Bxf5', 'e6', 'Bg6+', 'Ke7', 'd5', 'exd5', 'Qxd5', 'Nc6', 'Bf4', 'h5', 'Qf7',
        "1-0"
    ].forEach(function(value, key) {
        fn0(value); // (*) check out the prof's variant, the answer lies there
    });

    /// hid2 creation, styling, and interface
    var hid2 = document.getElementsByClassName("hid2").item(0);
    hid2.innerHTML = "H2";
    hid2.style.alignSelf = "stretch";
    // now add the stylesheet

    link_stylesheet("../private/hid.css");
    var anchor = document.createElement("a");
    anchor.href = "#chessModerator";
    var img = document.createElement("img");
    img.href = "../private/icons/icons8-moderator-80.png";
    img.style.height = "64";
    img.style.width = "64";
    img.style.display = "inline-block";
    anchor.appendChild(img);
    document.getElementById("chess_btn").parentNode.appendChild(anchor);

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
    d1.addEventListener("mouseenter", function(){
    d1.className = "a2";
    d2.className = "a1";
    });
    d2.addEventListener("mouseenter", function(){
    d1.className = "a2";
    d2.className = "a1";
    });
    //
    var css_link = document.createElement("link");
    css_link.rel = "stylesheet";
    css_link.href = "../private/partial_container.css";
    document.head.appendChild(css_link);
}
