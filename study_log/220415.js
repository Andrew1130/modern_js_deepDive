// 20-01 : 암묵적 전역 현상
const Fn_01 = function(){
  x = 10;
}
Fn_01() //* 10

console.log(x);

// +
(function(){
  var y = 20;
  y = 85;
  console.log(y) //* 85
}());
//* console.log(y) 
//! Uncaught ReferenceError: y is not defined


//? 20-08 ~ 20-11 : strict mode가 발생시키는 에러
// 20-08 : 암묵적 전역
(function () {
  'use strict';

  z = 1;
  //* console.log(z); 
  //! Uncaught ReferenceError: z is not defined
}());


// 20-09 : 변수, 함수, 매개변수의 삭제
(function() {
  'use strict';

  const k = 10;
  //* delete k;
  //! Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

  const Fn_02 = function(p){
    //* delete p
    //! Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
  } 
  //* delete Fn_02
  //! Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

}())


// 20-10 : 매개변수 이름의 중복
(function (){
  'use strict'

  const Fn_03 = function(j, j) {
    //! Uncaught SyntaxError: Duplicate parameter name not allowed in this context
    return j * j;
  }

  console.log(Fn_03(3,5))
}())