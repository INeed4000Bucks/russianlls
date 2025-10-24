document.addEventListener('DOMContentLoaded', function() {
    const title = document.title;
    const pageNumberMatch = title.match(/Page (\d+)/);
    
    if (pageNumberMatch) {
        const currentPageNumber = parseInt(pageNumberMatch[1]);
        const goBackLink = document.getElementById('go-back');
        
        if (currentPageNumber > 1) {
            const previousPageNumber = currentPageNumber - 1;
            goBackLink.href = `page-${previousPageNumber}.html`;
        } else {
            // If we're on page 1, remove the "Go Back" link
            goBackLink.style.display = 'none';
        }
    }
});