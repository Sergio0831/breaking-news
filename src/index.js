import './styles/style.css';
import axios from 'axios';
import NEWS_API_KEY from './js/apikey';
import Menu from './js/Menu';
import ScrollTop from './js/ScrollTop';

const menu = new Menu();
const scrollTop = new ScrollTop();

const newsContainer = document.querySelector('.general-news__container');
const apiKey = NEWS_API_KEY;
let limit = 10;
let category = ['home', 'sports', 'world', 'travel', 'health', 'food'];
let url = `https://api.nytimes.com/svc/topstories/v2/${category[0]}.json?api-key=${apiKey}`;

const getArticles = async () => {
	try {
		const response = await axios({
			url: url,
			method: 'GET',
		});
		return response.data.results;
	} catch (err) {
		console.log(err);
	}
};

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

const htmlTemplate = async () => {
	const data = await getArticles();
	return newsContainer.insertAdjacentHTML(
		'afterbegin',
		`
  ${data
		.map((article) => newsTemplate(article))
		.slice(0, 15)
		.join('')}
 `
	);
};

htmlTemplate();

const getNewsCategory = () => {
	const categoryLink = document.querySelectorAll('.menu__list-link');
	categoryLink.forEach((link) => {
		link.addEventListener('click', async () => {
			document.querySelector(
				'.news-title'
			).innerHTML = `${link.innerHTML.toUpperCase()}`;
			try {
				const response = await axios({
					url: `https://api.nytimes.com/svc/topstories/v2/${link.innerHTML.toLowerCase()}.json?api-key=${apiKey}`,
					method: 'GET',
				});
				const data = response.data.results;
				return newsContainer.insertAdjacentHTML(
					'afterbegin',
					`
  ${data.map((article) => newsTemplate(article)).join('')}
 `
				);
			} catch (err) {
				console.log(err);
			}
		});
	});
};

getNewsCategory();

const title = document.querySelector('news-title');
