class ScrollTop {
	constructor() {
		this.scroll = document.querySelector('.scrollTop');
		this.events();
	}

	events() {
		window.addEventListener('scroll', () => this.addActive());
		this.scroll.addEventListener('click', () => this.scrollToTop());
	}

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	addActive() {
		this.scroll.classList.toggle('active', window.scrollY > 1000);
	}
}

export default ScrollTop;
