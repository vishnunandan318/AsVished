document.getElementById('guestlist-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            count: formData.get('count'),
            gender: formData.get('gender')
        };

        fetch('https://your-database-url.com/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('RSVP submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });