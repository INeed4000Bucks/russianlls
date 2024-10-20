const lessonWords = [
  {word: "питомец", definition: "pet", score: 0},
{word: "детство", definition: "childhood", score: 0},
{word: "хотеть", definition: "to want", score: 0},
{word: "родитель", definition: "parent", score: 0},
{word: "не", definition: "not", score: 0},
{word: "разрешать", definition: "allow", score: 0},
{word: "пока", definition: "since, until, bye", score: 0},
{word: "ребёнок", definition: "child", score: 0},
{word: "хомяк", definition: "hamster", score: 0},
{word: "маленький", definition: "little", score: 0},
{word: "пушистый", definition: "fluffy", score: 0},
{word: "его", definition: "him", score: 0},
{word: "шерсть", definition: "wool", score: 0},
{word: "средний", definition: "average", score: 0},
{word: "длина", definition: "length", score: 0},
{word: "коричневый", definition: "brown", score: 0},
{word: "цвет", definition: "Colour", score: 0},
{word: "купить", definition: "buy", score: 0},
{word: "клетка", definition: "cell", score: 0},
{word: "для", definition: "for", score: 0},
{word: "этаж", definition: "floor", score: 0},
{word: "рад", definition: "glad", score: 0},
{word: "появляться", definition: "appear", score: 0},
{word: "быть", definition: "to be", score: 0},
{word: "весело", definition: "funny", score: 0},
{word: "бегать", definition: "run", score: 0},
{word: "колесо", definition: "wheel", score: 0},
{word: "корми́ть", definition: "feed", score: 0},
{word: "морковка", definition: "carrot", score: 0},
{word: "орех", definition: "nut", score: 0},
{word: "рости", definition: "grow up", score: 0},
{word: "отдельно", definition: "separately", score: 0},
{word: "заводить", definition: "wind up", score: 0},
{word: "о", definition: "about", score: 0},
{word: "которой", definition: "which", score: 0},
{word: "смочь", definition: "be able", score: 0},
{word: "теперь", definition: "now", score: 0},
{word: "дружелюбный", definition: "friendly", score: 0},
{word: "лабрадор", definition: "Labrador", score: 0},
{word: "назвать", definition: "name", score: 0},
{word: "гулять", definition: "walk", score: 0},
{word: "сделать", definition: "do", score: 0},
{word: "жизнь", definition: "a life", score: 0},
{word: "активный", definition: "active", score: 0},
{word: "начать", definition: "to begin", score: 0},
{word: "обучать", definition: "teach", score: 0},
{word: "разный", definition: "different", score: 0},
{word: "уже", definition: "already", score: 0},
{word: "лежать", definition: "lie", score: 0},
{word: "прыгать", definition: "jump", score: 0},
{word: "солнечный", definition: "solar", score: 0},
{word: "погода", definition: "weather", score: 0},
{word: "выглядить", definition: "look like", score: 0},
{word: "прекрасно", definition: "wonderful", score: 0},
{word: "солнце", definition: "sun", score: 0},
{word: "самый", definition: "most", score: 0},
{word: "верный", definition: "loyal", score: 0},
{word: "лучший", definition: "best", score: 0}
    ];

    const definition = document.getElementById("definition");
    const word = document.getElementById("word");
    let wordOnDisplay = false;
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 9;
    let dieRoll = 0;
    let tapCount = 0;
    let currentWords = lessonWords.slice(0, setSize);
    //let timer;
    let translateButtonTapped = false;
    
    const exclamatories = ["Oops", "I Forgor", "RIP Memory", "Uh-Oh"];
    let currentEx = 0; //Exclamatory at this index will be displayed next.
    init();
    
    function init() {
        // Display the first word and definition
        word.innerHTML = currentWords[0].word;
        definition.innerHTML = currentWords[0].definition;
        displaySetNum();
        // Event listeners for the buttons
        document.getElementById("left-button").addEventListener("touchstart", function () {
            if (translateButtonTapped === false) {
                translateButtonTapped = true;
            } else {
                translateButtonTapped = false;
            }
        });
        document.getElementById("left-button").addEventListener("click", function () {
            this.blur();
    
            if (wordOnDisplay === true) {
                // Move the current word back in the queue by 3 positions
                // or to the back if there are less than 4 words in the queue
                let currentWord = currentWords.shift();
                if (currentWords.length < 4) {
                    currentWords.push(currentWord); //put it at the very end
                    console.log(currentWords);
                } else {
                    currentWords.splice(3, 0, currentWord);
                    console.log(currentWords);
                }
                currentWord.score = -1;
                definition.style.visibility = "hidden";
                definition.style.textTransform = "lowercase";
    
                displayDone();
                displayNextWord();
                document.getElementById("left-button").innerHTML = "Translate";
                wordOnDisplay = false;
            } else {
                wordOnDisplay = true;
                definition.style.visibility = "visible";
                dieRoll = getRandomNumber();
                //If dieRoll < 98, display "Again" instead of an exclamatory remark
    
                if (dieRoll < 98) {
                    document.getElementById("left-button").innerHTML = "Again";
                } else {
                    if (currentEx > 3) {
                        currentEx = 0;
                    }
                    document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                    currentEx += 1;
                }
            }
        });
    
        document.getElementById("right-button").addEventListener("click", function () {
            this.blur();
            // Move the current word to the back of the queue
            let currentWord = currentWords.shift();
            currentWords.push(currentWord);
            currentWord.score++;
            // If the word's score is 2, remove it from the queue
            if (currentWord.score === 2) {
                currentWords = currentWords.filter((word) => word !== currentWord);
            }
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase";
            document.getElementById("left-button").innerHTML = "Translate";
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.getElementById("next-button").addEventListener("click", function () {
            this.blur();
            // Load the next setSize words from the lessonWords array
            currentIndex += setSize;
            currentWords = lessonWords.slice(currentIndex, currentIndex + setSize);
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase";
    
            setNum += 1;
    
            displaySetNum();
    
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key === " ") {
                const numInput = document.getElementById("set-num");
                numInput.value = numInput.value.replaceAll(" ", "");
                if (wordOnDisplay === false) {
                    displayDone();
                    definition.style.visibility = "visible";
                    wordOnDisplay = true;
                    dieRoll = getRandomNumber();
                    //If dieRoll < 98, display "Again" instead of an exclamatory remark
                    if (dieRoll < 98) {
                        document.getElementById("left-button").innerHTML = "Again";
                    } else {
                        if (currentEx > 3) {
                            currentEx = 0;
                        }
                        document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                        currentEx += 1;
                    }
                } else {
                    let currentWord = currentWords.shift();
                    currentWords.push(currentWord);
                    currentWord.score++;
                    // If the word's score is 2, remove it from the queue
                    if (currentWord.score === 2) {
                        currentWords = currentWords.filter((word) => word !== currentWord);
                    }
                    definition.style.visibility = "hidden";
                    definition.style.textTransform = "lowercase";
                    document.getElementById("left-button").innerHTML = "Translate";
                    displayDone();
                    displayNextWord();
                    wordOnDisplay = false;
                }
            }
            if (event.key === "Enter") {
                const numInput = document.getElementById("set-num");
                numInput.blur();
                displaySet();
            }
        });
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key !== "1") return;
    
            let currentWord = currentWords.shift();
            if (currentWords.length < 4) {
                currentWords.push(currentWord);
                console.log(currentWords);
            } else {
                currentWords.splice(3, 0, currentWord);
                console.log(currentWords);
            }
            currentWord.score = -1;
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase";
    
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.addEventListener("touchend", (event) => {
            displayDone();
            if (translateButtonTapped === true) {
                translateButtonTapped = false;
                return;
            }
            if (wordOnDisplay === false) {
                displayDone();
                definition.style.visibility = "visible";
                wordOnDisplay = true;
                dieRoll = getRandomNumber();
                //If dieRoll < 98, display "Again" instead of an exclamatory remark
                if (dieRoll < 98) {
                    document.getElementById("left-button").innerHTML = "Again";
                } else {
                    if (currentEx > 3) {
                        currentEx = 0;
                    }
                    document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                    currentEx += 1;
                }
            }
        });
    
        document.addEventListener("touchstart", (event) => {
            tapCount++; // increment the tapCount variable when a tap is detected
        });
    }
    function displaySet() {
        const numInput = document.getElementById("set-num");
        setNum = parseInt(numInput.value);
        currentIndex = setNum * setSize - setSize;
    
        currentWords = lessonWords.slice(currentIndex, currentIndex + setSize);
        currentWords.forEach((word) => (word.score = 0));
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
        if (currentWords.length !== 0) return;
        const definition = document.getElementById("definition");
        definition.style.visibility = "visible";
        definition.innerHTML = "Set Done " + setNum;
        //definition.style.textTransform = "capitalize";
    }
    
    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
