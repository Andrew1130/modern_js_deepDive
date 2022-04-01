//? 예제 14-07 : 모듈 패턴
var Counter = (function (){
  var num = 0;
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    }
  };
}());

console.log(Counter)
console.log(Counter.num)

console.clear()


//? 예제 15-05 : let
var foo = 123;
var foo = 456;
console.log(foo)
let bar = 567;
console.log(bar)
// let bar = 890;
// console.log(bar)



//? 15-06 : let (블록 레벨 스코프)
let i = 1;

for(let i = 100; i < 110 ; i++){
  console.log(i)
}

console.log(i);

console.clear()



//? 15-07 : let (호이스팅)
// console.log(f);
let f;
console.log(f);


//? 15-10 : let (호이스팅) 2
let p = 1;

{
  // console.log(p)
  let p = 2;
}
console.clear()



//? 15-13 ~ (const)
//* 15-13 ~ 15-16
// const example;
// console.log(example)

const EXAMPLE = 20;
console.log(EXAMPLE)

// EXAMPLE = 25;

let example02 = 5;
console.log(example02)
example02 = 225;
console.log(example02)


//* 15-19
const examobj = {
  'name':'juwonlee',
  'age':'28',
  'id':'yh273'
};

console.log(examobj)

examobj.name = 'minsookim'
examobj.age = '33'
examobj.id = 'mskim1989'

console.log(examobj)
