document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // AJAX request to login route
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            showNotification('danger', 'Login failed!', 'Invalid username or password.');
        }
        else{
            window.location.href = `http://localhost:3001/Catalog?userId=${data.id}`
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function showNotification(type, intro, message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = `<div class="alert alert-${type}"><strong>${intro}</strong> ${message}</div>`;
    notification.style.display = 'block';
}