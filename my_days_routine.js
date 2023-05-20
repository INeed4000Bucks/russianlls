const lessonWords = [
    {word: "распорядок", definition: "routine", score: 0},
    {word: "просыпаться", definition: "wake up", score: 0},
    {word: "сначала", definition: "first", score: 0},
    {word: "принимать", definition: "take", score: 0},
    {word: "примерно", definition: "approximately", score: 0},
    {word: "масло", definition: "oil", score: 0},
    {word: "яичница", definition: "fried eggs", score: 0},
    {word: "утро", definition: "morning", score: 0},
    {word: "пить", definition: "drink", score: 0},
    {word: "апельсиновый", definition: "orange", score: 0},
    {word: "фреш", definition: "fresh", score: 0},
    {word: "длиться", definition: "last", score: 0},
    {word: "полчаса́", definition: "half an hour", score: 0},
    {word: "восемь", definition: "eight", score: 0},
    {word: "часов", definition: "hours", score: 0},
    {word: "бы́стро", definition: "fast", score: 0},
    {word: "одева́ться", definition: "to get dressed", score: 0},
    {word: "причёсываться", definition: "comb own hair", score: 0},
    {word: "проверя́ть", definition: "to check", score: 0},
    {word: "свой", definition: "mine", score: 0},
    {word: "рюкзак", definition: "backpack", score: 0},
    {word: "ноутбук", definition: "a laptop", score: 0},
    {word: "паркинг", definition: "parking", score: 0},
    {word: "машина", definition: "the machine", score: 0},
    {word: "пол-", definition: "floor-", score: 0},
    {word: "полдевятого", definition: "a half past eight", score: 0},
    {word: "выезжать", definition: "leave", score: 0},
    {word: "офис", definition: "office", score: 0},
    {word: "находиться", definition: "be", score: 0},
    {word: "далеко", definition: "far", score: 0},
    {word: "от", definition: "from", score: 0},
    {word: "добираться", definition: "get", score: 0},
    {word: "туда", definition: "there", score: 0},
    {word: "полтора", definition: "one and a half", score: 0},
    {word: "рабочий", definition: "worker", score: 0},
    {word: "начинаться", definition: "start off", score: 0},
    {word: "десять", definition: "ten", score: 0},
    {word: "одиннадцать", definition: "eleven", score: 0},
    {word: "двенадцать", definition: "twelve", score: 0},
    {word: "митинг", definition: "rally", score: 0},
    {word: "чаще", definition: "more often", score: 0},
    {word: "заказывать", definition: "order", score: 0},
    {word: "пельмени", definition: "dumplings", score: 0},
    {word: "винегрет", definition: "the vinaigrette", score: 0},
    {word: "щи", definition: "cabbage soup", score: 0},
    {word: "нравиться", definition: "to please", score: 0},
    {word: "заканчиваться", definition: "to end", score: 0},
    {word: "возвращаться", definition: "to return", score: 0},
    {word: "около", definition: "about", score: 0},
    {word: "заходить", definition: "getting in", score: 0},
    {word: "продукт", definition: "product", score: 0},
    {word: "супермаркет", definition: "supermarket", score: 0},
    {word: "спортзал", definition: "gym", score: 0},
    {word: "недалеко", definition: "near", score: 0},
    {word: "тренировка", definition: "training", score: 0},
    {word: "вечера", definition: "evenings", score: 0},
    {word: "эти", definition: "these", score: 0},
    {word: "позже", definition: "later", score: 0},
    {word: "полдесятого", definition: "half past ten", score: 0},
    {word: "наверное", definition: "maybe", score: 0},
    {word: "устраивать", definition: "arrange", score: 0},
    {word: "такой", definition: "such", score: 0}
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
    
