let total = 0;

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

// Checkout button action - redirect to Chuffed with total
function checkout() {
  const total = parseFloat(document.getElementById("total").textContent);
  if (total <= 0) {
    alert("Please add items to your bag before checking out.");
    return;
  }
  const url = `https://chuffed.org/project/126668-build-a-bag/donate/${total}`;
  window.open(url, "_blank");
}

// Animate item into bag and add to cart
window.addEventListener("DOMContentLoaded", () => {
  const bagArea = document.querySelector(".bag-area img");

  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
      const rectItem = item.getBoundingClientRect();
      const rectBag = bagArea.getBoundingClientRect();

      const clone = item.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.left = `${rectItem.left}px`;
      clone.style.top = `${rectItem.top}px`;
      clone.style.width = `${rectItem.width}px`;
      clone.style.height = `${rectItem.height}px`;
      clone.style.zIndex = 1000;
      clone.style.transition = "all 0.7s ease-in-out";
      document.body.appendChild(clone);

      requestAnimationFrame(() => {
        clone.style.left = `${rectBag.left + rectBag.width / 2 - rectItem.width / 2}px`;
        clone.style.top = `${rectBag.top + rectBag.height / 2 - rectItem.height / 2}px`;
        clone.style.transform = "scale(0.1)";
        clone.style.opacity = "0";
      });

      setTimeout(() => {
        clone.remove();
        const name = item.getAttribute("data-name");
        const price = parseFloat(item.getAttribute("data-price"));
        addToCart(name, price);
      }, 700);
    });
  });
});
