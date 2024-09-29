// Function to add item to cart
document.getElementById('addBtn').addEventListener('click', function() {
    const quantity = document.getElementById('quantity').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const h1 = document.getElementById("one");
    const cart = document.getElementById('cart');
    const cartItem = document.createElement('div');
    const itemId = `item-${Date.now()}`;
    cartItem.setAttribute('id', itemId);

    cartItem.innerHTML = `
        <br> Quantity: ${quantity} <br> Size: ${size} <br> Color: ${color} <br> Name: ${h1.textContent} <br>
        <button class="removeBtn" onclick="removeFromCart('${itemId}')">Remove</button>
    `;

    cart.appendChild(cartItem);

    saveToLocalStorage(h1.textContent, quantity, size, color);
});

function saveToLocalStorage(name, quantity, size, color) {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    cartData.push({ Name: name, Quantity: quantity, Size: size, Color: color });
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

function removeFromCart(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
    }
}

document.getElementById('orderBtn').addEventListener('click', function() {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.length === 0) {
        alert('Your cart is empty!');
    } else {
        exportToExcel(cartData);
        alert('Thank you for your order!');
        localStorage.removeItem('cartData');
        document.getElementById('cart').innerHTML = ''; 
    }
});

function exportToExcel(cartItems) {
    const worksheet = XLSX.utils.json_to_sheet(cartItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cart Items")
    XLSX.writeFile(workbook, "cart_items.xlsx");
}
