(function () {
    "use strict";

    var array = [1, 3, 4, 5, 6, 9, 0, 17, 20, 2, 56, 31, 15];
    console.log("Initial array: " + array.join(", "));

    array.sort(function (e1, e2) {
        return e2 - e1;
    });

    console.log("Descending sorted array: " + array.join(", "));

    var elementsCount = 5;

    var firstFiveElements = array.slice(0, elementsCount);
    console.log("First five elements: " + firstFiveElements.join(", "));

    var lastFiveElements = array.slice(array.length >= elementsCount ? array.length - elementsCount : 0);
    console.log("Last five elements: " + lastFiveElements.join(", "));

    var evenElementsSum = array.reduce(function (accumulator, element) {
        return element % 2 === 0 ? accumulator + element : accumulator;
    }, 0);

    console.log("Even array elements sum: " + evenElementsSum);

    var newArrayLength = 100;
    var oneHundredElementsArray = [];

    for (var i = 1; i <= newArrayLength; ++i) {
        oneHundredElementsArray.push(i);
    }

    console.log("New array: " + oneHundredElementsArray.join(", "));

    var evenElementsSquares = oneHundredElementsArray
        .filter(function (element) {
            return element % 2 === 0;
        })
        .map(function (element) {
            return Math.pow(element, 2);
        });

    console.log("Even elements squares: " + evenElementsSquares.join(", "));
})();