//? 21-04 ~ 21-07 : 원시값과 래퍼 객체
// 21-04 ~ 21-05
const str_01 = 'hello'

//* 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str_01.length); //* 2
console.log(str_01.toUpperCase()); //* HELLO

//* 래퍼 객체로 프로퍼티에 접근하거나 메소드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str_01) //* string


// 21-06
//* a. 식별자 str_02은 문자열을 값으로 가지고 있다.
const str_02 = 'hello';

//* b. 식별자 str_02은 암묵적으로 생성된 래퍼 객체를 가리킨다.
//* 식별자 str_02의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
//* 래퍼 객체에 name 프로퍼티가 동적으로 추가된다.
str_02.name = 'Lee';

//* c. 식별자 str_02은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
//* 이때 b에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

//* d. 식별자 str_02은 새롭게 암묵적으로 생성된(b에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
//* 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str_02.name) //* undefined

//* e. 식별자 str_02은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
//* 이때 d에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str_02, str_02) //* string hello
console.clear()



//? 21-08 ~ 21-11 : 전역 객체
// 21-08 : globalThis
//* ES11에서 도입
//* 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일
//* ECMAScript 표준 사양을 준수하는 모든 환경에서 사용할 수 있다.

//* 브라우저 환경
console.log(globalThis === this)
console.log(globalThis === window)
console.log(globalThis === self)
console.log(globalThis === frames)

//* Node.js 환경(12.0.0 이상)
globalThis === this
// globalThis === global
console.clear()


// 21-09 : 전역 객체의 특징
//* 개발자가 의도적으로 생성할 수 없다.
//* 전역 객체의 프로퍼티를 참조할 때 window(또는 global)을 생략할 수 있다.

//* 문자열 'F'를 16진수로 해석하여 10진수로 변환하여 반환한다.
console.log(window.parseInt('F', 16)) //* 15
//* window.parseInt는 parseInt로 호출할 수 있다.
console.log(parseInt('F', 16)) //* 15

console.log(window.parseInt === parseInt) //* true
console.clear()


// 21-10 : 전역 객체의 프로퍼티가 되는 경우
//* a. var 키워드로 선언한 전역 변수
var global_01 = 20;
console.log(window.global_01); //* 20
console.log(global_01); //* 20

//* b. 암묵적 전역 (선언하지 않은 변수에 값을 할당)
global_02 = 30;
console.log(window.global_02); //* 30
console.log(global_02); //* 30

//* c. 전역 함수
function Fn_01() { return 5 }
console.log(window.Fn_01()); //* 5
console.log(Fn_01()); //* 5


// 21-11 : let, const
//* let이나 const로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
//* let이나 const로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경 내의 선언적 환경 레코드) 내에 존재하게 된다.
let gb_03 = 123;
console.log(window.gb_03) //* undefined
const gb_04 = 324;
console.log(window.gb_04) //* undefined
console.clear()



//? 21-12 ~ 21-14 : 빌트인 전역 프로퍼티
// 21-12 : Infinity
//* 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); //* true

//* 양의 무한대
console.log(3/0); //* Infinity
//* 음의 무한대
console.log(-3/0); //* -Infinity
//* Infinity는 숫자값이다.
console.log(typeof Infinity); //* number


// 21-13 : NaN
//* 숫자가 아님 (Not-a-Number) 을 의미
console.log(window.NaN); //* NaN
console.log(1 * 'string'); //* NaN
console.log(Number('xyz')); //* NaN
console.log(typeof NaN); //* number


// 21-14 : undefined
console.log(window.undefined === undefined) //* true
var ex_01;
console.log(ex_01); //* undefined
console.log(typeof undefined) //* undefined
console.clear()



//? 21-15 ~ 21-39 : 빌트인 전역 함수
// 21-15 : eval (1)
//* 표현식인 문
console.log(eval('1+2;')) //* 3
//* 표현식이 아닌 문
console.log(eval('var ex_02 = 10;')) //* undefined

