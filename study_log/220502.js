// 23-02 : 실행 컨텍스트의 역할
//* 전역 변수 선언
const x = 1;
const y = 2;

//* 함수 정의
const Fn_01 = function(a){
  //* 지역 변수 선언
  const x = 10;
  const y = 20;

  //* 메서드 호출
  console.log(a + x + y)
}

//* 함수 호출
Fn_01(100) //* 130

//* 메서드 호출
console.log(x + y) //* 3
console.clear();


// 23-03 : 실행 컨텍스트 스택
const x_02 = 1;
const Fn_02 = function(){
  const y = 2

  const Fn_03 = function(){
    const z = 3;
    console.log(x_02 + y + z);
  }
  Fn_03();
}

Fn_02(); //* 6
console.clear();



//? 23-04 ~ 23-10 : 실행 컨텍스트의 생성과 식별자 검색 과정
// 23-04
var p = 1;
const q = 2;

const Fn_04 = function(r) {
  var p = 3;
  const q = 4;

  const Fn_05 = function(s) {
    const z = 5;
    console.log(r + s + p + q + z)
  }
  Fn_05(10)
}

Fn_04(20);
console.clear();


// 23-05
console.log(window.toString()) //* [object Window]
console.log(window)
console.log(window.__proto__)
console.log(window.__proto__.__proto__)
console.log(window.__proto__.__proto__.__proto__)
console.log(window.__proto__.__proto__.__proto__.__proto__)
console.log(Object.prototype)
console.log(window.__proto__.__proto__.__proto__.__proto__ === Object.prototype) //* true 
console.clear();


// 23-07
let foo = 1; //* 전역 변수

{
  //* let, const 키워드로 선언한 변수가 호이스팅되지 않는다면 전역 변수를 참조해야 한다.
  //* 하지만 let 키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에
  //* 참조 에러(ReferenceError)가 발생한다.
  // console.log(foo); //! Uncaught ReferenceError: Cannot access 'foo' before initialization
  let foo = 2; //* 지역 변수
}
