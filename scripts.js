// Enable drop functionality on the backpack area
function allowDrop(ev) {
    ev.preventDefault();
}

// Capture dragged item data
function drag(ev) {
    const item = ev.target.closest(".item");
    ev.dataTransfer.setData("item-name", item.getAttribute("data-name"));
    ev.dataTransfer.setData("item-price", item.getAttribute("data-price"));
}

// Handle dropping item into the backpack area
function drop(ev) {
    ev.preventDefault();
    const name = ev.dataTransfer.getData("item-name");
    const price = parseFloat(ev.dataTransfer.getData("item-price"));
    if (name && !isNaN(price)) {
        addToCart(name, price);
    }
}

// Add item to order summary (with counter for duplicates)
function addToCart(name, price) {
    const list = document.getElementById("order-items");
    const existingItems = list.querySelectorAll("li");

    for (let item of existingItems) {
        if (item.dataset.name === name) {
            let countSpan = item.querySelector(".count");
            let count = parseInt(countSpan.textContent);
            countSpan.textContent = count + 1;
            updateTotal(price);
            return;
        }
    }

    const item = document.createElement("li");
    item.dataset.name = name;
    item.innerHTML = `${name} x <span class="count">1</span> - $${price.toFixed(2)} `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () {
        const countSpan = item.querySelector(".count");
        let count = parseInt(countSpan.textContent);
        if (count > 1) {
            countSpan.textContent = count - 1;
        } else {
            list.removeChild(item);
        }
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
