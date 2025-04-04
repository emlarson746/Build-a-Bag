document.addEventListener("DOMContentLoaded", function () {
    let total = 0;
    const totalDisplay = document.getElementById("total");
    const orderItems = document.getElementById("order-items");

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData("text", event.target.dataset.name);
        event.dataTransfer.setData("price", event.target.dataset.price);
    }

    function drop(event) {
        event.preventDefault();
        const itemName = event.dataTransfer.getData("text");
        const itemPrice = parseFloat(event.dataTransfer.getData("price"));

        if (itemName && itemPrice) {
            const listItem = document.createElement("li");
            listItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
            orderItems.appendChild(listItem);

            total += itemPrice;
            totalDisplay.textContent = total.toFixed(2);
        }
    }

    function checkout() {
        window.location.href = "https://chuffed.org/project/126668-build-a-bag";
    }

    window.allowDrop = allowDrop;
    window.drag = drag;
    window.drop = drop;
    window.checkout = checkout;
});
