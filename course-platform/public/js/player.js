document.addEventListener('DOMContentLoaded', () => {
  let currentSectionIndex = 0;
  const audio = document.getElementById('current-audio');
  const sections = document.querySelectorAll('.section');
  const playPauseButton = document.getElementById('play-pause');
  const autoAdvanceCheckbox = document.getElementById('auto-advance-checkbox');
  
  function togglePlayPause() {
      if (audio.paused) {
          audio.play();
          playPauseButton.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseButton.textContent = 'Play';
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
  document.addEventListener('keydown', (e) => {
      switch(e.code) {
          case 'Space':
              e.preventDefault();
              // Space advances to next section
              goToNextSection();
              break;
          case 'KeyP':
              e.preventDefault();
              togglePlayPause();
              break;
          case 'ArrowRight':
              e.preventDefault();
              goToNextSection();
              break;
          case 'ArrowLeft':
              e.preventDefault();
              goToPreviousSection();
              break;
          case 'KeyA':
              e.preventDefault();
              autoAdvanceCheckbox.checked = !autoAdvanceCheckbox.checked;
              break;
          case 'KeyR':
              e.preventDefault();
              audio.currentTime = 0;
              audio.play();
              playPauseButton.textContent = 'Pause';
              break;
      }
  });

  // Play/Pause button
  playPauseButton.addEventListener('click', togglePlayPause);

  function loadSection(index) {
      const section = sections[index];
      sections.forEach(s => s.classList.remove('active'));
      section.classList.add('active');
      
      const audioFile = section.dataset.audio;
      audio.src = `/audio/${lessonId}/${audioFile}`;
      audio.play();
      playPauseButton.textContent = 'Pause';

      // Scroll section into view in sidebar
      section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Click handling for sections
  sections.forEach((section, index) => {
      section.addEventListener('click', () => {
          currentSectionIndex = index;
          loadSection(index);
      });
  });

  // Load initial section
  if (sections.length > 0) {
      loadSection(0);
  }

  // Update progress bar
  audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      document.querySelector('.progress').style.width = `${progress}%`;
  });

  // Handle audio completion
  audio.addEventListener('ended', () => {
      playPauseButton.textContent = 'Play';
      
      // Only auto-advance if checkbox is checked
      if (autoAdvanceCheckbox.checked) {
          goToNextSection();
      }
  });
});