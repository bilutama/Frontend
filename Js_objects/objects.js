(function () {
    "use strict";

    var countries = [
        {
            countryName: "Germany",
            cities: [
                {
                    cityName: "Berlin",
                    population: 3275000
                },
                {
                    cityName: "Hamburg",
                    population: 1686100
                },
                {
                    cityName: "Munich",
                    population: 1185400
                },
                {
                    cityName: "Cologne",
                    population: 965300
                },
                {
                    cityName: "Frankfurt",
                    population: 648000
                }]
        },
        {
            countryName: "France",
            cities: [
                {
                    cityName: "Paris",
                    population: 2187526
                },
                {
                    cityName: "Marseille",
                    population: 863310
                },
                {
                    cityName: "Lyon",
                    population: 516092
                },
                {
                    cityName: "Toulouse",
                    population: 479553
                }]
        },
        {
            countryName: "UK",
            cities: [
                {
                    cityName: "London",
                    population: 9304016
                },
                {
                    cityName: "Manchester",
                    population: 2730076
                },
                {
                    cityName: "Birmingham",
                    population: 2607437
                },
                {
                    cityName: "Leeds",
                    population: 1889095
                }]
        },
        {
            countryName: "Italy",
            cities: [
                {
                    cityName: "Rome",
                    population: 2318895
                },
                {
                    cityName: "Milan",
                    population: 1236837
                },
                {
                    cityName: "Naples",
                    population: 959470
                },
                {
                    cityName: "Turin",
                    population: 870456
                },
                {
                    cityName: "Palermo",
                    population: 648260
                }]
        },
        {
            countryName: "Spain",
            cities: [
                {
                    cityName: "Madrid",
                    population: 3266126
                },
                {
                    cityName: "Barcelona",
                    population: 1636762
                },
                {
                    cityName: "Valencia",
                    population: 794288
                },
                {
                    cityName: "Seville",
                    population: 688592
                }]
        }
    ];

    var maximumCitiesCount = 0;
    countries.forEach(function (country) {
        maximumCitiesCount = country.cities.length > maximumCitiesCount ? country.cities.length : maximumCitiesCount;
    });

    console.log("Maximum cities count is " + maximumCitiesCount);

    // Adding countries with maximum cities count
    var countriesWithMaximumCitiesCount = [];
    countries.forEach(function (country) {
        if (country.cities.length === maximumCitiesCount) {
            countriesWithMaximumCitiesCount.push(country);
        }
    });

    console.log("Countries with maximum cities count:");

    // Printing countries with cities and their population
    countriesWithMaximumCitiesCount.forEach(function (country) {
        console.log(country.countryName);
        country.cities.forEach(function (city) {
            console.log(city.cityName + ", " + city.population + " citizens");
        });
    });

    var countriesWithPopulation = [];

    countriesWithMaximumCitiesCount.forEach(function (country) {
        countriesWithPopulation.push({
            countryName: country.countryName,
            countryPopulation: country.cities
                .map(function (city) {
                    return city.population
                })
                .reduce(function (accumulator, population) {
                    return accumulator + population;
                })
        });
    });

    countriesWithPopulation.forEach(function (country) {
        console.log(country.countryName + ", total population " + country.countryPopulation);
    });
})();