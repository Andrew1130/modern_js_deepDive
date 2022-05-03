// 23-11 : 실행 컨텍스트와 블록 레벨 스코프
let x = 1;

if (true) {
  let x = 10;
  console.log(x); //* 10
}

console.log(x) //* 1
console.clear()



//? ------------------------
//? 24장 : 클로저
//? ------------------------
 
//? 24-01 ~ 24-03 : 함수가 선언된 렉시컬 환경 & 렉시컬 스코프
//! 자바스크립트 엔진은 함수를 어디에서 호출했는가가 아니라 어디에서 정의했느냐에 따라 상위 스코프를 결정
//! 이를 렉시컬 스코프(정적 스코프)라고 한다.
// 24-01
const a = 1;
const Fn_01 = function(){
  const a = 10;
  const Fn_02 = function(){
    console.log(a); //* 10
    //! Fn_02가 Fn_01 내부에 정의된 상태
    //* Fn_02의 상위 스코프는 외부 함수 Fn_01의 스코프
    //* 스코프 체인을 통해 Fn_02 내부에서 외부 함수의 스코프에 접근 가능,
    //* 즉 Fn_02에서 Fn_01의 a 값 참조 가능
  }

  Fn_02();
}
Fn_01();


// 24-02
const b = 1;
const Fn_03 = function(){
  const b = 10;
  Fn_04()
}

const Fn_04 = function(){
  console.log(b); //* 1
  //! Fn_04가 Fn_03과 별도로 정의된 상태
  //* 스코프 또한 스코프 체인으로 거슬러 올라갈 수 있는 수직관계가 아닌 수평관계
  //* 따라서 Fn_04를 Fn_03 내부에서 호출하더라도, Fn_04가 Fn_03 내부에 정의된 것은 아니므로,
  //* Fn_04에서는 Fn_03의 b값에 접근할 수 없다.
}

Fn_03()
console.clear()


// 24-03
const c = 1;
const Fn_05 = function(){
  const c = 10;
  Fn_06()
}

const Fn_06 = function(){
  console.log(c);
}

Fn_05(); //* 1
Fn_06(); //* 1

