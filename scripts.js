let total = 0;

// Enable drop functionality on the backpack area
function allowDrop(ev) {
    ev.preventDefault();
}

// Handle dragging: transfer item's unique ID instead of full HTML
function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.closest(".item").id);
}

// Handle dropping item into the backpack area
function drop(ev) {
    ev.preventDefault();
    const itemId = ev.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(itemId);

    if (draggedItem) {
        const name = draggedItem.getAttribute('data-name');
        const price = parseFloat(draggedItem.getAttribute('data-price'));

        if (name && !isNaN(price)) {
            addToCart(name, price);
        }
    }
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
    total += amount;
    document.getElementById("total").textContent = total.toFixed(2);
}

// Checkout button action
function checkout() {
    window.open("https://chuffed.org/project/126668-build-a-bag", "_blank");
}

// Assign unique IDs and attach drag listeners on page load
window.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    items.forEach((item, index) => {
        item.setAttribute("id", `item-${index}`);
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", drag);
    });
});
