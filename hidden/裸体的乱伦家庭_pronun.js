const lesson1Words = [
    {word: "裸", definition: "luǒ", score: 0},
{word: "伦", definition: "lún", score: 0},
{word: "庭", definition: "tíng", score: 0},
{word: "数", definition: "shù", score: 0},
{word: "某", definition: "mǒu", score: 0},
{word: "城", definition: "chéng", score: 0},
{word: "丝", definition: "sī", score: 0},
{word: "挂", definition: "guà", score: 0},
{word: "除", definition: "chú", score: 0},
{word: "外", definition: "wài", score: 0},
{word: "露", definition: "lù", score: 0},
{word: "脱", definition: "tuō", score: 0},
{word: "柜", definition: "guì", score: 0},
{word: "更", definition: "gèng", score: 0},
{word: "博", definition: "bó", score: 0},
{word: "豪", definition: "háo", score: 0},
{word: "刘", definition: "liú", score: 0},
{word: "娟", definition: "juān", score: 0},
{word: "三", definition: "sān", score: 0},
{word: "保", definition: "bǎo", score: 0},
{word: "舒", definition: "shū", score: 0},
{word: "涵", definition: "hán", score: 0},
{word: "遗", definition: "yí", score: 0},
{word: "传", definition: "chuán", score: 0},
{word: "转", definition: "zhuǎn", score: 0},
{word: "例", definition: "lì", score: 0},
{word: "租", definition: "zū", score: 0},
{word: "房", definition: "fáng", score: 0},
{word: "约", definition: "yuē", score: 0},
{word: "星", definition: "xīng", score: 0},
{word: "二", definition: "èr", score: 0},
{word: "培", definition: "péi", score: 0},
{word: "宗", definition: "zōng", score: 0},
{word: "唯", definition: "wéi", score: 0},
{word: "莹", definition: "yíng", score: 0},
{word: "最", definition: "zuì", score: 0},
{word: "宠", definition: "chǒng", score: 0},
{word: "掌", definition: "zhǎng", score: 0},
{word: "珠", definition: "zhū", score: 0},
{word: "咚", definition: "dōng", score: 0},
{word: "五", definition: "wǔ", score: 0},
{word: "晨", definition: "chén", score: 0},
{word: "急", definition: "jí", score: 0},
{word: "促", definition: "cù", score: 0},
{word: "速", definition: "sù", score: 0},
{word: "跑", definition: "pǎo", score: 0},
{word: "眼", definition: "yǎn", score: 0},
{word: "帘", definition: "lián", score: 0},
{word: "赤", definition: "chì", score: 0},
{word: "相", definition: "xiāng", score: 0},
{word: "睡", definition: "shuì", score: 0},
{word: "肉", definition: "ròu", score: 0},
{word: "依", definition: "yī", score: 0},
{word: "插", definition: "chā", score: 0},
{word: "爸", definition: "bà", score: 0},
{word: "迟", definition: "chí", score: 0},
{word: "两", definition: "liǎng", score: 0},
{word: "仍", definition: "réng", score: 0},
{word: "臭", definition: "chòu", score: 0},
{word: "惨", definition: "cǎn", score: 0},
{word: "蹑", definition: "niè", score: 0},
{word: "手", definition: "shǒu", score: 0},
{word: "沉", definition: "chén", score: 0},
{word: "拔", definition: "bá", score: 0},
{word: "含", definition: "hán", score: 0},
{word: "交", definition: "jiāo", score: 0},
{word: "射", definition: "shè", score: 0},
{word: "浓", definition: "nóng", score: 0},
{word: "液", definition: "yè", score: 0},
{word: "嘴", definition: "zuǐ", score: 0},
{word: "噜", definition: "lū", score: 0},
{word: "吞", definition: "tūn", score: 0},
{word: "肚", definition: "dù", score: 0},
{word: "乖", definition: "guāi", score: 0},
{word: "惺", definition: "xīng", score: 0},
{word: "忪", definition: "sōng", score: 0},
{word: "哼", definition: "hēng", score: 0},
{word: "等", definition: "děng", score: 0},
{word: "握", definition: "wò", score: 0},
{word: "推", definition: "tuī", score: 0},
{word: "牛", definition: "niú", score: 0},
{word: "喝", definition: "hē", score: 0},
{word: "调", definition: "diào", score: 0},
{word: "侃", definition: "kǎn", score: 0},
{word: "答", definition: "dá", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lesson1Words.slice(0, 7);
    let currentIndex = 0;
    let setNum = 1;
    let setSize = 7;
    init()
    
    function init() {
        // Display the first word and definition
        word.innerHTML = currentWords[0].word;
        definition.innerHTML = currentWords[0].definition;
        displaySetNum();
        // Event listeners for the buttons
        document.getElementById("left-button").addEventListener("click", function() {
            this.blur();
            // Move the current word back in the queue by 3 positions
            // or to the back if there are less than 4 words in the queue
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
    
            displayDone();
            displayNextWord();
            wordOnDisplay = false;
        });
    
        document.getElementById("next-button").addEventListener("click", function() {
            this.blur();
            // Load the next setSize words from the lesson1Words array
            currentIndex += setSize;
            currentWords = lesson1Words.slice(currentIndex, currentIndex + setSize);
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

        currentWords = lesson1Words.slice(currentIndex, currentIndex + setSize);
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