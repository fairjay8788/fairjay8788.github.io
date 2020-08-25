// Menu UI Module
const menuUI = (function () {
  return {
    initCurruntQuantity: function (orderData) {
      document.querySelectorAll(".quantity").forEach((input) => {
        input.value = 0;
      });
      if (orderData) {
        orderData.forEach((orderItem) => {
          document
            .getElementById(`dish-${orderItem.id}`)
            .querySelector(".quantity").value = orderItem.quantity;
        });
      }
    },
    adjustDishQuantity: function (e) {
      if (e.target.classList.contains("quan-btn")) {
        // Standardize the input value first
        let currentQuantity = parseInt(
          e.target.parentElement.querySelector(".quantity").value
        );
        if (currentQuantity < 0) {
          currentQuantity = 0;
        }
        if (isNaN(currentQuantity)) {
          currentQuantity = 1;
        }
        // Adjust the value
        if (e.target.classList.contains("plus")) {
          e.target.parentElement.querySelector(".quantity").value =
            currentQuantity + 1;
        } else if (
          e.target.classList.contains("minus") &&
          currentQuantity > 0
        ) {
          e.target.parentElement.querySelector(".quantity").value =
            currentQuantity - 1;
        }
      }
    },
    showQuantityMsg: function (flag, dishId) {
      const statusIcon = document
        .getElementById(`dish-${dishId}`)
        .querySelector(".status-icon");
      const statusMsg = document
        .getElementById(`dish-${dishId}`)
        .querySelector(".status-msg");
      // Invalid input
      if (flag === "error") {
        // change status icon
        statusIcon.classList.remove("fa-utensils");
        statusIcon.classList.remove("fa-check-square");
        statusIcon.classList.add("fa-times-circle");
        statusIcon.style.setProperty("background", "pink");
        statusIcon.style.setProperty("color", "red");
        // show msg
        statusMsg.textContent = "Invalid Quantity!";
        statusMsg.style.setProperty("display", "block");
        statusMsg.style.setProperty("background", "pink");
        statusMsg.style.setProperty("color", "red");
        setTimeout(() => {
          statusMsg.style.setProperty("display", "none");
        }, 2000);
      } else {
        // Valid input
        // change status icon
        statusIcon.classList.remove("fa-utensils");
        statusIcon.classList.remove("fa-times-circle");
        statusIcon.classList.add("fa-check-square");
        statusIcon.style.setProperty("background", "lightgreen");
        statusIcon.style.setProperty("color", "green");
        // show msg
        statusMsg.textContent = "Added to order!";
        statusMsg.style.setProperty("display", "block");
        statusMsg.style.setProperty("background", "lightgreen");
        statusMsg.style.setProperty("color", "green");
        setTimeout(() => {
          statusMsg.style.setProperty("display", "none");
        }, 2000);
      }
    },
    updateNumberInCart: function (number) {
      document.getElementById("number-in-order").textContent = number;
      document
        .getElementById("number-in-order")
        .classList.add("updatingNumber");
      setTimeout(() => {
        document
          .getElementById("number-in-order")
          .classList.remove("updatingNumber");
      }, 1500);
    },
  };
})();

// Menu Ctrl Module
const menuAppCtrl = (function (menuUICtrl, orderCtrl, localStorageCtrl) {
  const updateCart = function (e) {
    if (e.target.classList.contains("add-btn")) {
      const dishId = e.target.parentElement.id.substr(5);
      // Check if quantity value is all numbers
      const quantity = /^\d+$/.exec(
        e.target.parentElement.querySelector(".quantity").value
      );
      if (quantity === null) {
        // Invalid quantity value
        menuUICtrl.showQuantityMsg("error", dishId);
      } else {
        // valid quantity value
        menuUICtrl.showQuantityMsg("success", dishId);
        orderCtrl.updateOrderItem(quantity[0], dishId);
        // set localStorage
        localStorageCtrl.setLocalStorage(orderCtrl.getOrderList());
        // number in cart update
        menuUICtrl.updateNumberInCart(orderCtrl.getTotalQuantityInOrder());
      }
    }
  };
  const loadEventListener = function () {
    document
      .querySelector(".menu-items")
      .addEventListener("click", menuUICtrl.adjustDishQuantity);
    document.querySelector(".menu-items").addEventListener("click", updateCart);
  };
  return {
    init: function () {
      loadEventListener();
      const orderData = localStorageCtrl.getLocalStorage();
      menuUICtrl.initCurruntQuantity(orderData);
    },
  };
})(menuUI, order, ls);

menuAppCtrl.init();
