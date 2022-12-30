const lessonWords = [
  {word: "подарить", definition: "to give", score: 0},
{word: "мир", definition: "world", score: 0},
{word: "шестнадцать", definition: "sixteen", score: 0},
{word: "новая", definition: "new", score: 0},
{word: "адрес", definition: "the address", score: 0},
{word: "улица", definition: "the street", score: 0},
{word: "пять", definition: "five", score: 0},
{word: "девятнадцать", definition: "nineteen", score: 0},
{word: "современный", definition: "modern", score: 0},
{word: "тихий", definition: "quiet", score: 0},
{word: "район", definition: "district", score: 0},
{word: "активно", definition: "actively", score: 0},
{word: "кататься", definition: "ride", score: 0},
{word: "самокат", definition: "Kick scooter", score: 0},
{word: "велосипед", definition: "bike", score: 0},
{word: "научиться", definition: "learn to", score: 0},
{word: "сигвей", definition: "segway", score: 0},
{word: "недавно", definition: "recently", score: 0},
{word: "дарить", definition: "present", score: 0},
{word: "младший", definition: "younger", score: 0},
{word: "похож", definition: "similar", score: 0},
{word: "отец", definition: "father", score: 0},
{word: "карий", definition: "brown", score: 0},
{word: "русый", definition: "fair-haired", score: 0},
{word: "вдохновлять", definition: "inspire", score: 0},
{word: "оканчивать", definition: "finish", score: 0},
{word: "планировать", definition: "to plan", score: 0},
{word: "врач", definition: "doctor", score: 0},
{word: "правильно", definition: "right", score: 0},
{word: "лечить", definition: "treat", score: 0},
{word: "больной", definition: "sick", score: 0},
{word: "думать", definition: "think", score: 0},
{word: "всё", definition: "everything", score: 0},
{word: "получиться", definition: "turn out", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
    let watermKeySequence = ["w", "a", "t", "e", "r", "m"];
    let currentKeyIndex = 0;

    let tapCount = 0;
    let timer;

    
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
        document.addEventListener("keydown", (event) => {
            if (event.key === watermKeySequence[currentKeyIndex]) {
                currentKeyIndex++;
            } else {
                currentKeyIndex = 0;
            }
            if (currentKeyIndex === watermKeySequence.length) {
                window.location.href = "https://www.google.com/";
            }
            });
        document.addEventListener("touchstart", (event) => {
            tapCount++; // increment the tapCount variable when a tap is detected
            });
              
            // set a timer to run after 10 seconds (10000 milliseconds)
            setTimeout(() => {
                // check if the tapCount variable has reached 12
                if (tapCount === 12) {
                  // direct the user to Google if tapCount is 12
                  window.location.href = "https://www.google.com/";
                }
              }, 10000);
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