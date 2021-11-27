(function () {
    var input = document.getElementsByClassName("input_field");
    var output = document.getElementsByClassName("output_field");

    var input_temperature = input.value.trim();

    if (input_temperature === "") {
        return;
    }

    if (isNaN(parseFloat(input_temperature))) {
        input_temperature = parseFloat(input_temperature.replace(",", "."));

        if (isNaN(input_temperature)) {
            return;
        }

        input.value = input_temperature;
        output.value = (input_temperature * 9 / 5 + 32).toFixed(2);
    }
})()