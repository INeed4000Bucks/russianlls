// public/js/main.js
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    // Check that window.lessonId is defined (set in your lesson template)
    if (window.lessonId) {
      window.location.href = '/lesson/' + window.lessonId + '/media';
    } else {
      window.location.href = '/';
    }
  }
});
