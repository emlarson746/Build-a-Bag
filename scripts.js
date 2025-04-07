let total = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(data);
  const itemName = draggedElement?.getAttribute("data-name");
  const itemPrice = parseFloat(draggedElement?.getAttribute("data-price"));

  if (itemName && !isNaN(itemPrice)) {
    addItemToCart(itemName, itemPrice);
  }
}

document.querySelectorAll('.item').forEach((item, index) => {
  item.setAttribute('id', `item-${index}`);
  item.addEventListener('dragstart', (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  });
});

function addItemToCart(name, price) {
  const list = document.getElementById("order-items");
  const listItem = document.createElement("li");
  listItem.textContent = `${name} - $${price}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = () => {
    list.removeChild(listItem);
    total -= price;
    updateTotal();
  };

  listItem.appendChild(removeBtn);
  list.appendChild(listItem);

  total += price;
  updateTotal();
}

function updateTotal() {
  document.getElementById("total").textContent = total.toFixed(2);
}

function checkout() {
  window.open("https://chuffed.org/project/126668-build-a-bag", "_blank");
}
