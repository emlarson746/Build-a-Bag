let total = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.closest(".item").id);
  const item = ev.target.closest(".item");
  ev.dataTransfer.setData("item-name", item.getAttribute("data-name"));
  ev.dataTransfer.setData("item-price", item.getAttribute("data-price"));
}

function drop(ev) {
  ev.preventDefault();
  const name = ev.dataTransfer.getData("item-name");
  const price = parseFloat(ev.dataTransfer.getData("item-price"));
  if (name && !isNaN(price)) {
    addToCart(name, price);
  }
}

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
  item.innerHTML = `<strong class="item-name-box">${name}</strong><br><span class="item-description">${getItemDescription(name)}</span><br><span class="item-price">$${price.toFixed(2)}</span> x <span class="count">1</span>`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = function () {
    let countSpan = item.querySelector(".count");
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

function updateTotal(amount) {
  const totalElement = document.getElementById("total");
  let total = parseFloat(totalElement.textContent);
  total += amount;
  totalElement.textContent = total.toFixed(2);
}

function checkout() {
  window.open("https://chuffed.org/project/126668-build-a-bag", "_blank");
}

window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item, index) => {
    item.setAttribute("id", `item-${index}`);
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", drag);
  });
});

function getItemDescription(name) {
  const descriptions = {
    "Notebooks": "A set of ruled notebooks for daily classwork.",
    "Pens": "Smooth-writing pens perfect for note-taking.",
    "Textbook": "A subject-specific textbook to support learning.",
    "Uniform": "A complete school uniform for one student.",
    "Tuition": "Covers a month of school tuition fees.",
    "Backpack": "Durable backpack to carry school supplies.",
    "Shoes": "Comfortable, sturdy shoes for school use.",
    "Lunch Box": "A lunch container to keep food fresh.",
    "Water Bottle": "Reusable bottle for hydration throughout the day.",
    "Calculator": "Basic calculator to support math education."
  };
  return descriptions[name] || "Educational item for student support.";
}
