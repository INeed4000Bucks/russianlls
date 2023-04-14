const lessonWords = [
    { word: "妹妹", definition: "little sister", score: 0 },
    { word: "搬入", definition: "to move in", score: 0 },
    { word: "进入", definition: "to enter", score: 0 },
    { word: "gǒu", definition: "dog", score: 0 },
    { word: "zài", definition: "in", score: 0 },
    { word: "cūnzi", definition: "village", score: 0 },
    { word: "lǐ", definition: "inside", score: 0 },
    { word: "yùdào", definition: "to encounter", score: 0 },
    { word: "qítā", definition: "other", score: 0 },
    { word: "jǐ", definition: "few", score: 0 },
    { word: "xián-guàng", definition: "to wander (around)", score: 0 },
    { word: "tā", definition: "he, she, it", score: 0 },
    { word: "xīwàng", definition: "to hope, wish", score: 0 },
    { word: "xiǎngyào", definition: "to want", score: 0 },
    { word: "yīyàng", definition: "the same", score: 0 },
    { word: "tāmen", definition: "they", score: 0 },
    { word: "xiàng", definition: "similar", score: 0 },
    { word: "de", definition: "'s (indicates posession)", score: 0 },
    { word: "xiàng", definition: "língdāng", score: 0 },
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
let previousAction = null;
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
            previousAction = {
                word: currentWord,
                action: 'again',
                prevScore: currentWord.score
            };
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
        previousAction = {
            word: currentWord,
            action: 'next',
            prevScore: currentWord.score
        };
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
        if (event.ctrlKey && event.key === 'z') {
            undoPreviousAction();
        }
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
    //definition.style.textTransform = "capitalize";
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
function undoPreviousAction() {
    if (!previousAction) return;

    // Retrieve the word and action from the previousAction object
    let wordToUndo = previousAction.word;
    let actionToUndo = previousAction.action;

    // Undo the previous action and update the score
    if (actionToUndo === 'again') {
        let index = currentWords.findIndex((word) => word.word === wordToUndo.word);
        if (index >= 0) {
            currentWords[index].score = previousAction.prevScore;
        }
    } else if (actionToUndo === 'next') {
        let index = currentWords.findIndex((word) => word.word === wordToUndo.word);
        if (index >= 0) {
            currentWords[index].score = previousAction.prevScore;
            currentWords.unshift(currentWords.splice(index, 1)[0]);
        }
    }
    previousAction = null;
}
