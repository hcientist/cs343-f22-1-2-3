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

let current;
const setCurrent = (v) => {
  console.log(`changing current from\n${current}\nto\n${v}`);
  current = v;
};

console.log(0, current);
first(setCurrent);
console.log(1, current);
second(current, setCurrent);
console.log(2, current);
third(current, setCurrent);
console.log(3, current);

// instead of the 3 invocations above, how can we ensure that the functions are invoked in order?
// (comment out or replace the 3 invocations above with your solution

