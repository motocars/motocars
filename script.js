let cart = JSON.parse(localStorage.getItem('cart')) || [];
let sliderIndex = 0;

document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const productPrice = parseFloat(this.previousElementSibling.textContent.replace('$', ''));
        const existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        const itemTotal = item.price * (item.quantity || 1);
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity || 1} = $${itemTotal.toFixed(2)} <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
        total += itemTotal;
    });

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    totalDiv.className = 'cart-total';
    if (cartItems.nextSibling && cartItems.nextSibling.className === 'cart-total') {
        cartItems.nextSibling.remove();
    }
    cartItems.after(totalDiv);
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCart();
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const desc = product.querySelector('p').textContent.toLowerCase();
        if (title.includes(input) || desc.includes(input)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

function moveSlider() {
    const slider = document.getElementById('featured-slider');
    const slideWidth = slider.querySelector('.product-card').offsetWidth + 20;
    slider.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
    sliderIndex = (sliderIndex + 1) % slider.children.length;
}

setInterval(moveSlider, 3000);

updateCart();
updateCartCount();