$(document).ready(function () {
    "use strict";

    var people = [
        {
            age: 48,
            name: "Kirill",
            lastName: "Andrianov"
        },
        {
            age: 22,
            name: "Lev",
            lastName: "Ushakov"
        },
        {
            age: 32,
            name: "Viktoriya",
            lastName: "Saljnikova"
        },
        {
            age: 37,
            name: "Nadezhda",
            lastName: "Prokofjeva"
        },
        {
            age: 27,
            name: "Artyom",
            lastName: "Anikin"
        },
        {
            age: 29,
            name: "Artyom",
            lastName: "Surkov"
        },
        {
            age: 18,
            name: "Kirill",
            lastName: "Markov"
        },
        {
            age: 31,
            name: "Pelageya",
            lastName: "Lebedeva"
        },
        {
            age: 23,
            name: "Roman",
            lastName: "Klyuev"
        },
        {
            age: 52,
            name: "Konstantin",
            lastName: "Grigorjev"
        }
    ];

    //== Task 1 ==
    // Returns average people's age / 0 for empty array
    function getAverageAge(people) {
        if (people.length === 0) {
            return 0;
        }

        return _.chain(people)
                .pluck("age")
                .reduce(function (accumulator, currentAge) {
                    return accumulator + currentAge;
                })
                .value()
            / people.length;
    }

    console.log("Task 1: average people's age is " + getAverageAge(people));

    //== Task 2 ==
    function getSortedAndFilteredPeopleList(people, minAge, maxAge) {
        return _.chain(people)
            .filter(function (person) {
                return person.age >= minAge && person.age <= maxAge;
            })
            .sortBy("age")
            .value();
    }

    var minAge = 20;
    var maxAge = 30;

    console.log("Task 2: the sorted and ordered people list:");
    console.log(getSortedAndFilteredPeopleList(people, minAge, maxAge));

    //== Task 3 ==
    function getUniqueAndSortedPeopleList(people, minAge, maxAge) {
        return _.chain(people)
            .filter(function (person) {
                return person.age >= minAge && person.age <= maxAge;
            })
            .pluck("name")
            .uniq()
            .sortBy()
            .reverse()
            .value();
    }

    console.log("Task 3: sorted unique people names aged between " + minAge + " and " + maxAge);
    console.log(getUniqueAndSortedPeopleList(people, minAge, maxAge));

    //== Task 4 ==
    function getPeopleCountByName(people) {
        return _.countBy(people, function (person) {
            return person.name;
        });
    }

    console.log("Task 4: count people by names:");
    console.log(getPeopleCountByName(people));
});