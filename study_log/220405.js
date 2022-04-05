// 16-10 : 객체 확장 금지
const ex_01 = { 'name':'Lee' }
console.log(Object.isExtensible(ex_01))

Object.preventExtensions(ex_01);
console.log(Object.isExtensible(ex_01))

ex_01.age = "28"
console.log(ex_01)
delete ex_01.name;
console.log(ex_01)

//* Object.defineProperty(ex_01, 'age', {value: 20});
//* Uncaught TypeError: Cannot define property age, object is not extensible
console.clear()


// 16-11 : 객체 밀봉
const ex_02 = { 'phone':'galaxy' }
console.log(Object.isSealed(ex_02))

Object.seal(ex_02)
console.log(Object.isSealed(ex_02))
console.log(Object.getOwnPropertyDescriptors(ex_02))
//* {value: 'galaxy', writable: true, enumerable: true, configurable: false}

ex_02.company = 'samsung';
console.log(ex_02)
delete ex_02.phone;
console.log(ex_02)

ex_02.phone = 'iPhone'
console.log(ex_02)

//* Object.defineProperty(ex_02, 'phone', {configurable: true});
//* Uncaught TypeError: Cannot redefine property: phone
console.clear()


// 16-12 : 객체 동결
const ex_03 = { 'laptop':'LG_gram' }
console.log(Object.isFrozen(ex_03))

Object.freeze(ex_03)
console.log(Object.isFrozen(ex_03))
console.log(Object.getOwnPropertyDescriptors(ex_03))
//* {value: 'LG_gram', writable: false, enumerable: true, configurable: false}

console.log(ex_03.laptop)

ex_03.company = 'LG'
console.log(ex_03.laptop)
delete ex_03.laptop;
console.log(ex_03.laptop)
ex_03.laptop = 'MacBook'
console.log(ex_03.laptop)

//* Object.defineProperty(ex_03, 'laptop', {configurable: true})
//* Uncaught TypeError: Cannot redefine property: laptop
console.clear()


// 16-13 : 객체 동결과 중첩 객체
const ex_04 = {
  'book_name': 'Deepdive',
  'book_author': { 'main': 'Lee' }
}

Object.freeze(ex_04);
console.log(Object.isFrozen(ex_04)) //* true
console.log(Object.isFrozen(ex_04.book_author)) //* false

ex_04.book_author.main = 'Kim'
console.log(ex_04) //* book_author: {main: 'Kim'}
console.clear()


// 16-14 : 불변 객체 (중첩 객체까지 동결)
function deepFreeze(target) {
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const ex_05 = {
  'name': 'Lee',
  'address': { city: 'Chicago' }
}

deepFreeze(ex_05)
console.log(Object.isFrozen(ex_05)) //* true
console.log(Object.isFrozen(ex_05.address)) //* true 

ex_05.address.city = 'NewYork'
console.log(ex_05) //* book_author: {main: 'Kim'}
console.clear()



//? -----------------------------------------
//? 17장 : 생성자 함수에 의한 객체 생성
//? -----------------------------------------
// 17-01 : Object 생성자 함수
const ex_06 = new Object();
console.log(ex_06)

ex_06.name = 'Kim'
ex_06.sayHello = function(){
  console.log('Hi! My name is ' + this.name);
};

ex_06.sayHello()
console.log(ex_06)
console.log(ex_06.name)
console.log(ex_06.sayHello)
console.clear()


// 17-02 : 객체 리터럴을 통한 객체 생성
const circle_01 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle_01.getDiameter());

const circle_02 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle_02.getDiameter());
console.clear()


// 17-03 : 생성자 함수를 통한 객체 생성
const getcircleDiameterFn = function(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius
  }
}

const circle_03 = new getcircleDiameterFn(20)
const circle_04 = new getcircleDiameterFn(40)
const circle_05 = getcircleDiameterFn(60)

console.log(circle_03) 
console.log(circle_04)
console.log(circle_05)

console.log(circle_03.getDiameter())
console.log(circle_04.getDiameter())
console.clear()


// 17-07 : 생성자 함수와 인스턴스
const exampleFn_01 = function(num) {
  this.num = num;
  this.mutiple = function () {
    return 5 * this.num;
  };
  // return 100
}

const examFn_01 = new exampleFn_01(5)
console.log(examFn_01)
console.log(examFn_01.mutiple())
console.clear()


// 17-13 : 함수는 객체. 그로 인한 함수의 특성
const exampleFn_02 = function(){}
exampleFn_02.num = 25; //* 프로퍼티 소유 가능
exampleFn_02.method_01 = function() {
  return exampleFn_02.num * 4
} //* 메서드 소유 가능
 
console.log(exampleFn_02)
console.log(new exampleFn_02)
console.log(exampleFn_02.num)
console.log(exampleFn_02.method_01)
console.log(exampleFn_02.method_01())
console.clear()


// 17-19 : new.target을 통해 일반 함수로 호출하여도 생성자 함수로 호출되도록 하기
//* new.target 기능은 IE에서는 지원하지 않는다.
const exampleFn_03 = function(num) {
  //* new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target의 값은 undefined
  if(new.target === undefined) {
    return new exampleFn_03(num)
  }
  this.num = num;
  this.mutiple = function () {
    return 10 * this.num
  };
} 

const examFn_02 = exampleFn_03(10);
console.log(examFn_02) //* new 연산자 없이 일반 함수로 호출해도 생성자 함수로서 호출된다.
console.log(examFn_02.mutiple())
console.clear()


// 17-20 : 일반 함수로 호출하여도 생성자 함수로 호출되도록 하기(new.target 사용할 수 없을 경우)
const exampleFn_04 = function(num) {
  if(!(this instanceof exampleFn_04)) {
    return new exampleFn_04(num);
  }

  this.num = num;
  this.mutiple = function () {
    return 20 * this.num
  };
}

const examFn_03 = exampleFn_04(100)
console.log(examFn_03) //* new 연산자 없이 일반 함수로 호출해도 생성자 함수로서 호출된다.
console.log(examFn_03.mutiple())
console.clear()


// 17-22 : String, Number, Boolean 생성자 함수와 new
const str = String(123)
console.log(str, typeof str)
const num = Number(123)
console.log(num, typeof num)
const bool = Boolean(123)
console.log(bool, typeof bool)

const str_02 = new String(123)
console.log(str_02)
const num_02 = new Number(123)
console.log(num_02)
const bool_02 = new Boolean(123)
console.log(bool_02)





