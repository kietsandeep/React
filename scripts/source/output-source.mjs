// [category, level(E|M|H), company, views, code, explanation]
// Expected output is NOT written by hand — scripts/build-output-json.mjs runs each snippet and records the real output.
export const ROWS = [
["Coercion","M","Salesforce",7023,`const a = 1<2<3;
const b = 1>2>3;

console.log(a,b) //true,false`,"Comparison operators are left-associative. `1<2` is `true`, then `true<3` becomes `1<3` → `true`. For `b`, `1>2` is `false`, then `false>3` is `0>3` → `false`."],
["Coercion","M","Cognizant",5534,`const p = { k: 1, l: 2 };
const q = { k: 1, l: 2 };
let isEqual = p==q;
let isStartEqual = p===q;

console.log(isEqual, isStartEqual)`,"Objects are compared by reference, not by contents. `p` and `q` are two different objects, so both `==` and `===` are `false`."],
["Coercion","M","TCS",4045,`console.log(2+2)
console.log("2"+"2")
console.log(2+2-2)
console.log("2"+"2"-"2")
console.log(4+"2"+2+4+"25"+2+2)`,"`+` concatenates as soon as one side is a string, while `-` always converts to numbers. `\"2\"+\"2\"-\"2\"` is `\"22\"-\"2\"` = 20. The last line: `4+\"2\"` = \"42\", and everything after that is appended as text."],
["JavaScript","E","Capgemini",2556,`let a = 'jscafe'
a[0] = 'c'

console.log(a)`,"Strings are immutable. Assigning to an index silently does nothing in sloppy mode (it would throw in strict mode), so `a` is unchanged."],
["this & Binding","H","Accenture",9568,`var x=10;
function foo(){
  var x = 5;
  console.log(x)
}

foo();
console.log(x)`,"Inside `foo` the local `x` (5) shadows the global one. Outside, the global `x` is still 10."],
["Async & Event Loop","H","Wipro",8079,`console.log("Start");
setTimeout(() => {
  console.log("Timeout");
});
Promise.resolve().then(() =>
  console.log("Promise"));
console.log("End");`,"Synchronous code runs first (Start, End). Then the microtask queue (promise callbacks) is drained, and only after that the timer callback (macrotask) runs."],
["Async & Event Loop","H","Atlassian",6590,`function x(){

  for(var i=1;i<=5;i++){
    setTimeout(()=>{
      console.log(i)
    }, i*1000)
  }
  console.log("Namaste JavaScript")
}
x();`,"`var` is function-scoped, so all five callbacks share one `i`. By the time the timers fire the loop has finished and `i` is 6. Using `let` would print 1..5."],
["JavaScript","E","Accenture",5101,`function x(){
  let a = 10;
  function d(){
    console.log(a);
  }
  a = 500;
  return d;
}

var z = x();
z();`,"`d` closes over the variable `a`, not its value at the time `d` was created. By the time `z()` runs, `a` has been updated to 500."],
["Hoisting","E","Wipro",3612,`getData1()
getData();

function getData1(){
  console.log("getData11")
}`,"Function declarations are hoisted, so `getData1()` works. `getData` is never declared, so the second call throws a ReferenceError."],
["JavaScript","E","Capgemini",2123,`function func() {
  try {
    console.log(1)
    return
  } catch (e) {
    console.log(2)
  } finally {
    console.log(3)
  }
}

func()`,"`finally` always runs, even after a `return` in the `try` block. No error is thrown, so `catch` is skipped."],
["Coercion","M","Infosys",9135,`const nums = [1,2,3,4,5,6,7];
nums.forEach((n) => {
  if(n%2 === 0) {
    break;
  }
  console.log(n);
});`,"`break` is only valid directly inside a loop or switch. Inside the `forEach` callback it is a function body, so the whole script fails to parse with a SyntaxError and nothing runs."],
["Async & Event Loop","H","Accenture",7646,`let a = true;
let n = 0;
setTimeout(() => {
  a = false;
}, 2000)

while(a) {
  console.log("inside");
  if (++n === 3) break;
}
console.log("done");`,"The timer callback can only run when the call stack is empty, so while the `while` loop is running `a` can never become false. (In the original question the loop never ends and freezes the page — here we break out after 3 rounds.)"],
["Async & Event Loop","H","Wipro",6157,`setTimeout(() => console.log(1), 0);

console.log(2);

new Promise(res => {
  console.log(3)
  res();
}).then(() => console.log(4));

console.log(5);`,"The Promise executor runs synchronously (3). Order: sync code 2, 3, 5 → microtask 4 → timer 1."],
["Async & Event Loop","H","Atlassian",4668,`async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log("C");
}

foo();
console.log("D");`,"`foo` runs synchronously until the first `await` (prints A), then yields. D prints, then the microtask continues `foo` (B). The second `await` waits on a timer, so C comes last."],
["this & Binding","H","Salesforce",3179,`let output = (function(x){
    delete x;
    return x;
})(3);
console.log(output);`,"`delete` only removes object properties. It has no effect on a variable or parameter, so `x` is still 3."],
["Async & Event Loop","H","Cognizant",1690,`for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 + i);
}`,"All callbacks share the same `var i`, which is 3 once the loop ends, so 3 is printed three times."],
["Async & Event Loop","H","TCS",8702,`let c=0;

let id = setInterval(() => {
  console.log(c++)
},100)

setTimeout(() => {
  clearInterval(id);
  console.log("stopped");
}, 550)`,"The interval fires every 100ms (at about 100, 200, 300, 400 and 500ms) printing 0 to 4, then the 550ms timer clears it and prints `stopped`."],
["JavaScript","E","TCS",7213,`let output = (function(x){
 delete x;
 return x;
})(3);
console.log(output);`,"`delete` cannot remove a parameter, so `x` stays 3."],
["this & Binding","H","Accenture",5724,`function getName1(){
  console.log(this.name);
}

Object.prototype.getName2 = () =>{
  console.log(this.name)
}

let personObj = {
  name:"Tony",
  print: getName1
}

personObj.print()
personObj.getName2()`,"`print` is a normal function, so `this` is `personObj` → Tony. `getName2` is an arrow function: it ignores the calling object and uses `this` from where it was defined (the global object), where `name` is an empty string in a browser."],
["Hoisting","E","Accenture",4235,`function test() {
  console.log(a);
  console.log(foo());

  var a = 1;
  function foo() {
    return 2;
  }
}

test();`,"`var a` is hoisted but its value is not, so `a` is `undefined`. The function declaration `foo` is fully hoisted, so `foo()` returns 2."],
["Async & Event Loop","H","Atlassian",2746,`function job(){
  return new Promise((resolve,reject)=>{
    reject()
  })
}
let promise = job();
promise.then(() => {
  console.log("Success 1")
}).then(() => {
  console.log("Success 2")
}).catch(() => {
  console.log("Error 1")
}).then(() => {
  console.log("Success 3")
})`,"The promise is rejected, so both `.then` handlers are skipped and `.catch` runs. `catch` returns a resolved promise, so the last `.then` runs too."],
["JavaScript","E","Capgemini",9758,`var a = 1;
function data() {
  if(!a) {
    var a = 10;
  }
  console.log(a);
}
data();`,"`var a` inside `data` is hoisted to the top of the function and shadows the global. It starts as `undefined`, so `!a` is true and `a` becomes 10."],
["Coercion","M","Cognizant",8269,`function guessArray() {
  let a = [1, 2];
  let b = [1, 2];
  console.log(a == b);
  console.log(a === b);
}

guessArray();`,"Arrays are objects, compared by reference. Two separate array literals are never equal with `==` or `===`."],
["Coercion","M","TCS",6780,`let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);`,"`==` converts the Number object to a primitive, so 3 == 3 is true. `===` also compares types (number vs object), so it is false in both remaining lines."],
["Hoisting","E","Cognizant",5291,`var x = 23;

(function(){
  var x = 43;
  (function random(){
    x++;
    console.log(x);
    var x = 21;
  })();
})();`,"Inside `random`, `var x` is hoisted and shadows the outer ones. When `x++` runs, `x` is `undefined`, and `undefined + 1` is `NaN`."],
["Coercion","M","Accenture",3802,`console.log(typeof [1,2,3,4]);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof 1234n);
console.log(typeof 3.14);
console.log(typeof Symbol());`,"Arrays and `null` are both reported as `object`. `NaN` is a number, `1234n` is a bigint and `Symbol()` is a symbol."],
["Async & Event Loop","H","Wipro",2313,`async function load() {
  const data = await Promise.resolve({ ok: true });
  console.log("Result: " + data);
}

load();`,"`await` gives back the resolved object, not text. Adding an object to a string (or assigning it to `innerHTML`) converts it with `String()`, producing `[object Object]`. (The original question used `fetch`, which returns a Response object and has the same problem.)"],
["Coercion","M","Atlassian",9325,`console.log(typeof typeof 1)`,"`typeof 1` is the string `\"number\"`, and `typeof` of any string is `\"string\"`."],
["Hoisting","E","Infosys",7836,`x++;
console.log(x);
var x = 21;`,"`var x` is hoisted with the value `undefined`. `x++` turns it into `NaN`, and the later assignment of 21 comes too late."],
["Coercion","M","Cognizant",6347,`const x = [1];
const y = [2];
console.log(x+y);`,"`+` converts both arrays to strings (`\"1\"` and `\"2\"`) and concatenates them."],
["this & Binding","H","TCS",4858,`const data = {
  name: "sai",
  name: "krishna"
}
console.log(data.name);`,"Duplicate keys in an object literal are allowed; the last value wins."],
["JavaScript","E","Accenture",3369,`let x = 10+2*3
console.log(x);`,"Multiplication has higher precedence: `2*3` is 6, then `10+6` is 16."],
["JavaScript","E","Wipro",1880,`const x = [1,2,3];
const y = [1,3,4];
console.log(x+y);`,"Arrays become strings (`\"1,2,3\"` and `\"1,3,4\"`) and are concatenated with no separator."],
["this & Binding","H","Wipro",8892,`console.log(+true);
console.log(!"sai");`,"The unary `+` turns `true` into 1. A non-empty string is truthy, so `!\"sai\"` is `false`."],
["Coercion","M","Atlassian",7403,`console.log([]+[]);
console.log([1]+[]);
console.log([1]+"abc");`,"Arrays are converted to strings: `[]` is `\"\"` and `[1]` is `\"1\"`. So the results are an empty string, `\"1\"` and `\"1abc\"`."],
];
