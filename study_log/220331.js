// 예제 12-33 : 값에 의한 전달, 참조에 의한 전달
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'kim'
}

var num = 100;
var person = { name: 'Lee' }

console.log(num)
console.log(person)

changeVal(num, person)
console.log(num)
console.log(person)

console.clear()


// 예제 12-45 : 재귀 함수
function factorial(n) {
  if(n <= 1) return 1;
  return n * factorial(n-1)
}

console.log(factorial(4))

console.clear()

/*
factorial(4) -> 4 * factorial(3)
factorial(3) -> 3 * factorial(2)
factorial(2) -> 2 * factorial(1)
factorial(1) -> 1
*/


// 예제 12-51 : 콜백 함수
function repeat(n, f) {
  for(var i = 0; i < n; i++) {
    f(i)
  }
}

var logAll = function(i) {
  console.log(i)
}

var logOdds = function(i) {
  if(i % 2 === 1) console.log(i)
}

repeat(5, logAll)
repeat(5, logOdds)

console.clear()


// 예제 12-55 : 콜백 함수 2
var Arr = [1, 2, 3]
var example_01 = Arr.map(function (item) {
  return item * 3
})
console.log(example_01)

var example_02 = Arr.filter(function (item) {
  return item !== 2
})
console.log(example_02)

var example_03 = Arr.reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(example_03)

console.clear()


// 예제 12-56 : 순수 함수와 비순수 함수
var count = 0;

function increase(n) {
  return ++n
}

count = increase(count)
console.log(count)

count = increase(count)
console.log(count)

console.clear()


// 예제 13-08 : var 변수와 함수 스코프
var i = 10

for(var i = 0; i < 5; i++){
  console.log(i)
}

console.log(i)

console.clear()


//? 예제 13-09 : 렉시컬 스코프 
// 예제 1
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
} //* bar()가 최초로 정의된 스코프는 전역

foo();
bar(); //* 1


// 예제 2
var x = 1;

function foo() {
  var x = 10;
  bar();

  function bar() {
    console.log(x);
  } //* bar()가 최초로 정의된 스코프는 지역
}


foo();
bar(); //* 10

console.clear()


//? 지역 변수와 전역 변수
// 예제 14-01
function foo() {
  var k = 'local';
  console.log(k);
  return k;
}

foo();
// console.log(k);

console.clear()

// 예제 14-02
var p = 'global'

function foo() {
  console.log(p);
  var p = 'local'
}

foo()
console.log(p)
