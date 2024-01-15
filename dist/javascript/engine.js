// Contact form code
const contactSubmit = document.getElementById('contactSubmit')
contactSubmit.addEventListener('click', handleContactSubmit)

const contactName = document.getElementById('contactName')
const contactEmail = document.getElementById('contactEmail')
const message = document.getElementById('message')
let contactSubmitted = false

async function handleContactSubmit(e) {
    e.preventDefault()
    // check if a contact request has already been submitted
    if (contactSubmitted) {
        window.alert('You have already submitted a contact request. Please await a response.')
    } else {
        if (contactName.value !== '' && contactEmail.value !== '' && message.value !== '') {
            // check email validity
            if (contactEmail.value.includes('@')) {
                // set contactSubmitted to true to prevent multiple submissions
                contactSubmitted = true
                contactSubmit.value = 'Sending...'

                // send request to serverless function
                try {
                    const response = await fetch('/.netlify/functions/emailContact', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: contactName.value,
                            email: contactEmail.value,
                            message: message.value,
                        }),
                    })
                    const data = await response.json()
                    console.log(data)
                    contactSubmit.value = 'Delivered!'
                } catch (error) {
                    console.error(error.error)
                }
            } else {
                window.alert('Please enter a valid email address.')
            }
        } else {
            window.alert('Please fill out all required contact fields.')
        }
    }
}

// Input focus and blur handling
function inputFocusHandler(inputObject) {
    let inputLabel = inputObject.previousElementSibling
    inputLabel.classList.add('input-label-active');
    inputLabel.style.color = 'rgb(65, 65, 203)';
}

function inputBlurHandler(inputObject) {
    let inputLabel = inputObject.previousElementSibling;
    if (inputObject.value === '') {
        inputLabel.classList.remove('input-label-active');
    }
    inputLabel.style.color = 'grey';
}

let navOpen = false
function handleHamburger() {
    navOpen = !navOpen

    const nav = document.querySelector('.headerRight')
    const hamburgerLines = document.querySelectorAll('.hamburgerLine')

    if (navOpen) {
        nav.classList.add('navOpen')

        for (let i = 0; i < hamburgerLines.length; i++) {
            hamburgerLines[i].classList.add('navOpen')
        }
    } else {
        nav.classList.remove('navOpen')

        for (let i = 0; i < hamburgerLines.length; i++) {
            hamburgerLines[i].classList.remove('navOpen')
        }
    }
}
