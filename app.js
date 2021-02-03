const newsContainer = document.querySelector(".general-news__container");
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

class Menu {
  constructor() {
    this.menu = document.querySelector(".menu");
    this.openMenuBtn = document.querySelector(".menu-btn");
    this.closeMenuBtn = document.querySelector(".menu__close");
    this.menuOverlay = document.querySelector(".menu-overlay");
    this.menuLinks = document.querySelectorAll(".menu__list-link");
    this.events();
  }

  events() {
    this.openMenuBtn.addEventListener("click", () => this.openMenu());
    this.closeMenuBtn.addEventListener("click", () => this.closeMenu());
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.selectMenuLink(e));
    });
  }

  openMenu() {
    this.menuOverlay.classList.add("transparentBcg");
    this.menu.classList.add("showMenu");
  }

  closeMenu() {
    this.menu.classList.remove("showMenu");
    this.menuOverlay.classList.remove("transparentBcg");
  }

  selectMenuLink(e) {
    this.menuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
  }
}

const menu = new Menu();
