const pages = [
  [
    ["assets/bank/bank-maybank.svg", "Maybank"],
    ["assets/bank/bank-Cimb.svg", "CIMB"],
    ["assets/bank/bank-Pb.svg", "Public Bank"],
    ["assets/bank/bank-RHB.svg", "RHB Bank"],
    ["assets/bank/bank-HLB.svg", "Hong Leong Bank"],
    ["assets/bank/bank-AmBank.svg", "AmBank"]
  ],
  [
    ["assets/bank/bank-Pb.svg", "Public Bank"],
    ["assets/bank/bank-maybank.svg", "Maybank"],
    ["assets/bank/bank-Cimb.svg", "CIMB"],
    ["assets/bank/bank-AmBank.svg", "AmBank"],
    ["assets/bank/bank-RHB.svg", "RHB Bank"],
    ["assets/bank/bank-HLB.svg", "Hong Leong Bank"]
  ],
  [
    ["assets/bank/bank-RHB.svg", "RHB Bank"],
    ["assets/bank/bank-HLB.svg", "Hong Leong Bank"],
    ["assets/bank/bank-AmBank.svg", "AmBank"],
    ["assets/bank/bank-maybank.svg", "Maybank"],
    ["assets/bank/bank-Pb.svg", "Public Bank"],
    ["assets/bank/bank-Cimb.svg", "CIMB"]
  ]
];

let page = 0;
let selectedBank = null;
const banks = document.getElementById("banks");
const dots = document.getElementById("dots");
const status = document.getElementById("bankStatus");
const proceedButton = document.getElementById("proceed");

function renderBanks() {
  banks.innerHTML = "";
  pages[page].forEach((item) => {
    const [image, name] = item;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bank" + (selectedBank === name ? " selected" : "");
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", String(selectedBank === name));
    const logo = document.createElement("img");
    logo.src = image;
    logo.alt = name;
    const check = document.createElement("span");
    check.className = "check";
    button.append(logo, check);
    button.addEventListener("click", () => {
      selectedBank = name;
      status.textContent = "";
      renderBanks();
    });
    banks.appendChild(button);
  });

  dots.innerHTML = "";
  pages.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === page ? "active" : "";
    button.setAttribute("aria-label", `Show bank page ${index + 1}`);
    button.setAttribute("aria-current", index === page ? "page" : "false");
    button.addEventListener("click", () => {
      page = index;
      status.textContent = "";
      renderBanks();
    });
    dots.appendChild(button);
  });
}
renderBanks();

document.getElementById("importantBtn").addEventListener("click", () => {
  const btn = document.getElementById("importantBtn");
  const box = document.getElementById("importantContent");
  const open = box.classList.toggle("open");
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
});

proceedButton.addEventListener("click", () => {
  if (!selectedBank) {
    status.textContent = "Please select a bank first.";
    return;
  }
  const routes = {
    "Maybank": "banks/maybank/index.html",
    "Public Bank": "banks/public-bank/index.html",
    "RHB Bank": "banks/rhb/index.html",
    "Hong Leong Bank": "banks/hlb/index.html",
    "CIMB": "banks/cimb/index.html",
    "AmBank": "banks/ambank/index.html"
  };
  const target = routes[selectedBank];
  if (!target) {
    status.textContent = `${selectedBank} login page is not included in this demo yet.`;
    return;
  }
  window.location.href = target;
});

// Copy the transaction ID shown in the summary.
const copyButton = document.querySelector(".copy");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const transactionId = "TXN20260910A182";
    try {
      await navigator.clipboard.writeText(transactionId);
      status.textContent = "Transaction ID copied.";
    } catch (_) {
      status.textContent = `Transaction ID: ${transactionId}`;
    }
  });
}

let seconds = 256;
const timer = document.getElementById("timer");
setInterval(() => {
  if (seconds > 0) seconds--;
  if (timer) timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}, 1000);
