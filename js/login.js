// Define user roles and their corresponding dashboard pages
const ROLE_PAGES = {
    ADMIN: 'admin-dashboard.html',
    RESIDENT: 'resident-dashboard.html',
    STAFF: 'staff-dashboard.html'
};

// Get stored users or use default admin account
const getStoredUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        return JSON.parse(storedUsers);
    }
    // Default admin account
    const defaultUsers = [{
        username: 'admin',
        password: 'admin123',
        role: 'ADMIN'
    }];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
};

// Handle login form submission
document.querySelector('.form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const button = e.target.querySelector('button');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    try {
        // Disable button and show loading state
        button.disabled = true;
        button.textContent = 'Logging in...';
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check credentials
        const users = getStoredUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Store user session
            sessionStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                role: user.role
            }));
            
            // Show success message
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.className = 'message success-message';
            document.querySelector('.form-container').insertBefore(messageDiv, document.querySelector('.form'));
            
            // Redirect to appropriate dashboard
            setTimeout(() => {
                window.location.href = ROLE_PAGES[user.role];
            }, 1500);
        } else {
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        // Show error message
        messageDiv.textContent = error.message;
        messageDiv.className = 'message error-message';
        document.querySelector('.form-container').insertBefore(messageDiv, document.querySelector('.form'));
        
        // Reset button
        button.disabled = false;
        button.textContent = 'Login';
        
        // Remove error message after 3 seconds
        setTimeout(() => messageDiv.remove(), 3000);
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const { role } = JSON.parse(currentUser);
        window.location.href = ROLE_PAGES[role];
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}