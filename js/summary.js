import {
  selectedPlanElement,
  selectedAddOnsElement,
  totalPriceElement,
  toggleSwitch,
} from "./dom.js";

import { selectedPlan } from "./subscription.js";
import { selectedAddOns } from "./addons.js";

export function outputSummary() {
  selectedPlanElement.innerHTML = `
    <div class="underline">
      <p class="charge">${selectedPlan.name} (${selectedPlan.billing})</p>
      <p class="charge-price">${selectedPlan.price}</p>
    </div>
  `;

  selectedAddOnsElement.innerHTML = selectedAddOns
    .map(
      (a) => `
      <div class="options-final__item">
        <p>${a.name}</p>
        <p>${a.price}</p>
      </div>
    `
    )
    .join("");

  totalPriceElement.innerHTML = `
    <p>Total</p>
    <b>${calculateTotalPrice()}</b>
  `;
}

export function calculateTotalPrice() {
  let total = parseFloat(selectedPlan.price.replace(/[^0-9]/g, ""));

  selectedAddOns.forEach((a) => {
    total += parseFloat(a.price.replace(/[^0-9]/g, ""));
  });

  return toggleSwitch.checked ? `$${total}/yr` : `$${total}/mo`;
}
