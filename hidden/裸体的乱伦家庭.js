const lesson1Words = [
    {word: "裸", definition: "naked", score: 0},
    {word: "伦", definition: "human relatonship", score: 0},
    {word: "庭", definition: "courtyard", score: 0},
    {word: "数", definition: "number", score: 0},
    {word: "楼", definition: "building, floor", score: 0},
    {word: "某", definition: "some, certain (things)", score: 0},
    {word: "城", definition: "city", score: 0},
    {word: "裸体", definition: "naked", score: 0},//
    {word: "乱伦", definition: "u kno", score: 0},//
    {word: "家庭", definition: "family", score: 0},//
    {word: "某个", definition: "some", score: 0},//
    {word: "城市", definition: "city", score: 0},//
    {word: "字数", definition: "char count", score: 0},//
    {word: "法庭", definition: "court of law", score: 0},//
    {word: "丝", definition: "silk", score: 0},
    {word: "挂", definition: "hang", score: 0},
    {word: "除", definition: "remove", score: 0},
    {word: "外", definition: "outside", score: 0},
    {word: "露", definition: "dew", score: 0},
    {word: "脱", definition: "take off, shed", score: 0},
    {word: "柜", definition: "cabinet", score: 0},
    {word: "一丝不挂", definition: "stark naked", score: 0},
    {word: "除了", definition: "except", score: 0},
    {word: "裸露", definition: "naked / bare", score: 0},
    {word: "脱掉", definition: "to remove, take off", score: 0},
    {word: "衣柜", definition: "wardrobe", score: 0},
    {word: "关掉", definition: "to switch off", score: 0},
    {word: "逃脱", definition: "to run away", score: 0},
    {word: "更", definition: "even", score: 0},
    {word: "博", definition: "plentiful, gamble", score: 0},
    {word: "豪", definition: "brave", score: 0},
    {word: "刘", definition: "liu", score: 0},
    {word: "娟", definition: "beautiful", score: 0},
    {word: "三", definition: "three", score: 0},
    {word: "保", definition: "save", score: 0},
    {word: "舒", definition: "relax", score: 0},
    {word: "涵", definition: "to contain", score: 0},
    {word: "遗", definition: "leave", score: 0},
    {word: "传", definition: "pass", score: 0},
    {word: "转", definition: "turn", score: 0},
    {word: "例", definition: "example", score: 0},
    {word: "租", definition: "rent", score: 0},
    {word: "房", definition: "house, room", score: 0},
    {word: "约", definition: "about", score: 0},
    {word: "星", definition: "star", score: 0},
    {word: "二", definition: "two", score: 0},
    {word: "培", definition: "train", score: 0},
    {word: "宗", definition: "ancestor, sect", score: 0},
    {word: "唯", definition: "only", score: 0},
    {word: "莹", definition: "ying", score: 0},
    {word: "最", definition: "most", score: 0},
    {word: "宠", definition: "pet", score: 0},
    {word: "掌", definition: "palm", score: 0},
    {word: "珠", definition: "bead", score: 0},
    {word: "咚", definition: "boom", score: 0},
    {word: "五", definition: "fives", score: 0},
    {word: "晨", definition: "morning", score: 0},
    {word: "急", definition: "urgent", score: 0},
    {word: "促", definition: "promote", score: 0},
    {word: "速", definition: "speed", score: 0},
    {word: "跑", definition: "run", score: 0},
    {word: "眼", definition: "eye", score: 0},
    {word: "帘", definition: "curtain", score: 0},
    {word: "赤", definition: "red", score: 0},
    {word: "相", definition: "mutually", score: 0},
    {word: "睡", definition: "sleep", score: 0},
    {word: "肉", definition: "meat", score: 0},
    {word: "依", definition: "according to", score: 0},
    {word: "插", definition: "insert", score: 0},
    {word: "爸", definition: "dad", score: 0},
    {word: "迟", definition: "late", score: 0},
    {word: "两", definition: "two", score: 0},
    {word: "仍", definition: "still", score: 0},
    {word: "臭", definition: "smelly", score: 0},
    {word: "惨", definition: "awful", score: 0},
    {word: "蹑", definition: "chase", score: 0},
    {word: "手", definition: "hand", score: 0},
    {word: "沉", definition: "shen", score: 0},
    {word: "拔", definition: "pull", score: 0},
    {word: "含", definition: "contain", score: 0},
    {word: "交", definition: "pay", score: 0},
    {word: "射", definition: "shoot", score: 0},
    {word: "浓", definition: "concentrated", score: 0},
    {word: "液", definition: "liquid", score: 0},
    {word: "嘴", definition: "mouth", score: 0},
    {word: "噜", definition: "chatter", score: 0},
    {word: "吞", definition: "swallow", score: 0},
    {word: "肚", definition: "tripe", score: 0},
    {word: "乖", definition: "obedient", score: 0},
    {word: "惺", definition: "sleepy", score: 0},
    {word: "忪", definition: "bleary", score: 0},
    {word: "哼", definition: "Humph", score: 0},
    {word: "等", definition: "Wait", score: 0},
    {word: "握", definition: "grip", score: 0},
    {word: "推", definition: "push", score: 0},
    {word: "牛", definition: "Cattle", score: 0},
    {word: "喝", definition: "drink", score: 0},
    {word: "调", definition: "adjust", score: 0},
    {word: "侃", definition: "upright and strong", score: 0},
    {word: "答", definition: "answer", score: 0},
    {word: "较", definition: "compare", score: 0},
    {word: "指", definition: "refer to", score: 0},
    {word: "刻", definition: "carve", score: 0},
    {word: "靠", definition: "Depend on", score: 0},
    {word: "吓", definition: "scare", score: 0},
    {word: "跳", definition: "Jump", score: 0},
    {word: "晚", definition: "Night", score: 0},
    {word: "闹", definition: "noisy", score: 0},
    {word: "则", definition: "but", score: 0},
    {word: "摇", definition: "shake", score: 0},
    {word: "败", definition: "defeat", score: 0},
    {word: "嘀", definition: "beep", score: 0},
    {word: "笑", definition: "laugh", score: 0},
    {word: "浴", definition: "bath", score: 0},
    {word: "室", definition: "room", score: 0},
    {word: "纸", definition: "Paper", score: 0},
    {word: "团", definition: "group", score: 0},
    {word: "拿", definition: "take", score: 0},
    {word: "闻", definition: "smell", score: 0},
    {word: "枪", definition: "gun", score: 0},
    {word: "湿", definition: "wet", score: 0},
    {word: "床", definition: "bed", score: 0},
    {word: "躺", definition: "lie", score: 0},
    {word: "凸", definition: "convex", score: 0},
    {word: "块", definition: "Piece", score: 0},
    {word: "宛", definition: "winding", score: 0},
    {word: "帐", definition: "account", score: 0},
    {word: "篷", definition: "canopy", score: 0},
    {word: "般", definition: "so-so", score: 0},
    {word: "掀", definition: "lift", score: 0},
    {word: "婴", definition: "infant", score: 0},
    {word: "臂", definition: "arm", score: 0},
    {word: "粗", definition: "thick", score: 0},
    {word: "状", definition: "shape", score: 0},
    {word: "屌", definition: "dick", score: 0},
    {word: "备", definition: "prepare", score: 0},
    {word: "婆", definition: "Mother-in-law", score: 0},
    {word: "舔", definition: "lick", score: 0},
    {word: "滚", definition: "roll", score: 0},
    {word: "烫", definition: "hot", score: 0},
    {word: "弄", definition: "alley", score: 0},
    {word: "吼", definition: "Roar", score: 0},
    {word: "跟", definition: "and", score: 0},
    {word: "吵", definition: "Quarrel", score: 0},
    {word: "笨", definition: "fool", score: 0},
    {word: "拒", definition: "refuse", score: 0},
    {word: "甩", definition: "dump", score: 0},
    {word: "厕", definition: "toilet", score: 0},
    {word: "半", definition: "Half", score: 0},
    {word: "阵", definition: "Array", score: 0},
    {word: "尿", definition: "Urine", score: 0},
    {word: "童", definition: "child", score: 0},
    {word: "哪", definition: "where", score: 0},
    {word: "抖", definition: "shake", score: 0},
    {word: "脸", definition: "Face", score: 0},
    {word: "永", definition: "forever", score: 0},
    {word: "远", definition: "Far", score: 0},
    {word: "圣", definition: "holy", score: 0},
    {word: "品", definition: "Taste", score: 0},
    {word: "耶", definition: "yeah", score: 0},
    {word: "笼", definition: "cage", score: 0},
    {word: "匆", definition: "hasty", score: 0},
    {word: "忙", definition: "busy", score: 0},
    {word: "客", definition: "guest", score: 0},
    {word: "厅", definition: "hall", score: 0},
    {word: "动", definition: "move", score: 0},
    {word: "唷", definition: "Yo ~", score: 0},
    {word: "课", definition: "class", score: 0},
    {word: "咪", definition: "mum", score: 0},
    {word: "撒", definition: "spread", score: 0},
    {word: "娇", definition: "Jiao", score: 0},
    {word: "舌", definition: "tongue", score: 0},
    {word: "吻", definition: "kiss", score: 0},
    {word: "与", definition: "and", score: 0},
    {word: "互", definition: "mutual", score: 0},
    {word: "彼", definition: "he", score: 0},
    {word: "游", definition: "tour", score: 0},
    {word: "移", definition: "shift", score: 0},
    {word: "挤", definition: "squeeze", score: 0},
    {word: "捏", definition: "pinch", score: 0},
    {word: "敏", definition: "Sensitive", score: 0},
    {word: "呻", definition: "groan", score: 0},
    {word: "吟", definition: "chant", score: 0},
    {word: "另", definition: "Other", score: 0},
    {word: "阴", definition: "Negative", score: 0},
    {word: "核", definition: "nuclear", score: 0},
    {word: "嗯", definition: "Ok", score: 0},
    {word: "爽", definition: "refreshing, clear, happy", score: 0},
    {word: "死", definition: "die", score: 0},
    {word: "泄", definition: "vent", score: 0},
    {word: "继", definition: "following", score: 0},
    {word: "腿", definition: "leg", score: 0},
    {word: "板", definition: "plate", score: 0},
    {word: "骚", definition: "Sao", score: 0},
    {word: "透", definition: "through", score: 0},
    {word: "荡", definition: "swing", score: 0},
    {word: "瘫", definition: "paralyzed", score: 0},
    {word: "坐", definition: "sit", score: 0},
    {word: "抵", definition: "arrived", score: 0},
    {word: "喜", definition: "happiness", score: 0},
    {word: "欢", definition: "joyous", score: 0},
    {word: "磨", definition: "grind", score: 0},
    {word: "蹭", definition: "rub", score: 0},
    {word: "尤", definition: "especially", score: 0},
    {word: "结", definition: "Knot", score: 0},
    {word: "婚", definition: "marriage", score: 0},
    {word: "睾", definition: "Testosterone", score: 0},
    {word: "丸", definition: "pill", score: 0},
    {word: "刺", definition: "prick", score: 0},
    {word: "激", definition: "exciting", score: 0},
    {word: "餐", definition: "meal", score: 0},
    {word: "桌", definition: "table", score: 0},
    {word: "龟", definition: "turtle", score: 0},
    {word: "逗", definition: "tease", score: 0},
    {word: "哥", definition: "elder brother", score: 0},
    {word: "贱", definition: "cheap", score: 0},
    {word: "求", definition: "beg", score: 0},
    {word: "致", definition: "To", score: 0},
    {word: "顶", definition: "top", score: 0},
    {word: "烂", definition: "rotten", score: 0},
    {word: "重", definition: "Heavy", score: 0},
    {word: "抽", definition: "smoke", score: 0},
    {word: "每", definition: "Every", score: 0},
    {word: "宫", definition: "palace", score: 0},
    {word: "双", definition: "pair", score: 0},
    {word: "疯", definition: "Crazy", score: 0},
    {word: "狂", definition: "mad", score: 0},
    {word: "灌", definition: "fill", score: 0},
    {word: "喷", definition: "spray", score: 0},
    {word: "收", definition: "receive", score: 0},
    {word: "夹", definition: "folder", score: 0},
    {word: "断", definition: "broken", score: 0},
    {word: "度", definition: "Spend", score: 0},
    {word: "渐", definition: "gradually", score: 0},
    {word: "似", definition: "like", score: 0},
    {word: "任", definition: "appoint", score: 0},
    {word: "何", definition: "what", score: 0},
    {word: "滴", definition: "drop", score: 0},
    {word: "埋", definition: "to bury", score: 0},
    {word: "午", definition: "noon", score: 0},
    {word: "锅", definition: "pot", score: 0},
    {word: "铲", definition: "shovel", score: 0},
    {word: "及", definition: "and", score: 0},
    {word: "烟", definition: "cigarette", score: 0},
    {word: "响", definition: "ring", score: 0},
    {word: "醒", definition: "Awake", score: 0},
    {word: "摆", definition: "put", score: 0},
    {word: "装", definition: "Pack", score: 0},
    {word: "白", definition: "White", score: 0},
    {word: "杯", definition: "cup", score: 0},
    {word: "原", definition: "Original", score: 0},
    {word: "厨", definition: "kitchen", score: 0},
    {word: "围", definition: "around", score: 0},
    {word: "炒", definition: "saute", score: 0},
    {word: "菜", definition: "vegetable", score: 0},
    {word: "灵", definition: "spirit", score: 0},
    {word: "冰", definition: "ice", score: 0},
    {word: "箱", definition: "box", score: 0},
    {word: "巨", definition: "huge", score: 0},
    {word: "黄", definition: "yellow", score: 0},
    {word: "瓜", definition: "melon", score: 0},
    {word: "背", definition: "back", score: 0},
    {word: "杂", definition: "miscellaneous", score: 0},
    {word: "捉", definition: "catch", score: 0},
    {word: "顾", definition: "look back, look after", score: 0},
    {word: "蹲", definition: "squat", score: 0},
    {word: "瞄", definition: "aim", score: 0},
    {word: "勐", definition: "fierce", score: 0},
    {word: "突", definition: "sudden", score: 0},
    {word: "凉", definition: "cold", score: 0},
    {word: "壮", definition: "strong", score: 0},
    {word: "实", definition: "Reality", score: 0},
    {word: "嘺", definition: "cant. coincidental", score: 0},
    {word: "嗔", definition: "angry", score: 0},
    {word: "饿", definition: "hungry", score: 0},
    {word: "塞", definition: "stuffed", score: 0},
    {word: "俩", definition: "both", score: 0},
    {word: "简", definition: "simple", score: 0},
    {word: "伸", definition: "stretch", score: 0},
    {word: "且", definition: "and", score: 0},
    {word: "抠", definition: "pick", score: 0},
    {word: "拜", definition: "bye", score: 0},
    {word: "託", definition: "support", score: 0},
    {word: "残", definition: "Disabled", score: 0},
    {word: "留", definition: "Keep", score: 0},
    {word: "掺", definition: "mix", score: 0},
    {word: "载", definition: "load", score: 0},
    {word: "叮", definition: "Ding", score: 0},
    {word: "咛", definition: "exhort", score: 0},
    {word: "炮", definition: "gun", score: 0},
    {word: "钟", definition: "bell", score: 0},
    {word: "颗", definition: "grain", score: 0},
    {word: "晃", definition: "shake", score: 0},
    {word: "弟", definition: "younger brother", score: 0},
    {word: "环", definition: "ring", score: 0},
    {word: "脖", definition: "neck", score: 0},
    {word: "搓", definition: "twist", score: 0},
    {word: "况", definition: "condition", score: 0},
    {word: "嫌", definition: "dislike", score: 0},
    {word: "按", definition: "according to", score: 0},
    {word: "摩", definition: "Mount", score: 0},
    {word: "消", definition: "remove", score: 0},
    {word: "火", definition: "fire", score: 0},
    {word: "咧", definition: "Lie", score: 0},
    {word: "骑", definition: "ride", score: 0},
    {word: "座", definition: "seat", score: 0},
    {word: "短", definition: "short", score: 0},
    {word: "臀", definition: "hip", score: 0},
    {word: "吹", definition: "blow", score: 0},
    {word: "风", definition: "wind", score: 0},
    {word: "拉", definition: "pull", score: 0},
    {word: "趴", definition: "lie", score: 0},
    {word: "厚", definition: "thick", score: 0},
    {word: "票", definition: "ticket", score: 0},
    {word: "盯", definition: "stare", score: 0},
    {word: "肘", definition: "elbow", score: 0},
    {word: "碰", definition: "bump", score: 0},
    {word: "奋", definition: "Fen", score: 0},
    {word: "揉", definition: "rub", score: 0},
    {word: "摸", definition: "touch", score: 0},
    {word: "跃", definition: "jump", score: 0},
    {word: "条", definition: "strip", score: 0},
    {word: "妹", definition: "sister", score: 0},
    {word: "旁", definition: "beside", score: 0},
    {word: "冲", definition: "rush", score: 0},
    {word: "唿", definition: "call", score: 0},
    {word: "吐", definition: "threw up", score: 0},
    {word: "帮", definition: "help", score: 0},
    {word: "技", definition: "technology", score: 0},
    {word: "术", definition: "surgery", score: 0},
    {word: "初", definition: "early", score: 0},
    {word: "贴", definition: "paste", score: 0},
    {word: "切", definition: "cut", score: 0},
    {word: "输", definition: "lose", score: 0},
    {word: "随", definition: "with", score: 0},
    {word: "煞", definition: "malignant deity", score: 0},
    {word: "肃", definition: "pay respects", score: 0},
    {word: "右", definition: "right", score: 0},
    {word: "左", definition: "Left", score: 0},
    {word: "擦", definition: "wipe", score: 0},
    {word: "咱", definition: "we", score: 0},
    {word: "煮", definition: "cook", score: 0},
    {word: "危", definition: "dangerous", score: 0},
    {word: "险", definition: "risk", score: 0},
    {word: "瓦", definition: "watt", score: 0},
    {word: "斯", definition: "this", score: 0},
    {word: "炉", definition: "furnace", score: 0},
    {word: "端", definition: "end", score: 0},
    {word: "汤", definition: "soup", score: 0},
    {word: "喊", definition: "call", score: 0},
    {word: "喽", definition: "myself", score: 0},
    {word: "问", definition: "ask", score: 0},
    {word: "料", definition: "material", score: 0},
    {word: "盘", definition: "plate", score: 0},
    {word: "爬", definition: "climb", score: 0},
    {word: "懂", definition: "Understand", score: 0},
    {word: "举", definition: "raise", score: 0},
    {word: "瞪", definition: "stare", score: 0},
    {word: "呆", definition: "stay", score: 0},
    {word: "落", definition: "fall", score: 0},
    {word: "凑", definition: "make up", score: 0},
    {word: "鼻", definition: "nose", score: 0},
    {word: "刀", definition: "Knife", score: 0},
    {word: "片", definition: "piece", score: 0},
    {word: "浆", definition: "pulp", score: 0},
    {word: "沾", definition: "stick", score: 0},
    {word: "跨", definition: "across", score: 0},
    {word: "缓", definition: "slow", score: 0},
    {word: "慢", definition: "slow", score: 0},
    {word: "套", definition: "set", score: 0},
    {word: "嘻", definition: "laugh", score: 0},
    {word: "停", definition: "stop", score: 0},
    {word: "捧", definition: "holding", score: 0},
    {word: "伯", definition: "Uncle", score: 0},
    {word: "撞", definition: "Collide", score: 0},
    {word: "烦", definition: "bother", score: 0},
    {word: "葡", definition: "Portugal", score: 0},
    {word: "萄", definition: "Grapes", score: 0},
    {word: "渴", definition: "thirsty", score: 0},
    {word: "丢", definition: "leave", score: 0},
    {word: "幸", definition: "fortunate", score: 0},
    {word: "抢", definition: "grab", score: 0},
    {word: "配", definition: "match", score: 0},
    {word: "饮", definition: "drink", score: 0},
    {word: "属", definition: "belongs to", score: 0},
    {word: "夜", definition: "night", score: 0}
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