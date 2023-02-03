'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
