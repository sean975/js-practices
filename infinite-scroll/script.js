const API_KEY = '_hE3hU6rUQUdy8k6BkxGuoRfrLkw1IChbZQIlPgdx7Q'
const COUNT = 30
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let totalImages = 0
let loadedImages = 0
let ready = false
let photos = []

// call API
async function getPhotos() {
  try {
    const response = await fetch(API_URL)
    photos = await response.json()
    console.log(photos[0])
    displayPhotos()
  } catch (e) {
    console.log(e)
    alert('something went wrong...')
  }
}

getPhotos()


//* check if all images loaded
function imageLoaded() {
  loadedImages++
  if (loadedImages === totalImages) {
    ready = true
    loader.hidden = true
  }
}

//* create elements for link & photos, add to the DOM
function displayPhotos() {
  loadedImages = 0
  totalImages = photos.length
  photos.forEach(photo => {
    //* create <a> to link to Unsplash
    const a = document.createElement('a')
    // a.setAttribute('href', photo.links.html)
    // a.setAttribute('target', '_blank')
    setAttributes(a, {
      href: photo.links.html,
      target: '_blank',
    })


    //* create <img> for photo
    const img = document.createElement('img')
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    //* check when each photo is loaded
    img.addEventListener('load', imageLoaded)


    //* put <img> inside <a>, then put both inside imageContainer element
    a.appendChild(img)
    imageContainer.appendChild(a)
  })
}

//* helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

//* load more photos when user scrolls near to the bottom
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    getPhotos()
    ready = false
  }
})
