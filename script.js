const totalDrinks = () => document.querySelectorAll(".drink").length;

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
    const formulaResult = Math.round(volumeInMl * percentage * 0.00789) / 10;
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
    document.getElementById("total").innerHTML = Math.round(newTotal * 10) / 10;
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
document.addEventListener("click", function (event) {
    if (event.target.matches("#clear")) {
        clearAction();
    }
    if (event.target.matches("input")) {
        event.target.value = "";
    }
    calculate();
    totaller();
});

const createNewDrink = () => {
    const drinkNumber = totalDrinks() + 1;
    const newDrink = document.createElement("div");
    const previousVolume = document.getElementById(`volume${totalDrinks()}`).value;
    newDrink.setAttribute("class", "drink");
    newDrink.setAttribute("id", `drink${drinkNumber}`);
    newDrink.innerHTML = `
<input class="volume" id="volume${drinkNumber}" type="text" inputmode="decimal" value="${previousVolume}"/>
<p class="units">ml</p>
<input class="abv" id="abv${drinkNumber}" type="text" inputmode="decimal" />
<p class="units">%</p>
<div class="result" id="result${drinkNumber}"></div>
<p class="units">drinks</p>
`;
    document.getElementById(`drink${totalDrinks()}`).after(newDrink);
};
