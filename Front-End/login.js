let continues = document.getElementById('continues');
continues.addEventListener('click', () => {
    let input = document.getElementById('inputName').value.trim();
    
    if (input) {
        localStorage.setItem('name', input);
        window.location.href = 'index.html'; // Ensure the path to index.html is correct
    } else {
        alert('Please enter a valid name'); // Notify the user to enter a value
    }
});
