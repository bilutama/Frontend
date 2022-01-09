$(document).ready(function () {
    function resize($textArea) {
        $textArea.css("height", "auto");
        $textArea.css("height", $textArea[0].scrollHeight + "px");
    }


});