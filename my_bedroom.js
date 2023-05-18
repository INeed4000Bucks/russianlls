const lessonWords = [
    {word: "спальня", definition: "bedroom", score: 0},
    {word: "пятикомнатная", definition: "five-room", score: 0},
    {word: "квартира", definition: "apartment", score: 0},
    {word: "центр", definition: "center", score: 0},
    {word: "город", definition: "town", score: 0},
    {word: "член", definition: "member", score: 0},
    {word: "гостиный", definition: "living room", score: 0},
    {word: "комната", definition: "room", score: 0},
    {word: "наш", definition: "our", score: 0},
    {word: "иметь", definition: "have", score: 0},
    {word: "площадь", definition: "square", score: 0},
    {word: "несмотря", definition: "despite", score: 0},
    {word: "то", definition: "then", score: 0},
    {word: "мало", definition: "few", score: 0},
    {word: "место", definition: "place", score: 0},
    {word: "здесь", definition: "here", score: 0},
    {word: "необходимый", definition: "necessary", score: 0},
    {word: "письменный", definition: "writing", score: 0},
    {word: "стол", definition: "table", score: 0},
    {word: "стул", definition: "chair", score: 0},
    {word: "шкаф", definition: "cupboard", score: 0},
    {word: "одежда", definition: "clothes", score: 0},
    {word: "кровать", definition: "bed", score: 0},
    {word: "стоять", definition: "stand", score: 0},
    {word: "рядом", definition: "near", score: 0},
    {word: "с", definition: "with", score: 0},
    {word: "со", definition: "with", score: 0},
    {word: "стена", definition: "wall", score: 0},
    {word: "установлен", definition: "installed", score: 0},
    {word: "розетка", definition: "socket", score: 0},
    {word: "зарядка", definition: "charger", score: 0},
    {word: "телефон", definition: "phone", score: 0},
    {word: "справа", definition: "on right", score: 0},
    {word: "располагаться", definition: "be located", score: 0},
    {word: "учебник", definition: "textbook", score: 0},
    {word: "принадлежность", definition: "belonging", score: 0},
    {word: "под", definition: "under", score: 0},
    {word: "ковер", definition: "carpet", score: 0},
    {word: "чтобы", definition: "to", score: 0},
    {word: "нога", definition: "leg", score: 0},
    {word: "холодно", definition: "cold", score: 0},
    {word: "шаг", definition: "step", score: 0},
    {word: "хранить", definition: "keep", score: 0},
    {word: "обувь", definition: "shoes", score: 0},
    {word: "окно", definition: "window", score: 0},
    {word: "открывать", definition: "open", score: 0},
    {word: "проветривать", definition: "ventilate", score: 0},
    {word: "a", definition: "a", score: 0},
    {word: "подоконник", definition: "windowsill", score: 0},
    {word: "горшок", definition: "pot", score: 0},
    {word: "кактус", definition: "cactus", score: 0}
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
    