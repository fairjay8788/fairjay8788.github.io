const cartUI = (function () {
  const cartSummary = document.getElementById("cart-summary");
  return {
    generateCartSummaryHtml: function () {
      if (order.getTotalQuantityInOrder() === 0) {
        cartSummary.innerHTML = `
          <p class="emptyMsg">Your cart is empty.</p>
        `;
      } else {
        let html = "";
        order.getOrderList().forEach((orderItem) => {
          if (orderItem.quantity > 0) {
            html += `
            <div class="cart-item py-1">
              <div class="cart-item-desc">
                <img src=${orderItem.img} />
                <p class="cart-item-name">${orderItem.name}</p>
              </div>
              <div class="cart-item-total">
                <p>$${orderItem.price * orderItem.quantity} ($${
              orderItem.price
            } X ${orderItem.quantity})</p>
              </div>
            </div>
            `;
          }
        });
        html += `
          <div class="horizontal-rule"></div>
          <div class="cart-total-price py-1">
            Total: $${order.getTotalPrice()}
          </div>
          <div class="button-wrap py-1" >
            <button class="clear-cart">Clear Cart</button>
            <button class="checkout">Checkout</button>
          </div>
        `;
        cartSummary.innerHTML = html;
      }
    },
  };
})();

const cartAppCtrl = (function (cartUICtrl, orderCtrl, localStorageCtrl) {
  const clearCart = function (e) {
    if (e.target.className === "clear-cart") {
      orderCtrl.resetOrderList();
      localStorageCtrl.setLocalStorage(orderCtrl.getOrderList());
      window.location.reload();
    }
  };
  const checkout = function (e) {
    if (e.target.className === "checkout") {
      orderCtrl.resetOrderList();
      localStorageCtrl.setLocalStorage(orderCtrl.getOrderList());
      window.location.href = "./index.html";
    }
  };
  return {
    init: function () {
      cartUICtrl.generateCartSummaryHtml();
      document
        .getElementById("cart-summary")
        .addEventListener("click", clearCart);
      document
        .getElementById("cart-summary")
        .addEventListener("click", checkout);
    },
  };
})(cartUI, order, ls);

cartAppCtrl.init();
