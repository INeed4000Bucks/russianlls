const lessonWords = [
  {word: "дом", definition: "house", score: 0},
{word: "частный", definition: "private， particular", score: 0},
{word: "двухэтажный", definition: "two-storied", score: 0},
{word: "просторный", definition: "spacious", score: 0},
{word: "уютный", definition: "cosy", score: 0},
{word: "кухня", definition: "kitchen", score: 0},
{word: "кабинет", definition: "cabinet", score: 0},
{word: "просторная", definition: "spacious", score: 0},
{word: "посередине", definition: "in the middle", score: 0},
{word: "диван", definition: "sofa", score: 0},
{word: "возле", definition: "near", score: 0},
{word: "овальный", definition: "oval", score: 0},
{word: "ковёр", definition: "carpet", score: 0},
{word: "напротив", definition: "against", score: 0},
{word: "висеть", definition: "to hang", score: 0},
{word: "журнальный", definition: "magazine", score: 0},
{word: "меньше", definition: "less", score: 0},
{word: "ней", definition: "her", score: 0},
{word: "панорамный", definition: "panoramic", score: 0},
{word: "выход", definition: "exit", score: 0},
{word: "терраса", definition: "terrace", score: 0},
{word: "мебель", definition: "furniture", score: 0},
{word: "компактный", definition: "compact", score: 0},
{word: "кухонный", definition: "kitchen", score: 0},
{word: "гарнитур", definition: "headset", score: 0},
{word: "слева", definition: "left", score: 0},
{word: "дверь", definition: "a door", score: 0},
{word: "обеденный", definition: "dining", score: 0},
{word: "небольшой", definition: "small", score: 0},
{word: "софа", definition: "sofa", score: 0},
{word: "полка", definition: "a shelf", score: 0},
{word: "книга", definition: "book", score: 0},
{word: "кресло", definition: "armchair", score: 0},
{word: "книжный", definition: "book", score: 0},
{word: "уборная", definition: "restroom", score: 0},
{word: "отдых", definition: "relaxation", score: 0},
{word: "двуспальный", definition: "double", score: 0},
{word: "трюмо", definition: "dressing table", score: 0},
{word: "комод", definition: "dresser", score: 0},
{word: "смотреться", definition: "to look", score: 0},
{word: "остальной", definition: "the rest", score: 0},
{word: "обустроен", definition: "equipped", score: 0},
{word: "гардеробный", definition: "wardrobe", score: 0},
{word: "ванная", definition: "bathroom", score: 0},
{word: "умывальник", definition: "wash basin", score: 0},
{word: "зеркало", definition: "mirror", score: 0},
{word: "унитаз", definition: "toilet bowl", score: 0},
{word: "вещь", definition: "thing", score: 0},
{word: "круглый", definition: "round", score: 0},
{word: "ванна", definition: "bath", score: 0},
{word: "мягкий", definition: "soft", score: 0},
{word: "коврик", definition: "mat", score: 0},
{word: "потолок", definition: "ceiling", score: 0},
{word: "люстра", definition: "chandelier", score: 0},
{word: "штора", definition: "curtain", score: 0},
{word: "жалюзи", definition: "blinds", score: 0},
{word: "дневной", definition: "day", score: 0},
{word: "свет", definition: "light", score: 0}
    ];

    const definition = document.getElementById("definition");
    const word = document.getElementById("word");
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
    let dieRoll = 0;
    let tapCount = 0;
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
        definition.style.textTransform = "capitalize";
    }
    
    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    