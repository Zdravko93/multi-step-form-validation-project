export let selectedAddOns = [];

const addOns = document.querySelectorAll(".services-option");

export function initAddOns() {
  addOns.forEach((addOn) => {
    const input = addOn.querySelector("input");

    addOn.addEventListener("click", () => {
      addOn.classList.toggle("selected");
      input.checked = addOn.classList.contains("selected");
      storeAddOns();
    });
  });
}

export function storeAddOns() {
  selectedAddOns = [];

  addOns.forEach((addOn) => {
    if (addOn.classList.contains("selected")) {
      const name = addOn.querySelector("b").textContent;
      const price = addOn.querySelector(".service-price").textContent;
      selectedAddOns.push({ name, price });
    }
  });
}
