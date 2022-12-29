const lesson1Words = [
  {word: "обычный", definition: "normal", score: 0},
{word: "почти", definition: "almost", score: 0},
{word: "кроме", definition: "besides", score: 0},
{word: "учебный", definition: "training", score: 0},
{word: "начинать", definition: "to start off", score: 0},
{word: "вставать", definition: "to get up", score: 0},
{word: "чистить", definition: "to clean", score: 0},
{word: "зуб", definition: "tooth", score: 0},
{word: "умываться", definition: "to wash face", score: 0},
{word: "так", definition: "so", score: 0},
{word: "хлопья", definition: "cereals", score: 0},
{word: "пирог", definition: "pie", score: 0},
{word: "отвозить", definition: "take away", score: 0},
{word: "первый", definition: "first", score: 0},
{word: "сложно", definition: "hard", score: 0},
{word: "понимать", definition: "to understand", score: 0},
{word: "правило", definition: "rule", score: 0},
{word: "час", definition: "hour", score: 0},
{word: "нас", definition: "us", score: 0},
{word: "перемена", definition: "turn", score: 0},
{word: "обедать", definition: "to have lunch", score: 0},
{word: "подруга", definition: "girl friend", score: 0},
{word: "который", definition: "which", score: 0},
{word: "обед", definition: "dinner", score: 0},
{word: "еще", definition: "more", score: 0},
{word: "кружок", definition: "circle", score: 0},
{word: "рисование", definition: "painting", score: 0},
{word: "уходить", definition: "to leave", score: 0},
{word: "сам", definition: "myself", score: 0},
{word: "забирать", definition: "to take away", score: 0},
{word: "немного", definition: "a little", score: 0},
{word: "задавать", definition: "to set", score: 0},
{word: "поэтому", definition: "that's why", score: 0},
{word: "до", definition: "before", score: 0},
{word: "вечер", definition: "evening", score: 0},
{word: "затем", definition: "then", score: 0},
{word: "же", definition: "same", score: 0},
{word: "возвращаться", definition: "come back", score: 0},
{word: "кино", definition: "cinema", score: 0},
{word: "фантастика", definition: "fiction", score: 0},
{word: "боевик", definition: "action movie", score: 0},
{word: "душ", definition: "shower", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
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
            document.getElementById("left-button").innerHTML = "Translate";
            wordOnDisplay = false;
            }
            else {
                wordOnDisplay = true;
                definition.style.visibility = "visible";
                document.getElementById("left-button").innerHTML = "Again";
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