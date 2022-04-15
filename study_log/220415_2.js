//? 21-01 ~ 21-03 : 표준 빌트인 객체
// 21-01 ~ 21-02
const strObj = new String('Lee');
console.log(strObj) //* String {'Lee'}
console.log(typeof strObj) //* object
console.log(Object.getPrototypeOf(strObj))

const numObj = new Number(123);
console.log(numObj) //* Number {123}
console.log(typeof numObj) //* object

const boolObj = new Boolean(true);
console.log(boolObj) //* Boolean {true}
console.log(typeof boolObj) //* object

const func = new Function('x', 'return x * x');
console.log(func) //* ƒ anonymous(x) { return x * x }
console.log(typeof func) //* object

const arr = new Array(1, 2, 3)
console.log(arr) //* [1, 2, 3]
console.log(typeof arr) //* object

const regExp = new RegExp(/ab+c/i);
console.log(regExp) //* /ab+c/i
console.log(typeof regExp) //* object

const date = new Date();
console.log(date) //* Fri Apr 15 2022 16:54:18 GMT+0900 (한국 표준시)
console.log(typeof date) //* object

const Obj_01 = new Object
console.log(Obj_01)
console.log(Object.getPrototypeOf(Obj_01))
console.clear()


// 21-03
const numObj_02 = new Number(1.5)
console.log(numObj_02)
console.log(Object.getPrototypeOf(numObj_02))

//* toFixed는 Number.prototype의 프로토타입 메서드다.
//* Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj_02.toFixed()) //* 2

//* isInteger는 Number의 정적 메서드다.
//* Number.isInteger는 인수가 정수인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(11.5)) //* false
console.log(Number.isInteger(12)) //* true