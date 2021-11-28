(function () {
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
                input_field.style.border = "2px solid red";
                input_field.style.padding = "9px 8px";
                return;
            }
        }

        input_field.value = input_temperature;
        output_field_kelvins.value = (Number(input_temperature) + 273.15).toFixed(2);
        output_field_fahrenheits.value = (input_temperature * 9 / 5 + 32).toFixed(2);
    });
})();