const NUM_OF_CHARS = 5
const NUM_OF_WORDS = 6

const gameDiv = document.getElementById("container");

for (let i = 0; i < NUM_OF_WORDS; i++)
{
    let worDiv = document.createElement("div")
    worDiv.className = "word"
    for (let j = 0; j < NUM_OF_CHARS; j++)
    {
        let charDiv = document.createElement("div")
        charDiv.className = "char"
        worDiv.appendChild(charDiv)
    }
    gameDiv.appendChild(worDiv)
}

let currChar = 0;
let currWord = 0;

document.addEventListener("keydown", async function (event) {
    let keyPressed= event.key.toUpperCase()
    
    let wordDiv = gameDiv.children[currWord];

    if (keyPressed === "BACKSPACE")
    {
        if (currChar > 0)
        {
            let charDiv = wordDiv.children[currChar - 1];
            charDiv.innerHTML = "";
            animateCSS(charDiv, "wobble");
            currChar--;    
        }
    }

    else if (keyPressed === "ENTER"&&currChar===NUM_OF_CHARS)
    {
        let word =charsToWord();
        var result = await (await fetch("/wordle/" + word)).json();
        console.log(result);
            for (let i = 0; i < result.length; i++)
            {   
                wordDiv.children[i].style.background = result[i];
            }
        console.log("the word is "+word);
        currChar = 0;
        currWord++;
        await animateCSS(wordDiv, "flipInX");
    }

    else if (currChar < NUM_OF_CHARS && isLetter(keyPressed))
    {
        let charDiv = wordDiv.children[currChar];
        charDiv.innerHTML = keyPressed;
        animateCSS(charDiv, "wobble");
        currChar++;   
        
    }

 
})



function charsToWord() {
    let word = "";
    let wordDiv = gameDiv.children[currWord];
    for (let i = 0; i < wordDiv.children.length; i++) {
      word = word+wordDiv.children[i].innerHTML;
    }
    return word;
  }


function isLetter(newChar)
{
    console.log(newChar);
    console.log(newChar.length);
    if (newChar.length == 1 && newChar.match(/[a-z]/i)) {
        return true
    }
    else return false
    
    
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });