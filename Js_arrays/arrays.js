(function () {
    var array = [1, 3, 4, 5, 6, 9, 0, 17, 20, 2, 56, 31, 15];
    array.sort(function (x, y) {
        return y - x;
    });

    console.log("Descending sorted array: " + array.join(", "));

    var elementsCount = 5;

    var firstFiveElements = array.slice(0, elementsCount);
    console.log("First five elements: " + firstFiveElements.join(", "));

    var lastFiveElements = array.slice(array.length >= elementsCount ? array.length - elementsCount : 0);
    console.log("Last five elements: " + lastFiveElements.join(", "));

    var evenElementsSum;

    evenElementsSum = array.reduce(function (accumulator, element) {
        accumulator += element % 2 === 0 ? element : 0;
        return accumulator;
    }, 0);

    console.log("Sum of even elements of array: " + evenElementsSum);

    var newArrayLength = 100;
    var oneHundredElementsArray = [];

    for (var i = 1; i <= newArrayLength; ++i) {
        oneHundredElementsArray.push(i);
    }

    console.log("new array: " + oneHundredElementsArray.join(", "));

    var filterEvenNumbers = function (element) {
        if (element % 2 === 0) {
            return element;
        }
    }

    var getNumberSquare = function (element) {
        return Math.pow(element, 2);
    }

    var evenElementsSquares = oneHundredElementsArray.filter(filterEvenNumbers).map(getNumberSquare);
    console.log("Even squares: " + evenElementsSquares.join(", "));
})()