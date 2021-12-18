(function () {
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

        return people.reduce(function (currentAgeSum, person) {
            return currentAgeSum + person.age;
        }, 0) / people.length;
    }

    console.log("Task 1: average people's age is " + getAverageAge(people));

    //== Task 2 ==
    function getSortedAndFilteredPeopleList(people, minimumAge, maximumAge) {
        return _.chain(people)
            .filter(function (person) {
                return person.age >= minimumAge && person.age <= maximumAge;
            })
            .sortBy("age")
            .value();
    }

    var minimumAge = 20;
    var maximumAge = 30;

    console.log("Task 2: the sorted and ordered people list:");
    console.log(getSortedAndFilteredPeopleList(people, minimumAge, maximumAge));

    //== Task 3 ==
    function getUniqueAndSortedPeopleList(people, minimumAge, maximumAge) {
        return _.chain(people)
            .filter(function (person) {
                return person.age >= minimumAge && person.age <= maximumAge;
            })
            .pluck("name")
            .uniq()
            .value()
            .sort(function (person1, person2) {
                if (person1 < person2) return 1;
                if (person2 < person1) return -1;
                return 0;
            });
    }

    console.log("Task 3: sorted unique people names aged between " + minimumAge + " and " + maximumAge);
    console.log(getUniqueAndSortedPeopleList(people, minimumAge, maximumAge));

    //== Task 4 ==
    function getPeopleCountByName(people) {
        return _.countBy(people, 'name');
    }

    console.log("Task 4: count people by names:");
    console.log(getPeopleCountByName(people));
})();