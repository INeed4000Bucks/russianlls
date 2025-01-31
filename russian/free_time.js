const lessonWords = [
    {word: "свободный", definition: "free", score: 0},
    {word: "время", definition: "time", score: 0},
    {word: "ты", definition: "you", score: 0},
    {word: "заниматься", definition: "to study, to engage in", score: 0},
    {word: "сидеть", definition: "sit", score: 0},
    {word: "интернет", definition: "the Internet", score: 0},
    {word: "какой", definition: "which", score: 0},
    {word: "смотришь", definition: "look", score: 0},
    {word: "криминальный", definition: "criminal", score: 0},
    {word: "комедийные", definition: "comedic", score: 0},
    {word: "пользоваться", definition: "to enjoy", score: 0},
    {word: "компьютер", definition: "a computer", score: 0},
    {word: "каждый", definition: "each", score: 0},
    {word: "день", definition: "day", score: 0},
    {word: "нем", definition: "him", score: 0},
    {word: "игра", definition: "the game", score: 0},
    {word: "музыка", definition: "music", score: 0},
    {word: "волейбол", definition: "volleyball", score: 0},
    {word: "теннис", definition: "tennis", score: 0},
    {word: "хороший", definition: "good", score: 0},
    {word: "как", definition: "how", score: 0},
    {word: "плавать", definition: "to swim", score: 0},
    {word: "один", definition: "one", score: 0},
    {word: "или", definition: "or", score: 0},
    {word: "два", definition: "two", score: 0},
    {word: "раза", definition: "times", score: 0},
    {word: "неделя", definition: "week", score: 0},
    {word: "тебе", definition: "you", score: 0},
    {word: "нравиться", definition: "to please", score: 0},
    {word: "куда", definition: "where", score: 0},
    {word: "вы", definition: "you", score: 0},
    {word: "встречаться", definition: "meet", score: 0},
    {word: "кафе", definition: "cafe", score: 0},
    {word: "но", definition: "but", score: 0},
    {word: "выходной", definition: "day off, weekend", score: 0},
    {word: "клуб", definition: "club", score: 0},
    {word: "приглашать", definition: "to invite", score: 0},
    {word: "их", definition: "them", score: 0},
    {word: "себе", definition: "self, your/him/themself", score: 0},
    {word: "уметь", definition: "be able to", score: 0},
    {word: "да", definition: "yes", score: 0},
    {word: "неплохо", definition: "not bad", score: 0},
    {word: "следующий", definition: "next", score: 0},
    {word: "раз", definition: "once", score: 0},
    {word: "мочь", definition: "be able", score: 0},
    {word: "посмотреть", definition: "to look, to see, to watch", score: 0},
    {word: "твой", definition: "your", score: 0},
    {word: "любимый", definition: "favorite", score: 0},
    {word: "сериал", definition: "TV series", score: 0},
    {word: "спасибо", definition: "Thanks", score: 0},
    {word: "за", definition: "behind", score: 0},
    {word: "приглашение", definition: "invitation", score: 0},
    {word: "радость", definition: "joy", score: 0}
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
    