(function () {
    "use strict";

    var countries = [
        {
            countryName: "Germany",
            cities: [
                {
                    city: "Berlin",
                    population: 3275000
                },
                {
                    city: "Hamburg",
                    population: 1686100
                },
                {
                    city: "Munich",
                    population: 1185400
                },
                {
                    city: "Cologne",
                    population: 965300
                },
                {
                    city: "Frankfurt",
                    population: 648000
                }]
        },
        {
            countryName: "France",
            cities: [
                {
                    city: "Paris",
                    population: 2187526
                },
                {
                    city: "Marseille",
                    population: 863310
                },
                {
                    city: "Lyon",
                    population: 516092
                },
                {
                    city: "Toulouse",
                    population: 479553
                }]
        },
        {
            countryName: "UK",
            cities: [
                {
                    city: "London",
                    population: 9304016
                },
                {
                    city: "Manchester",
                    population: 2730076
                },
                {
                    city: "Birmingham",
                    population: 2607437
                },
                {
                    city: "Leeds",
                    population: 1889095
                }]
        },
        {
            countryName: "Italy",
            cities: [
                {
                    city: "Rome",
                    population: 2318895
                },
                {
                    city: "Milan",
                    population: 1236837
                },
                {
                    city: "Naples",
                    population: 959470
                },
                {
                    city: "Turin",
                    population: 870456
                }]
        },
        {
            countryName: "Spain",
            cities: [
                {
                    city: "Madrid",
                    population: 3266126
                },
                {
                    city: "Barcelona",
                    population: 1636762
                },
                {
                    city: "Valencia",
                    population: 794288
                },
                {
                    city: "Seville",
                    population: 688592
                }]
        }
    ];

    var maximumCitiesCount = 0;
    countries.forEach(function (country) {
        maximumCitiesCount = country.cities.length > maximumCitiesCount ? country.cities.length : maximumCitiesCount;
    });

    console.log("Maximum cities count is " + maximumCitiesCount);

    var countriesWithMaximumCitiesCount = [];
    countries.forEach(function (country){
        if (country.cities.length === maximumCitiesCount) {
            countriesWithMaximumCitiesCount.push(country);
        }
    });

    countriesWithMaximumCitiesCount.forEach(function (country){
        console.log(country.countryName + ", cities: " + country.cities.join(", "))
    });


    console.log(countriesWithMaximumCitiesCount.join(", "))
})()