//* eval 함수에 의해 런타임에 변수 선언문이 실행되어 ex_02 변수가 선언되었다.
console.log(ex_02) //* 10

//* 객체, 함수 리터럴은 반드시 괄호로 둘러싼다.
const obj_01 = eval('({a:1})')
console.log(obj_01) //* {a: 1}
const Fn_02 = eval('(function() { return 10; })')
console.log(Fn_02()) //* 10


// 21-16 : eval (2)
//* 인수로 전달받은 문자열 코드가 여러 개의 문으로 이루어져 있다면,
//* 모든 문을 실행한 다음, 마지막 결과값을 반환
console.log(eval('1 + 2; 3 + 4;')) //* 7
console.clear()


// 21-17 : eval (3)
const ex_03 = 10;
function Fn_03() {
  //* eval 함수는 런타임에 Fn_03 함수의 스코프를 동적으로 수정한다.
  //* (eval 함수에 전달된 코드는 이미 그 위치에 존재하던 코드처럼 동작한다.)
  eval('var ex_03 = 25;')
  console.log(ex_03) //* 25
}
Fn_03();
console.log(ex_03) //* 10

const ex_04 = 20;
function Fn_04() {
  'use strict'
  //* 엄격 모드에서는 Fn_03 함수의 스코프를 동적으로 수정하지 않고, eval 함수 자신의 자체적인 스코프를 생성한다.
  eval('var ex_04 = 45;')
  console.log(ex_04) //* 20
}
Fn_04();
console.log(ex_04) //* 20

const ex_05 = 50;
function Fn_05() {
  //* 인수로 전달받은 문자열 코드가 let, const 키워드를 사용한 변수 선언문일 경우
  //* 암묵적으로 strict mode가 적용된다.
  eval('const ex_05 = 255;')
  console.log(ex_05) //* 50
}
Fn_05();
console.log(ex_05) //* 50
console.clear()


// 21-20 ~ 21-21 : isFinite
//* 인수가 유한수인 경우 true를 반환하고, 무한수인 경우 false를 반환
//* 숫자가 아닌 경우 숫자로 타입을 변환한 후 검사를 수행
//* 인수가 NaN으로 평가되는 값이라면 false를 반환

console.log(isFinite(0)) //* true
console.log(isFinite(12324)) //* true
console.log(isFinite('10')) //* true
console.log(isFinite(null)) //* true
//* null을 숫자 타입으로 변환하면 0이 된다.

console.log(isFinite(Infinity)) //* false
console.log(isFinite(-Infinity)) //* false
console.log(isFinite(NaN)) //* false
console.log(isFinite('Hello')) //* false
console.log(isFinite('2022.4.18')) //* false
console.clear()


// 21-22 : isNaN
//* 전달받은 인수가 NaN인지 검사하여 그 결과를 불리언 타입으로 반환
//* 전달받은 인수의 타입이 숫자가 아닌 경우 숫자로 타입을 변환하여 검사 실행

//* 숫자
console.log(isNaN(NaN)); //* true
console.log(isNaN(10)); //* false

//* 문자열
console.log(isNaN('something')); //* true
console.log(isNaN('10')); //* false
console.log(isNaN('10.1213')); //* false
console.log(isNaN('')); //* false ('' -> 0)
console.log(isNaN(' ')); //* false (' ' -> 0)

//* 불리언
console.log(isNaN(true)); //* false (true -> 1)
console.log(isNaN(false)); //* false
console.log(isNaN(null)); //* false (null -> 0)

//* undefined
console.log(isNaN(undefined)); //* true (undefined -> NaN)

//* 객체
console.log(isNaN({})); //* true ({} -> NaN)

//* date
console.log(isNaN(new Date())); //* false: (new Date() -> Number)
console.log(isNaN(new Date().toString())); //* true (String -> NaN)
console.clear() 

