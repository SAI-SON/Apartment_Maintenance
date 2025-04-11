function sendEmail(formData) {
    // Get form data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create mailto link with form data
    const mailtoLink = `mailto:contact@jkapartment.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}

Message:
${message}`
    )}`;

    // Open default email client
    window.location.href = mailtoLink;
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Basic form validation
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        // Send email
        sendEmail(formData);
        
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    } catch (error) {
        alert('There was an error sending your message. Please try again.');
    }
    
    return false;
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
    });
});