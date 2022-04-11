//? 예제 19-05 : __proto__ 접근자 프로퍼티
const exObj_01 = { "name":"Lee" }
console.log(exObj_01)
console.log(exObj_01.prototype)
console.log(exObj_01.__proto__)

console.log(Object)
console.log(Object.prototype)
console.log(Object.__proto__)
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'))
console.clear()



//? 예제 19-06 
const exObj_02 = {};
const parent = { "x":1 };
console.log(parent)
console.log(parent.x)

exObj_02.__proto__;
console.log(exObj_02.__proto__)
exObj_02.__proto__ = parent;
console.log(exObj_02.__proto__)
console.log(exObj_02)
console.log(exObj_02.x)
console.clear()



//? 예제 19-07 : 상속을 통한 __proto__ 접근자 프로퍼티 사용
const person_01 = { "name":"Lee" }
console.log(person_01.hasOwnProperty('__proto__')); // false
//* person_01 객체는 __proto__ 프로퍼티를 소유하지 않는다.

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'))
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}
//* __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.

console.log({}.__proto__)
console.log(Object.prototype)
console.log({}.__proto__ === Object.prototype) // true
//* 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.clear()



//? 예제 19-08 : __proto__ 접근자 프로퍼티를 사용하여 프로토타입에 접근하는 이유
const exObj_03 = { "x":5 };
const exObj_04 = { "y":10 };
console.log(exObj_03)
console.log(exObj_03.__proto__)
exObj_03.__proto__ = exObj_04
console.log(exObj_03.__proto__)

console.log(exObj_04)
console.log(exObj_04.__proto__)
// exObj_04.__proto__ = exObj_03 //* Uncaught TypeError: Cyclic __proto__ value
console.clear() 



//? 예제 19-09 ~ 19-10 : __proto__ 와 get/setPrototypeOf
const exObj_05 = Object.create(null);
console.log(exObj_05)
console.log(exObj_05.__proto__) //* undefined
// exObj_05는 프로토타입 체인의 종점. 따라서 Object.__proto__를 상속받을 수 없다.

const exObj_06 = {};
const parent_02 = { "z":20 };
Object.getPrototypeOf(exObj_06) // exObj_06 객체의 프로토타입을 취득
console.log(Object.getPrototypeOf(exObj_06))
Object.setPrototypeOf(exObj_06, parent_02) // exObj_06 객체의 프로토타입을 교체
console.log(Object.setPrototypeOf(exObj_06, parent_02))
console.log(exObj_06)
console.log(exObj_06.z)
console.clear();



//? 예제 19-11 : 함수 객체의 prototype 프로퍼티
console.log((function() {}).hasOwnProperty('prototype')) // true
//* 함수 객체는 prototype 프로퍼티를 소유
//* 이 prototype은 생성자 함수가 생성할 인스턴스(객체)의 프로토타입을 가리킨다.

console.log(({}).hasOwnProperty('prototype')) // false
//* 일반 객체는 prototype 프로퍼티를 소유하지 않는다.



//? 예제 19-13 ~ 19-14
// 19-13 : 프로토타입과 생성자 함수
const exFn_01 = function(name) {
  this.name = name;
}

const me = new exFn_01('Lee')

console.log(exFn_01.prototype)
console.log(me.__proto__)
console.log(exFn_01.prototype === me.__proto__)
console.clear();


// 19-14 : 생성자 함수와 constructor 프로퍼티
const exFn_02 = function(number) {
  this.number = number
}

const number_01 = new exFn_02(300);
console.log(number_01)
console.log(number_01.constructor);
console.log(exFn_02);
console.log(number_01.constructor === exFn_02); // true
console.clear();



//? 예제 19-15 : 생성자 함수의 constructor
const exObj_07 = function(x, y){
  return x + y
}

const exObj_07_copy_01 = new exObj_07();
console.log(exObj_07_copy_01) // exObj_07 {}
console.log(exObj_07_copy_01.constructor) // ƒ (x, y){ return x + y }
console.log(exObj_07) // ƒ (x, y){ return x + y }
console.log(exObj_07_copy_01.constructor === exObj_07) // true

const exObj_08 = { "phone":"galaxy", "company":"samsung" };
// const exObj_08_copy_01 = new exObj_08 //* Uncaught TypeError: exObj_08 is not a constructor
// console.log(exObj_08_copy_01) 
console.clear();



//? 예제 19-18
// Object 생성자 함수에 의한 객체 생성
//* 인수가 전달되지 않았을 때 : 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성
let exObj_09 = new Object();
console.log(exObj_09); //* {}

//* 인수가 전달되었을 때 : 인수를 객체로 변환
exObj_09 = new Object(123)
console.log(exObj_09) //* Number {123}

exObj_09 = new Object('123')
console.log(exObj_09) //* String {'123'}
console.clear();



//? 19-19 : 리터럴 표기법에 의해 생성된 객체와 프로토타입
const exFn_03 = function(x, y) { return x * y }
console.log(exFn_03)
console.log(exFn_03.constructor) // ƒ Function() { [native code] }
console.log(Function) // ƒ Function() { [native code] }
console.log(exFn_03.constructor === Function) // true
console.clear();



//? 19-20 ~ 19-21 : 프로토타입의 생성 시점 (사용자 정의 함수)
// 19-20
console.log(exFn_04.prototype) //* {constructor: ƒ}
//* constructor(프로토타입)는 함수 객체가 생성되는 시점에 동시에 생성된다.

function exFn_04(computer) {
  this.computer = computer
}
//* 위 함수 선언문이 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행
//* 위 선언문은 어떤 코드보다 먼저 평가되어 함수 객체가 됨


// 19-21
const exFn_05 = drink => {
  this.drink = drink;
};
//* 화살표 함수는 non-constructor

console.log(exFn_05.prototype) //* undefined
//* non-constructor는 프로토타입이 생성되지 않는다.






