document.addEventListener('DOMContentLoaded', function() {
    const replaceButton = document.querySelector('button:nth-of-type(1)');
    const appendButton = document.querySelector('button:nth-of-type(2)');
    const textElement = document.querySelector('.custom-table td:last-child');
    const options = document.querySelectorAll('.option');
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
            return jsonData[randomIndex];
        }
        return 'No data available.';
    }

    // Event listener for 'Replace' button
    replaceButton.addEventListener('click', function() {
        textElement.innerText = getRandomText();
    });

    // Event listener for 'Append' button
    appendButton.addEventListener('click', function() {
        textElement.innerText += ` ${getRandomText()}`;
    });

    // Existing functionality for options
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});


