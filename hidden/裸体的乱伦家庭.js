const lessonWords = [
    {word: "裸", definition: "naked", score: 0},
{word: "数", definition: "number, amount", score: 0},
{word: "某", definition: "certain", score: 0},
{word: "挂", definition: "hang", score: 0},
{word: "露", definition: "dew", score: 0},
{word: "脱", definition: "take off", score: 0},
{word: "掉", definition: "fall, drop, lose", score: 0},
{word: "柜", definition: "cabinet", score: 0},
{word: "裤", definition: "pants", score: 0},
{word: "许", definition: "promise, allow, permit", score: 0},
{word: "博", definition: "rich, plentiful", score: 0},
{word: "豪", definition: "Hao, grand", score: 0},
{word: "娟", definition: "Juan", score: 0},
{word: "材", definition: "material", score: 0},
{word: "持", definition: "hold", score: 0},
{word: "舒", definition: "Shu", score: 0},
{word: "涵", definition: "culvert", score: 0},
{word: "遗", definition: "leave", score: 0},
{word: "例", definition: "example", score: 0},
{word: "期", definition: "expect", score: 0},
{word: "培", definition: "train", score: 0},
{word: "宗", definition: "Zong", score: 0},
{word: "唯", definition: "only", score: 0},
{word: "莹", definition: "Ying", score: 0},
{word: "受", definition: "by", score: 0},
{word: "宠", definition: "pet", score: 0},
{word: "掌", definition: "palm", score: 0},
{word: "珠", definition: "bead", score: 0},
{word: "姐", definition: "sister", score: 0},
{word: "咚", definition: "boom", score: 0},
{word: "晨", definition: "morning", score: 0},
{word: "急", definition: "urgent", score: 0},
{word: "促", definition: "promote", score: 0},
{word: "脚", definition: "foot", score: 0},
{word: "步", definition: "step", score: 0},
{word: "声", definition: "sound, voice", score: 0},
{word: "速", definition: "speed", score: 0},
{word: "映", definition: "reflect", score: 0},
{word: "帘", definition: "curtain", score: 0},
{word: "赤", definition: "red", score: 0},
{word: "睡", definition: "sleep", score: 0},
{word: "棒", definition: "great", score: 0},
{word: "依", definition: "according to", score: 0},
{word: "插", definition: "insert", score: 0},
{word: "迟", definition: "late", score: 0},
{word: "反", definition: "opposite", score: 0},
{word: "臭", definition: "Smelly", score: 0},
{word: "惨", definition: "awful", score: 0},
{word: "蹑", definition: "chase", score: 0},
{word: "沉", definition: "sink, keep down", score: 0},
{word: "拔", definition: "pull", score: 0},
{word: "含", definition: "contain", score: 0},
{word: "射", definition: "shoot", score: 0},
{word: "浓", definition: "concentrated", score: 0},
{word: "液", definition: "liquid", score: 0},
{word: "嘴", definition: "mouth", score: 0},
{word: "噜", definition: "chatter", score: 0},
{word: "吞", definition: "swallow", score: 0},
{word: "肚", definition: "tripe", score: 0},
{word: "乖", definition: "obedient", score: 0},
{word: "啊", definition: "what", score: 0},
{word: "惺", definition: "sleepy", score: 0},
{word: "忪", definition: "bleary", score: 0},
{word: "哼", definition: "humph", score: 0},
{word: "握", definition: "grip", score: 0},
{word: "满", definition: "full", score: 0},
{word: "轻", definition: "light", score: 0},
{word: "推", definition: "push", score: 0},
{word: "奶", definition: "milk", score: 0},
{word: "喝", definition: "drink", score: 0},
{word: "调", definition: "tone", score: 0},
{word: "侃", definition: "Kan", score: 0},
{word: "答", definition: "answer", score: 0},
{word: "真", definition: "real", score: 0},
{word: "较", definition: "compare", score: 0},
{word: "指", definition: "refer to", score: 0},
{word: "立", definition: "stand", score: 0},
{word: "刻", definition: "carve", score: 0},
{word: "流", definition: "flow", score: 0},
{word: "哇", definition: "Wow", score: 0},
{word: "哦", definition: "Oh", score: 0},
{word: "靠", definition: "Depend on", score: 0},
{word: "吓", definition: "scare", score: 0},
{word: "跳", definition: "jump", score: 0},
{word: "放", definition: "put", score: 0},
{word: "晚", definition: "night", score: 0},
{word: "闹", definition: "noisy", score: 0},
{word: "则", definition: "but", score: 0},
{word: "摇", definition: "shake", score: 0},
{word: "败", definition: "defeat", score: 0},
{word: "壁", definition: "wall", score: 0},
{word: "谁", definition: "who", score: 0},
{word: "嘀", definition: "beep", score: 0},
{word: "笑", definition: "laugh", score: 0},
{word: "浴", definition: "bath", score: 0},
{word: "室", definition: "room", score: 0},
{word: "纸", definition: "paper", score: 0},
{word: "团", definition: "group", score: 0},
{word: "闻", definition: "smell", score: 0},
{word: "枪", definition: "gun", score: 0},
{word: "味", definition: "taste", score: 0}
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
    