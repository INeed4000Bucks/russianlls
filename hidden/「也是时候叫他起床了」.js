const lessonWords = [
    {word: "湿", definition: "wet", score: 0},
{word: "候", definition: "waiting", score: 0},
{word: "床", definition: "bed", score: 0},
{word: "躺", definition: "lie", score: 0},
{word: "凸", definition: "convex", score: 0},
{word: "宛", definition: "Wan, to be just like, winding", score: 0},
{word: "帐", definition: "account", score: 0},
{word: "篷", definition: "canopy", score: 0},
{word: "般", definition: "sort, manner, kind, category", score: 0},
{word: "掀", definition: "lift", score: 0},
{word: "婴", definition: "infant", score: 0},
{word: "臂", definition: "arm", score: 0},
{word: "粗", definition: "thick", score: 0},
{word: "状", definition: "shape", score: 0},
{word: "屌", definition: "dick", score: 0},
{word: "准", definition: "allow", score: 0},
{word: "备", definition: "prepare", score: 0},
{word: "婆", definition: "mother-in-law", score: 0},
{word: "替", definition: "for", score: 0},
{word: "舔", definition: "lick", score: 0},
{word: "滚", definition: "roll", score: 0},
{word: "烫", definition: "hot", score: 0},
{word: "吼", definition: "roar", score: 0},
{word: "吵", definition: "noisy, quarrel", score: 0},
{word: "笨", definition: "fool", score: 0},
{word: "拒", definition: "refuse", score: 0},
{word: "绝", definition: "absolutely", score: 0},
{word: "甩", definition: "dump", score: 0},
{word: "盖", definition: "cover", score: 0},
{word: "厕", definition: "toilet", score: 0},
{word: "半", definition: "half", score: 0},
{word: "阵", definition: "array", score: 0},
{word: "尿", definition: "urine", score: 0},
{word: "童", definition: "child", score: 0},
{word: "抖", definition: "shake", score: 0},
{word: "脸", definition: "face", score: 0},
{word: "永", definition: "forever", score: 0},
{word: "远", definition: "far", score: 0},
{word: "容", definition: "allow", score: 0},
{word: "圣", definition: "holy", score: 0},
{word: "品", definition: "savor", score: 0},
{word: "耶", definition: "yeah", score: 0},
{word: "笼", definition: "cage", score: 0},
{word: "匆", definition: "hasty", score: 0},
{word: "忙", definition: "busy", score: 0},
{word: "客", definition: "guest", score: 0},
{word: "厅", definition: "hall", score: 0},
{word: "电", definition: "electricity", score: 0},
{word: "怎", definition: "How", score: 0},
{word: "唷", definition: "Yo ~", score: 0},
{word: "课", definition: "class", score: 0},
{word: "咪", definition: "mum", score: 0},
{word: "撒", definition: "spread", score: 0},
{word: "娇", definition: "Jiao", score: 0},
{word: "抱", definition: "hug", score: 0},
{word: "舌", definition: "tongue", score: 0},
{word: "吻", definition: "kiss", score: 0},
{word: "互", definition: "mutual", score: 0},
{word: "彼", definition: "he", score: 0},
{word: "游", definition: "tour", score: 0},
{word: "移", definition: "shift", score: 0},
{word: "挤", definition: "squeeze", score: 0},
{word: "捏", definition: "pinch", score: 0},
{word: "敏", definition: "sensitive", score: 0},
{word: "带", definition: "bring", score: 0},
{word: "呻", definition: "groan", score: 0},
{word: "吟", definition: "chant", score: 0},
{word: "另", definition: "Other", score: 0},
{word: "滑", definition: "slip", score: 0},
{word: "挑", definition: "pick", score: 0},
{word: "核", definition: "nuclear", score: 0},
{word: "嗯", definition: "n", score: 0},
{word: "哈", definition: "what", score: 0},
{word: "爽", definition: "cool", score: 0},
{word: "玩", definition: "play", score: 0},
{word: "泄", definition: "vent", score: 0},
{word: "继", definition: "following", score: 0},
{word: "续", definition: "continued", score: 0},
{word: "接", definition: "catch", score: 0},
{word: "腿", definition: "leg", score: 0},
{word: "板", definition: "plate", score: 0},
{word: "骚", definition: "Sao, coquettish", score: 0},
{word: "透", definition: "through", score: 0},
{word: "荡", definition: "swing", score: 0},
{word: "厉", definition: "severe", score: 0},
{word: "瘫", definition: "paralyzed", score: 0},
{word: "抵", definition: "arrived", score: 0},
{word: "吧", definition: "ba, Bar", score: 0},
{word: "喜", definition: "happiness", score: 0},
{word: "磨", definition: "grind", score: 0},
{word: "蹭", definition: "rub", score: 0},
{word: "尤", definition: "especially", score: 0},
{word: "结", definition: "knot", score: 0},
{word: "婚", definition: "marriage", score: 0},
{word: "仅", definition: "only", score: 0},
{word: "睾", definition: "testosterone", score: 0},
{word: "丸", definition: "pill", score: 0},
{word: "屁", definition: "fart", score: 0},
{word: "刺", definition: "prick", score: 0},
{word: "激", definition: "exciting", score: 0}
    ];

    const definition =  document.getElementById("definition")
    const word = document.getElementById("word")
    let wordOnDisplay = false;
    let currentWords = lessonWords.slice(0, 7);
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

            if(wordOnDisplay === true) {
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
            document.getElementById("left-button").innerHTML = "Translate";
            wordOnDisplay = false;
            }
            else {
                wordOnDisplay = true;
                definition.style.visibility = "visible";
                document.getElementById("left-button").innerHTML = "Again";
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