// Module management
let modules = [];
let currentModule = null;

class Module {
    constructor(name) {
        this.name = name;
        this.trueStatements = [];
        this.falseStatements = [];
    }

    addStatement(statement, isTrue) {
        if (isTrue) {
            this.trueStatements.push({ text: statement, isTrue: true });
        } else {
            this.falseStatements.push({ text: statement, isTrue: false });
        }
    }

    getRandomStatement() {
        const pool = Math.random() < 0.5 ? this.trueStatements : this.falseStatements;
        return pool[Math.floor(Math.random() * pool.length)];
    }
}

function createModule(name) {
    const module = new Module(name);
    modules.push(module);
    updateModuleList();
    return module;
}

function deleteModule(index) {
    modules.splice(index, 1);
    updateModuleList();
}

function selectModule(index) {
    currentModule = modules[index];
    initializeGame();
}

function exportModules() {
    const json = JSON.stringify(modules);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modules.json';
    a.click();
}

function importModules(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const importedModules = JSON.parse(e.target.result);
        modules = importedModules.map(m => Object.assign(new Module(), m));
        updateModuleList();
        initializeGame();
    };
    reader.readAsText(file);
}

function updateModuleList() {
    const moduleList = document.getElementById('moduleList');
    moduleList.innerHTML = '';
    modules.forEach((module, index) => {
        const li = document.createElement('li');
        li.textContent = module.name;
        li.onclick = () => selectModule(index);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteModule(index);
        };
        li.appendChild(deleteButton);
        moduleList.appendChild(li);
    });
}

// Game logic
const firstNames = [
    "Aleksandr", "Boris", "Dmitri", "Evgeny", "Fyodor", "Grigori", "Ivan", "Kirill", "Leonid", "Mikhail",
    "Nikolai", "Oleg", "Pavel", "Ruslan", "Vladimir", "Yuri", "Sergei", "Anatoly", "Viktor", "Igor",
    "Konstantin", "Vasili", "Vladislav", "Yaroslav", "Artem", "Roman", "Valentin", "Maxim", "Denis", "Andrei"
];

const lastNames = [
    "Ivanov", "Petrov", "Sidorov", "Nikitin", "Kuznetsov", "Sokolov", "Popov", "Lebedev", "Kozlov", "Novikov",
    "Morozov", "Petrovski", "Volkov", "Solovyov", "Orlov", "Smirnov", "Baranov", "Fedorov", "Stepanov", "Antonov",
    "Alexandrov", "Zaytsev", "Sergeev", "Romanov", "Belyaev", "Korolev", "Gavrilov", "Pavlov", "Makarov", "Egorov"
];

const outcomes = [
    "went on to become a successful realtor",
    "failed to establish a business",
    "was caught in a legal dilemma",
    // more outcomes
];

