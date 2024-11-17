document.addEventListener('DOMContentLoaded', function () {
    // Variables for storing modules and scores
    let modules = JSON.parse(localStorage.getItem('modules')) || {};
    if (Array.isArray(modules)) {
        modules = {};
        localStorage.setItem('modules', JSON.stringify(modules));
    }
    let scores = JSON.parse(localStorage.getItem('scores')) || {};
    if (Array.isArray(scores)) {
        scores = {};
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    let currentModule = null;
    let drillData = [];
    let drillIndex = 0;
    let currentClozeElements = [];
    let currentTermIndex = 0;

    // DOM Elements
    const menuButton = document.getElementById('menuButton');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const moduleList = document.getElementById('moduleList');
    const textInput = document.getElementById('textInput');
    const moduleTitleInput = document.getElementById('moduleTitleInput'); // New
    const saveModule = document.getElementById('saveModule');
    const startDrill = document.getElementById('startDrill');
    const exportData = document.getElementById('exportData');
    const importData = document.getElementById('importData');
    const importFileInput = document.getElementById('importFileInput');
    const mainContent = document.getElementById('mainContent');
    const drillScreen = document.getElementById('drillScreen');
    const drillText = document.getElementById('drillText');
    const gotItRight = document.getElementById('gotItRight');
    const gotItWrong = document.getElementById('gotItWrong');
    const startOver = document.getElementById('startOver');
    const scoreScreen = document.getElementById('scoreScreen');
    const scoreList = document.getElementById('scoreList');
    const returnMain = document.getElementById('returnMain');
    const drillModuleTitle = document.getElementById('drillModuleTitle'); // New
    const scoreModuleTitle = document.getElementById('scoreModuleTitle'); // New

    // Event Listeners
    menuButton.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    saveModule.addEventListener('click', saveCurrentModule);
    startDrill.addEventListener('click', startDrilling);
    exportData.addEventListener('click', exportLocalStorageData);
    importData.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importLocalStorageData);
    gotItRight.addEventListener('click', () => handleAnswer(true));
    gotItWrong.addEventListener('click', () => handleAnswer(false));
    startOver.addEventListener('click', startDrillingOver);
    returnMain.addEventListener('click', returnToMain);
    drillText.addEventListener('click', revealCloze);
    document.addEventListener('keydown', function (e) {
        if (!drillScreen.classList.contains('hidden')) {
            if (e.code === 'Space') {
                e.preventDefault();
                if (e.ctrlKey) {
                    if (!gotItRight.classList.contains('hidden')) {
                        // Buttons are visible, count as wrong
                        handleAnswer(false);
                    } else {
                        // Reveal next term
                        revealCloze();
                    }
                } else {
                    if (!gotItRight.classList.contains('hidden')) {
                        // Buttons are visible, count as right
                        handleAnswer(true);
                    } else {
                        // Reveal next term
                        revealCloze();
                    }
                }
            }
        }
    });
    textInput.addEventListener('keydown', handleCtrlB);

    // Functions
    function openMenu() {
        sideMenu.classList.add('open');
        updateModuleList();
    }

    function closeMenuFunc() {
        sideMenu.classList.remove('open');
    }

    function updateModuleList() {
        moduleList.innerHTML = '';
        Object.keys(modules).forEach(moduleName => {
            if (moduleName.trim() === '') return; // Skip empty module names
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.textContent = moduleName;
            span.addEventListener('click', () => loadModule(moduleName));
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                delete modules[moduleName];
                localStorage.setItem('modules', JSON.stringify(modules));
                updateModuleList();
            });
            li.appendChild(span);
            li.appendChild(deleteBtn);
            moduleList.appendChild(li);
        });
    }

    function loadModule(moduleName) {
        currentModule = moduleName;
        moduleTitleInput.value = moduleName; // Populate the title input
        textInput.value = modules[moduleName];
        sideMenu.classList.remove('open');
    }

    function saveCurrentModule() {
        let moduleName = moduleTitleInput.value.trim();
        if (moduleName !== '') {
            if (modules[moduleName]) {
                if (!confirm('A module with this title already exists. Do you want to overwrite it?')) {
                    return;
                }
            }
            modules[moduleName] = textInput.value;
            localStorage.setItem('modules', JSON.stringify(modules));
            currentModule = moduleName;
        } else {
            alert('Module title cannot be empty.');
        }
    }

    function startDrilling() {
        if (!moduleTitleInput.value.trim()) {
            alert('Please enter a module title before starting the drill.');
            return;
        }
        if (!textInput.value.trim()) {
            alert('Please enter some text to drill.');
            return;
        }
        currentModule = moduleTitleInput.value.trim();
        drillData = parseText(textInput.value);
        if (drillData.length === 0) {
            alert('No valid sentences found for drilling.');
            return;
        }
        drillIndex = 0;
        mainContent.classList.add('hidden');
        drillScreen.classList.remove('hidden');
        // Set the module title in the drill screen
        drillModuleTitle.textContent = currentModule;
        displayDrillSentence();
    }

    function parseText(text) {
        let sentences = text.split(/(?<=[.?!])\s+/);
        if (sentences.length === 0) sentences = text.split('\n');

        let drillData = [];
        let accumulatedText = '';
        sentences.forEach((sentence, index) => {
            // Check if the sentence contains a clozed term
            if (/\[([^\]]+)\]/.test(sentence)) {
                // If there's accumulated text, add it to the current sentence
                if (accumulatedText) {
                    sentence = accumulatedText + ' ' + sentence;
                    accumulatedText = '';
                }
                let clozeSentence = sentence.replace(/\[([^\]]+)\]/g, (_, clozeText) => {
                    return `<span class="faded-text">${clozeText}</span>`;
                });
                clozeSentence = stylePunctuation(clozeSentence);
                drillData.push({
                    original: sentence,
                    clozed: clozeSentence
                });
            } else {
                // Accumulate sentences without clozed terms
                accumulatedText += (accumulatedText ? ' ' : '') + sentence;
            }
        });

        // Handle any remaining accumulated text at the end
        if (accumulatedText) {
            // If you want to include the remaining text as the last drill item, uncomment the following code:
            let clozeSentence = stylePunctuation(accumulatedText);
            drillData.push({
                original: accumulatedText,
                clozed: clozeSentence
            });
        }

        return drillData;
    }

    function stylePunctuation(text) {
        return text.replace(/([.,!?;:])/g, '<span class="light-orange">$1</span>');
    }

    function displayDrillSentence() {
        if (drillIndex >= drillData.length) {
            showScores();
            return;
        }
        drillText.innerHTML = drillData[drillIndex].clozed;
        currentClozeElements = drillText.querySelectorAll('.faded-text');
        currentTermIndex = 0;
        gotItRight.classList.add('hidden');
        gotItWrong.classList.add('hidden');
    }

    function revealCloze() {
        if (currentTermIndex < currentClozeElements.length) {
            currentClozeElements[currentTermIndex].classList.add('revealed-text');
            currentTermIndex++;
            if (currentTermIndex === currentClozeElements.length) {
                // All terms revealed, show buttons
                gotItRight.classList.remove('hidden');
                gotItWrong.classList.remove('hidden');
            }
        } else {
            // Buttons are visible
            gotItRight.classList.remove('hidden');
            gotItWrong.classList.remove('hidden');
        }
    }

    function handleAnswer(isCorrect) {
        let moduleScores = scores[currentModule] || [];
        moduleScores.push(isCorrect);
        scores[currentModule] = moduleScores;
        localStorage.setItem('scores', JSON.stringify(scores));
        drillIndex++;
        gotItRight.classList.add('hidden');
        gotItWrong.classList.add('hidden');
        displayDrillSentence();
    }

    function showScores() {
        drillScreen.classList.add('hidden');
        scoreScreen.classList.remove('hidden');
        // Set the module title
        scoreModuleTitle.textContent = currentModule;
        updateScoreList();
    }

    function updateScoreList() {
        scoreList.innerHTML = '';
        let moduleScores = scores[currentModule] || [];
        moduleScores.forEach((score, index) => {
            let li = document.createElement('li');
            li.textContent = `Attempt ${index + 1}: ${score ? 'Correct' : 'Incorrect'}`;
            li.classList.add(getScoreColor(score));
            scoreList.appendChild(li);
        });
    }

    function getScoreColor(score) {
        return score ? 'score-green' : 'score-red';
    }

    function returnToMain() {
        scoreScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }

    function startDrillingOver() {
        drillIndex = 0;
        gotItRight.classList.add('hidden');
        gotItWrong.classList.add('hidden');
        displayDrillSentence();
    }

    function handleCtrlB(e) {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            wrapSelectionInBrackets();
        }
    }

    function wrapSelectionInBrackets() {
        let textarea = textInput;
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        if (start === end) return;
        let text = textarea.value;
        let selectedText = text.substring(start, end);
        let newText = text.substring(0, start) + '[' + selectedText + ']' + text.substring(end);
        textarea.value = newText;
        textarea.selectionStart = start;
        textarea.selectionEnd = end + 2; // Account for added brackets
    }

    function exportLocalStorageData() {
        const data = {
            modules: modules,
            scores: scores
        };
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cloze_driller_data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importLocalStorageData(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.modules && typeof importedData.modules === 'object') {
                    modules = { ...modules, ...importedData.modules };
                    localStorage.setItem('modules', JSON.stringify(modules));
                }
                if (importedData.scores && typeof importedData.scores === 'object') {
                    scores = { ...scores, ...importedData.scores };
                    localStorage.setItem('scores', JSON.stringify(scores));
                }
                alert('Data imported successfully.');
                updateModuleList();
            } catch (error) {
                alert('Failed to import data. Please ensure the file is a valid JSON.');
            }
        };
        reader.readAsText(file);
        importFileInput.value = ''; // Reset the input
    }
});
