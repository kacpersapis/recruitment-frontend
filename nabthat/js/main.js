document.addEventListener('DOMContentLoaded', function() {
    // Elements for replacing and appending text
    const replaceButton = document.querySelector('.button-container a:nth-of-type(1)');
    const appendButton = document.querySelector('.button-container a:nth-of-type(2)');
    const textElement = document.querySelector('.column:last-child p'); 
    const options = document.querySelectorAll('input[type="radio"]');

    // Elements for the settings panel
    const showButton = document.querySelector('.footer__button');
    const settingsPanel = document.querySelector('#settings-panel');
    const resetButton = document.querySelector('#reset-settings');
    const addButton = document.querySelector('#add-name');
    const nameField = document.querySelector('.header__name');

    // JSON data placeholder
    let jsonData = [];

    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => jsonData = data.texts)
        .catch(error => console.error('Error:', error));

    // Function to get a random text from JSON data
    function getRandomText() {
        if (jsonData.length > 0) {
            const randomIndex = Math.floor(Math.random() * jsonData.length);
            return jsonData[randomIndex].text;
        }
        return 'No data available.';
    }

    // Function to get text by ID
    function getTextById(id) {
        const text = jsonData.find(text => text.id === id);
        return text ? text.text : 'Text not found.';
    }

    // Event listener for 'ZASTĄP' (Replace) button
    replaceButton.addEventListener('click', function(event) {
        event.preventDefault();
        textElement.innerText = getRandomText();
    });

    // Event listener for 'DOKLEJ' (Append) button
    appendButton.addEventListener('click', function(event) {
        event.preventDefault();
        textElement.innerText += ` ${getRandomText()}`;
    });

    // Event listener for radio options
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.parentElement.classList.remove('selected'));
            this.parentElement.classList.add('selected');
            const selectedOptionId = parseInt(this.id.replace('option', ''), 10);
            textElement.innerText = getTextById(selectedOptionId);
        });
    });

    // Event listener for toggling the visibility of the settings panel
    showButton.addEventListener('click', function() {
        settingsPanel.classList.toggle('show');
        this.classList.toggle('active'); // Toggle active class for the button
    });

    // Event listener for resetting settings
    resetButton.addEventListener('click', function() {
        window.location.reload(true); 
    });

    // Event listener for adding a name
    addButton.addEventListener('click', function() {
        nameField.textContent += ' Kacper Sapis'; 
    });
});
