const lessonWords = [
    {word: "裸", definition: "luǒ", score: 0},
{word: "数", definition: "shù", score: 0},
{word: "某", definition: "mǒu", score: 0},
{word: "挂", definition: "guà", score: 0},
{word: "露", definition: "lù", score: 0},
{word: "脱", definition: "tuō", score: 0},
{word: "掉", definition: "diào", score: 0},
{word: "柜", definition: "guì", score: 0},
{word: "裤", definition: "kù", score: 0},
{word: "许", definition: "xǔ", score: 0},
{word: "博", definition: "bó", score: 0},
{word: "豪", definition: "háo", score: 0},
{word: "娟", definition: "juān", score: 0},
{word: "材", definition: "cái", score: 0},
{word: "持", definition: "chí", score: 0},
{word: "舒", definition: "shū", score: 0},
{word: "涵", definition: "hán", score: 0},
{word: "遗", definition: "yí", score: 0},
{word: "例", definition: "lì", score: 0},
{word: "期", definition: "qī", score: 0},
{word: "培", definition: "péi", score: 0},
{word: "宗", definition: "zōng", score: 0},
{word: "唯", definition: "wéi", score: 0},
{word: "莹", definition: "yíng", score: 0},
{word: "受", definition: "shòu", score: 0},
{word: "宠", definition: "chǒng", score: 0},
{word: "掌", definition: "zhǎng", score: 0},
{word: "珠", definition: "zhū", score: 0},
{word: "姐", definition: "jiě", score: 0},
{word: "咚", definition: "dōng", score: 0},
{word: "晨", definition: "chén", score: 0},
{word: "急", definition: "jí", score: 0},
{word: "促", definition: "cù", score: 0},
{word: "脚", definition: "jiǎo", score: 0},
{word: "步", definition: "bù", score: 0},
{word: "声", definition: "shēng", score: 0},
{word: "速", definition: "sù", score: 0},
{word: "映", definition: "yìng", score: 0},
{word: "帘", definition: "lián", score: 0},
{word: "赤", definition: "chì", score: 0},
{word: "睡", definition: "shuì", score: 0},
{word: "棒", definition: "bàng", score: 0},
{word: "依", definition: "yī", score: 0},
{word: "插", definition: "chā", score: 0},
{word: "迟", definition: "chí", score: 0},
{word: "反", definition: "fǎn", score: 0},
{word: "臭", definition: "chòu", score: 0},
{word: "惨", definition: "cǎn", score: 0},
{word: "蹑", definition: "niè", score: 0},
{word: "沉", definition: "chén", score: 0},
{word: "拔", definition: "bá", score: 0},
{word: "含", definition: "hán", score: 0},
{word: "射", definition: "shè", score: 0},
{word: "浓", definition: "nóng", score: 0},
{word: "液", definition: "yè", score: 0},
{word: "嘴", definition: "zuǐ", score: 0},
{word: "噜", definition: "lū", score: 0},
{word: "吞", definition: "tūn", score: 0},
{word: "肚", definition: "dù", score: 0},
{word: "乖", definition: "guāi", score: 0},
{word: "啊", definition: "a", score: 0},
{word: "惺", definition: "xīng", score: 0},
{word: "忪", definition: "sōng", score: 0},
{word: "哼", definition: "hēng", score: 0},
{word: "握", definition: "wò", score: 0},
{word: "满", definition: "mǎn", score: 0},
{word: "轻", definition: "qīng", score: 0},
{word: "推", definition: "tuī", score: 0},
{word: "奶", definition: "nǎi", score: 0},
{word: "喝", definition: "hē", score: 0},
{word: "调", definition: "diào", score: 0},
{word: "侃", definition: "kǎn", score: 0},
{word: "答", definition: "dá", score: 0},
{word: "真", definition: "zhēn", score: 0},
{word: "较", definition: "jiào", score: 0},
{word: "指", definition: "zhǐ", score: 0},
{word: "立", definition: "lì", score: 0},
{word: "刻", definition: "kè", score: 0},
{word: "流", definition: "liú", score: 0},
{word: "哇", definition: "wa", score: 0},
{word: "哦", definition: "ó", score: 0},
{word: "靠", definition: "kào", score: 0},
{word: "吓", definition: "xià", score: 0},
{word: "跳", definition: "tiào", score: 0},
{word: "放", definition: "fàng", score: 0},
{word: "晚", definition: "wǎn", score: 0},
{word: "闹", definition: "nào", score: 0},
{word: "则", definition: "zé", score: 0},
{word: "摇", definition: "yáo", score: 0},
{word: "败", definition: "bài", score: 0},
{word: "壁", definition: "bì", score: 0},
{word: "谁", definition: "shéi", score: 0},
{word: "嘀", definition: "dí", score: 0},
{word: "笑", definition: "xiào", score: 0},
{word: "浴", definition: "yù", score: 0},
{word: "室", definition: "shì", score: 0},
{word: "纸", definition: "zhǐ", score: 0},
{word: "团", definition: "tuán", score: 0},
{word: "闻", definition: "wén", score: 0},
{word: "枪", definition: "qiāng", score: 0},
{word: "味", definition: "wèi", score: 0}
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
    