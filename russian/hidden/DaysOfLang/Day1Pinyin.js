const lessonWords = [
    { word: "Expensive car", definition: "māšin-e gerān qeymat", score: 0 },
{ word: "Expensive food", definition: "qazā-ye gerān qeymat", score: 0 },
{ word: "I worked yesterday", definition: "man diruz kār kardam", score: 0 },
{ word: "You speak quietly", definition: "to ārām sohbat mikonī", score: 0 },
{ word: "I'm not hungry", definition: "gorosne nistam", score: 0 },
{ word: "I finished the task", definition: "man kār rā tamām kardam", score: 0 },
{ word: "I returned home", definition: "man bargaštam khāne", score: 0 },
{ word: "Bright light", definition: "nur-e rošan", score: 0 },
{ word: "Homeless man", definition: "mard-e bi khānaman", score: 0 },
{ word: "Bad injury", definition: "jarāhat-e bad", score: 0 },
{ word: "Sudden injury", definition: "āsib-e nāgahāni", score: 0 },
{ word: "You called me on the phone", definition: "bā man telefonī tamās gerefti", score: 0 },
{ word: "I walk around the car", definition: "dor-e māšin qadam mizanam", score: 0 },
{ word: "It's hot outside", definition: "birun garm ast", score: 0 },
{ word: "Did you jump high?", definition: "bālā paridi?", score: 0 },
{ word: "The middle of the street", definition: "vasat-e khiyaabun", score: 0 },
{ word: "I met him at midnight", definition: "nime šab bā u molaghat kardam", score: 0 },
{ word: "The nurse is on top of me", definition: "parastaar bālā-ye man ast", score: 0 },
{ word: "soul", definition: "روُح", score: 0 },
{ word: "to feel hurt", definition: "آسیب دیِدَن", score: 0 },
{ word: "Did you eat well?", definition: "khub khordi?", score: 0 },
{ word: "short skirt", definition: "دامَن کُوتاه", score: 0 },
{ word: "catchy music", definition: "مُوسیقی گیرا", score: 0 },
{ word: "I listen to you", definition: "be to gush mikonam", score: 0 },
{ word: "I learn from the book", definition: "از کِتاب یاد می‌گیرَم", score: 0 },
{ word: "He said nothing", definition: "hich chiz negoft", score: 0 },
{ word: "big city", definition: "shahre bozorg", score: 0 },
{ word: "first floor", definition: "طَبَقِه اَوَل", score: 0 },
{ word: "come with me", definition: "با مَن بِیا", score: 0 },
{ word: "rich man", definition: "marde sorutmand", score: 0 },
{ word: "beautiful woman", definition: "zane zibaa", score: 0 },
{ word: "obedient child", definition: "bache moti'", score: 0 },
{ word: "He says nothing", definition: "u chizi nami guyad", score: 0 },
{ word: "obediate wife", definition: "hamsare moti", score: 0 },
{ word: "I read words", definition: "kalamaat raa mikhaanam", score: 0 },
{ word: "I see if I'm right", definition: "می‌بینَم کِه درست است", score: 0 },
{ word: "wet floor", definition: "زمین خیس", score: 0 },
{ word: "carpet floor", definition: "کف فرش", score: 0 },
{ word: "scary times", definition: "زمان های ترسناک", score: 0 },
{ word: "What did you eat?", definition: "چی خوردی؟", score: 0 },
{ word: "Did it taste good?", definition: "طعمش خوب بود؟", score: 0 },
{ word: "Answer in Persian", definition: "به زبان فارسی پاسخ دهید", score: 0 }
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
    //definition.style.textTransform = "capitalize";
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
