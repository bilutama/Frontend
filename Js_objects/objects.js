(function () {
    "use strict";

    var countries = [
        {
            name: "Germany",
            cities: [
                {
                    name: "Berlin",
                    population: 3275000
                },
                {
                    name: "Hamburg",
                    population: 1686100
                },
                {
                    name: "Munich",
                    population: 1185400
                },
                {
                    name: "Cologne",
                    population: 965300
                },
                {
                    name: "Frankfurt",
                    population: 648000
                }]
        },
        {
            name: "France",
            cities: [
                {
                    name: "Paris",
                    population: 2187526
                },
                {
                    name: "Marseille",
                    population: 863310
                },
                {
                    name: "Lyon",
                    population: 516092
                },
                {
                    name: "Toulouse",
                    population: 479553
                }
            ]
        },
        {
            name: "UK",
            cities: [
                {
                    name: "London",
                    population: 9304016
                },
                {
                    name: "Manchester",
                    population: 2730076
                },
                {
                    name: "Birmingham",
                    population: 2607437
                },
                {
                    name: "Leeds",
                    population: 1889095
                }
            ]
        },
        {
            name: "Italy",
            cities: [
                {
                    name: "Rome",
                    population: 2318895
                },
                {
                    name: "Milan",
                    population: 1236837
                },
                {
                    name: "Naples",
                    population: 959470
                },
                {
                    name: "Turin",
                    population: 870456
                },
                {
                    name: "Palermo",
                    population: 648260
                }
            ]
        },
        {
            name: "Spain",
            cities: [
                {
                    name: "Madrid",
                    population: 3266126
                },
                {
                    name: "Barcelona",
                    population: 1636762
                },
                {
                    name: "Valencia",
                    population: 794288
                },
                {
                    name: "Seville",
                    population: 688592
                }
            ]
        }
    ];

    var maximumCitiesCount = countries.reduce(function (accumulator, country) {
        return Math.max(country.cities.length, accumulator);
    }, 0);

    console.log("Maximum cities count is " + maximumCitiesCount);

    // Get countries array with maximum cities count
    var getCountriesWithMaximumCitiesCount = function () {
        return countries.filter(function (country) {
            return country.cities.length === maximumCitiesCount;
        });
    }

    console.log("Countries with maximum cities count:");

    // Printing countries with cities and their population
    getCountriesWithMaximumCitiesCount().forEach(function (country) {
        console.log(country.name);
        country.cities.forEach(function (city) {
            console.log(city.name + ", " + city.population + " citizens");
        });
    });

    // Get object where keys are countries and values are total population
    var getCountriesWithPopulation = function () {
        var countries = {};

        getCountriesWithMaximumCitiesCount().map(function (country) {
            countries[country.name] = country.cities.reduce(function (accumulator, city) {
                return accumulator + city.population;
            }, 0)
        });

        return countries;
    };

    console.log(getCountriesWithPopulation());
})();