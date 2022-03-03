const API_URL = 'https://type.fit/api/quotes'
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
let quotes = []

// show loader
function showing() {
  loader.hidden = false
  quoteContainer.hidden = true
}
// hide loader
function complete() {
  loader.hidden = true
  quoteContainer.hidden = false
}


// show new quote
function newQuote() {
  const quote = quotes[Math.floor(Math.random()*quotes.length)]
  if (quote.text.length > 99) {
    quoteText.classList.add('long-quote')
  }
  quoteText.textContent = quote.text
  quoteAuthor.textContent = quote.author || 'Unknown'
  complete()
}


// get quotes from api
async function getQuotes() {
  showing()
  try {
    const response = await fetch(API_URL)
    quotes = await response.json()
    newQuote()
  } catch (e) {

  }
}
getQuotes()

// tweet quote
function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteAuthor.textContent}`
  window.open(tweetURL, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
