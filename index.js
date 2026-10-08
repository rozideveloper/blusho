const slides = document.querySelectorAll(".slide");

let current = 0;

setInterval(() => {

    slides[current].classList.remove("active");

    
    current++;

   
    if (current >= slides.length) {
        current = 0;
    }

   
    slides[current].classList.add("active");

}, 4000);





let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector("#cart-count");

function updateCartCount() {

    if (cartCount) {
        cartCount.innerText = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

}

updateCartCount();




const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach((button) => {

    button.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        const card = button.closest(".card, .box");

        const productName =
            card.querySelector("h2").innerText;

        const priceText =
            card.querySelector("p").innerText;

        const price =
            parseInt(priceText.replace(/[^\d]/g, ""));

        const image =
            card.querySelector("img").src;


        const existingProduct = cart.find(
            item => item.name === productName
        );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: productName,

                price: price,

                image: image,

                quantity: 1

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();

        button.innerText = "Added ✓";

        setTimeout(() => {

            button.innerText = "Add to Cart";

        }, 1000);

    });

});