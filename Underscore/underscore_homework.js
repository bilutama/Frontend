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
            age: 16,
            name: "Andrej",
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

    console.log("Average people's age is " + getAverageAge(people));

    function getSortedAndFilteredPeople(people, minAge, maxAge) {
        return _.chain(people)
            .filter(function (person) {
                return person.age >= minAge && person.age <= maxAge;
            })
            .sortBy("age")
            .value();
    }

    console.log("Sortered and ordered people list:");
    console.log(getSortedAndFilteredPeople(people, 20, 30));

    // PURE FUNCTION
    // returns a copy of "people" with added fullName (name + last name) property
    function getPeopleWithFullNames(people) {
        return _.map(people, function (person) {
            return {
                age: person.age,
                name: person.name,
                lastName: person.lastName,
                fullName: person.name + " " + person.lastName
            };
        });
    }

    var peopleWithFullNames = getPeopleWithFullNames(people);

    console.log("Initial people array:")
    console.log(people);

    console.log("New people array with full names:")
    console.log(peopleWithFullNames);

    // NOT A PURE FUNCTION
    function addFullNameProperty(people) {
        _.each(people, function (person) {
            _.extend(person, {"fullName": person.name + " " + person.lastName});
        });
    }

    addFullNameProperty(people);
    console.log("Modified initial people array:")
    console.log(people);
});
