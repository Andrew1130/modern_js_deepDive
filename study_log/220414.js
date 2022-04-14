// 19-55 : 객체 리터럴 내부에서 __proto__에 의한 직접 상속 (ES6~)
const myProto_01 = { "name":"Ju won Lee" }

//* 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj_01 = {
  "address":"Seoul, Gwanak",
  //* 객체를 직접 상속받는다.
  //* obj_01 -> myProto_01 -> Object.prototype -> null
  __proto__: myProto_01
}
//* 위 코드는 아래와 동일하다.
//* const obj_01 = Object.create(myProto_01, {
//*   "address": { value: "Seoul, Gwanak", writable: true, enumerable: true, configurable: true } 
//* });

console.log(obj_01)
console.log(obj_01.name)
console.log(obj_01.address)
console.clear()



//? 19-56 ~ 19-58 : 정적 프로퍼티/메서드
// 19-56
//* 생성자 함수
const Fn_01 = function(name) {
  this.name = name;
  return this.name;
}

//* 프로토타입 메서드
Fn_01.prototype.sayHello = function() {
  console.log(`Hi! My name is ${this.name}`);
};

//* 정적 프로퍼티
Fn_01.address = "Seoul"

//* 정적 메서드
Fn_01.staticMethod = function() {
  console.log('staticMethod');
};

const ex_01 = Fn_01('Jung')

Fn_01.staticMethod() //* staticMethod
// ex_01.staticMethod() //! Uncaught TypeError: ex_01.staticMethod is not a function
//* 정적 메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
//* 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
console.log(ex_01.address) //* undefined
//* 정적 프로퍼티도 위와 같다.
console.clear()


// 19-57
//* Object.create는 Object 생성자 함수의 정적 메서드다.
const obj_02 = Object.create({ "city":"London" })
obj_02.age = 28
console.log(obj_02)

//* Object.prototype.hasOwnProperty는 프로토타입 메서드다.
console.log(obj_02.hasOwnProperty("city")) //* false
console.log(obj_02.hasOwnProperty("age")) //* true


// 19-58
const Fn_02 = function() {}

//* 프로토타입 메서드
//* this를 참조하지 않는 프로토타입 메서드는 정적 메서드로 변경하여도 동일한 효과를 얻을 수 있다.
Fn_02.prototype.protoM = function() {
  console.log('protoM');
};

const ex_02 = new Fn_02(); 
//* 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
ex_02.protoM(); //* protoM

//* 정적 메서드
ex_02.staticM = function() {
  console.log('staticM');
}

//* 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
ex_02.staticM() //* staticM
console.clear()



//? 19-59 ~ 19-62 : 프로퍼티 존재 확인
// 19-59 ~ 60 : in 연산자
const obj_03 = {
  "name":"Ju won Lee",
  "city":"Seoul"
}

console.log(obj_03)

console.log("name" in obj_03) //* true
console.log("city" in obj_03) //* true
console.log("age" in obj_03) //* false

console.log("toString" in obj_03) //* true
//* in 연산자는 obj_03 내부에 있는 프로퍼티만 검색하는 것이 아니라
//* 해당 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입 내부에 있는 프로퍼티를 검색
//* obj_03 프로토타입 체인 내의 Object.prototype이 toString 메서드를 가지므로
//* obj_03 객체 내에는 해당 프로퍼티가 없음에도 true가 반환됨


// 19-61 : Reflect.has
//* ES6에서 도입된 메서드로, in 연산자와 동일하게 동작
console.log(Reflect.has(obj_03, "name")); //* true 
console.log(Reflect.has(obj_03, "city")); //* true
console.log(Reflect.has(obj_03, "age")); //* false
console.log(Reflect.has(obj_03, "isPrototypeOf")); //* true


// 19-62 ~ 63 : Object.prototype.hasOwnProperty
//* obj_03 내부에 있는 프로퍼티만 검색 (프로토타입 체인 검색 X)
console.log(obj_03.hasOwnProperty("name")); //* true 
console.log(obj_03.hasOwnProperty("city")); //* true 
console.log(obj_03.hasOwnProperty("age")); //* false
console.log(obj_03.hasOwnProperty("isPrototypeOf")); //* false
console.clear()



//? 19-64 ~ 19-74 : 프로퍼티 열거
// 19-64 ~ 66
const obj_04 = {
  "name":"Ju won Lee",
  "city":"Seoul",
  "age":28,
  "phone":"Samsung Galaxy"
};

