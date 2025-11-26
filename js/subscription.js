import { billingOptions, toggleSwitch, billingErrorMessage } from "./dom.js";

export const monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];
export const yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];

export let selectedPlan = {};

export function enableKeyboardSelection() {
  billingOptions.forEach((option) => {
    option.setAttribute("tabindex", "0"); // ensure it's focusable by keyboard

    option.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        option.click(); // behave just like mouse click
      }
    });
  });
}

export function updateSubscriptionText() {
  const isYearly = toggleSwitch.checked;

  billingOptions.forEach((option, index) => {
    const price = option.querySelector(".option__price span");
    const yearlyTag = option.querySelector(".yearly-price");

    price.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
    yearlyTag.classList.toggle("hidden", !isYearly);
  });
}

export function highlightSubscription(event) {
  billingOptions.forEach((o) => o.classList.remove("active"));
  event.currentTarget.classList.add("active");

  billingErrorMessage.classList.remove("show-error");
}

export function storeSelectedPlan(option) {
  selectedPlan = {
    name: option.querySelector("b").textContent,
    price: option.querySelector(".option__price span").textContent,
    billing: toggleSwitch.checked ? "yearly" : "monthly",
  };
}
