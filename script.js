// Function to initialize cart items if not already present
function initializeCart() {
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
}

// Function to add item to cart
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Cart items:', cartItems); // Debugging: Check cart items
    updateCartCount();
}

// Function to update cart count in the UI
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}

// Function to handle "Add to Cart" button click
function handleAddToCart() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.getAttribute('data-product-id'),
                name: productCard.getAttribute('data-product-name'),
                price: parseFloat(productCard.getAttribute('data-product-price')),
                quantity: 1
            };
            console.log('Product added:', product); // Debugging: Check product data
            addToCart(product);
        });
    });
}

// Function to handle logout
function logout() {
    localStorage.removeItem('cartItems');
    updateCartCount();
    window.location.href = 'login.html'; // Redirect to login page
}

// Function to update cart on cart page
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
                <td class="price">₹${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="quantity" data-index="${index}"></td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            </tr>
        `;
    });

    totalPriceElement.textContent = total;
    addEventListeners();
}

// Function to add event listeners for cart interactions
function addEventListeners() {
    const quantities = document.querySelectorAll('.quantity');
    const removeButtons = document.querySelectorAll('.remove-item');

    quantities.forEach(quantity => {
        quantity.addEventListener('input', function() {
            const index = this.dataset.index;
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const newQuantity = parseInt(this.value);
            if (newQuantity <= 0) {
                cart.splice(index, 1); // Remove item if quantity is 0 or less
            } else {
                cart[index].quantity = newQuantity;
            }
            localStorage.setItem('cartItems', JSON.stringify(cart));
            updateCart();
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cart));
            updateCart();
        });
    });
}

// Function to handle smooth scrolling for navigation links
function smoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Function to handle card visibility on hover
function handleCardHover() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseover', function() {
            this.querySelector('.small_card').style.opacity = '1';
        });
        card.addEventListener('mouseout', function() {
            this.querySelector('.small_card').style.opacity = '0';
        });
    });
}

// Function to handle social icons hover effect
function handleSocialIconsHover() {
    document.querySelectorAll('.social_icon i').forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.color = '#00bfae'; // Hover color
        });
        icon.addEventListener('mouseout', function() {
            this.style.color = ''; // Reset color
        });
    });
}

// Function to handle cart button animation
function handleCartButtonAnimation() {
    const cartButton = document.querySelector('.fa-cart-shopping');
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            this.classList.add('animate');
            setTimeout(() => this.classList.remove('animate'), 500);
        });
    }

    // Add CSS for the cart button animation dynamically
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .fa-cart-shopping.animate {
            animation: bounce 0.5s;
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Function to handle logout button click
function handleLogoutButton() {
    document.getElementById('logout-button')?.addEventListener('click', logout);
}

// Function to handle cart icon click
function handleCartIconClick() {
    document.getElementById('cart-icon')?.addEventListener('click', function() {
        window.location.href = 'cart.html'; // Redirect to cart page
    });
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    handleAddToCart();
    smoothScrolling();
    handleCardHover();
    handleSocialIconsHover();
    handleCartButtonAnimation();
    handleLogoutButton();
    handleCartIconClick();

    if (document.body.classList.contains('cart-page')) {
        updateCart(); // Update cart items if on the cart page
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const logoutButton = document.getElementById('logout-button');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const product = {
                id: card.getAttribute('data-product-id'),
                name: card.getAttribute('data-product-name'),
                price: parseFloat(card.getAttribute('data-product-price')),
                image: card.querySelector('.image img').src
            };
            addToCart(product);
        });
    });

    logoutButton.addEventListener('click', () => {
        alert('Logging out!');
        window.location.href = 'login.html';
    });

    updateCartCount();
});





