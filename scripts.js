let total = 0;

// Enable drop functionality on the backpack area
function allowDrop(ev) {
  ev.preventDefault();
}

// Handle dragging: transfer item's name and price
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
  const existingItem = list.querySelector(`li[data-name="${name}"]`);

  if (existingItem) {
    let countSpan = existingItem.querySelector(".count");
    let count = parseInt(countSpan.textContent);
    countSpan.textContent = count + 1;
  } else {
    const item = document.createElement("li");
    item.dataset.name = name;
    item.innerHTML = `
      ${name} x <span class="count">1</span> - $${price.toFixed(2)}
      <button class="remove-btn">Remove</button>
    `;
    item.querySelector(".remove-btn").onclick = function () {
      let countSpan = item.querySelector(".count");
      let count = parseInt(countSpan.textContent);
      if (count > 1) {
        countSpan.textContent = count - 1;
      } else {
        list.removeChild(item);
      }
      updateTotal(-price);
    };
    list.appendChild(item);
  }

  updateTotal(price);
}

// Update total amount
function updateTotal(amount) {
  const totalElement = document.getElementById("total");
  let currentTotal = parseFloat(totalElement.textContent);
  currentTotal += amount;
  totalElement.textContent = currentTotal.toFixed(2);
}

// Checkout button action
function checkout() {
  window.open("https://chuffed.org/project/126668-build-a-bag", "_blank");
}

// Initialize draggable items
window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item, index) => {
    item.setAttribute("id", `item-${index}`);
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", drag);
  });
});
