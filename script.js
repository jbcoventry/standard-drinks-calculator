const totalDrinks = () => document.querySelectorAll(".drink").length;
let currentInputID = "volume1";

document.addEventListener("input", (event) => {
    calculate();
    totaller();
    if (
        document.getElementById(`volume${totalDrinks()}`).value &&
        document.getElementById(`abv${totalDrinks()}`).value
    ) {
        createNewDrink();
    }
});
document.addEventListener(
    "blur",
    function () {
        document.getElementById("abv1").setAttribute("readonly", "");
    },
    true
);
document.addEventListener("click", function (event) {
    if (event.target.matches("input")) {
        currentInputID = event.target.id;
    }
    if (
        event.target.matches(
            "#num1, #num2, #num3, #num4, #num5, #num6, #num7, #num8, #num9, #num0, #numDecimal"
        )
    ) {
        numpadAdd(event.target.innerHTML);
    }
    if (event.target.matches("#numDelete")) {
        numpadDelete();
    }
    if (event.target.matches("#abv1")) {
        event.target.removeAttribute("readonly");
    }
    if (event.target.matches("#clear")) {
        clearAction();
    }
    if (event.target.matches("input")) {
        event.target.value = "";
    }
    numpadOffOnner();
    calculate();
    totaller();
});

addEventListener("resize", (event) => {});
const numpadOffOnner = () => {
    if (window.matchMedia("(orientation:portrait)").matches) {
        document
            .querySelectorAll("input")
            .forEach((input) => setAttribute("Butt", "butt"));
    }
};
const calculate = () => {
    let toBeCalculated = totalDrinks();
    const innerCalculate = () => {
        if (toBeCalculated > 0) {
            document.getElementById(`result${toBeCalculated}`).innerHTML =
                standardDrinkFormula(
                    parseFloat(document.getElementById(`volume${toBeCalculated}`).value),
                    parseFloat(document.getElementById(`abv${toBeCalculated}`).value)
                );
            toBeCalculated--;
            innerCalculate();
        }
    };
    innerCalculate();
};
const standardDrinkFormula = (volumeInMl, percentage) => {
    const formulaResult = Math.round(volumeInMl * percentage * 0.0789) / 100;
    if (formulaResult) {
        return formulaResult;
    } else {
        return 0;
    }
};

const totaller = () => {
    let newTotal = 0;
    document
        .querySelectorAll(".result")
        .forEach((element) => (newTotal += parseFloat(element.innerHTML)));
    document.getElementById("total").innerHTML = newTotal;
};

let deleteDrinks = () => {
    if (totalDrinks() > 1) {
        document.getElementById(`drink${totalDrinks()}`).remove();
        deleteDrinks();
    } else return;
};
let clearAction = () => {
    document.getElementById("volume1").value = "";
    document.getElementById("abv1").value = "";
    deleteDrinks();
    totaller();
};

const numpadAdd = (input) => {
    document.getElementById(`${currentInputID}`).value += input;
};
const numpadDelete = () => {
    let valueArray = document.getElementById(`${currentInputID}`).value.split("");
    valueArray.splice(-1, 1);
    document.getElementById(`${currentInputID}`).value = valueArray.join("");
};

const createNewDrink = () => {
    const drinkNumber = totalDrinks() + 1;
    const newDrink = document.createElement("div");
    const previousVolume = document.getElementById(`volume${totalDrinks()}`).value;
    newDrink.setAttribute("class", "drink");
    newDrink.setAttribute("id", `drink${drinkNumber}`);
    newDrink.innerHTML = `
<input class="volume" id="volume${drinkNumber}" type="text" inputmode="decimal" value="${previousVolume}"/>
<input class="abv" id="abv${drinkNumber}" type="text" inputmode="decimal" />
<div class="result" id="result${drinkNumber}"></div>
`;
    document.getElementById(`drink${totalDrinks()}`).after(newDrink);
};
