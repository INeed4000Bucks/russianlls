function positionPopup(popupElement) {
    const popup = popupElement.querySelector('.popup-content');
    const rect = popupElement.getBoundingClientRect();
    const popupHeight = popup.offsetHeight;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    // Calculate horizontal position
    const left = rect.left + (rect.width / 2);
    popup.style.left = `${left}px`;
    popup.style.transform = 'translateX(-50%)';
    
    const buffer = 20;
    
    if (spaceAbove < popupHeight + buffer && spaceBelow > spaceAbove) {
        // Show below
        popup.style.top = `${rect.bottom + buffer}px`;
        popup.style.bottom = 'auto';
        popup.classList.remove('popup-top');
        popup.classList.add('popup-bottom');
    } else {
        // Show above
        popup.style.bottom = `${window.innerHeight - rect.top + buffer}px`;
        popup.style.top = 'auto';
        popup.classList.remove('popup-bottom');
        popup.classList.add('popup-top');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let currentSectionIndex = 0;
    const audio = document.getElementById("current-audio");
    const sections = document.querySelectorAll(".section");
    const playPauseButton = document.getElementById("play-pause");
    const autoAdvanceCheckbox = document.getElementById("auto-advance-checkbox");

    function formatText(text) {
        // Decode the URI-encoded text first
        text = decodeURIComponent(text);
        
        // Handle popup keywords ({keyword}) FIRST
        text = text.replace(/\{(.*?)\}/g, (match, keyword) => {
            let definition = dictionary[keyword] || `No definition found for "${keyword}"`;

            // Format the definition text
            definition = definition
                .replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>')
                .replace(/\*(.*?)\*/g, '<span class="emphasized">$1</span>');
                
            return `<span class="keyword-popup" onmouseenter="positionPopup(this)">${keyword}<span class="popup-content">${definition}</span></span>`;
        });
        
        // Then handle bold text (**text**)
        text = text.replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>');
        
        // Finally handle emphasis (*text*)
        text = text.replace(/\*(.*?)\*/g, '<span class="emphasized">$1</span>');
        
        return text;
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = "Pause";
        } else {
            audio.pause();
            playPauseButton.textContent = "Play";
        }
    }

    function goToNextSection() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            loadSection(currentSectionIndex);
            return true;
        }
        return false;
    }

    function goToPreviousSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            loadSection(currentSectionIndex);
            return true;
        }
        return false;
    }

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "Space":
                e.preventDefault();
                // Space advances to next section
                goToNextSection();
                break;
            case "KeyP":
                e.preventDefault();
                togglePlayPause();
                break;
            case "ArrowRight":
                e.preventDefault();
                goToNextSection();
                break;
            case "ArrowLeft":
                e.preventDefault();
                goToPreviousSection();
                break;
            case "KeyA":
                e.preventDefault();
                autoAdvanceCheckbox.checked = !autoAdvanceCheckbox.checked;
                break;
            case "KeyR":
                e.preventDefault();
                audio.currentTime = 0;
                audio.play();
                playPauseButton.textContent = "Pause";
                break;
        }
    });

    // Play/Pause button
    playPauseButton.addEventListener("click", togglePlayPause);

    function loadSection(index) {
        const section = sections[index];
        sections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');
        
        const audioFile = section.dataset.audio;
        const sectionText = section.dataset.text;
        
        // Update audio
        audio.src = `/audio/${lessonId}/${audioFile}`;
        audio.play();
        playPauseButton.textContent = 'Pause';
    
        // Update text content
        const contentDiv = document.getElementById('section-content');
        contentDiv.innerHTML = formatText(sectionText);
    
        // Scroll section into view in sidebar
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Click handling for sections
    sections.forEach((section, index) => {
        section.addEventListener("click", () => {
            currentSectionIndex = index;
            loadSection(index);
        });
    });

    // Load initial section
    if (sections.length > 0) {
        loadSection(0);
    }

    // Update progress bar
    audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector(".progress").style.width = `${progress}%`;
    });

    // Handle audio completion
    audio.addEventListener("ended", () => {
        playPauseButton.textContent = "Play";

        // Only auto-advance if checkbox is checked
        if (autoAdvanceCheckbox.checked) {
            goToNextSection();
        }
    });
});
