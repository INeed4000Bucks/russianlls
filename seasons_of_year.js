const lesson1Words = [
  {word: "россия", definition: "Russia", score: 0},
{word: "четыре", definition: "four", score: 0},
{word: "весна", definition: "Spring", score: 0},
{word: "лето", definition: "summer", score: 0},
{word: "осень", definition: "autumn", score: 0},
{word: "зима", definition: "winter", score: 0},
{word: "смена", definition: "change", score: 0},
{word: "суровый", definition: "severe", score: 0},
{word: "зимний", definition: "winter", score: 0},
{word: "мороз", definition: "freezing", score: 0},
{word: "тепло", definition: "warmly", score: 0},
{word: "природа", definition: "nature", score: 0},
{word: "оживать", definition: "to come alive", score: 0},
{word: "середина", definition: "middle", score: 0},
{word: "март", definition: "March", score: 0},
{word: "таять", definition: "melt", score: 0},
{word: "снег", definition: "snow", score: 0},
{word: "распускаться", definition: "to bloom", score: 0},
{word: "цветок", definition: "flower", score: 0},
{word: "деревья", definition: "trees", score: 0},
{word: "листье", definition: "leaf", score: 0},
{word: "становиться", definition: "to become", score: 0},
{word: "довольно", definition: "enough", score: 0},
{word: "теплый", definition: "warm", score: 0},
{word: "жаркий", definition: "hot", score: 0},
{word: "летний", definition: "summer", score: 0},
{word: "излюбленный", definition: "favorite", score: 0},
{word: "птица", definition: "bird", score: 0},
{word: "загорать", definition: "sunbathe", score: 0},
{word: "ездить", definition: "ride", score: 0},
{word: "море", definition: "sea", score: 0},
{word: "дождливый", definition: "rainy", score: 0},
{word: "сезон", definition: "season", score: 0},
{word: "красивый", definition: "beautiful", score: 0},
{word: "менять", definition: "change", score: 0},
{word: "вспыхивать", definition: "flare up", score: 0},
{word: "краска", definition: "dye", score: 0},
{word: "желтый", definition: "yellow", score: 0},
{word: "оранжевый", definition: "Orange", score: 0},
{word: "красный", definition: "red", score: 0},
{word: "заморозок", definition: "frost", score: 0},
{word: "опадать", definition: "to fall off", score: 0},
{word: "пасмурный", definition: "overcast", score: 0},
{word: "мрачный", definition: "gloomy", score: 0},
{word: "морозный", definition: "frosty", score: 0},
{word: "снежный", definition: "snow", score: 0},
{word: "символ", definition: "symbol", score: 0},
{word: "конец", definition: "the end", score: 0},
{word: "ноябрь", definition: "november", score: 0},
{word: "река", definition: "river", score: 0},
{word: "покрываться", definition: "be covered", score: 0},
{word: "лёд", definition: "ice", score: 0},
{word: "короче", definition: "shorter", score: 0},
{word: "темнеть", definition: "get dark", score: 0},
{word: "январь", definition: "January", score: 0},
{word: "холодный", definition: "cold", score: 0},
{word: "месяц", definition: "month", score: 0},
{word: "именно", definition: "exactly", score: 0},
{word: "новый", definition: "new", score: 0},
{word: "случаться", definition: "to happen", score: 0},
{word: "знаменитый", definition: "famous", score: 0},
{word: "температура", definition: "temperature", score: 0},
{word: "ниже", definition: "below", score: 0},
{word: "градус", definition: "degree", score: 0}
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