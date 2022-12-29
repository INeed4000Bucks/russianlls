const lesson1Words = [
  {word: "санкт-петербург", definition: "St. Petersburg", score: 0},
{word: "прошлый", definition: "last", score: 0},
{word: "решить", definition: "to solve", score: 0},
{word: "съездить", definition: "go", score: 0},
{word: "давно", definition: "for a long time", score: 0},
{word: "этот", definition: "this", score: 0},
{word: "оправдание", definition: "justification", score: 0},
{word: "поездка", definition: "trip", score: 0},
{word: "скоростной", definition: "high-speed", score: 0},
{word: "поезд", definition: "train", score: 0},
{word: "занимать", definition: "occupy", score: 0},
{word: "расстояние", definition: "distance", score: 0},
{word: "семьсот", definition: "seven hundred", score: 0},
{word: "километр", definition: "kilometer", score: 0},
{word: "помнить", definition: "remember", score: 0},
{word: "каникулы", definition: "holiday", score: 0},
{word: "дорога", definition: "road", score: 0},
{word: "весь", definition: "the whole", score: 0},
{word: "зайти", definition: "come in", score: 0},
{word: "сайт", definition: "website", score: 0},
{word: "российский", definition: "Russian", score: 0},
{word: "железный", definition: "iron", score: 0},
{word: "заказать", definition: "to order", score: 0},
{word: "билет", definition: "ticket", score: 0},
{word: "москва", definition: "Moscow", score: 0},
{word: "обратно", definition: "back", score: 0},
{word: "тысяча", definition: "thousand", score: 0},
{word: "рубль", definition: "ruble", score: 0},
{word: "отпроситься", definition: "to take time off", score: 0},
{word: "пораньше", definition: "early", score: 0},
{word: "сразу", definition: "straightaway", score: 0},
{word: "отправиться", definition: "go", score: 0},
{word: "ленинградский", definition: "Leningrad", score: 0},
{word: "вокзал", definition: "railway station", score: 0},
{word: "метро", definition: "Metro", score: 0},
{word: "успеть", definition: "be on time", score: 0},
{word: "тот", definition: "that", score: 0},
{word: "проводить", definition: "conduct", score: 0},
{word: "замечательный", definition: "wonderful", score: 0},
{word: "северный", definition: "northern", score: 0},
{word: "столица", definition: "capital", score: 0},
{word: "посетить", definition: "visit", score: 0},
{word: "эрмитаж", definition: "hermitage Museum", score: 0},
{word: "дворец", definition: "castle", score: 0},
{word: "прокатиться", definition: "take a ride", score: 0},
{word: "корабль", definition: "ship", score: 0},
{word: "разводной", definition: "adjustable", score: 0},
{word: "мост", definition: "bridge", score: 0},
{word: "вернуться", definition: "to return", score: 0},
{word: "радостный", definition: "glad", score: 0},
{word: "полный", definition: "full", score: 0},
{word: "впечатление", definition: "impression", score: 0},
{word: "отдохнувший", definition: "rested", score: 0},
{word: "надо", definition: "necessary", score: 0},
{word: "будет", definition: "will", score: 0},
{word: "выбираться", definition: "get out", score: 0}
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