let total = 0;
let cart = {};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("itemData", JSON.stringify({
        price: event.target.closest(".item").getAttribute("data-price"),
        name: event.target.closest(".item").getAttribute("data-name")
    }));
}

function drop(event) {
    event.preventDefault();
    let itemData = JSON.parse(event.dataTransfer.getData("itemData"));
    
    if (!cart[itemData.name]) {
        cart[itemData.name] = { price: Number(itemData.price), quantity: 1 };
    } else {
        cart[itemData.name].quantity += 1;
    }

    updateCart();
}

function updateCart() {
    let orderItemsElement = document.getElementById("order-items");
    let totalElement = document.getElementById("total");
    orderItemsElement.innerHTML = "";
    total = 0;

    for (let item in cart) {
        total += cart[item].price * cart[item].quantity;
        
        let listItem = document.createElement("li");
        listItem.innerHTML = `${item}: $${cart[item].price} x ${cart[item].quantity} 
            <button onclick="removeItem('${item}')">-</button>`;
        orderItemsElement.appendChild(listItem);
    }

    totalElement.innerText = total;
}

function removeItem(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity -= 1;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
        updateCart();
    }
}

function checkout() {
    if (total === 0) {
        alert("Please select at least one item to donate.");
        return;
    }
    
    const chuffedCampaignId = "your-chuffed-campaign-id"; // Replace with actual ID
    window.location.href = `https://chuffed.org/pay?campaign=${chuffedCampaignId}&amount=${total}`;
}
