document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart_items_summary");
  const totalAmount = document.getElementById("total_amount_summary");

  async function submitOrder(orderData) {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzKckKBU3M7WIdnEjrLG90vOugHPjhJ9x15QdSxSJorYIKVO6iJ4fUL68T8mYUbPHX1/exec",
        {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(
        "There was a problem submitting your order. Please try again later."
      );
    }
  }

  function gatherOrderData() {
    const userName = document.getElementById("name").value.trim();
    const celNumber = document.getElementById("phone").value.trim();
    const userAddress = document.getElementById("address").value.trim();
    const cardNumber = document.getElementById("card_number").value.trim();
    const expirationDate = document.getElementById("expiry_date").value.trim();
    const CVV = document.getElementById("cvv").value.trim();
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (
      !userName ||
      !celNumber ||
      !userAddress ||
      !cardNumber ||
      !expirationDate ||
      !CVV
    ) {
      alert("Please fill in all fields.");
      return null;
    }
    const orderData = {
      name: userName,
      phone: celNumber,
      address: userAddress,
      ccn: cardNumber,
      exp: expirationDate,
      cvv: CVV,
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };

    return orderData;
  }

  function updateCartSummary() {
    cartList.innerHTML = "";
    let total = 0;
    cartItems.forEach((item, index) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x 
        <input type="number" class="quantity" data-index="${index}" value="${
        item.quantity
      }" min="1">
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cartList.appendChild(li);
    });
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
  updateCartSummary();
  cartList.addEventListener("change", (event) => {
    if (event.target.classList.contains("quantity")) {
      const index = event.target.getAttribute("data-index");
      const newQuantity = parseInt(event.target.value, 10);
      if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartSummary();
      }
    }
  });
  cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartSummary();
    }
  });
  document
    .getElementById("payment_form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const orderData = gatherOrderData();
      if (orderData) {
        submitOrder(orderData);
        localStorage.removeItem("cartItems");
        alert("Payment processed successfully!");
        window.location.href = "Menu_POKE.html";
      }
    });
});
