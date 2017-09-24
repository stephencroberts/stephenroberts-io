(() => {

  // Constants
  const API_ENDPOINT = 'https://1z5gfx4jz4.execute-api.us-east-1.amazonaws.com/prod/contact'

  // DOM elements
  const navMenu = document.getElementById('nav-menu')
  const navToggleCheckbox = document.getElementById('nav-toggle-checkbox')
  const contactForm = document.getElementById('contact-form')
  const contactAlert = document.getElementById('contact-alert')
  const contactSpinner = document.getElementById('contact-spinner')

  // Close menu when item is selected
  navMenu.addEventListener('click', (e) => {
    // If a nav link item was clicked, close menu
    if (e.target.classList.contains('link')) {
      navToggleCheckbox.checked = false;
    }
  })

  // Contact form submit
  contactForm.addEventListener('submit', (e) => {

    e.preventDefault()

    // Show the spinner
    contactSpinner.style.display = "flex"

    // Create json object from form data
    var data = {}
    var fields = contactForm.elements
    for (var i=0; i<fields.length; i++) {
      var field = fields[i]
      if (field.name) data[field.name] = field.value
    }

    // Post contact form as JSON
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_ENDPOINT)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

    xhr.send(JSON.stringify(data))

    xhr.onloadend = () => {

      // Hide the spinner
      contactSpinner.style.display = "none"

      // Clear any previous alert classes
      contactAlert.classList.remove('alert-success', 'alert-danger')

      // Attempt to parse json response
      try {

        var response = JSON.parse(xhr.response)

        // Damn errors
        if (response.errorMessage) {

          contactAlert.innerHTML = response.errorMessage
          contactAlert.classList.add('alert-danger')

        } else {

          // Ahh, success
          contactAlert.innerHTML = "Thanks for contacting me! I'll get back with you as soon as I can."
          contactAlert.classList.add('alert-success')

          // Clear form fields
          var fields = contactForm.elements
          for (var i=0; i<fields.length; i++) {
            var field = fields[i]
            if (field.name) field.value = null
          }
        }

      } catch (e) {
        // Shit
        contactAlert.innerHTML = 'Whoops, something went wrong! Double-check your info and try again.'
        contactAlert.classList.add('alert-danger')
      }

      // Show alert
      contactAlert.style.display = "block"
    }
  })
})()
