const lessonWords = [
  {word: "назад", definition: "back", score: 0},
{word: "переехать", definition: "to move", score: 0},
{word: "родиться", definition: "be born", score: 0},
{word: "север", definition: "north", score: 0},
{word: "знать", definition: "to know", score: 0},
{word: "никак", definition: "no way", score: 0},
{word: "привыкнуть", definition: "to get used to", score: 0},
{word: "количество", definition: "amount", score: 0},
{word: "люди", definition: "people", score: 0},
{word: "торопиться", definition: "to hurry", score: 0},
{word: "бежать", definition: "to run away", score: 0},
{word: "суетиться", definition: "to fuss", score: 0},
{word: "однако", definition: "however", score: 0},
{word: "вскоре", definition: "soon", score: 0},
{word: "полюбить", definition: "to fall in love", score: 0},
{word: "столичный", definition: "metropolitan", score: 0},
{word: "круглосуточный", definition: "round the clock", score: 0},
{word: "магазин", definition: "shop", score: 0},
{word: "угол", definition: "corner", score: 0},
{word: "развлечение", definition: "entertainment", score: 0},
{word: "музей", definition: "museum", score: 0},
{word: "театр", definition: "theater", score: 0},
{word: "удобно", definition: "comfortable", score: 0},
{word: "близко", definition: "close", score: 0},
{word: "если", definition: "if", score: 0},
{word: "оно", definition: "it", score: 0},
{word: "быстрый", definition: "fast", score: 0},
{word: "любоваться", definition: "to admire", score: 0},
{word: "необычный", definition: "unusual", score: 0},
{word: "здание", definition: "building", score: 0},
{word: "просто", definition: "simply", score: 0},
{word: "книжка", definition: "book", score: 0},
{word: "приветливый", definition: "friendly", score: 0},
{word: "конечно", definition: "certainly", score: 0},
{word: "скучать", definition: "to miss", score: 0},
{word: "родной", definition: "native", score: 0},
{word: "равно", definition: "equals", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
    let dieRoll = 0;
    
    const exclamatories = ["Oops", "I Forgor", "RIP Memory", "Uh-Oh"];
    let currentEx = 0; //Exclamatory at this index will be displayed next.
    init()
    
    function init() {
        // Display the first word and definition
        word.innerHTML = currentWords[0].word;
        definition.innerHTML = currentWords[0].definition;
        displaySetNum();
        // Event listeners for the buttons
        document.getElementById("left-button").addEventListener("click", function() {
            this.blur();

            if(wordOnDisplay === true) {
                // Move the current word back in the queue by 3 positions
            // or to the back if there are less than 4 words in the queue
            let currentWord = currentWords.shift();
            if (currentWords.length < 4) {
                currentWords.push(currentWord); //put it at the very end
                console.log(currentWords)
            } else {
                currentWords.splice(3, 0, currentWord);
                console.log(currentWords)
            }
            currentWord.score = -1;
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            displayDone();
            displayNextWord();
            document.getElementById("left-button").innerHTML = "Translate";
            wordOnDisplay = false;
            }
            else {
                wordOnDisplay = true;
                definition.style.visibility = "visible";
                dieRoll = getRandomNumber();
                //If dieRoll < 98, display "Again" instead of an exclamatory remark
                
                if (dieRoll < 98) {
                    document.getElementById("left-button").innerHTML = "Again";
                }
                else {
                    if (currentEx > 3) {currentEx = 0}
                    document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                    currentEx += 1;
                }
            }
        });
    
        document.getElementById("right-button").addEventListener("click", function() {
            this.blur();
            // Move the current word to the back of the queue
            let currentWord = currentWords.shift();
            currentWords.push(currentWord);
            currentWord.score++;
            // If the word's score is 2, remove it from the queue
            if (currentWord.score === 2) {
                currentWords = currentWords.filter(word => word !== currentWord);
            }
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
            document.getElementById("left-button").innerHTML = "Translate";
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.getElementById("next-button").addEventListener("click", function() {
            this.blur();
            // Load the next setSize words from the lessonWords array
            currentIndex += setSize;
            currentWords = lessonWords.slice(currentIndex, currentIndex + setSize);
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            setNum += 1;
            
            displaySetNum();

            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key === " "){
                const numInput = document.getElementById("set-num");
                numInput.value = (numInput.value).replaceAll(" ", "");
                if(wordOnDisplay === false){
                    displayDone();
                    definition.style.visibility = "visible";
                    wordOnDisplay = true;
                    dieRoll = getRandomNumber();
                    //If dieRoll < 98, display "Again" instead of an exclamatory remark
                    if (dieRoll < 98) {
                        document.getElementById("left-button").innerHTML = "Again";
                    }
                    else {
                        if (currentEx > 3) {currentEx = 0}
                        document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                        currentEx += 1;
                    }
                }
                else {
                    let currentWord = currentWords.shift();
                    currentWords.push(currentWord);
                    currentWord.score++;
                    // If the word's score is 2, remove it from the queue
                    if (currentWord.score === 2) {
                        currentWords = currentWords.filter(word => word !== currentWord);
                    }
                    definition.style.visibility = "hidden";
                    definition.style.textTransform = "lowercase"
                    document.getElementById("left-button").innerHTML = "Translate";
                    displayDone();
                    displayNextWord();
                    wordOnDisplay = false;
                }
            }
            if (event.key === "Enter"){
                const numInput = document.getElementById("set-num");
                numInput.blur();
                displaySet();
            }
            
        })
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key !== "1") return
            
            let currentWord = currentWords.shift();
            if (currentWords.length < 4) {
                currentWords.push(currentWord);
                console.log(currentWords)
            } else {
                currentWords.splice(3, 0, currentWord);
                console.log(currentWords)
            }
            currentWord.score = -1;
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
            
            
        })
        document.addEventListener("touchend", (event) => {
            displayDone();
            definition.style.visibility = "visible";
        })

    }
    function displaySet(){
        const numInput = document.getElementById("set-num");
        setNum = parseInt(numInput.value);
        currentIndex = setNum * setSize - setSize;

        currentWords = lessonWords.slice(currentIndex, currentIndex + setSize);
        definition.style.visibility = "hidden";
        definition.style.textTransform = "lowercase";

        displaySetNum();

        displayDone();
        displayNextWord();
        
    }

    function displaySetNum() {
        //Find input box
        const numInput = document.getElementById("set-num");
        numInput.value = setNum;
    }
    
    
    function displayNextWord() {
      // Display the next word and definition
      let currentWord = currentWords[0];
      document.getElementById("word").innerHTML = currentWord.word;
      definition.innerHTML = currentWord.definition;
    }
    
    
    function displayDone() {
            if (currentWords.length !== 0) return
            const definition =  document.getElementById("definition")
            definition.style.visibility = "visible";
            definition.innerHTML = "Set Done " + setNum
            definition.style.textTransform = "capitalize"
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
      }