const gameContainer = document.getElementById("game");
const startGame = document.getElementById("start");
const restartGame = document.getElementById("restart");
let card1 = null;
let card2 = null;

let cardsFlipped = 0;
let noClicking = false;
let score = 0; 





const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    
    const newDiv = document.createElement("div");
    newDiv.innerText = "MATCH ME!"   
    newDiv.classList.add(color); 
    startGame.addEventListener("click", function() { 
      newDiv.addEventListener("click", handleCardClick);      
        gameContainer.append(newDiv);    
    });  
   
  }
}
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(noClicking) return;
  if(event.target.classList.contains("flipped")) return; 
  if(event.target) {score += 10};
  document.getElementById("score").innerText = "SCORE: " + score;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];


// This first stand alone if statement is identifying the first card flipped over, giving it a class and setting it = currentCard.
  if(!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = card1 === currentCard ? null : currentCard;
  }

  // This is the start of an if statement with another if statement following along with an else. card 1 and card 2 are both set to "null", so if that is true set new variables with the value being the classnames of card 1 & 2. noClicking is now equal to true(a boolean value). meaning that the if statement at the beginning of the code will return true and run the rest of the code. Only the next if statement or the else.
if(card1 && card2) {
  let card1Class = card1.className;
  let card2Class = card2.className;
  noClicking = true;

// Now one of these will run and at the end of each of them noClicking is set to flase. returning false and only running that code. nothing else. This stops the user from clicking to many times and causing errors to pop up.
  if(card1Class === card2Class) {
    cardsFlipped += 2;
    card1.removeEventListener("click",handleCardClick);
    card2.removeEventListener("click",handleCardClick);
    card1 = null;
    card2 = null;  
    noClicking = false;
  
  }
  else {
    setTimeout(function() {
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClicking = false;

    }, 1000)
  }
}




if(cardsFlipped === COLORS.length) alert("YEEEEEEHAHAAAAA");
}

restartGame.addEventListener("click", function() { 
  location.reload(); 
});


createDivsForColors(shuffledColors);

