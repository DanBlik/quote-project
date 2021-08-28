const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const ruBtn = document.querySelector(".ruBtn");
const engBtn = document.querySelector(".engBtn");

let lang = "ru";

const switchLang = (e) => {
  if (e.target.classList.contains("ruBtn")) {
    if (lang !== "ru") {
      ruBtn.classList.add("active");
      engBtn.classList.remove("active");
      lang = "ru";
    }
  } else {
    if (lang !== "en") {
      engBtn.classList.add("active");
      ruBtn.classList.remove("active");
      lang = "en";
    }
  }
};

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  if (!loading.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

async function getQuote() {
  loading();
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=${lang}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      authorText.iinerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    complete();
  } catch (err) {
    console.log(err);
  }
}

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

ruBtn.addEventListener("click", switchLang);
engBtn.addEventListener("click", switchLang);

quoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
