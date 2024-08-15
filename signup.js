document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert('Username already exists.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Store user data in local storage
    localStorage.setItem(username, JSON.stringify(userData));

    alert('Sign Up Successful!');
    window.location.href = 'login.html';
});
