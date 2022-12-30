const lessonWords = [
    {word: "湿", definition: "shī", score: 0},
{word: "候", definition: "hòu", score: 0},
{word: "床", definition: "chuáng", score: 0},
{word: "躺", definition: "tǎng", score: 0},
{word: "凸", definition: "tū", score: 0},
{word: "宛", definition: "wǎn", score: 0},
{word: "帐", definition: "zhàng", score: 0},
{word: "篷", definition: "péng", score: 0},
{word: "般", definition: "bān", score: 0},
{word: "掀", definition: "xiān", score: 0},
{word: "婴", definition: "yīng", score: 0},
{word: "臂", definition: "bì", score: 0},
{word: "粗", definition: "cū", score: 0},
{word: "状", definition: "zhuàng", score: 0},
{word: "屌", definition: "diǎo", score: 0},
{word: "准", definition: "zhǔn", score: 0},
{word: "备", definition: "bèi", score: 0},
{word: "婆", definition: "pó", score: 0},
{word: "替", definition: "tì", score: 0},
{word: "舔", definition: "tiǎn", score: 0},
{word: "滚", definition: "gǔn", score: 0},
{word: "烫", definition: "tàng", score: 0},
{word: "吼", definition: "hǒu", score: 0},
{word: "吵", definition: "chǎo", score: 0},
{word: "笨", definition: "bèn", score: 0},
{word: "拒", definition: "jù", score: 0},
{word: "绝", definition: "jué", score: 0},
{word: "甩", definition: "shuǎi", score: 0},
{word: "盖", definition: "gài", score: 0},
{word: "厕", definition: "cè", score: 0},
{word: "半", definition: "bàn", score: 0},
{word: "阵", definition: "zhèn", score: 0},
{word: "尿", definition: "niào", score: 0},
{word: "童", definition: "tóng", score: 0},
{word: "抖", definition: "dǒu", score: 0},
{word: "脸", definition: "liǎn", score: 0},
{word: "永", definition: "yǒng", score: 0},
{word: "远", definition: "yuǎn", score: 0},
{word: "容", definition: "róng", score: 0},
{word: "圣", definition: "shèng", score: 0},
{word: "品", definition: "pǐn", score: 0},
{word: "耶", definition: "yé", score: 0},
{word: "笼", definition: "lóng", score: 0},
{word: "匆", definition: "cōng", score: 0},
{word: "忙", definition: "máng", score: 0},
{word: "客", definition: "kè", score: 0},
{word: "厅", definition: "tīng", score: 0},
{word: "电", definition: "diàn", score: 0},
{word: "怎", definition: "zěn", score: 0},
{word: "唷", definition: "yō", score: 0},
{word: "课", definition: "kè", score: 0},
{word: "咪", definition: "mī", score: 0},
{word: "撒", definition: "sā", score: 0},
{word: "娇", definition: "jiāo", score: 0},
{word: "抱", definition: "bào", score: 0},
{word: "舌", definition: "shé", score: 0},
{word: "吻", definition: "wěn", score: 0},
{word: "互", definition: "hù", score: 0},
{word: "彼", definition: "bǐ", score: 0},
{word: "游", definition: "yóu", score: 0},
{word: "移", definition: "yí", score: 0},
{word: "挤", definition: "jǐ", score: 0},
{word: "捏", definition: "niē", score: 0},
{word: "敏", definition: "mǐn", score: 0},
{word: "带", definition: "dài", score: 0},
{word: "呻", definition: "shēn", score: 0},
{word: "吟", definition: "yín", score: 0},
{word: "另", definition: "lìng", score: 0},
{word: "滑", definition: "huá", score: 0},
{word: "挑", definition: "tiāo", score: 0},
{word: "核", definition: "hé", score: 0},
{word: "嗯", definition: "ń", score: 0},
{word: "哈", definition: "hā", score: 0},
{word: "爽", definition: "shuǎng", score: 0},
{word: "玩", definition: "wán", score: 0},
{word: "泄", definition: "xiè", score: 0},
{word: "继", definition: "jì", score: 0},
{word: "续", definition: "xù", score: 0},
{word: "接", definition: "jiē", score: 0},
{word: "腿", definition: "tuǐ", score: 0},
{word: "板", definition: "bǎn", score: 0},
{word: "骚", definition: "sāo", score: 0},
{word: "透", definition: "tòu", score: 0},
{word: "荡", definition: "dàng", score: 0},
{word: "厉", definition: "lì", score: 0},
{word: "瘫", definition: "tān", score: 0},
{word: "抵", definition: "dǐ", score: 0},
{word: "吧", definition: "ba", score: 0},
{word: "喜", definition: "xǐ", score: 0},
{word: "磨", definition: "mó", score: 0},
{word: "蹭", definition: "cèng", score: 0},
{word: "尤", definition: "yóu", score: 0},
{word: "结", definition: "jié", score: 0},
{word: "婚", definition: "hūn", score: 0},
{word: "仅", definition: "jǐn", score: 0},
{word: "睾", definition: "gāo", score: 0},
{word: "丸", definition: "wán", score: 0},
{word: "屁", definition: "pì", score: 0},
{word: "刺", definition: "cì", score: 0},
{word: "激", definition: "jī", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
    let dieRoll = 0;
    
    const exclamatories = ["Oops", "I Forgor", "RIP Memory", "Uh-Oh"];
    let currentEx = 0; //Exclamatory at this index will be displayed next.
    init()
    
    function init() {
        // Display the first word and definition
        word.innerHTML = currentWords[0].word;
        definition.innerHTML = currentWords[0].definition;
        displaySetNum();
        // Event listeners for the buttons
        document.getElementById("left-button").addEventListener("click", function() {
            this.blur();

            if(wordOnDisplay === true) {
                // Move the current word back in the queue by 3 positions
            // or to the back if there are less than 4 words in the queue
            let currentWord = currentWords.shift();
            if (currentWords.length < 4) {
                currentWords.push(currentWord); //put it at the very end
                console.log(currentWords)
            } else {
                currentWords.splice(3, 0, currentWord);
                console.log(currentWords)
            }
            currentWord.score = -1;
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            displayDone();
            displayNextWord();
            document.getElementById("left-button").innerHTML = "Translate";
            wordOnDisplay = false;
            }
            else {
                wordOnDisplay = true;
                definition.style.visibility = "visible";
                dieRoll = getRandomNumber();
                //If dieRoll < 98, display "Again" instead of an exclamatory remark
                
                if (dieRoll < 98) {
                    document.getElementById("left-button").innerHTML = "Again";
                }
                else {
                    if (currentEx > 3) {currentEx = 0}
                    document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                    currentEx += 1;
                }
            }
        });
    
        document.getElementById("right-button").addEventListener("click", function() {
            this.blur();
            // Move the current word to the back of the queue
            let currentWord = currentWords.shift();
            currentWords.push(currentWord);
            currentWord.score++;
            // If the word's score is 2, remove it from the queue
            if (currentWord.score === 2) {
                currentWords = currentWords.filter(word => word !== currentWord);
            }
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
            document.getElementById("left-button").innerHTML = "Translate";
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.getElementById("next-button").addEventListener("click", function() {
            this.blur();
            // Load the next setSize words from the lessonWords array
            currentIndex += setSize;
            currentWords = lessonWords.slice(currentIndex, currentIndex + setSize);
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            setNum += 1;
            
            displaySetNum();

            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key === " "){
                const numInput = document.getElementById("set-num");
                numInput.value = (numInput.value).replaceAll(" ", "");
                if(wordOnDisplay === false){
                    displayDone();
                    definition.style.visibility = "visible";
                    wordOnDisplay = true;
                    dieRoll = getRandomNumber();
                    //If dieRoll < 98, display "Again" instead of an exclamatory remark
                    if (dieRoll < 98) {
                        document.getElementById("left-button").innerHTML = "Again";
                    }
                    else {
                        if (currentEx > 3) {currentEx = 0}
                        document.getElementById("left-button").innerHTML = exclamatories[currentEx];
                        currentEx += 1;
                    }
                }
                else {
                    let currentWord = currentWords.shift();
                    currentWords.push(currentWord);
                    currentWord.score++;
                    // If the word's score is 2, remove it from the queue
                    if (currentWord.score === 2) {
                        currentWords = currentWords.filter(word => word !== currentWord);
                    }
                    definition.style.visibility = "hidden";
                    definition.style.textTransform = "lowercase"
                    document.getElementById("left-button").innerHTML = "Translate";
                    displayDone();
                    displayNextWord();
                    wordOnDisplay = false;
                }
            }
            if (event.key === "Enter"){
                const numInput = document.getElementById("set-num");
                numInput.blur();
                displaySet();
            }
            
        })
        document.addEventListener("keydown", (event) => {
            // Check if the key that was pressed is the space key
            if (event.key !== "1") return
            
            let currentWord = currentWords.shift();
            if (currentWords.length < 4) {
                currentWords.push(currentWord);
                console.log(currentWords)
            } else {
                currentWords.splice(3, 0, currentWord);
                console.log(currentWords)
            }
            currentWord.score = -1;
            definition.style.visibility = "hidden";
            definition.style.textTransform = "lowercase"
    
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
            
            
        })
        document.addEventListener("touchend", (event) => {
            displayDone();
            definition.style.visibility = "visible";
        })

    }
    function displaySet(){
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
            if (currentWords.length !== 0) return
            const definition =  document.getElementById("definition")
            definition.style.visibility = "visible";
            definition.innerHTML = "Set Done " + setNum
            definition.style.textTransform = "capitalize"
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
      }