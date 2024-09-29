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

    // Save to localStorage
    saveToLocalStorage(h1.textContent, quantity, size, color);
});

// Function to save cart data in localStorage
function saveToLocalStorage(name, quantity, size, color) {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    cartData.push({ Name: name, Quantity: quantity, Size: size, Color: color });
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

// Function to remove item from cart
function removeFromCart(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
        // Optionally remove from localStorage (not implemented here)
    }
}

// Function to order and export all cart items to Excel
document.getElementById('orderBtn').addEventListener('click', function() {
    const currentCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (currentCartData.length === 0) {
        alert('Your cart is empty!');
    } else {
        exportToExcel(currentCartData);
        alert('Thank you for your order!');
        localStorage.removeItem('cartData'); // Clear localStorage after ordering
        document.getElementById('cart').innerHTML = ''; // Clear the cart display
    }
});

// Function to export all cart items to a single Excel file
function exportToExcel(currentCartItems) {
    // Get existing data from localStorage
    const existingCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    
    // Combine current items with existing items
    const allCartItems = existingCartData.concat(currentCartItems);

    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(allCartItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cart Items");

    // Trigger download of the Excel file
    const fileName = `cart_items_${new Date().toISOString().split('T')[0]}.xlsx`; // Name with current date
    XLSX.writeFile(workbook, fileName);

    // Update localStorage with the combined data
    localStorage.setItem('cartData', JSON.stringify(allCartItems));
}
