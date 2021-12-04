document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var inputField = document.getElementById("input_field");
    var outputFieldKelvins = document.getElementById("output_field_kelvins");
    var outputFieldFahrenheitDegrees = document.getElementById("output_field_fahrenheit_degrees");
    var convertButton = document.getElementById("convert_button");

    inputField.addEventListener("focus", function () {
        inputField.classList.remove("invalid_input");
        document.querySelector(".invalid_input_message").style.display = "none";
    });

    convertButton.addEventListener("click", function () {
        var inputTemperature = inputField.value.trim();
        outputFieldKelvins.value = "";
        outputFieldFahrenheitDegrees.value = "";

        function displayInvalidInputMessage() {
            document.querySelector(".invalid_input_message").style.display = "inline";
            inputField.classList.add("invalid_input");
        }

        if (inputTemperature.length === 0) {
            displayInvalidInputMessage();
            return;
        }

        if (isNaN(Number(inputTemperature))) {
            inputTemperature = parseFloat(inputTemperature.replace(",", "."));

            if (isNaN(inputTemperature)) {
                displayInvalidInputMessage();
                return;
            }
        }

        inputField.value = inputTemperature;

        function getKelvinsFromCelsius(celsiusDegrees) {
            return Number(celsiusDegrees) + 273.15;
        }

        outputFieldKelvins.value = getKelvinsFromCelsius(inputTemperature).toFixed(2);

        function getFahrenheitFromCelsius(celsiusDegrees) {
            return celsiusDegrees * 9 / 5 + 32;
        }

        outputFieldFahrenheitDegrees.value = getFahrenheitFromCelsius(inputTemperature).toFixed(2);
    });
});