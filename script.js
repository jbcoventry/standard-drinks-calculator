const totalDrinks = () => document.querySelectorAll(".drink").length;

document.addEventListener("input", (event) => {
    calculateForOneDrink();
    calculateTotalDrinks();
    if (
        document.getElementById(`volume${totalDrinks()}`).value &&
        document.getElementById(`abv${totalDrinks()}`).value
    ) {
        createNewDrink();
    }
});

document.addEventListener("click", function (event) {
    if (event.target.matches("#clear")) {
        clearEverything();
    }
    if (event.target.matches("input")) {
        event.target.value = "";
    }
    calculateForOneDrink();
    calculateTotalDrinks();
});

const calculateForOneDrink = () => {
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

const calculateTotalDrinks = () => {
    let newTotal = 0;
    document
        .querySelectorAll(".result")
        .forEach((element) => (newTotal += parseFloat(element.innerHTML)));
    document.getElementById("total").innerHTML = Math.round(newTotal * 100) / 100;
};

let deleteDrinks = () => {
    if (totalDrinks() > 1) {
        document.getElementById(`drink${totalDrinks()}`).remove();
        deleteDrinks();
    } else return;
};
let clearEverything = () => {
    document.getElementById("volume1").value = "";
    document.getElementById("abv1").value = "";
    deleteDrinks();
    calculateTotalDrinks();
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
