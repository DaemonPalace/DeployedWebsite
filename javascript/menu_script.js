document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".menu-item-container");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart_items");
  const totalAmount = document.getElementById("total_amount");

  async function fetchData() {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzKckKBU3M7WIdnEjrLG90vOugHPjhJ9x15QdSxSJorYIKVO6iJ4fUL68T8mYUbPHX1/exec",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      const items = data.data;
      if (!Array.isArray(items)) {
        throw new Error("Fetched data is not an array");
      }

      containers.forEach((container) => {
        const image = container.querySelector(".menu-image");
        const itemName = image.getAttribute("alt");
        const priceTag = container.querySelector(".menu-price");
        const nameTag = container.querySelector("h2");

        const itemData = items.find((item) => item.name === itemName);
        if (itemData) {
          image.setAttribute("data-name", itemData.name);
          image.setAttribute("data-description", itemData.description);
          image.setAttribute("data-price", itemData.price);
          
          // Update the image src to use the "imagen" field
          image.setAttribute("src", itemData.imagen);
          
          nameTag.textContent = itemData.name;
          priceTag.textContent = `$${itemData.price.toFixed(0)}`;
        }
      });

      containers.forEach((container) => {
        const image = container.querySelector(".menu-image");
        const overlayText = container.querySelector(".overlay-text");
        const itemData = items.find(
          (item) => item.name === image.getAttribute("alt")
        );
        if (itemData) {
          overlayText.textContent = itemData.description;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function addToCart(name, price) {
    console.log(`Adding item to cart: ${name} at $${price}`);
    const item = {
      name: name,
      price: parseFloat(price),
      quantity: 1,
    };

    const existingItem = cartItems.find((i) => i.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
  }

  function updateCart() {
    console.log("Updating cart");
    cartList.innerHTML = "";

    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${
        item.quantity
      }`;
      cartList.appendChild(li);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  function handleItemClick(event) {
    const target = event.target.closest(".menu-item-container img");
    if (target) {
      const name = target.getAttribute("alt");
      const price = parseFloat(target.getAttribute("data-price"));
      if (name && price) {
        addToCart(name, price);
      } else {
        console.error("Image missing data-name or data-price attributes");
      }
    }
  }

  const menuImages = document.querySelectorAll(".menu-item-container");
  console.log(`Found ${menuImages.length} menu images`);
  menuImages.forEach((image) => {
    image.addEventListener("click", handleItemClick);
  });

  document.getElementById("checkout_button").addEventListener("click", () => {
    console.log("Proceed to checkout");
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "pagos.html";
  });

  fetchData();
});
