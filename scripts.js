// Enable drop functionality on the backpack area
function allowDrop(ev) {
    ev.preventDefault();
}

// Capture dragged item data
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.parentElement.outerHTML);
}

// Handle dropping item into the backpack area
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");

    // Extract item name and price from data
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;
    const draggedItem = tempDiv.firstChild;

    const name = draggedItem.getAttribute('data-name');
    const price = parseFloat(draggedItem.getAttribute('data-price'));

    addToCart(name, price);
}

// Add item to order summary
function addToCart(name, price) {
    const list = document.getElementById("order-items");
    const item = document.createElement("li");
    item.textContent = `${name} - $${price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () {
        list.removeChild(item);
        updateTotal(-price);
    };

    item.appendChild(removeBtn);
    list.appendChild(item);

    updateTotal(price);
}

// Update total amount
function updateTotal(amount) {
    const totalElement = document.getElementById("total");
    let total = parseFloat(totalElement.textContent);
    total += amount;
    totalElement.textContent = total.toFixed(2);
}

// Checkout button action
function checkout() {
    window.open("https://chuffed.org/project/126668-build-a-bag", "_blank");
}
