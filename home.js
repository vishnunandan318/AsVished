class GuestListManager {
    constructor() {
        this.guestList = [];
        this.databaseUrl = 'https://your-database-url.com/api/guests';
    }

    addGuest(guest) {
        this.guestList.push(guest);
        this.saveToDatabase(guest);
    }

    saveToDatabase(guest) {
        fetch(this.databaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Guest saved:', data);
        })
        .catch(error => {
            console.error('Error saving guest:', error);
        });
    }

    connectToHtml() {
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('guestForm');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const guest = {
                    name: form.elements['name'].value,
                    email: form.elements['email'].value
                };
                this.addGuest(guest);
            });

            this.updateVisitCount();
        });
    }

    updateVisitCount() {
        fetch('https://your-database-url.com/visit-counter')
            .then(response => response.json())
            .then(data => {
                document.getElementById('visit-count').textContent = data.count;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        fetch('https://your-database-url.com/increment-counter', {
            method: 'POST'
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

const guestListManager = new GuestListManager();
guestListManager.connectToHtml();
