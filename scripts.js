<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ONETrack Int. BUILD-A-BAG</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="scripts.js" defer></script>
</head>
<body>
  <header>
    <h1>BUILD-A-BAG</h1>
    <nav>
      <a href="about.html">About</a>
      <a href="https://github.com/emlarson746/Build-a-Bag" target="_blank">Github</a>
    </nav>
  </header>

  <div class="container">
    <!-- Left Sidebar with draggable items -->
    <div class="sidebar">
      <div class="item" data-price="26" data-name="Notebooks">
        <img src="images/notebooks.png" alt="Notebooks">
        <strong class="item-name-box">Notebooks</strong>
        <p class="item-description">A set of ruled notebooks for daily classwork.</p>
        <p class="item-price">$26</p>
      </div>
      <div class="item" data-price="7" data-name="Pens">
        <img src="images/pens.png" alt="Pens">
        <strong class="item-name-box">Pens</strong>
        <p class="item-description">Smooth-writing pens perfect for note-taking.</p>
        <p class="item-price">$7</p>
      </div>
      <div class="item" data-price="12" data-name="Textbook">
        <img src="images/textbook.png" alt="Textbook">
        <strong class="item-name-box">Textbook</strong>
        <p class="item-description">A subject-specific textbook to support learning.</p>
        <p class="item-price">$12</p>
      </div>
      <div class="item" data-price="25" data-name="Uniform">
        <img src="images/uniform.png" alt="Uniform">
        <strong class="item-name-box">Uniform</strong>
        <p class="item-description">A complete school uniform for one student.</p>
        <p class="item-price">$25</p>
      </div>
      <div class="item" data-price="100" data-name="Tuition">
        <img src="images/tuition.png" alt="Tuition">
        <strong class="item-name-box">Tuition</strong>
        <p class="item-description">Covers a month of school tuition fees.</p>
        <p class="item-price">$100</p>
      </div>
      <div class="item" data-price="30" data-name="Backpack">
        <img src="images/backpack.png" alt="Backpack">
        <strong class="item-name-box">Backpack</strong>
        <p class="item-description">Durable backpack to carry school supplies.</p>
        <p class="item-price">$30</p>
      </div>
      <div class="item" data-price="20" data-name="Shoes">
        <img src="images/shoes.png" alt="Shoes">
        <strong class="item-name-box">Shoes</strong>
        <p class="item-description">Comfortable, sturdy shoes for school use.</p>
        <p class="item-price">$20</p>
      </div>
      <div class="item" data-price="10" data-name="Lunch Box">
        <img src="images/lunchbox.png" alt="Lunch Box">
        <strong class="item-name-box">Lunch Box</strong>
        <p class="item-description">A lunch container to keep food fresh.</p>
        <p class="item-price">$10</p>
      </div>
      <div class="item" data-price="8" data-name="Water Bottle">
        <img src="images/waterbottle.png" alt="Water Bottle">
        <strong class="item-name-box">Water Bottle</strong>
        <p class="item-description">Reusable bottle for hydration throughout the day.</p>
        <p class="item-price">$8</p>
      </div>
      <div class="item" data-price="15" data-name="Calculator">
        <img src="images/calculator.png" alt="Calculator">
        <strong class="item-name-box">Calculator</strong>
        <p class="item-description">Basic calculator to support math education.</p>
        <p class="item-price">$15</p>
      </div>
    </div>

    <!-- Middle section with backpack image (Drop Area) -->
    <div class="bag-area" ondrop="drop(event)" ondragover="allowDrop(event)">
      <img src="images/backpack-area.png" alt="Backpack Drop Area">
    </div>

    <!-- Right Sidebar Order Summary -->
    <div class="order-summary">
      <h3>Order Total: $<span id="total">0</span></h3>
      <ul class="order-items" id="order-items"></ul>
      <button class="checkout" onclick="checkout()">Checkout (Chuffed)</button>
    </div>
  </div>
</body>
</html>
