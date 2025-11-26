import { addOns } from "./dom.js";

export let selectedAddOns = [];

export function enableAddOnSelection() {
  addOns.forEach((addOn) => {
    const input = addOn.querySelector("input");

    addOn.addEventListener("click", () => {
      addOn.classList.toggle("selected");
      input.checked = addOn.classList.contains("selected");
    });
  });
}

export function storeSelectedAddOns() {
  selectedAddOns = [];

  addOns.forEach((addOn) => {
    if (addOn.classList.contains("selected")) {
      selectedAddOns.push({
        name: addOn.querySelector("b").textContent,
        price: addOn.querySelector(".service-price").textContent,
      });
    }
  });
}
