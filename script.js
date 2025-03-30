let totalDonation = 0;
const paypalUsername = "yourPayPalMeUsername"; // Replace with your PayPal username
const venmoUsername = "yourVenmoUsername"; // Replace with your Venmo username
const cashappUsername = "yourCashAppUsername"; // Replace with your CashApp username

document.querySelectorAll(".item").forEach(item => {
    const amount = parseInt(item.getAttribute("data-amount"));
    let quantity = 0;
    const quantityDisplay = item.querySelector(".quantity");

    item.querySelector(".plus").addEventListener("click", () => {
        quantity++;
        totalDonation += amount;
        quantityDisplay.textContent = quantity;
        document.getElementById("total").textContent = totalDonation;
    });

    item.querySelector(".minus").addEventListener("click", () => {
        if (quantity > 0) {
            quantity--;
            totalDonation -= amount;
            quantityDisplay.textContent = quantity;
            document.getElementById("total").textContent = totalDonation;
        }
    });
});

document.getElementById("donate-btn").addEventListener("click", () => {
    if (totalDonation === 0) {
        alert("Please select an amount to donate.");
        return;
    }
    document.getElementById("payment-options").style.display = "block";
});

document.getElementById("paypal-btn").addEventListener("click", () => {
    window.open(`https://www.paypal.me/${paypalUsername}/${totalDonation}`, "_blank");
});

document.getElementById("venmo-btn").addEventListener("click", () => {
    window.open(`venmo://paycharge?recipients=${venmoUsername}&amount=${totalDonation}`, "_blank");
});

document.getElementById("cashapp-btn").addEventListener("click", () => {
    window.open(`https://cash.app/$${cashappUsername}/${totalDonation}`, "_blank");
});