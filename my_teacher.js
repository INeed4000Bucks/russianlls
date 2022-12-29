const lessonWords = [
  {word: "учительница", definition: "teacher", score: 0},
{word: "знакомиться", definition: "to meet, to get acquainted", score: 0},
{word: "это", definition: "it", score: 0},
{word: "русский", definition: "Russian", score: 0},
{word: "язык", definition: "language", score: 0},
{word: "нее", definition: "her", score: 0},
{word: "есть", definition: "eat", score: 0},
{word: "муж", definition: "husband", score: 0},
{word: "три", definition: "three", score: 0},
{word: "детей", definition: "children", score: 0},
{word: "нет", definition: "No", score: 0},
{word: "времена", definition: "time", score: 0},
{word: "животное", definition: "animal", score: 0},
{word: "она", definition: "she", score: 0},
{word: "семь", definition: "seven", score: 0},
{word: "утра", definition: "morning", score: 0},
{word: "ехать", definition: "drive", score: 0},
{word: "машин", definition: "car", score: 0},
{word: "приезжать", definition: "to arrive", score: 0},
{word: "к", definition: "to", score: 0},
{word: "одетый", definition: "dressed", score: 0},
{word: "длинный", definition: "long", score: 0},
{word: "черный", definition: "black", score: 0},
{word: "юбка", definition: "skirt", score: 0},
{word: "белый", definition: "white", score: 0},
{word: "кофта", definition: "sweater", score: 0},
{word: "носить", definition: "to wear", score: 0},
{word: "золотой", definition: "gold", score: 0},
{word: "сережки", definition: "earrings", score: 0},
{word: "подарок", definition: "present", score: 0},
{word: "ее", definition: "her", score: 0},
{word: "мужа", definition: "husband", score: 0},
{word: "внимательно", definition: "attentively", score: 0},
{word: "слушать", definition: "to listen", score: 0},
{word: "ученик", definition: "student", score: 0},
{word: "понятно", definition: "it's clear", score: 0},
{word: "предмет", definition: "item", score: 0},
{word: "школьник", definition: "schoolboy", score: 0},
{word: "убираться", definition: "to get out", score: 0},
{word: "пылесосить", definition: "to vacuum", score: 0},
{word: "ужин", definition: "dinner", score: 0},
{word: "купать", definition: "to bathe", score: 0},
{word: "читать", definition: "to read", score: 0},
{word: "им", definition: "them", score: 0},
{word: "сказки", definition: "fairy tales", score: 0},
{word: "ночь", definition: "night", score: 0},
{word: "дети", definition: "children", score: 0},
{word: "ложиться", definition: "to lie down", score: 0},
{word: "спать", definition: "to sleep", score: 0},
{word: "садиться", definition: "to sit down", score: 0},
{word: "проверять", definition: "to check", score: 0},
{word: "домашний", definition: "home, domestic", score: 0},
{word: "задание", definition: "task", score: 0},
{word: "пятница", definition: "Friday", score: 0},
{word: "ресторан", definition: "restaurant", score: 0},
{word: "воскресенье", definition: "Sunday", score: 0},
{word: "отдыхать", definition: "to relax", score: 0},
{word: "парк", definition: "park", score: 0}
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