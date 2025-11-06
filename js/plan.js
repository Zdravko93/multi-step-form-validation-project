export let selectedPlan = {};

const toggleSwitch = document.querySelector("#toggle");
const billingOptions = document.querySelectorAll(".billing-options .option");

const monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];
const yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];

export function initPlanSelection() {
  billingOptions.forEach((option) =>
    option.addEventListener("click", (e) => selectPlan(e.currentTarget))
  );

  toggleSwitch.addEventListener("change", updatePrices);
}

function selectPlan(option) {
  billingOptions.forEach((opt) => opt.classList.remove("active"));
  option.classList.add("active");
  updatePrices();
}

function updatePrices() {
  const isYearly = toggleSwitch.checked;

  billingOptions.forEach((option, i) => {
    const priceEl = option.querySelector(".option__price span");
    priceEl.textContent = isYearly ? yearlyPrices[i] : monthlyPrices[i];
  });

  storeSelectedPlan();
}

export function storeSelectedPlan() {
  const activeOption = document.querySelector(
    ".billing-options .option.active"
  );
  if (!activeOption) return;

  const planName = activeOption.querySelector("b").textContent;
  const planPrice = activeOption.querySelector(
    ".option__price span"
  ).textContent;

  selectedPlan = {
    name: planName,
    price: planPrice,
    billing: toggleSwitch.checked ? "yearly" : "monthly",
  };
}
