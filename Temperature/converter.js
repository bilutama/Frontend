document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var input_field = document.getElementById("input_field");
    var output_field_kelvins = document.getElementById("output_field_kelvins");
    var output_field_fahrenheits = document.getElementById("output_field_fahrenheits");
    var convert_button = document.getElementById("convert_button");

    input_field.addEventListener("focus", function () {
        input_field.style.border = "none";
        input_field.style.padding = "11px 10px";
    })

    convert_button.addEventListener("click", function () {
        var input_temperature = input_field.value.trim();
        output_field_kelvins.value = "";
        output_field_fahrenheits.value = "";

        if (input_temperature === "") {
            return;
        }

        if (isNaN(Number(input_temperature))) {
            input_temperature = parseFloat(input_temperature.replace(",", "."));

            if (isNaN(input_temperature)) {
                input_field.style.border = "2px solid #E33914";
                input_field.style.padding = "9px 8px";
                return;
            }
        }

        input_field.value = input_temperature;

        function getKelvinsFromCelsius(celsiusDegrees) {
            return Number(celsiusDegrees) + 273.15;
        }

        output_field_kelvins.value = getKelvinsFromCelsius(input_temperature).toFixed(2);

        function getFahrenheitsFromCelsius(celsiusDegrees) {
            return celsiusDegrees * 9 / 5 + 32;
        }

        output_field_fahrenheits.value = getFahrenheitsFromCelsius(input_temperature).toFixed(2);
    });
});