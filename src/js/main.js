(() => {

  // Constants
  const API_ENDPOINT = 'https://1z5gfx4jz4.execute-api.us-east-1.amazonaws.com/prod/contact'

  // DOM elements
  const navMenu = document.getElementById('nav-menu')
  const navToggleBtn = document.getElementById('nav-toggle-btn')
  const contactForm = document.getElementById('contact-form')
  const contactAlert = document.getElementById('contact-alert')
  const contactSpinner = document.getElementById('contact-spinner')

  const closeMenu = () => {

    // Set initial height to natural height
    navMenu.style.height = `${navMenu.clientHeight}px`

    navMenu.dataset.expanded = false

    // Set transition value in a non-blocking thread
    setTimeout(() => {
      navMenu.classList.add('nav-transition')
      navMenu.style.height = 0
    }, 100)
  }

  const openMenu = () => {

    // Calculate natural height
    navMenu.style.height = 'auto'
    const height = navMenu.clientHeight

    // Set initial height
    navMenu.style.height = 0

    navMenu.dataset.expanded = true

    // Set transition value in a non-blocking thread
    setTimeout(() => {
      navMenu.classList.add('nav-transition')
      navMenu.style.height = `${height}px`
    }, 100)
  }

  // Toggle menu
  navToggleBtn.addEventListener('click', (e) => {
    if (navMenu.dataset.expanded == "true") {
      closeMenu()
    } else {
      openMenu()
    }
  })

  // When nav view finishes animating, set default height
  navMenu.addEventListener('transitionend', (e) => {

    // Remove transition and set back to default height
    navMenu.classList.remove('nav-transition')
    if (e.target.dataset.expanded == "true")
      e.target.style.height = 'auto'
    else
      e.target.style.height = null
  })

  // Close menu when item is selected
  navMenu.addEventListener('click', (e) => {

    // Ignore this event if the menu isn't "expanded"
    if (navMenu.dataset.expanded != "true") return
    
    // If a nav link item was clicked, close menu
    if (e.target.classList.contains('link')) {
      closeMenu()
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