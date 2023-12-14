// Contact form code
const contactSubmit = document.getElementById('contactSubmit')
contactSubmit.addEventListener('click', handleContactSubmit)

const contactName = document.getElementById('contactName')
const contactEmail = document.getElementById('contactEmail')
const message = document.getElementById('message')

async function handleContactSubmit(e) {
    e.preventDefault()
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
    } catch (error) {
        console.error(error.error)
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
