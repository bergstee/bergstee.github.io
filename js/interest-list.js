function updateInterestCount() {
    const interestList = JSON.parse(sessionStorage.getItem('interestList')) || [];
    const interestCountElement = document.getElementById('interest-count');
    if (interestCountElement) {
        if (interestList.length > 0) {
            interestCountElement.textContent = `(${interestList.length})`;
        } else {
            interestCountElement.textContent = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', updateInterestCount);