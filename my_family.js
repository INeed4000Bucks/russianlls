const lessonWords = [
    {word: "мой", definition: "my", score: 0},
{word: "семья", definition: "family", score: 0},
{word: "у", definition: "at", score: 0},
{word: "меня", definition: "me", score: 0},
{word: "большой", definition: "big", score: 0},
{word: "из", definition: "from", score: 0},
{word: "шесть", definition: "six", score: 0},
{word: "человек", definition: "human", score: 0},
{word: "я", definition: "I", score: 0},
{word: "мама", definition: "mother", score: 0},
{word: "папа", definition: "dad", score: 0},
{word: "старший", definition: "older", score: 0},
{word: "сестра", definition: "sister", score: 0},
{word: "бабушка", definition: "granny", score: 0},
{word: "и", definition: "and", score: 0},
{word: "дедушка", definition: "grandpa", score: 0},
{word: "мы", definition: "we", score: 0},
{word: "жить", definition: "live", score: 0},
{word: "все", definition: "all, everybody", score: 0},
{word: "вместе", definition: "together", score: 0},
{word: "с", definition: "with", score: 0},
{word: "собака", definition: "dog", score: 0},
{word: "кошка", definition: "cat", score: 0},
{word: "в", definition: "in", score: 0},
{word: "дома", definition: "home, at home", score: 0},
{word: "деревня", definition: "village", score: 0},
{word: "мой", definition: "my", score: 0},
{word: "встать", definition: "to get up", score: 0},
{word: "раньше", definition: "before", score: 0},
{word: "всех", definition: "all", score: 0},
{word: "потому что", definition: "because", score: 0},
{word: "что", definition: "what", score: 0},
{word: "ему", definition: "to him", score: 0},
{word: "рано", definition: "early", score: 0},
{word: "на", definition: "on", score: 0},
{word: "работа", definition: "work", score: 0},
{word: "он", definition: "he", score: 0},
{word: "работать", definition: "work", score: 0},
{word: "доктор", definition: "doctor", score: 0},
{word: "обычно", definition: "usually", score: 0},
{word: "готовить", definition: "to prepare", score: 0},
{word: "нам", definition: "us", score: 0},
{word: "завтрак", definition: "breakfast", score: 0},
{word: "обожать", definition: "to adore", score: 0},
{word: "овсяный", definition: "oat", score: 0},
{word: "каша", definition: "porridge", score: 0},
{word: "а", definition: "a", score: 0},
{word: "блин", definition: "pancake", score: 0},
{word: "после", definition: "after", score: 0},
{word: "собираться", definition: "going to", score: 0},
{word: "идти", definition: "go", score: 0},
{word: "школа", definition: "school", score: 0},
{word: "учиться", definition: "to study", score: 0},
{word: "пятый", definition: "fifth", score: 0},
{word: "класс", definition: "class", score: 0},
{word: "во", definition: "in", score: 0},
{word: "второй", definition: "second", score: 0},
{word: "любить", definition: "be in love", score: 0},
{word: "играть", definition: "play", score: 0},
{word: "друзья", definition: "friends", score: 0},
{word: "больше", definition: "more", score: 0},
{word: "география", definition: "geography", score: 0},
{word: "когда", definition: "when", score: 0},
{word: "приходить", definition: "come", score: 0},
{word: "домой", definition: "home", score: 0},
{word: "смотреть", definition: "to watch", score: 0},
{word: "телевизор", definition: "TV", score: 0},
{word: "потом", definition: "after", score: 0},
{word: "ужинать", definition: "supper", score: 0},
{word: "делать", definition: "to make, to do", score: 0},
{word: "урок", definition: "lesson", score: 0},
{word: "иногда", definition: "sometimes", score: 0},
{word: "помогать", definition: "to help", score: 0},
{word: "огород", definition: "garden", score: 0},
{word: "где", definition: "where", score: 0},
{word: "они", definition: "they", score: 0},
{word: "выращивать", definition: "to grow", score: 0},
{word: "овощ", definition: "to grow", score: 0},
{word: "фрукт", definition: "to grow", score: 0}
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
    console.log(currentWords);
    const definition = document.getElementById("definition");
    definition.style.visibility = "visible";
    definition.innerHTML = "Set Done " + setNum;
    //definition.style.textTransform = "capitalize";
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
    
    
