let total = 0;

function addItem(amount) {
    total += amount;
    updateTotal();
}

function removeItem(amount) {
    if (total >= amount) {
        total -= amount;
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

function checkout() {
    if (total === 0) {
        alert("Please select at least one item to donate.");
        return;
    }
    const chuffedCampaignId = "your-chuffed-campaign-id"; // Replace with actual ID
    window.location.href = `https://chuffed.org/pay?campaign=${chuffedCampaignId}&amount=${total}`;
}