function generateRandomName() {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

function evaluateStatement(approval) {
    const truthValue = document.getElementById("characterStatement").getAttribute("data-truth") === 'true';
    const firstName = document.getElementById("characterStatement").getAttribute("data-name");
    const decisionCorrect = (truthValue && approval) || (!truthValue && !approval);
    let outcomeText;
    if (decisionCorrect) {
        const outcomeIndex = Math.floor(Math.random() * outcomes.length);
        outcomeText = `Correct! ${firstName} ${outcomes[outcomeIndex]}.`;
    } else {
        outcomeText = `Incorrect decision. ${firstName} faced legal issues.`;
    }
    document.getElementById("outcome").textContent = outcomeText;
    setTimeout(displayRandomStatement, 2000);
}

// UI functions
function displayFace() {
    const faceDiv = document.createElement('div');
    faceDiv.className = 'face active';
    document.getElementById('faceContainer').appendChild(faceDiv);

    createEye(faceDiv, 'left');
    createEye(faceDiv, 'right');
    createMouth(faceDiv);
}

function createEye(parent, side) {
    const eye = document.createElement('div');
    eye.className = `eye ${side}`;
    eye.style.backgroundColor = randomFeatureColor();
    parent.appendChild(eye);
}

function createMouth(parent) {
    const mouth = document.createElement('div');
    mouth.className = 'mouth';
    mouth.style.backgroundColor = randomFeatureColor();
    parent.appendChild(mouth);
}

function randomFeatureColor() {
    const colors = ['#000', '#000', '#000', '#000', '#e74c3c', '#2ecc71'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function moveFace(direction) {
    const face = document.querySelector('.face.active');
    if (direction === "approve") {
        face.classList.add('approve');
    } else {
        face.classList.add('reject');
    }
    setTimeout(() => {
        face.remove();
        displayFace();
    }, 1000);
}

function generateRandomFaceColor() {
    const colors = ['#777', '#888', '#999', '#aaa', '#4a4a4a', '#859184', '#a4c9a1', '#94b5b1', '#94a8b5', '#262626'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function updateFaceColor() {
    const face = document.querySelector('.face.active');
    if (face) {
        face.style.backgroundColor = generateRandomFaceColor();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeGame();
    displayFace();
    document.getElementById("approveButton").addEventListener('click', function () {
        evaluateStatement(true);
        moveFace("approve");
    });
    document.getElementById("rejectButton").addEventListener('click', function () {
        evaluateStatement(false);
        moveFace("reject");
    });
    document.getElementById('menuButton').addEventListener('click', toggleMenu);
    document.getElementById('createModuleButton').addEventListener('click', () => {
        const name = prompt("Enter module name:");
        if (name) {
            createModule(name);
            initializeGame();
        }
    });
    document.getElementById('exportModulesButton').addEventListener('click', exportModules);
    document.getElementById('importModulesInput').addEventListener('change', importModules);
    document.getElementById('addStatementButton').addEventListener('click', showStatementInput);
    document.getElementById('submitStatementsButton').addEventListener('click', submitStatements);
    document.getElementById('closeStatementInputButton').addEventListener('click', hideStatementInput);
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function showStatementInput() {
    if (!currentModule) {
        alert("Please select a module first.");
        return;
    }
    document.getElementById('statementInputDiv').style.display = 'block';
}

function hideStatementInput() {
    document.getElementById('statementInputDiv').style.display = 'none';
}

function submitStatements() {
    if (!currentModule) {
        alert("Please select a module first.");
        return;
    }
    const trueStatements = document.getElementById('trueStatementsInput').value.split('\n').filter(s => s.trim() !== '');
    const falseStatements = document.getElementById('falseStatementsInput').value.split('\n').filter(s => s.trim() !== '');

    if (trueStatements.length === 0 && falseStatements.length === 0) {
        alert("Please enter at least one statement.");
        return;
    }

    trueStatements.forEach(statement => currentModule.addStatement(statement, true));
    falseStatements.forEach(statement => currentModule.addStatement(statement, false));

    // Clear the input fields
    document.getElementById('trueStatementsInput').value = '';
    document.getElementById('falseStatementsInput').value = '';

    // Hide the statement input div
    hideStatementInput();

    // Update the display
    displayRandomStatement();

    alert(`Added ${trueStatements.length} true statements and ${falseStatements.length} false statements to the module.`);
}

function displayRandomStatement() {
    if (!currentModule) {
        document.getElementById("characterInfo").textContent = "Please select a module";
        document.getElementById("characterStatement").textContent = "";
        return;
    }
    const randomName = generateRandomName();
    const statement = currentModule.getRandomStatement();
    if (statement) {
        document.getElementById("characterInfo").textContent = `Character: ${randomName}`;
        document.getElementById("characterStatement").textContent = statement.text;
        document.getElementById("characterStatement").setAttribute("data-truth", statement.isTrue);
        document.getElementById("characterStatement").setAttribute("data-name", randomName.split(' ')[0]);
        updateFaceColor();
    } else {
        document.getElementById("characterInfo").textContent = "No statements available in this module";
        document.getElementById("characterStatement").textContent = "";
    }
}

// Add this function to initialize the game state
function initializeGame() {
    if (modules.length === 0) {
        document.getElementById("characterInfo").textContent = "Please create a module and add statements";
        document.getElementById("characterStatement").textContent = "";
        document.getElementById("approveButton").disabled = true;
        document.getElementById("rejectButton").disabled = true;
    } else {
        document.getElementById("approveButton").disabled = false;
        document.getElementById("rejectButton").disabled = false;
        displayRandomStatement();
    }
}