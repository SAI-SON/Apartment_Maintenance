document.querySelector('.form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form inputs
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const button = e.target.querySelector('button');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    try {
        // Validate form
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        
        // Disable button and show loading state
        button.disabled = true;
        button.textContent = 'Creating Account...';
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            throw new Error('Email already registered');
        }
        
        // Create new user
        const newUser = {
            username: email,
            password: password,
            firstName,
            lastName,
            email,
            phone,
            role: 'RESIDENT'
        };
        
        // Add user to storage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        messageDiv.textContent = 'Account created successfully! Redirecting to login...';
        messageDiv.className = 'message success-message';
        document.querySelector('.form-container').insertBefore(messageDiv, document.querySelector('.form'));
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        // Show error message
        messageDiv.textContent = error.message;
        messageDiv.className = 'message error-message';
        document.querySelector('.form-container').insertBefore(messageDiv, document.querySelector('.form'));
        
        // Reset button
        button.disabled = false;
        button.textContent = 'Sign Up';
        
        // Remove error message after 3 seconds
        setTimeout(() => messageDiv.remove(), 3000);
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    e.target.value = value;
});

// Password strength indicator
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    updatePasswordStrengthIndicator(strength);
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

function updatePasswordStrengthIndicator(strength) {
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColor = ['#ff4444', '#ffbb33', '#ffeb3b', '#00C851', '#007E33'];
    
    if (passwordInput.value.length > 0) {
        document.querySelector('.password-strength').textContent = `Password Strength: ${strengthText[strength-1]}`;
        document.querySelector('.password-strength').style.color = strengthColor[strength-1];
    } else {
        document.querySelector('.password-strength').textContent = '';
    }
}