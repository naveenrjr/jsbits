const quoteText = document.querySelector('#quote')
const quoteAuthor = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuoteBtn = document.querySelector('#loadnewquote')

let quotesList = []

const getRandomQuote = () => {
  let val = Math.floor(Math.random() * quotesList.length)
  const newQuote = quotesList[val]
  if (newQuote.text.length > 90) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = newQuote.text
  if (!newQuote.author) {
    newQuote.author = 'Unknown'
  } else {
    newQuote.author = newQuote.author
  }
  quoteAuthor.textContent = newQuote.author
}
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const response = await fetch(apiUrl)
    quotesList = await response.json()
    getRandomQuote()
  } catch (error) {
    console.log(error)
  }
}

//post to twitter
function postTweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}- ${quoteAuthor.textContent}`
  window.open(twitterUrl)
}

//Add event listners to buttons
newQuoteBtn.addEventListener('click', () => getQuotes())
twitterBtn.addEventListener('click', postTweet)

//onload
getQuotes()
