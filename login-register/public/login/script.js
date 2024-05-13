document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    var form = document.getElementById('registrationForm');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var formData = new FormData(form);
        var username = formData.get('username');
        var password = formData.get('password');
        var phone = formData.get('phone');
        var address = formData.get('address');

        // Perform validation if needed
        if (username.trim() === '' || password.trim() === '' || phone.trim() === '' || address.trim() === '') {
            alert('Please fill in all fields.');
            return; // Exit function early if validation fails
        }

        // If validation passes, display a success message
        //alert('Registration successful!\nUsername: ' + username + '\nPhone: ' + phone + '\nAddress: ' + address);

        // You can also submit the form data to the server using AJAX if needed
        // Example: sendFormDataToServer(formData);
    });

    // Function to send form data to the server using AJAX (optional)
    function sendFormDataToServer(formData) {
        // AJAX code to send form data to the server
    }
});
