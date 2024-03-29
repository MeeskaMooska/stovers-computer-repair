// Consult form code
const consultSubmit = document.getElementById('consultSubmit')
consultSubmit.addEventListener('click', handleConsultSubmit)

const consultName = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const consultDay = document.getElementById('consultDay')
const consultTime = document.getElementById('consultTime')
let consultSubmitted = false

async function handleConsultSubmit(e) {
    e.preventDefault()
    // check if a consultation request has already been submitted
    if (consultSubmitted) {
        window.alert('You have already submitted a consultation request. Please await a response.')
    } else {
        if (consultName.value !== '' && email.value !== '' && phone.value !== '') {
            // check email validity
            if (email.value.includes('@')) {
                // set consultSubmitted to true to prevent multiple submissions
                consultSubmitted = true
                consultSubmit.value = 'Sending...'

                // send request to serverless function
                try {
                    const response = await fetch('/.netlify/functions/emailConsult', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: consultName.value,
                            email: email.value,
                            phone: phone.value,
                            consultDay: consultDay.value,
                            consultTime: consultTime.value,
                        }),
                    })
                    const data = await response.json()
                    console.log(data.message)
                    consultSubmit.value = 'Delivered!'
                } catch (error) {
                    // Not really handling errors here, just logging them for now. ill keep an eye on server errors.
                    console.error(error.error)
                }
            } else {
                window.alert('Please enter a valid email address.')
            }
        }
        else {
            window.alert('Please fill out all required consultation fields.')
        }
    }
}

// FAQ code for expanding and collapsing answers
function handleFAQClick(el) {
    // Set answer variables
    const sibling = el.nextElementSibling

    // Set line variables
    const line1 = el.querySelector('.faqExpanderLine1')
    console.log(line1)

    if (sibling.classList.contains('faqOpen')) {
        line1.classList.remove('faqOpen')
        sibling.classList.remove('faqOpen')
    } else {
        line1.classList.add('faqOpen')
        sibling.classList.add('faqOpen')
    }
}

// Typing effect on home page image.
// Selling point typewriter effect.
const sellingPoints = [
    "Expert Technicians at Your Service.",
    "Affordable Solutions for All Your Computer Needs.",
    "Same-Day Service for Urgent Repairs.",
    "Comprehensive Diagnostics and Repairs.",
    "Secure Handling of Your Data and Privacy.",
    "Upgrades and Maintenance for Peak Performance.",
    "Friendly and Professional Advice on All Tech Matters.",
    "Remote Support for Quick Fixes.",
    "Warranty on All Repairs and Parts.",
    "Custom Solutions for Home and Business Clients."
]
const sellingPoint = document.getElementById('overlaySellingPoint')
let sellingPointPos = 0
let sellingPointI = 0
let sellingPointText = sellingPoints[sellingPointPos]

function sellingPointTypeWriter() {
    if (sellingPointI < sellingPointText.length) {
        sellingPoint.innerHTML += sellingPointText.charAt(sellingPointI)
        sellingPointI++
        setTimeout(sellingPointTypeWriter, Math.floor(Math.random() * 100) + 50)
    } else if (sellingPointI === sellingPointText.length) {
        setTimeout(sellingPointDelete, 2000)
    }
}

function sellingPointDelete() {
    if (sellingPointI > 0) {
        sellingPoint.innerHTML = sellingPoint.innerHTML.slice(0, -1)
        sellingPointI--
        setTimeout(sellingPointDelete, 30)
    } else if (sellingPointI === 0) {
        sellingPointI = 0
        sellingPoint.innerHTML = ''
        sellingPointPos < sellingPoints.length - 1 ? sellingPointPos++ : sellingPointPos = 0
        sellingPointText = sellingPoints[sellingPointPos]
        sellingPointTypeWriter()
    }

}

// Slogan typewriter effect.
const slogan = document.getElementById('overlaySlogan')
let sloganI = 0
let text = "Where Tech Meets Trust - SCR"

function sloganTypeWriter() {
    if (sloganI < text.length) {
        slogan.innerHTML += text.charAt(sloganI)
        sloganI++
        setTimeout(sloganTypeWriter, Math.floor(Math.random() * 100) + 50)
    } else {
        slogan.nextElementSibling.remove()
    }
}

sellingPointTypeWriter()
sloganTypeWriter()