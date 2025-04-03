let total = 0;
let orderList = {};

// Enable dragging for items
function drag(event) {
    event.dataTransfer.setData("text", JSON.stringify({
        amount: event.target.getAttribute("data-amount"),
        name: event.target.getAttribute("data-name")
    }));
}

// Allow dropping items into the backpack
function allowDrop(event) {
    event.preventDefault();
}

// Handle dropping items into the backpack
function drop(event) {
    event.preventDefault();
    let itemData = JSON.parse(event.dataTransfer.getData("text"));
    let amount = parseInt(itemData.amount);
    let name = itemData.name;

    // Add item to cart
    if (!orderList[name]) {
        orderList[name] = { amount: amount, count: 1 };
    } else {
        orderList[name].count += 1;
    }

    total += amount;
    updateOrderSummary();
}

// Update order summary display
function updateOrderSummary() {
    document.getElementById("total").innerText = total;
    let orderItemsElement = document.getElementById("order-items");
    orderItemsElement.innerHTML = "";

    for (let item in orderList) {
        let li = document.createElement("li");
        li.innerText = `${item}: $${orderList[item].amount} x ${orderList[item].count}`;
        orderItemsElement.appendChild(li);
    }
}

// Redirect to Chuffed checkout
function checkout() {
    if (total === 0) {
        alert("Please add items before proceeding to checkout.");
        return;
    }
    const chuffedCampaignId = "your-chuffed-campaign-id"; // Replace with actual ID
    window.location.href = `https://chuffed.org/pay?campaign=${chuffedCampaignId}&amount=${total}`;
}
