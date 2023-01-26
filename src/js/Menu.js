class Menu {
  constructor() {
    this.menu = document.querySelector('.menu');
    this.openMenuBtn = document.querySelector('.menu-btn');
    this.closeMenuBtn = document.querySelector('.menu__close');
    this.menuOverlay = document.querySelector('.menu-overlay');
    this.menuLinks = document.querySelectorAll('.menu__list-link');
    this.events();
  }

  events() {
    this.openMenuBtn.addEventListener('click', () => this.openMenu());
    this.closeMenuBtn.addEventListener('click', () => this.closeMenu());
    this.menuLinks.forEach((link) => {
      link.addEventListener('click', (e) => this.selectMenuLink(e));
    });
  }

  openMenu() {
    this.menuOverlay.classList.add('transparentBcg');
    this.menu.classList.add('showMenu');
  }

  closeMenu() {
    this.menu.classList.remove('showMenu');
    this.menuOverlay.classList.remove('transparentBcg');
  }

  selectMenuLink(e) {
    this.menuLinks.forEach((link) => {
      link.classList.remove('active');
    });
    e.target.classList.add('active');
    this.closeMenu();
  }
}

export default Menu;
