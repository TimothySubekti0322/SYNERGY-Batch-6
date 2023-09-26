const sideBar = document.getElementById("sidebar");
const sideBarInner = document.getElementById("sidebar-inner");
const hamburgerIcon = document.getElementById("hamburger-icon");
const sidebarX = document.getElementById("sidebar-close");

hamburgerIcon.addEventListener("click", function () {
    sideBar.classList.toggle("sidebarActive");
    sideBarInner.classList.toggle("sidebarInnerActive");
})

sidebarX.addEventListener("click", function () {
    sideBar.classList.remove("sidebarActive");
    sideBar.classList.remove("sidebarInnerActive");
})


