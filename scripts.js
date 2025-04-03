let total = 0;
let itemCounts = {};
let orderList = {};

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute("data-name") + "," + ev.target.getAttribute("data-amount"));
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text").split(",");
    const name = data[0];
    const amount = parseInt(data[1]);

    if (!itemCounts[name]) itemCounts[name] = 0;
    itemCounts[name] += 1;
    total += amount;
    document.getElementById("total").innerText = total;
    orderList[name] = `$${amount} x ${itemCounts[name]}`;
    updateOrderList();
}

function updateOrderList() {
    const orderItemsElement = document.getElementById("order-items");
    orderItemsElement.innerHTML = "";
    for (let item in orderList) {
        let li = document.createElement("li");
        li.innerHTML = `${item}: ${orderList[item]} <br>
            <button class='control-btn remove-btn' onclick="modifyItem('${item}', -1)">-</button>
            <button class='control-btn add-btn' onclick="modifyItem('${item}', 1)">+</button>`;
        orderItemsElement.appendChild(li);
    }
}

function modifyItem(name, change) {
    const amount = parseInt(orderList[name].split(" x ")[0].replace("$", ""));
    itemCounts[name] += change;
    total += amount * change;

    if (itemCounts[name] <= 0) {
        delete itemCounts[name];
        delete orderList[name];
    } else {
        orderList[name] = `$${amount} x ${itemCounts[name]}`;
    }

    document.getElementById("total").innerText = total;
    updateOrderList();
}

function checkout() {
    if (total === 0) {
        alert("Please select at least one item to donate.");
        return;
    }
    const chuffedCampaignId = "your-chuffed-campaign-id"; // Replace with actual ID
    window.location.href = `https://chuffed.org/pay?campaign=${chuffedCampaignId}&amount=${total}`;
}
