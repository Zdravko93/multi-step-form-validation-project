import { selectedPlan } from "./plan.js";
import { selectedAddOns } from "./addons.js";

const selectedPlanElement = document.querySelector(
  ".options-final__payment__plan"
);
const selectedAddOnsElement = document.querySelector(".options-final__list");
const totalPriceElement = document.querySelector(".pricing-total");
const toggleSwitch = document.querySelector("#toggle");

export function initSummary() {
  const confirmButton = document.querySelector(".confirm-button");
  confirmButton.addEventListener("click", outputSummary);
}

function outputSummary() {
  selectedPlanElement.innerHTML = `
    <div class="underline">
      <p class="charge">${selectedPlan.name} (${selectedPlan.billing})</p>
      <p class="charge-price">${selectedPlan.price}</p>
    </div>
  `;

  selectedAddOnsElement.innerHTML = selectedAddOns
    .map(
      (addOn) => `
      <div class="options-final__item">
        <p class="item">${addOn.name}</p>
        <p class="price">${addOn.price}</p>
      </div>
    `
    )
    .join("");

  totalPriceElement.innerHTML = `
    <div>
      <p>Total</p>
      <b>${calculateTotal()}</b>
    </div>
  `;
}

function calculateTotal() {
  let total = parseFloat(selectedPlan.price.replace(/[^0-9.-]+/g, ""));

  selectedAddOns.forEach((addOn) => {
    total += parseFloat(addOn.price.replace(/[^0-9.-]+/g, ""));
  });

  return toggleSwitch.checked ? `$${total}/yr` : `$${total}/mo`;
}