//* for ... in 문의 변수 prop에 obj_04 객체의 프로퍼티 키가 할당된다.
//* 해당 객체뿐 아니라, 해당 객체의 프로토타입 체인 상에 존재하는 모든 프로퍼티 중에서
//* 프로퍼티 어트리뷰트 [[enumerable]] 값이 true인 프로퍼티를 순회하며 열거한다.
for (const key  in obj_04) {
  console.log(key  + ': ' + obj_04[key])
}

console.log(obj_04.__proto__)
console.log(Object.getOwnPropertyDescriptor(obj_04.__proto__, 'isPrototypeOf')) //* enumerable: false
console.log(Object.getOwnPropertyDescriptor(obj_04.__proto__, 'toLocaleString')) //* enumerable: false
//* Object.prototype 내 프로퍼티는 obj_04의 프로토타입 체인에 있으므로 
//* for ... in 문의 열거대상이 되지만, 
//* 내부 프로퍼티들의 enumerable이 false이므로 열거되지 않는다.
console.clear()


// 19-67 ~ 68
const sym = Symbol();
const obj_05 = {
  "name":"Ju won Lee",
  "city":"Seoul",
  "age":28,
  "phone":"Samsung Galaxy",
  "__proto__": { "Fax":"02-0000-0001" },
  [sym]: 100 //* for ... in 문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.
};

console.log(obj_05)

for (const key  in obj_05) {
  console.log(key  + ': ' + obj_05[key])
}
//* name: Ju won Lee
//* city: Seoul
//* age: 28
//* phone: Samsung Galaxy
//* Fax: 02-0000-0001
console.clear()


// 19-69 : 상속받은 프로퍼티는 제외하고, 객체 자신의 프로퍼티만 열거
const obj_06 = {
  "name":"Hee Jae Jung",
  "city":"Ulsan",
  "age":24,
  "phone":"iPhone",
  "__proto__": { "Company":"Ulsan steel" },
}; 

for (const key in obj_06) {
  //* 객체 자신의 프로퍼티인지 확인
  if (!obj_06.hasOwnProperty(key)) continue;
  console.log(key  + ': ' + obj_06[key]);
}


// 19-70 : for ... in 문과 정렬
//* 원칙적으로 for .. in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다.
//* 다만 대부분의 모던 브라우저는 순서를 보장하고, 
//* 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 정렬을 실시한다.
const obj_07 = {
  2:"two",
  3:"three",
  1:"one",
  4:"four",
  5:"five",
  "다":"da",
  "가":"ga",
  "나":"na"
}

for (const key in obj_07) {
  if(!obj_07.hasOwnProperty(key)) continue;
  console.log(key + ': ' + obj_07[key])
}
//* 1: one
//* 2: two
//* 3: three
//* 4: four
//* 5: five
//* 다: da
//* 가: ga
//* 나: na
console.clear()


// 19-71 : 배열과 프로퍼티 열거
const arr_01 = [1, 2, 3];
arr_01.x = 10;
console.log(arr_01) //* [1, 2, 3, x: 10]

for (const i in arr_01) {
  console.log(arr_01[i]); //* 1 2 3 10
}

console.log(arr_01.length) //* 3
console.clear()


// 19-72 : Object.keys
//* 객체 자신에 한하여 열거 가능한 프로퍼티 키를 배열로 반환 (ES6)
const obj_08 = {
  "name":"Hee Jae Jung",
  "city":"Ulsan",
  "age":24,
  "phone":"iPhone",
  "__proto__": { "Company":"Ulsan steel" },
}; 

console.log(obj_08)
console.log(Object.keys(obj_08)) //* ['name', 'city', 'age', 'phone']


// 19-73 : Object.values
//* 객체 자신에 한하여 열거 가능한 프로퍼티 값을 배열로 반환 (ES8)
console.log(Object.values(obj_08)) //* ['Hee Jae Jung', 'Ulsan', 24, 'iPhone']

// 19-74 : Object.entries
//* 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환 (ES8)
console.log(Object.entries(obj_08))
//* [Array(2), Array(2), Array(2), Array(2)]
//* 0: (2) ['name', 'Hee Jae Jung']
//* 1: (2) ['city', 'Ulsan']
//* 2: (2) ['age', 24]
//* 3: (2) ['phone', 'iPhone']
//* length: 4