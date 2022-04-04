const toggleSwitch = document.querySelector('input[type="checkbox"]')
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const textBox = document.getElementById('text-box')

function toggleImageMode(mode) {
  image1.src = `img/${mode}.svg`
  image2.src = `img/undraw_feeling_proud_${mode}.svg`
  image3.src = `img/undraw_conceptual_idea_${mode}.svg`
}

// Dark mode styles
function darkMode() {
  nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'
  textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
  toggleIcon.children[0].textContent = 'Dark Mode'
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
  toggleImageMode('dark')
}


// Light mode styles
function lightMode() {
  nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'
  textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)'
  toggleIcon.children[0].textContent = 'Light Mode'
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
  toggleImageMode('light')
}


// Dynamically switch theme
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
    darkMode()
    localStorage.setItem('theme', 'dark')
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light')
    lightMode()
    localStorage.setItem('theme', 'light')
  }
}

toggleSwitch.addEventListener('change', switchTheme)

// check local storage for theme
const currentTheme = localStorage.getItem('theme')
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme)

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
    darkMode()
  }
}
