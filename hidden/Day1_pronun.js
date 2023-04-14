const lessonWords = [
    {word: "育", definition: yù, score: 0},
{word: "与", definition: yǔ, score: 0},
{word: "妹", definition: mèi, score: 0},
{word: "搬", definition: bān, score: 0},
{word: "进", definition: jìn, score: 0},
{word: "阶", definition: jiē, score: 0},
{word: "段", definition: duàn, score: 0},
{word: "知", definition: zhī, score: 0},
{word: "村", definition: cūn, score: 0},
{word: "落", definition: luò, score: 0},
{word: "间", definition: jiān, score: 0},
{word: "做", definition: zuò, score: 0},
{word: "黉", definition: hóng, score: 0},
{word: "舍", definition: shě, score: 0},
{word: "教", definition: jiào, score: 0},
{word: "授", definition: shòu, score: 0},
{word: "主", definition: zhǔ, score: 0},
{word: "旨", definition: zhǐ, score: 0},
{word: "特", definition: tè, score: 0},
{word: "别", definition: bié, score: 0},
{word: "重", definition: zhòng, score: 0},
{word: "视", definition: shì, score: 0},
{word: "升", definition: shēng, score: 0},
{word: "所", definition: suǒ, score: 0},
{word: "功", definition: gōng, score: 0},
{word: "课", definition: kè, score: 0},
{word: "压", definition: yā, score: 0},
{word: "较", definition: jiào, score: 0},
{word: "低", definition: dī, score: 0},
{word: "招", definition: zhāo, score: 0},
{word: "收", definition: shōu, score: 0},
{word: "且", definition: qiě, score: 0},
{word: "许", definition: xǔ, score: 0},
{word: "参", definition: cān, score: 0},
{word: "访", definition: fǎng, score: 0},
{word: "据", definition: jù, score: 0},
{word: "因", definition: yīn, score: 0},
{word: "其", definition: qí, score: 0},
{word: "余", definition: yú, score: 0},
{word: "作", definition: zuò, score: 0},
{word: "息", definition: xī, score: 0},
{word: "则", definition: zé, score: 0},
{word: "期", definition: qī, score: 0},
{word: "带", definition: dài, score: 0},
{word: "性", definition: xìng, score: 0},
{word: "平", definition: píng, score: 0},
{word: "辈", definition: bèi, score: 0},
{word: "旁", definition: páng, score: 0},
{word: "晚", definition: wǎn, score: 0},
{word: "问", definition: wèn, score: 0},
{word: "明", definition: míng, score: 0},
{word: "照", definition: zhào, score: 0},
{word: "吩", definition: fēn, score: 0},
{word: "咐", definition: fù, score: 0},
{word: "站", definition: zhàn, score: 0},
{word: "把", definition: bǎ, score: 0},
{word: "两", definition: liǎng, score: 0},
{word: "脚", definition: jiǎo, score: 0},
{word: "微", definition: wēi, score: 0},
{word: "打", definition: dǎ, score: 0}
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
