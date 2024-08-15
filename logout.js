// Clear user session and redirect to login page
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

