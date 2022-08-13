const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000;
let resArr=["","","","",""]
let toWin="JERRY"
app.get("/wordle/:guess", (req, res) => {
    let userGuess = req.params.guess.toUpperCase();
    let map = {
        J: 1,
        E: 1,
        R: 2,
        Y: 1,
    }

    for (let i = 0; i < userGuess.length; i++)
    {
        if (userGuess[i] === toWin[i])
        {
            resArr[i] = "green"
            let currChar = userGuess[i];
            map[currChar]--;
        }
    }

    for (let i = 0; i < userGuess.length; i++)
    {
        if (userGuess[i] !== toWin[i])
        {
            if (userGuess[i] === undefined)
            {
                resArr[i] = "grey"
            }    
            else if (map[userGuess[i]] > 0)
            {
                resArr[i]="orange"    
            }
            else
            {
                resArr[i]="grey"    
            }
        }
    }


    res.send(resArr)
})

app.use(express.static("public"));
app.listen(PORT)
