const lessonWords = [
  {word: "друг", definition: "friend", score: 0},
  {word: "привет", definition: "Hey", score: 0},
  {word: "звать", definition: "to call for", score: 0},
  {word: "мне", definition: "to me", score: 0},
  {word: "лет", definition: "years", score: 0},
  {word: "много", definition: "many", score: 0},
  {word: "лучшее", definition: "the best", score: 0},
  {word: "одной", definition: "one", score: 0},
  {word: "возраста", definition: "age", score: 0},
  {word: "жить", definition: "to live", score: 0},
  {word: "соседний", definition: "neighboring", score: 0},
  {word: "ходить", definition: "to walk", score: 0},
  {word: "пешком", definition: "on foot", score: 0},
  {word: "него", definition: "him", score: 0},
  {word: "короткий", definition: "short", score: 0},
  {word: "светлый", definition: "light", score: 0},
  {word: "волосы", definition: "hair", score: 0},
  {word: "зелёный", definition: "green", score: 0},
  {word: "глаза", definition: "eyes", score: 0},
  {word: "добрый", definition: "kind", score: 0},
  {word: "улыбка", definition: "smile", score: 0},
  {word: "очень", definition: "very", score: 0},
  {word: "худой", definition: "thin", score: 0},
  {word: "высокий", definition: "tall", score: 0},
  {word: "выше", definition: "above", score: 0},
  {word: "целый", definition: "whole", score: 0},
  {word: "голова", definition: "head", score: 0},
  {word: "часто", definition: "often", score: 0},
  {word: "смеяться", definition: "to laugh", score: 0},
  {word: "готовый", definition: "ready", score: 0},
  {word: "помочь", definition: "to help", score: 0},
  {word: "футбол", definition: "football", score: 0},
  {word: "другой", definition: "another", score: 0},
  {word: "ребята", definition: "guys", score: 0},
  {word: "всегда", definition: "always", score: 0},
  {word: "команда", definition: "command", score: 0},
  {word: "спорт", definition: "sport", score: 0},
  {word: "мечтать", definition: "to dream", score: 0},
  {word: "стать", definition: "to become", score: 0},
  {word: "тренер", definition: "trainer", score: 0},
  {word: "вырастить", definition: "to grow up", score: 0},
  {word: "домашний", definition: "home", score: 0},
  {word: "объяснять", definition: "to explain", score: 0},
  {word: "сложный", definition: "complicated", score: 0},
  {word: "задача", definition: "a task", score: 0},
  {word: "лучше", definition: "better", score: 0},
  {word: "особенно", definition: "especially", score: 0},
  {word: "математика", definition: "maths", score: 0}
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
            wordOnDisplay = false;
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