function isChecked(checkbox, button) {
    document.getElementById(button).disabled = !checkbox.checked;
}