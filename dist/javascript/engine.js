function closeBanner() {
    const banner = document.getElementById('banner');
    const bannerLeft = document.getElementById('banner-left');
    const bannerRight = document.getElementById('banner-right');

    bannerLeft.style.display = 'none';
    bannerRight.style.display = 'none';
}


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
    setTimeout(sellingPointTypeWriter,  Math.floor(Math.random() * 100) + 50)
  } else if (sellingPointI === sellingPointText.length) {
    setTimeout(sellingPointDelete,  2000)
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