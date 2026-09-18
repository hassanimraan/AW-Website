const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNav = document.getElementById("mainNav");

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}