(function () {
    "use strict";

    var input_field = document.getElementById("input_field");
    var output_field = document.getElementById("output_field");
    var convert_button = document.getElementById("convert_button");

    input_field.addEventListener("change", function () {
        input_field.removeAttribute("style");
    })

    convert_button.addEventListener("click", function () {
        var input_temperature = input_field.value.trim();
        output_field.value = "";

        if (input_temperature === "") {
            return;
        }

        if (isNaN(Number(input_temperature))) {
            input_temperature = parseFloat(input_temperature.replace(",", "."));

            if (isNaN(input_temperature)) {
                input_field.setAttribute("style", "border-color: red");
                return;
            }
        }

        input_field.value = input_temperature;
        output_field.value = (input_temperature * 9 / 5 + 32).toFixed(2);
    });
})();