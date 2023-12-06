const menuToggle = document.querySelector(".burger");
const menuList = document.querySelector(".menu");
menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("close");
  menuList.classList.toggle("show");
});

let links = menuList.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menuList.classList.remove("show");
    menuToggle.classList.remove("close");
  });
}
