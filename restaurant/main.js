// Nav Panel UI Module
const navPanelUI = (function () {
  const nav = document.querySelector("#nav-pane");
  const leftPane = document.querySelector("#nav-pane .left-pane");
  const rightPane = document.querySelector("#nav-pane .right-pane");

  let toggle = false;
  return {
    // Nav Panel Slide In / Out
    navPanelSlide: function () {
      if (!toggle) {
        leftPane.style.left = "0";
        rightPane.style.right = "0";
        nav.style.setProperty("z-index", "9");
      } else {
        leftPane.style.left = "-100%";
        rightPane.style.right = "-100%";
        setTimeout(function () {
          nav.style.setProperty("z-index", "-1");
        }, 550);
      }
      toggle = !toggle;
    },
  };
})();

// Main Order Module
const order = (function () {
  let orderList = [
    {
      id: 1,
      name: "Eggplant",
      price: 15,
      quantity: 0,
      img: "../img/chinesefood3.jpg",
    },
    {
      id: 2,
      name: "Crab",
      price: 30,
      quantity: 0,
      img: "../img/chinesefood4.jpg",
    },
    {
      id: 3,
      name: "Noodle",
      price: 20,
      quantity: 0,
      img: "../img/chinesefood5.jpg",
    },
  ];

  return {
    updateOrderList: function (orderData) {
      if (orderData) {
        orderList = orderData;
      }
    },
    updateOrderItem: function (quantity, id) {
      const ind = orderList.findIndex((orderItem) => {
        return orderItem.id == id;
      });
      orderList[ind]["quantity"] = parseInt(quantity);
    },
    getOrderList: function () {
      return orderList;
    },
    resetOrderList: function () {
      orderList.forEach((orderItem) => {
        orderItem.quantity = 0;
      });
    },
    getTotalQuantityInOrder: function () {
      return orderList.reduce((accQ, orderItem) => {
        return accQ + orderItem.quantity;
      }, 0);
    },
    getTotalPrice: function () {
      return orderList.reduce((accPrice, orderItem) => {
        return accPrice + orderItem.quantity * orderItem.price;
      }, 0);
    },
  };
})();

// LocalStorage Module
const ls = (function () {
  return {
    getLocalStorage: function () {
      return JSON.parse(localStorage.getItem("pandaBuffetOrder"));
    },
    setLocalStorage: function (data) {
      localStorage.setItem("pandaBuffetOrder", JSON.stringify(data));
    },
  };
})();

// Main App Control Module
const mainAppCtrl = (function (navPanelUICtrl, orderCtrl, localStorageCtrl) {
  // UI
  const hamburger = document.querySelector(".hamburger");

  const loadEventListener = function () {
    hamburger.addEventListener("click", navPanelUICtrl.navPanelSlide);
  };
  return {
    init: function () {
      loadEventListener();
      const orderData = localStorageCtrl.getLocalStorage();
      orderCtrl.updateOrderList(orderData);
      document.getElementById(
        "number-in-order"
      ).textContent = orderCtrl.getTotalQuantityInOrder();
    },
  };
})(navPanelUI, order, ls);

mainAppCtrl.init();
