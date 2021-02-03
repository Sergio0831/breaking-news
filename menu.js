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
    this.openMenuBtn.addEventListener("click", this.openMenu);
  }

  openMenu() {
    this.menu.classList.add("showCart");
    this.menuOverlay.classList.add("transparentBg");
  }
}
