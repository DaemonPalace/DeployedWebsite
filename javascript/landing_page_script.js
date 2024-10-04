document.querySelector(".hamburger").addEventListener("click", function () {
  const sideMenu = document.querySelector(".side-menu");
  const overlay = document.querySelector(
    ".interactable",
    ".menu_button_background"
  );

  sideMenu.classList.toggle("open");
  overlay.classList.toggle("show");
});

function redirectTo(page) {
  window.location.href = page;
}
