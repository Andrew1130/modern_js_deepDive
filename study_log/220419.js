//? ~ 21-39 : 빌트인 전역 함수
// 21-23 : parseFloat
//* 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.

//* 문자열을 실수로 해석하여 반환
console.log(parseFloat('152')) //* 152
console.log(parseFloat('13.84')) //* 13.84

//* 공백으로 구분된 문자열은 첫 번째 문자열만 변환
console.log(parseFloat('82.12 95 1231')) //* 82.12
console.log(parseFloat('40 years ago')) //* 40

//* 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환
console.log(parseFloat('He was 40')) //* NaN

//* 앞뒤 공백은 무시된다.
console.log(parseFloat('   108 ')) //* 108
console.clear()


// 21-24 ~ 21-25 : parseInt (1)
//* 전달받은 문자열 인수를 정수로 해석하여 반환한다.
//* 전달받은 인수가 문자열이 아니면, 문자열로 변환한 후 정수로 해석하여 반환한다.
console.log(parseInt('20')) //* 20
console.log(parseInt('53.142')) //* 53
console.log(parseInt(95)) //* 95
console.log(parseInt(423.1423)) //* 423
console.clear()


// 21-26 ~ 21-32 : parseInt (2)
//* 두 번째 인수로 진법을 나타내는 기수(2~36)를 전달할 수 있다.
//* 기수를 지정하면 첫 번째 인수로 전달된 문자열을 해당 기수의 숫자로 해석하여, 10진수의 값으로 반환한다.
//* 기수를 생략하면 10진수로 해석하여 10진수로 반환한다.

console.log(parseInt('10')) //* 10
console.log(parseInt('10', 2)) //* 2
console.log(parseInt('10', 8))  //* 8
console.log(parseInt('10', 16))  //* 16


//* 진법을 나타내는 기수를 지정하지 않더라도, 
//* 첫 번째 인수로 전달된 문자열이 "0x" 또는 "0X"로 시작하는 16진수 리터럴이라면
//* 16진수로 해석하여 10진수 정수로 반환한다.

console.log(parseInt('0xf')) //* 15


//* 첫 번째 인수로 전달한 문자열의 첫 번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.
//* 첫 번째 인수로 전달한 문자열의 두 번째 문자부터 변환할 수 없는 경우, 
//* 해당 문자와 계속되는 문자들은 무시되며 해석된 정수값만 반환된다.

console.log(parseInt('72', 7))  //* NaN
console.log(parseInt('215', 2))  //* NaN
console.log(parseInt('10102', 2)) //* 10
console.log(parseInt('101021010', 2)) //* 10 (2 이후로는 모두 무시됨)
console.clear()


//* 첫 번째 인수로 전달한 문자열에 공백이 있다면 첫 번째 문자열만 해석하여 반환하며, 앞뒤 공백은 무시된다.
//* 첫 번째 문자열을 숫자로 해석할 수 없는 경우 NaN을 반환한다.

console.log(parseInt('45 21 82')) //* 45
console.log(parseInt('28 years')) //* 28
console.log(parseInt('My favorite number is 7')) //* NaN
console.log(parseInt('    75  ')) //* 75
console.clear()



//? 21-34 ~ 21~36 : URI 관련
// 21-34 : encodeURI
//* 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const uri = 'https://example.com?name=이주원&city=seoul'
const enc = encodeURI(uri);
console.log(enc)

// 21-35 : decodeURI
//* 인코딩된 URI를 이스케이프 이전으로 디코딩한다.
const dec = decodeURI(enc)
console.log(dec)

// 21-36 : encodeURIComponent, decodeURIComponent
//* encodeURIComponent : 인수로 전달된 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주
//* 쿼리 스트링 구분자로 사용되는 =, ?, & 까지 인코딩
//* encodeURI의 경우 =, ?, & 은 인코딩하지 않는다.

//* URI의 쿼리 스트링
const uriQstring = 'name=이주원&city=seoul'

const encodeURIComp = encodeURIComponent(uriQstring)
console.log(encodeURIComp) //* name%3D%EC%9D%B4%EC%A3%BC%EC%9B%90%26city%3Dseoul
const decodeURIComp = decodeURIComponent(encodeURIComp)
console.log(decodeURIComp) //* name=이주원&city=seoul


const encURI = encodeURI(uriQstring)
console.log(encURI) //* name=%EC%9D%B4%EC%A3%BC%EC%9B%90&city=seoul
const decURI = decodeURI(encURI)
console.log(decURI) //* name=이주원&city=seoul
console.clear()



//? 21-37 ~ 21-39 : 암묵적 전역
console.log(ex_01) //* undefined
// console.log(ex_02) //! Uncaught ReferenceError: ex_02 is not defined
//* ex_02는 변수 선언 없이 단지 전역 객체의 프로퍼티로 추가되었을 뿐이다.
//* ex_02는 변수가 아니므로, 호이스팅도 발생하지 않는다.

var ex_01 = 10;
const Fn_01 = function() {
  ex_02 = 85;
}
Fn_01();

console.log(ex_01 + ex_02) //* 95


//* ex_02는 변수가 아니라 단지 프로퍼티이므로, delete로 삭제 가능하다.
//* ex_01의 경우는 delete로 삭제할 수 없다.

delete ex_01
delete ex_02

console.log(ex_01) //* 10
console.log(window.ex_02) //* undefined
console.clear()



//? ~ 22-05 : this 키워드
// 22-05 
//* this는 어디서든지 참조 가능하다.
//* 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this) //* window

const Fn_02 = function() {
  //* 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this) //* window
}
Fn_02()

const obj_01 = {
  "name":"Lee",
  getName() {
    //* 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); //* {name: 'Lee', getName: ƒ}
    return this.name;
  }
};
console.log(obj_01.getName()) //* Lee

const Fn_03 = function(name) {
  //* 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); //* Fn_03 {}
  this.name = name;
  console.log(this); //* Fn_03 {name: 'Ju won Lee'}
  return this.name
} 

const me = new Fn_03('Ju won Lee')
console.log(me.name)
console.clear()



//? 함수 호출 방식과 this 바인딩 : 일반 함수 호출
// 22-07
//* 일반 함수로 호출 시 this에는 기본적으로 전역 객체가 바인딩된다.
const Fn_04 = function() {
  console.log('Fn_04: ', this) //* Fn_04:  Window
  const Fn_05 = function() {
    console.log('Fn_05: ', this)  //* Fn_05:  Window
  }
  Fn_05();
}
Fn_04();


// 22-08
//* strict mode가 적용되면 일반 함수로 호출 시 undefined가 바인딩된다.
const Fn_06 = function() {
  'use strict';

  console.log('Fn_06: ', this) //* Fn_06:  undefined
  const Fn_07 = function() {
    console.log('Fn_07: ', this)  //* Fn_07:  undefined
  }
  Fn_07();
}
Fn_06();






