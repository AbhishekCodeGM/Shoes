document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get user inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored user data
    const userData = localStorage.getItem(username);

    if (userData) {
        const { password: storedPassword } = JSON.parse(userData);

        if (password === storedPassword) {
            alert('Login Successful!');
            localStorage.setItem('loggedInUser', username);
            
            // Redirect to homepage or desired page
            window.location.href = 'index.html'; // Change this if you want to redirect elsewhere
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('Username not found.');
    }
});



