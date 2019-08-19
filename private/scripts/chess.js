// data structures used for moves, etc.

// start from the top, but be simple

// STEPS
// document.getElementById('chess_btn').click()


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

// function pre_init() {
//     // we load the CSS's used for adding the divs used for the hidden grid-row
//     // STEP 1: we set the divs (with nothing inside them)
//     create_div_append("main_container", {
//         className: 'hid0',
//     });
//     create_div_append("main_container", {
//         className: 'hid2',
//     });
//     // STEP 2: we insert a style to fix up the grid
// }
function init() {
  // we first insert a background: a blank, coloured div
  var chess_background = document.createElement("div");
  chess_background.id = "chess_background";
  var main_container = document.getElementById("main_container");
  main_container.appendChild(chess_background);

  var chess_container = document.createElement("div");
  chess_container.id = "chess_container";
  var main_container = document.getElementById("main_container");
  main_container.appendChild(chess_container);
  /* for (**) */
  // var style = document.createElement("style");
  // style.innerHTML = " .hid1 { grid: hid1; } ";
  // document.body.insertBefore(style, main_container);
  // */
  // restyling the search input:
  let search_input = document.getElementsByTagName('input')[0]
  search_input.style = 'height: 40px; width: 90%; float: right; display: -webkit-inline-box; margin-right: 10%'
  // table JS, part2
  var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  var counter = 0;
  for (index in alpha) {
    create_div_append("chess_container", {
      id: `${parseInt(index) + 1}`,
      className: 'row'
    })
    if ((parseInt(index) + 1) % 2 == 0) {
      let extra_child = document.createElement('span')
      let father = document.getElementById(`${parseInt(index) + 1}`)
      father.appendChild(extra_child)
    }
    for (letter of alpha) {
      create_div_append(`${parseInt(index) + 1}`, {
        id: letter + `${parseInt(index) + 1}`
      })
    }
  }
  // table css
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "../private/styles/chess_grid.css";
  document.head.appendChild(link);
  //
  var link = document.createElement("link");
  link.rel = "stylesheet";
  // document.getElementsByClassName("hid0").item(0).innerHTML = "hid0";
  // document.getElementsByClassName("hid2").item(0).innerHTML = "hid2";
  link.href = "../private/styles/main_container.css";
  document.head.appendChild(link);
  document.getElementById("chess_btn").style.display = "none";
  // pieces js
  /*create_img_append("chess_container", { // first hop, I need a rather more all in all funtion

  }*/

  function insert_piece(div_id, img_src, img_cls) {
    var img = document.createElement("img");
    img.className = "none";
    img.width = "34"; // attention to padding of zero for the divs
    img.height = "34";
    img.align = "center";
    img.src = img_src;
    img.className = img_cls;
    // img.align = "middle";
    var div = document.getElementById(div_id);
    // div.innerHTML = "";
    div.appendChild(img);
    // (*) make an array of functions
    // (*) the events will be hovering & cliking over a "rook", "knight", "king", etc. class element
  }


  // this is the variant with every piece having an id
  for (let letter of alpha) {
    insert_piece(letter + 2, "../private/images/pawn0.png", "pawn");
    insert_piece(letter + 7, "../private/images/pawn1.png", "pawn");
  }
  //
  insert_piece("a1", "../private/images/rook0.png", "rook");
  insert_piece("h1", "../private/images/rook0.png", "rook");
  insert_piece("a8", "../private/images/rook1.png", "rook");
  insert_piece("h8", "../private/images/rook1.png", "rook");
  //
  insert_piece("b1", "../private/images/knight0.png", "knight");
  insert_piece("g1", "../private/images/knight0.png", "knight");
  insert_piece("b8", "../private/images/knight1.png", "knight");
  insert_piece("g8", "../private/images/knight1.png", "knight");
  //
  insert_piece("c1", "../private/images/bishop0.png", "bishop");
  insert_piece("f1", "../private/images/bishop0.png", "bishop");
  insert_piece("c8", "../private/images/bishop1.png", "bishop");
  insert_piece("f8", "../private/images/bishop1.png", "bishop");
  //
  insert_piece("d1", "../private/images/king0.png", "king");
  insert_piece("e1", "../private/images/queen0.png", "queen");
  insert_piece("d8", "../private/images/queen1.png", "queen");
  insert_piece("e8", "../private/images/king1.png", "king");
  // nope // document.getElementById("chess_container").appendChild(pwn);
  for (index of [3, 4, 5, 6]) {
    for (letter of alpha) {
      insert_piece(letter + index, '../private/images/blank.png', 'none')
    }
  }

  window.scrollTo(0, 120) // ----> scroll to the beginnign of the game

  // check if a given position is out of board ----> it doesn't respect the a-h, 1-8 notations :D
  function outOfBoard(position) {
    charPart = String.fromCharCode(position.charCodeAt(0))
    intPart = parseInt(position.charAt(1))
    if (alpha.includes(charPart) && intPart > 0 && intPart < 9)
      return false
    else
      return true
  }

  // check if a given position is occupied
  function isOccupied(position) {
    let div = document.getElementById(position)
    if (div.firstChild.className === 'none') {
      return false
    } else {
      return true
    }
  }

  // console.log(isOccupied('g1'))
  // console.log(isOccupied('g2'))
  // console.log(isOccupied('g3'))

  // check if a given position contains a piece, and if it does, it returns the number of the player (0 or 1)
  //   otherwise it returns -1
  function whichPlayer(position) {
    let div = document.getElementById(position)
    if (div.firstChild.src.contains('0.png')) {
      return 0
    } else if (div.firstChild.src.contains('1.png')){
      return 1
    } else {
      return -1
    }
  }

  // a function to generate the position, depending on the offsets
  function moveXY(position, charOffset, intOffset) {
    newChar = String.fromCharCode(position.charCodeAt(0) + charOffset)
    newInt = parseInt(position.charAt(1)) + intOffset
    newPosition = newChar + newInt
    if (!outOfBoard(newPosition))
      return newPosition
    else
      return 'outOfBoard'
  }

  // a function to generate all the possible moves for a piece, at a given time
  // TODO  pay attention that we'll need a variable for the 'check' state :D
  function moves(position) { // a position like 'a3', 'e3'
    let player0 = (whichPlayer(position) === '0')
    let player1 = (whichPlayer(position) === '1')
    className = document.getElementById(position).firstChild.classList[0]
    console.log(className)
    let nextMoves = []
    let filteredMoves = []
    switch (className) {
      case 'pawn':
        if (player0) {
          nextMoves.push(moveXY(position, 0, 1))
          // nextMoves.push(moveXY(position, 1, 1), moveXY(position, -1, 1))
          if (position.charAt(1) == '2')
            nextMoves.push(moveXY(position, 0, 2))
        } else if (player1){
          nextMoves.push(moveXY(position, 0, -1))
          // nextMoves.push(moveXY(position, 1, -1), moveXY(position, -1, -1))
          if (position.charAt(1) == '7')
          nextMoves.push(moveXY(position, 0, -2))
        }
        filteredMoves = nextMoves.filter((x) => {return x != 'outOfBoard'})
        // TODO  filter be the position being empty
        console.log(nextMoves)
        console.log(filteredMoves)
        break;
      case 'rook':
        plusX = true
        plusY = true
        minusX = true
        minusY = true
        for (let i = 1; i < 8; i++) {
          // first check the conditions
          if (outOfBoard(moveXY(position, i, 0)) || isOccupied(moveXY(position, i, 0))) {
            // we can also attack the first piece partaining to the other player
            if (isOccupied(moveXY(position, i, 0))) {
              thisPlayer = whichPlayer(position)
              thatPlayer = thatPlayer(moveXY(position, i, 0))
              if (thisPlayer + thatPlayer == 1) {
                nextMoves.push(moveXY(position, i, 0))
              }
            }
            plusX = false
          }
          if (outOfBoard(moveXY(position, 0, i)) || isOccupied(moveXY(position, 0, i))) {
            // we can also attack the first piece partaining to the other player
            if (isOccupied(moveXY(position, 0, i))) {
              thisPlayer = whichPlayer(position)
              thatPlayer = thatPlayer(moveXY(position, 0, i))
              if (thisPlayer + thatPlayer == 1) {
                nextMoves.push(moveXY(position, 0, i))
              }
            }
            plusY = false
          }
          if (outOfBoard(moveXY(position, -i, 0)) || isOccupied(moveXY(position, -i, 0))) {
            // we can also attack the first piece partaining to the other player
            if (isOccupied(moveXY(position, -i, 0))) {
            thisPlayer = whichPlayer(position)
            thatPlayer = thatPlayer(moveXY(position, -i, 0))
            if (thisPlayer + thatPlayer == 1) {
              nextMoves.push(moveXY(position, -i, 0))
            }
            minusX = false
          }
          if (outOfBoard(moveXY(position, 0, -i)) || isOccupied(moveXY(position, 0, -i))) {
            // we can also attack the first piece partaining to the other player
            if (isOccupied(moveXY(position, 0, -i))) {
            thisPlayer = whichPlayer(position)
            thatPlayer = thatPlayer(moveXY(position, 0, -i))
            if (thisPlayer + thatPlayer == 1) {
              nextMoves.push(moveXY(position, 0, -i))
            }
            minusY = false
          }
          // then for all the true conditions, add the positions :D
          if (plusX) {
            nextMoves.push(moveXY(position, i, 0))
          }
          if (plusY) {
            nextMoves.push(moveXY(position, i, 0))
          }
          if (minusX) {
            nextMoves.push(moveXY(position, 0, -i))
          }
          if (minusY) {
            nextMoves.push(moveXY(position, 0, -i))
          }
        }
        filteredMoves = nextMoves
        break;
      case 'knight':

        break;
      case 'bishop':

        break;
      case 'queen':

        break;
      case 'king':

        break;
      default:

    }
    return filteredMoves
  }

  moves('a2')
  moves('b2')
  moves('a7')
  moves('b7')
  moves('a1')
  moves('h1')
  moves('a8')
  moves('h8')

  function highlight(event) {
    if (!event.target.classList.contains('none')) {
      if (event.target.classList.contains('highlight')) {
        event.target.classList.remove('highlight')
      } else {
        let highlighted_elements = document.querySelectorAll('#chess_container .row div img.highlight')
        highlighted_elements.forEach((elem) => {
          elem.classList.remove('highlight')
        })
        event.target.classList.toggle('highlight')
        // TODO  highlight, with or without cloning the image (we can keep clones from the beginning :D)
        //        the possible positions
        // TODO  function (I) sets the class 'free' to all those position, so that adding an eventListener for these elements, that works on click only if they have the right class, will do the stuff :DDDD
        //        take into account that the other handlers should clean the 'highlight's and 'free'
        // pay attention, the other handler should be added to all other positions, even the free ones.
        // there are the classes that tell the handler how to act :D
      }

    }
  }

  let img_tags = document.querySelectorAll('img:not(.none)');
  for (img of img_tags) {
    img.addEventListener('click', highlight)
  }
  // for (img of img_tags) {
  //   img.classList.toggle('highlight')}

  // TODO  generate all possible actions for a piece on a certain position,
  //        with a certain case,
  //        and include it inside a listener :D

  // // lastly:
  // // hid0 and hid1 interface adding
  // /// hid0 creation, styling, and interface
  // var hid0 = document.getElementsByClassName("hid0").item(0);
  // hid0.style.alignSelf = "stretch";
  // // hid0 contains a history of the
  // hid0.style.overflowX = "hidden";
  // hid0.style.overflowY = "scroll";
  // // create a function used to write another div to the box
  // function get_fn0() {
  //     var father = hid0;
  //     var counter = 1; // may bring unexpected modifications, but I'll do them
  //     // (*)also, if counter is odd/even, can add to a prev or next message
  //     // (*)yeah, should only keep the info from the present game and log the rest
  //     function increment(msg) {
  //         if (counter % 2 === 1) {
  //             var new_div = document.createElement("div");
  //             new_div.className = "msg"; // this ensures that every box is styles
  //             new_div.innerHTML = (counter + 1) / 2 + ". " + msg;
  //             father.appendChild(new_div);
  //             counter++;
  //         } else { // add to the last log
  //             var logs = hid0.getElementsByClassName("msg");
  //             logs.item(logs.length - 1).innerHTML = logs.item(logs.length - 1).innerHTML + ", " + msg;
  //             counter++;
  //         }
  //     }
  //     increment.reset = function() { // yet, it gave me an easy way to reset the counter for each game:)))
  //         counter = 0;
  //     }
  //     // increment.peek() { // fascinating, but unnecessary
  //     //     return counter;
  //     // }
  //     return increment;
  // }
  // var fn0 = get_fn0(); // this is a function to add a msg to the created div (hid0)
  // // now we add the stylesheet
  //
  // [ // example of a template game
  //     'e4', 'c5', 'Nf3', 'g6', 'd4', 'b6', 'c3', 'f5', 'Bd3', 'h6', 'exf5', 'gxf5',
  //     'Bxf5', 'e6', 'Bg6+', 'Ke7', 'd5', 'exd5', 'Qxd5', 'Nc6', 'Bf4', 'h5', 'Qf7',
  //     "1-0"
  // ].forEach(function(value, key) {
  //     fn0(value); // (*) check out the prof's variant, the answer lies there
  // });
  // link_stylesheet("../private/msg.css");
  // /// hid2 creation, styling, and interface
  // var hid2 = document.getElementsByClassName("hid2").item(0);
  // hid2.innerHTML = "H2";
  // hid2.style.alignSelf = "stretch";
  // // now add the stylesheet
  //
  // link_stylesheet("../private/hid.css");
  // var anchor = document.createElement("a");
  // anchor.href = "#chessModerator";
  // anchor.className = "centered";
  // var img = document.createElement("img");
  // img.src = "../private/icons/icons8-moderator-80.png";
  // img.style.height = "64";
  // img.style.width = "64";
  // img.style.display = "inline-block";
  // anchor.appendChild(img);
  // document.getElementById("chess_btn").parentNode.appendChild(anchor);
}
/*
template
we get to identify the divs
we modify the contents
and we modify the classes
*/


// function test() { // out of function
//     // var css_link = document.createElement("link");
//     // css_link.rel = "stylesheet";
//     // css_link.href = "../private/container1.css";
//     // document.head.appendChild(css_link);
//     // without on... for this (*)
//     var d1 = document.getElementsByClassName("a1").item(0);
//     var d2 = document.getElementsByClassName("a2").item(0);
//     d1.addEventListener("mouseenter", function() {
//         d1.className = "a2";
//         d2.className = "a1";
//     });
//     d2.addEventListener("mouseenter", function() {
//         d1.className = "a2";
//         d2.className = "a1";
//     });
//     //
//     var css_link = document.createElement("link");
//     css_link.rel = "stylesheet";
//     css_link.href = "../private/partial_container.css";
//     document.head.appendChild(css_link);
// }



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
