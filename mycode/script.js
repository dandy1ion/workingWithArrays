'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP (MINIMILIST BANKING) //USER:js PIN:1111
//USER:jd PIN:2222

// Data (account objects)
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

//accounts array contains all the accounts
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////////////////
//DOM MANIPULATION
const displayMovements = function (movements) {
  //empty container first
  containerMovements.innerHTML = '';
  //insert new html
  movements.forEach(function (mov, i) {
    //terinary operator (for if deposit or withdrawal)
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //create template literal for html template
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
    </div>
    `;
    //.movements (class for this div)
    //method: insertAdjecentHTML accepts two strings:
    //first the position in which we want to attach the html
    //second the html we want to insert
    //MDN documentation for more details
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //this way ('afterbegin') latest element at top
    //'beforeend' the elements would be inverted (each new element added at at)
  });
};

//displayMovements(account1.movements);
//show the html we just created:
//console.log(containerMovements.innerHTML);

///////////////////////////////////////////////////////////////////
//REDUCE METHOD
//use element class from index.html to display where desired
//const labelBalance = document.querySelector('.balance__value');
//const calcDisplayBalance = function (movements) {
//  const balance = movements.reduce((acc, mov) => acc + mov, 0);
//  //label = txt
//  labelBalance.textContent = `${balance}€`;
//};
//calcDisplayBalance(account1.movements);

//have function accept accounts so we will have accesss to movements and balance
const calcDisplayBalance = function (acc) {
  //create new property on account labeled balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //label = txt
  labelBalance.textContent = `${acc.balance}€`;
};

//////////////////////////////////////////////////////////////////////
//THE MAGIC OF CHAINING METHODS
//const calcDisplaySummary = function (movements) {
//  //IN
//  const incomes = movements
//    .filter(mov => mov > 0)
//    .reduce((acc, mov) => acc + mov, 0);
//  labelSumIn.textContent = `${incomes}€`;
//
//  //OUT
//  const out = movements
//    .filter(mov => mov < 0)
//    .reduce((acc, mov) => acc + mov, 0);
//  labelSumOut.textContent = `${Math.abs(out)}€`;
//
//  //INTEREST
//  //bank pays out interest whenever deposit made
//  //interest = 1.2% of deposited amount
//  const interest = movements
//    .filter(mov => mov > 0)
//    .map(deposit => deposit * 0.012)
//    //only pay interest when greater than 1
//    .filter((int, i, arr) => {
//      //console.log(arr); //show array of interests
//      return int >= 1;
//    })
//    .reduce((acc, int) => acc + int, 0);
//  labelSumInterest.textContent = `${interest}€`;
//};
//calcDisplaySummary(account1.movements);

//***INTEREST displayed dynamically depending on current user***
//accept the full account to have access to movements and interest rate
const calcDisplaySummary = function (acc) {
  //IN
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  //OUT
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  //INTEREST
  //bank pays out interest whenever deposit made
  //interest = 1.2% of deposited amount
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100) //current accounts interest rate
    //only pay interest when greater than 1
    .filter((int, i, arr) => {
      //console.log(arr); //show array of interests
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//From Elements
//const labelSumIn = document.querySelector('.summary__value--in');
//const labelSumOut = document.querySelector('.summary__value--out');
//const labelSumInterest = document.querySelector('.summary__value--interest');

////////////////////////////////////////////////////////////////
//COMPUTING USERNAMES (MAP method & FOREACH)

//put username into a function
//const createUsernames = function (user) {
//  const username = user
//    .toLowerCase()
//    .split(' ')
//    .map(
//      name => name[0] //return first letter of each word
//      //map always returns new value for new array
//    )
//    .join(''); //call join on array (give us string'')
//  return username;
//};
//console.log(createUsernames('Steven Thomas Williams'));

//now modify this to recieve all the accounts
//loop over the accounts array & get the username from the owner name
const createUsernames = function (accs) {
  //use foreach method
  //don't want to create a new array but just modify the array we get as input
  accs.forEach(function (acc) {
    //create new property on account called username
    //username will contain the name we create here
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(
        name => name[0] //return first letter of each word
        //map always returns new value for new array
      )
      .join(''); //call join on array (give us string'')
  });
};
createUsernames(accounts);
//console.log(accounts); //check for new property of username

//const user = 'Steven Thomas Williams'; //username stw
//const username = user
//  .toLowerCase()
//  .split(' ')
//  .map(function (name) {
//    return name[0]; //return first letter of each word
//  })
//  .join(''); //call join on array (give us string'')
//console.log(username); //check output

//same with arrow function
//const username = user
//  .toLowerCase()
//  .split(' ')
//  .map(
//    name => name[0] //return first letter of each word
//    //map always returns new value for new array
//  )
//  .join(''); //call join on array (give us string'')
//console.log(username); //check output

//function to update the User Interface
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  //use full account to have access to movements and balance
  calcDisplayBalance(acc);
  //Display summary
  //use full account to have access to movements and interest rate
  calcDisplaySummary(acc);
};

////////////////////////////////////////////////////////////////////////
//LOGIN FUNCTIONALITY

//******EVENT HANDLERS*****

//variables
let currentAccount;
//to stop browser from auto reloading put in event as parameter (e)
//enter and click both create click event
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting with event parameter
  e.preventDefault();
  //console.log('LOGIN');

  //username input matches username value in accounts
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //console.log(currentAccount);

  //pin input matches pin value in accounts
  //use optional chaining (?)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    //first name of current account holder
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    //make sure to use .value so you don't set the entire element to empty
    inputLoginUsername.value = inputLoginPin.value = '';
    //use blur method to make pin field loose focuse (no cursor)
    inputLoginPin.blur();

    //Display movements
    //displayMovements(currentAccount.movements);
    //Display balance
    //use full account to have access to movements and balance
    //calcDisplayBalance(currentAccount);
    //Display summary
    //use full account to have access to movements and interest rate
    //calcDisplaySummary(currentAccount);

    //put above into function
    updateUI(currentAccount);
  }
});

//////////////////////////////////////////////////////////////////////////
//Implementing Transfers

//need event to prevent default behavior
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  //need to access the username equal to input username
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //console.log(amount, receiverAcc);

  //clear input fields (remember to use .value)
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && //check if amount is a positive number
    receiverAcc && //check if receiver account even exists
    currentAccount.balance >= amount &&
    //check if balance available is enough for transfer
    receiverAcc?.username !== currentAccount.username
    //check if transfer to is not the current account username
  ) {
    //console.log('Transfer valid');
    //Complete Transfer
    //add negative movement (withdrawal) to current user
    currentAccount.movements.push(-amount);
    //add positive movement (deposit) to recipient
    receiverAcc.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
});

////////////////////////////////////////////////////////////////////
//USE SOME METHOD FOR LOAN REQUEST
//bank only grants loan if there is at least one deposit...
//with at least 10% of the requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
  }
});

////////////////////////////////////////////////////////////////////
//THE FIND INDEX METHOD
//returns index of the found element (also has access to the entire array)
//has callback function that loops over array

//CLOSE ACCOUNT
//use splice with index from the find index method

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //console.log('Delete');

  //check if credentials are correct
  //user = current user & pin matches
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
      //find match in accounts to username & current account username
    );
    console.log(index);
    //Delete Account (deletes element in accounts array)
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  //clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//const currencies = new Map([
//  ['USD', 'United States dollar'],
//  ['EUR', 'Euro'],
//  ['GBP', 'Pound sterling'],
//]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
/////////////////////////////////////////////////

//SIMPLE ARRAY METHODS
//methods are simply functions that we can call on objects
//arrays are also objects (*prototypal inheritance*)

let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE METHOD
//extract part of any array without effecting the original array
console.log(arr.slice(2)); //[c, d, e]
//say which index to start at (& can also specify end before)
console.log(arr.slice(2, 4)); //[c, d]
console.log(arr.slice(-2)); //[d, e] (last 2 elements)
console.log(arr.slice(-1)); //[e] (last element)
console.log(arr.slice(1, -2)); //[b, c] (starts at index 1 & ends at index 3)

//same result (both shallow copies)
console.log(arr.slice());
console.log([...arr]); //create new array with old array spread (expanded) into it
//why use spreader operator vs. slice method
//PERSONAL PREFERNCE which to use
//only time really need to use the SLICE method is when...
//you want to chain multiple methods together

//SPLICE METHOD
//works alot like SLICE but ***changes the original array***

//console.log(arr.splice(2)); //[c, d, e]
arr.splice(-1); //usually don't look at splice but rather use to change original array
console.log(arr);
arr.splice(1, 2); //deletes b & c
//but now orginal array:
console.log(arr); //mutates original array
//look up more on MDN documentation
//first input = start, second input = deleteCount

//REVERSE METHOD ***changes the original array***
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); //mutates original array

//CONCAT METHOD
//first array is the one on which the method is called
//and the second array is the one that we pass into the method
const letters = arr.concat(arr2);
console.log(letters); //first 10 letters of the alphabet
console.log([...arr, ...arr2]); //same result with SPREAD operator
//which one to use is personal preference
console.log(arr);
console.log(arr2);
//original arrays not changed

//JOIN METHOD
console.log(letters.join('_')); //result = string with specified separator

//methods we already know : push, etc (video #40) or look on MDN


/////////////////////////////////////////////////////////////////
//THE NEW AT METHOD

const arr = [23, 11, 64];
console.log(arr[0]); //array at position 0
console.log(arr.at(0)); //at method (array at position 0)

//get last element of the array without knowing the length of the array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
//with new at method
console.log(arr.at(-1));
console.log(arr.at(-2));
//good for method chaining as well

//at method also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));


//////////////////////////////////////////////////////////////////
//LOOPING ARRAYS: FOREACH

//bank account deposits and withdrawals
console.log(movements);

//forof loop
console.log('----FOROF----');
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

//foreach loop
//foreach will call the callback function
//foreach loops over the array and in each iteration it will execute the callback
//also passes the current element of the array through the functione as an argument
console.log('----FOREACH----');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
//0: anonymous function(200)
//1: anonymous function(450)
//etc...
//callback functions tell higher order functions what to do

//NEED ACCESS TO COUNTER INDEX
//forof
//[index, current element]
console.log('----FOROF----');
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
//foreach
//passes in the current element, the index, and the entire array we are looping
//names don't matter but the order does:
//(current element, index, array)
//use one, two or all three
console.log('----FOREACH----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`);
  }
});
//can not break out of a foreach loop (will always loop over entire array)
//continue & break statements do NOT work in foreach


