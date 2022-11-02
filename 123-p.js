function first(cb) {
  setTimeout(() => {
    console.log("preparing to exit first");
    cb(`first done @ ${new Date()}`);
  }, Math.floor(5000 + Math.random() * 5000));
}

function second(v, cb) {
  setTimeout(() => {
    console.log("preparing to exit second");
    cb(`${v}, second done @ ${new Date()}`);
  }, Math.floor(3000 + Math.random() * 2000));
}

const third = (v, cb) => {
  setTimeout(() => {
    console.log("preparing to exit third");
    cb(`${v}, third done @ ${new Date()}`);
  }, Math.floor(1000 + Math.random() * 1000));
};

// just look at this dark magic:
// like any function that accepts a callback function as an arg,
// this is a higher order function. 
// wrapItUpB:
// 1. takes a function as an arg named fn
//    * fn should be a function that will call a callback function with fn's result
// 2. returns a function (let's call this returned function functionResult ) that:
//    1. can be called with a variable number of args
//    2. will invoke fn with args when functionResult is called
//    3. will return a promise that will resolve with fn's result
const wrapItUpB = (fn) => (...args) => {
  const p = new Promise((resolve) => {
    // console.log('...args', args);
    args.length === 0 ? 
      fn(resolve) :
      fn(...args, resolve);
  });
  return p;
};

let current;
const setCurrent = (v) => {
  console.log(`changing current from\n${current}\nto\n${v}`);
  current = v;
  return current
};


// like the non-wrapped versions, but return promise instead of invoking callback
const wrappedFirst = wrapItUpB(first);
// like the non-wrapped versions, but return promise instead of invoking callback
const wrappedSecond = wrapItUpB(second);
// like the non-wrapped versions, but return promise instead of invoking callback
const wrappedThird = wrapItUpB(third);

console.log(0, current);
wrappedFirst()
  .then(setCurrent)
  .then(wrappedSecond)
  .then(setCurrent)
  .then(wrappedThird)
  .then(setCurrent)
  .catch((err) => console.log(err));




// instead of the 3 invocations above, how can we ensure that the functions are invoked in order?
// (comment out or replace the 3 invocations above with your solution using promises)
