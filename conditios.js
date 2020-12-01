var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// Use Chance here.
var my_random_string = chance.string();

let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/*rl.question("Type child/teen/adult/senior ", function (answer) {
    if (answer === 'child') {
        console.log(chance.age({type: 'child'}))
    }
    if (answer === 'teen') {
        console.log(chance.age({type: 'teen'}))
    }
    if (answer === 'adult') {
        console.log(chance.age({type: 'adult'}))
    }
    if (answer === 'senior') {
        console.log(chance.age({type: 'senior'}))
    }

});*/

/*rl.question("Type child/teen/adult/senior ", function (answer) {
    switch (answer){
        case 'child':
            console.log(chance.age({type: 'child'}))
            break;
        case 'teen':
            console.log(chance.age({type: 'teen'}))
            break;
        case 'adult':
            console.log(chance.age({type: 'adult'}))
            break;
        case 'senior':
            console.log(chance.age({type: 'senior'}))
            break;
    }
});*/

rl.question("Type child/teen/adult/senior ", function (answer) {
   (answer === 'child') ? console.log(chance.age({type: 'child'})) :
        (answer === 'teen') ? console.log(chance.age({type: 'teen'})) :
            (answer === 'adult') ? console.log(chance.age({type: 'adult'})) :
                (answer === 'senior') ? console.log(chance.age({type: 'senior'})):
                    'No....'

});

