import Chance from 'chance';
import {isSuperSet, intersection, union, difference} from "../../../utils/helper";

describe('Regress user', () => {

    before(() => {
        //cy.visit('https://example.cypress.io/commands/aliasing')
    })

    let testingData = [
        {
            description : "Max values",
            requestData : {
                name : Chance().string({length : 100}),
                job : Chance().string({length : 100})
            }
        },
        {
            description : "Min values",
            requestData : {
                name : Chance().string({length : 1}),
                job : Chance().string({length : 1})
            }
        }
    ]

    testingData.forEach(({ description, requestData }) => {
        it(`Positive: Create user ${description}`, () => {

                cy.request('POST', '/api/users', requestData).then(response => {
                    expect(response.status).to.eq(201)
                    expect(response.body).to.have.property("name", requestData.name)
                    expect(response.body).to.have.property("job", requestData.job)
                })
        })
    })

      it('Positive: Create user', () => {
        cy.fixture('user').then(user => {
            cy.request('POST', '/api/users', user).then(response => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property("name", user.name)
                expect(response.body).to.have.property("job", user.job)
            })
        })

    })

    it('Negative: Create user', () => {
            cy.request({method : 'POST', url : '/api/login', failOnStatusCode : false, body:
            {
            "email" : "KsenyaSwir@mail"
            }
        }).then(response => {
                expect(response.status).to.eq(400)
            })
    })

    it('Collections', () => {

        let mySet = new Set(['USD', 'RUR', 'BUN']);

        mySet.forEach(currency=> {
            cy.log('Values in Set : ' + currency);
        })

        let val_1 = 'USD';
        let val_2 = 'RUB';

        mySet.add(val_1);
        mySet.add(val_2);

        mySet.forEach(currency=> {
            cy.log('Values after addicting : ' + currency);
        })

        cy.log('Set have USD value : ' + mySet.has('USD'));

        mySet.delete('USD')
        cy.log('Set have USD value : ' + mySet.has('USD'));

        let arraySet = [...mySet];
        cy.log('Massive we have : ' + arraySet);

        cy.log('Random value : ' + chance.pickone(arraySet));
        cy.log('Two random value : ' + chance.pickset(arraySet, 2));
        let maxValue = mySet.size;
        let randValue = chance.integer({ min: 1, max: maxValue});
        cy.log('Two random value from interval : ' + chance.pickset(arraySet, randValue));

    })

    it('Collections_custom', () => {

        let setA = new Set([1, 2, 3, 4]),
            setB = new Set([2]),
            setC = new Set([3, 4, 5, 6]);

        cy.log('isSuperSet: ' + isSuperSet(setA, setB)); // JSON.stringify([...map]
        cy.log('intersection: ' + [...intersection(setA, setB)])
        cy.log('union: ' + [...union(setA, setB)])
        cy.log('differance: ' + [...difference(setA, setB)])
    })



    it('Arrays', () => {

        let planets = [
            {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
            {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
            {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
            {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
            {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
            {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
            {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
            {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07},

        ]

        //printPlanets(planets);

        planets.map(function (planet) {
            planet.solarSystem = "test";
        });

        planets.push({planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false});
        //printPlanets(planets);

        let total = Object.values(planets).reduce((t, {radius}) => t + radius, 0)
        //cy.log(total);

        //printPlanets(getPlanetsWithDistance(planets, 5));

        function getPlanetsWithDistance (planets, distance) {
            return planets.filter(planet => planet.distance > distance);
        }

        let indexDelPlanet = planets.map(planet => planet.planet).indexOf('SomeNewPlanet');

        planets.splice(indexDelPlanet, 1);
       // printPlanets(planets);

        function printPlanets(planets){
            planets.forEach((planet)=>
                {
                    cy.log(JSON.stringify(planet));
                }
            )
        }


        planets.sort(function(a, b) {
            return a.radius - b.radius;
        });
        printPlanets(planets);

        cy.log(planets.length);


    })


    it('Map&Object', () => {

        let planets = [
            {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
            {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
            {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
            {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
            {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
            {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
            {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
            {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07},
        ]

        let map = getPlanetsMap(planets);
/*        var keys = Object.keys(map);
        keys.forEach(key=>{
            cy.log(key + '|' + map[key]);
        });*/

        cy.log("Result is: " + JSON.stringify([...map]));

        function getPlanetsMap(planets) {
            var result = new Map();
            planets.forEach(planet => {
                let key = planet.planet;
                let clonedPlanet = Object.assign(planet);
                delete clonedPlanet.planet;
                result.set(key, clonedPlanet);
            })
            return result;
        }

        planets.forEach((value, key) => {
            cy.log('--------' + key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
        })
        cy.log('Value by key Saturn ' + JSON.stringify(map.get("Saturn")));
        cy.log(map.size);

        let set = new Set(['Mercury', 'Not Mercury']);
        set.forEach((value, valueAgain, set) => {
           cy.log(value);
           cy.log(map.has(value));
        });

        map.delete("Uranus")
        cy.log(map.size); // was deleted


        let planets_new_map = new Map ([
            ["Mercury", {weight: 2440}],
            ["Saturn", {weight: 2400}]
        ]);
       // planets_new_map.merge(map);
        let merged = new Map([...map, ...planets_new_map]); //([...map, ...planets_new_map]);
        cy.log("Result is: " + JSON.stringify([...merged]));

        const obj = Object.fromEntries(map);
        for (let objKey in obj) {
            cy.log(objKey + ": " + JSON.stringify(obj[objKey]));
        }

    })

    it('age', () => {
        cy.log(chance.age({ type: 'child' }))
    })

})