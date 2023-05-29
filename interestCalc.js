var calculatorHTML = `
  <div style="border: solid; border-width:thick; border-radius:25px; border-color: #2BCBF1;" class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-5">Calculator</h1>
        <form>
          <div class="mb-3">
            <label for="amount" class="form-label">Amount ($)</label>
            <input type="number" class="form-control" id="amount" value="1000" />
          </div>
          <div class="mb-3">
            <label for="months" id="monthView" class="form-label">Months</label>
            <input type="range" class="form-range" min="1" max="60" value="1" id="months" />
            <div class="d-flex justify-content-between">
              <div>1 month</div>
              <div>5 years</div>
            </div>
          </div>
          <div class="text-center mb-3">
            <label class="form-label d-block" id="ratePerc"></label>
            <div class="btn-group" role="group" aria-label="Interest Rate">
              <button onclick="setInterestViewer('low');" type="button" class="btn btn-secondary active" data-level="1">Low</button>
              <button onclick="setInterestViewer('med');" type="button" class="btn btn-secondary" data-level="2">Medium</button>
              <button onclick="setInterestViewer('high');" type="button" class="btn btn-secondary" data-level="3">High</button>
            </div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="compound" disabled />
            <label class="form-check-label" for="compound">Compounded</label>
          </div>
		  <div class="d-flex justify-content-center">
          <button type="button" class="btnug" onclick="calculateEarnings()"><span>Calculate Earnings</span></button>
          </div>        
		</form>
        <div class="mt-5">
          <p class="text-center" id="result"></p>
        </div>
      </div>
    </div>
  </div>
`;

document.getElementById("intCalc").innerHTML = calculatorHTML;

function calculateEarnings() {
  const months = parseInt(document.getElementById("months").value);
  const level = parseInt(document.querySelector(".btn-group > .active").getAttribute("data-level"));
  const amount = parseFloat(document.getElementById("amount").value);
  const compounded = document.getElementById("compound").checked;

  let interestRate;

  switch (level) {
    case 1:
      interestRate = 0.06;
      break;
    case 2:
      interestRate = 0.08;
      break;
    case 3:
      interestRate = 0.10;
      break;
    default:
      console.log("Invalid interest rate level.");
      return;
  }

  const monthlyInterestRate = interestRate / 12;
  let earnings;

  if (compounded) {
    earnings = amount * ((1 + monthlyInterestRate) ** months - 1);
  } else {
    earnings = amount * monthlyInterestRate * months;
  }

  const resultElement = document.getElementById("result");
  resultElement.innerText = `Your earnings after ${months} months at ${interestRate * 100}% interest rate ${(compounded) ? "compounded" : "not compounded"}: $${earnings.toFixed(2)}`;
}

const slider = document.getElementById("months");
const compoundCheckbox = document.getElementById("compound");
const interestButtons = document.querySelectorAll(".btn-group > button");

slider.addEventListener("input", function() {
  if (this.value == 1) {
   
compoundCheckbox.checked = false;
compoundCheckbox.disabled = true;
} else {
compoundCheckbox.disabled = false;
}
});

slider.addEventListener("input", function() {
document.getElementById("monthView").innerHTML = document.getElementById("months").value + " months";
});

interestButtons.forEach(function(button) {
button.addEventListener("click", function() {
interestButtons.forEach(function(otherButton) {
otherButton.classList.remove("active");
});
this.classList.add("active");
});
});

function setInterestViewer(plan) {
  let selectedRate;
  if (plan == 'low') {
    selectedRate = '6%';
  } else if (plan == 'med') {
    selectedRate = '8%';
  } else {
    selectedRate = '10%';
  }
  document.getElementById("ratePerc").innerHTML = 'Interest Rate: ' + selectedRate;
}

setInterestViewer('low')