///////////////////////////////////////////////////////////////////
//FOREACH WITH MAPS & SETS

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//order of arguments (current element value of the current iteration,
//the current element key, the entire map)
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
//no keys in sets so key value not needed (convention = _ underscore is a throwaway value)
//no need to use second input as it is set to the value also
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`);
});
*/

////////////////////////////////////////////////////////////////////////
//PROJECT: "BANKIST"
//starts at line 65

////////////////////////////////////////////////////////////////////
//CODING CHALLENGE #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK!!!
*/

/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  //console.log(dogsJuliaCorrected);
  //same result:
  //dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    //("Dog number 1 is an adult, and is 5 years old") or
    //("Dog number 2 is still a puppy 🐶")
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


////////////////////////////////////////////////////////////////
//DATA TRANSFORMATIONS: MAP, FILTER, REDUCE
//methods we use to create new arrays based on transforming data from other arrays
//MAP:
//another method we can use to loop over arrays
//similar to FOREACH method with difference of
//MAP creates(maps) a brand new array based on the original array
//FILTER:
//used to filter for elements in the original array that satisfy a certain criteria
//elements for the condition is true = included in new array
//REDUCE:
//use to "boil down"(reduce) all the original array values/elements into one single value
//no new array just the reduced value

///////////////////////////////////////////////////////////////
//THE MAP METHOD

console.log(movements);

//convert from Euro to USD
const euroToUsd = 1.1;

//callback function takes argument of current array element
const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
  //return 23; just replaces original elements with 23
});

//replace callback with an arrow function
//const movementsUSD = movements.map(mov => mov * euroToUsd);

console.log(movements); //original array not manipulated
console.log(movementsUSD);

//use forof loop to do same thing
const movementsUSDfor = []; //empty new array
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

//access to 3 parameters: current array element, current index, & the whole array
//can have multiple returns as long as only one can be executed
//const movementsDescriptions = movements.map((mov, i, arr) => {
//  if (mov > 0) {
//    return `Movement ${i + 1} You deposited ${mov}`;
//  } else {
//    return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
//  }
//});
//use terinary operator with map
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);


/////////////////////////////////////////////////////////////////
//THE FILTER METHOD
//filter for elements that satisfy a certain condition
console.log(movements);

//working with current element (also able to have index and whole array)
//function(mov, i, arr)
//create an array of the deposits
//filter out negative values
const deposits = movements.filter(function (mov) {
  return mov > 0;
  //only array element for which this condition is met will be in the array
});
//***chaining possible***
console.log(movements);
console.log(deposits);

//same with forof loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

//create array of withdrawals
//use arrow function
//returns negative numbers
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


/////////////////////////////////////////////////////////////////
//THE REDUCE METHOD ('boil down' values in array to one single value)
console.log(movements);

//accumulator -> SNOWBALL
//function(accumulator, current element, index, whole array)
//const balance = movements.reduce(function (acc, cur, i, arr) {
//  //log each iteration:accumulator
//  console.log(`Iteration ${i}: ${acc}`);
//  return acc + cur;
//}, 0); //initial value of the accumulator
//console.log(balance); //3840
//same with arrow function, simplified/shorthand
const balance = movements.reduce((acc, cur) => acc + cur, 0); //initial value of the accumulator
console.log(balance); //3840
//***able to do chaining***

//same with forof loop
let balance2 = 0; //need external variable with forof loop
for (const mov of movements) balance2 += mov;
console.log(balance2); //3840

//example:
//Maximum value from movements array
const max = movements.reduce((acc, mov) => {
  //if accumulator is greater than the current value (movement) return accumulator
  if (acc > mov) return acc; //keep accumulator value
  else return mov; //if current value is more then keep it
}, movements[0]); //accumulator starts at first position in array
console.log(max);
*/

////////////////////////////////////////////////////////////////
//CODING CHALLENGE #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK!!!
*/

/*
//use map, filter, and reduce methods

const calcAverageHumanAge = function (ages) {
  //calculate dog age to human years
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  //only include dogs age 18 and older
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);
  //average human age of all the adult dogs
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  //good use case for the whole array
  //const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  //calc average of 2 & 3
  //(2+3)/2 = 2.5
  //or
  //2/2 + 3/2= 2.5

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


//////////////////////////////////////////////////////////////////////
//THE MAGIC OF CHAINING METHODS
//use wisely(condense it to as few methods as possible)
//bad practice to chain methods that change the underlying original array
//(ex: splice or reverse)

//take all the movement deposits then convert them from euros to dollars
//and finally add them all up (how much deposited to account in US dollars)
const euroToUsd = 1.1;
//like a PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0) //chain to array
  .map(mov => mov * euroToUsd) //chain to array
  .reduce((acc, mov) => acc + mov, 0); //returns value
console.log(totalDepositsUSD);
//if you make a mistake in your parameters..
//it is good to see the arrays you are getting to know how to finish
//const euroToUsd = 1.1;
//How to check for errors in arrays
//const totalDepositsUSD = movements
//  .filter(mov => mov < 0) //mistake will give you negative number
//  .map((mov, i, arr) => {
//    console.log(arr); //use array parameter to check
//    return mov * euroToUsd;
//  })
//  .reduce((acc, mov) => acc + mov, 0); //returns value
//console.log(totalDepositsUSD);
*/

////////////////////////////////////////////////////////////////////////
//CODING CHALLENGE #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK!!!


const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


////////////////////////////////////////////////////////////////////////
//THE FIND METHOD
//use to retrieve one element of an array based on a condition
console.log(movements);
//accepts a condition and a callbackfunction(called as the method loops)
//does NOT return a new array
//ONLY returns the first element in the array that satisfies the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

//find an object in the array based on some property of that object
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

//////////////////////////////////////////////////////////////////////////
//SOME & EVERY METHODS

console.log(movements);
//includes returns true/false for EQUALITY to parameter for any value in the array
console.log(movements.includes(-130)); //true

//some method tests for a CONDITION
console.log(movements.some(mov => mov === -130)); //true
//test for any positive movements
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); //true
//test for any deposit above 5000
//const anyDeposits = movements.some(mov => mov > 5000);
//console.log(anyDeposits); //false
