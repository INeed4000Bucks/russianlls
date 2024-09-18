function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createQuiz(quizData) {
    const itemsContainer = document.getElementById('items');
    const categoriesContainer = document.getElementById('categories');

    let allItems = [];
    quizData.categories.forEach(category => {
        allItems = allItems.concat(category.items);
    });
    shuffleArray(allItems);

    allItems.forEach((item, index) => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('item');
        itemElem.textContent = item;
        itemElem.draggable = true;
        itemElem.id = `item-${index}`;
        itemsContainer.appendChild(itemElem);
    });

    quizData.categories.forEach((category, index) => {
        const categoryElem = document.createElement('div');
        categoryElem.classList.add('category');
        categoryElem.innerHTML = `${category.name}<div class="category-content" id="category-${index}"></div>`;
        categoriesContainer.appendChild(categoryElem);
    });
}

function addDragListeners() {
    const items = document.querySelectorAll('.item');
    const categoryContents = document.querySelectorAll('.category-content');
    const itemsContainer = document.getElementById('items');

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    categoryContents.forEach(content => {
        content.addEventListener('dragover', dragOver);
        content.addEventListener('drop', drop);
    });

    itemsContainer.addEventListener('dragover', dragOver);
    itemsContainer.addEventListener('drop', drop);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd() { }

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text');
    const itemElem = document.getElementById(itemId);
    const dropZone = e.target.closest('.category-content') || document.getElementById('items');

    if (dropZone && itemElem) {
        dropZone.appendChild(itemElem);
    }
}

function checkAnswers(quizData) {
    let correct = 0;
    let total = 0;

    quizData.categories.forEach((category, index) => {
        const categoryContent = document.getElementById(`category-${index}`);
        const items = categoryContent.querySelectorAll('.item');

        items.forEach(item => {
            total++;
            if (category.items.includes(item.textContent)) {
                correct++;
                item.style.backgroundColor = '#d4edda';
            } else {
                item.style.backgroundColor = '#f8d7da';
            }
        });
    });

    alert(`You got ${correct} out of ${total} correct!`);
}

function initializeQuiz(quizData) {
    createQuiz(quizData);
    addDragListeners();
    document.getElementById('submit').addEventListener('click', () => checkAnswers(quizData));
}