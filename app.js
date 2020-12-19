const newsContainer = document.querySelector(".general-news__container");
const cardCategory = document.querySelector(".card__category");
const apiKey = "Ba3pFdmNAaKUAtxgesKaLYitLEZ3mFcP";
let limit = 10;
let category = ["home", "sports", "world", "travel", "health", "food"];
let url = `https://api.nytimes.com/svc/topstories/v2/${category[0]}.json?api-key=${apiKey}`;

const getArticles = () => {
  axios
    .get(url)
    .then((data) => htmlTemplate(data.data.results))
    .catch((err) => console.log(err));
};
getArticles();

const newsTemplate = (article) =>
  `
  <article class="card">
    <a href=${article.url}>
    <img src=${article.multimedia[3].url} class="card__img" alt="card__img" />
  </a>
  <div>
    <div class="card__category">${article.section}</div>
    <h3 class="card__title">
      <a href=${article.url}>
        ${article.title}
      </a>
    </h3>
    <p class="card__description">
      ${article.abstract}
    </p>
  </div>
  </article>
  `;

const htmlTemplate = (data) => {
  return newsContainer.insertAdjacentHTML(
    "afterbegin",
    `
  ${data.map((article) => newsTemplate(article)).join("")}
 `
  );
};
