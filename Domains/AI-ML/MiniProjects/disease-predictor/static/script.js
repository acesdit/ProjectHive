document.getElementById('predictForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const symptoms = document.getElementById('symptoms').value;

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Predicted Disease: ${data.disease}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
