document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || {};

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.parentElement;
            const productId = product.getAttribute("data-id");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));

            if (cartItems[productId]) {
                cartItems[productId].quantity++;
            } else {
                cartItems[productId] = { name: productName, price: productPrice, quantity: 1 };
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert(`${productName} agregado al carrito`);
        });
    });

    const sections = [
        "#agroquimicos",
        "#macetas",
        "#accesorios",
        "#mascotas",
        "#semillas",
        "#oportunidades"
    ].map(id => document.querySelector(id)).filter(el => el);

    document.getElementById('search-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#main').scrollIntoView({ behavior: 'smooth' });

        sections.forEach(section => {
            section.style.display = "none";
        });
    });

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sections.forEach(section => {
                section.style.display = "block";
            });
        });
    });

    const ul = document.querySelector("#ul");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => ul.classList.add("visible"));
    cerrar.addEventListener("click", () => ul.classList.remove("visible"));

    
    let hideText_btn = document.getElementById("hideText_btn");
    let hideText = document.getElementById("hideText");

    hideText_btn.addEventListener("click", ToggleText);
    function ToggleText() {
        hideText.classList.toggle("show");
    }
    hideText.addEventListener("click", () => hideText.classList.remove("show"));

    // Funcionalidad del slider
    document.querySelectorAll('.slider-container').forEach((container) => {
        const slider = container.querySelector('.slider');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');

        let currentIndex = 0;

        const updateSlider = () => {
            const slideWidth = slider.clientWidth;
            slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slider.children.length - 1;
        };

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < slider.children.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
        updateSlider();
    });

    // Funcionalidad del buscador
    document.getElementById('search-input').addEventListener('input', function() {
        let filter = this.value.toLowerCase();
        let products = document.querySelectorAll('.product');

        products.forEach(product => {
            let productName = product.getAttribute('data-name').toLowerCase();
            product.style.display = productName.includes(filter) ? '' : 'none';
        });

        updateSliderVisibility();
    });


    function updateSliderVisibility() {
        document.querySelectorAll(".slider-container").forEach(container => {
            const visibleProducts = container.querySelectorAll(".product:not([style*='display: none'])");
            const slider = container.querySelector(".slider");
            const buttons = container.querySelector(".buttons");

            container.style.display = visibleProducts.length === 0 ? "none" : "block";
            if (slider) slider.style.display = visibleProducts.length > 0 ? "flex" : "none";
            if (buttons) buttons.style.display = visibleProducts.length > 1 ? "flex" : "none";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", function () {
        if (this.value.trim() !== "") {
            searchBar.style.position = "fixed";
            searchBar.style.top = "10px";
            searchBar.style.left = "25%";
            searchBar.style.width = "100%";
            searchBar.style.zIndex = "1000";
        } else {
            searchBar.removeAttribute("style");
        }
    });
});

  //AVISO: Cantidad de productos data-id: (322)
