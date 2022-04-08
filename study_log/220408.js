//? 18-01 : 자바스크립트의 함수는 일급 객체
//* 무명의 리터럴로 생성할 수 있다. (런타임에 생성 가능)
const increase = function(num) {
  return ++num;
}
console.log(increase)
console.log(increase(5))

const decrease = function(num) {
  return --num;
}
console.log(decrease)
console.log(decrease(5))

//* 함수는 객체에 저장할 수 있다.
const functions = { increase, decrease };
console.log(functions.increase)
console.log(functions.decrease)

//* 함수는 함수의 매개변수에 전달될 수 있다.
const exampleFn_01 = function(func){
  let num = 0;

  return function () {
    num = func(num);
    return num; //* 함수는 함수의 반환값으로 사용할 수 있다.
  }
}

const increaser = exampleFn_01(functions.increase)
console.log(increaser)
console.log(increaser())
console.log(increaser())
const decreaser = exampleFn_01(functions.decrease)
console.log(decreaser())
console.log(decreaser())

console.clear()



//? 18-02 : 함수 객체의 프로퍼티
const exampleFn_02 = function(num) {
  return num * num;
}

console.dir(exampleFn_02)
console.log(Object.getOwnPropertyDescriptors(exampleFn_02))

console.log(Object.getOwnPropertyDescriptor(exampleFn_02, '__proto__')) //* undefined
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'))
console.clear() 


// arguments
const exampleFn_03 = function(x, y) {
  console.log(arguments)
  console.log(arguments[0])
  return x * y;
}

console.log(exampleFn_03());
console.log(exampleFn_03(2));
console.log(exampleFn_03(2, 4));
console.log(exampleFn_03(2, 4, 6));


const exampleFn_04 = function() {
  let 합계 = 0;
  let i = 0;
  for(; i<arguments.length; i++) {
    합계 += arguments[i]
  }

  return 합계
}

console.log(exampleFn_04());
console.log(exampleFn_04(2));
console.log(exampleFn_04(2, 4));
console.log(exampleFn_04(2, 4, 6)); 

console.clear()



//? 18-11 : 함수 객체의 name 프로퍼티
// 기명 함수 표현식
var exampleFn_05 = function ex_05() {}
console.log(exampleFn_05.name)

// 익명 함수 표현식
var exampleFn_06 = function() {};
console.log(exampleFn_06.name)
console.clear()



//? 19-03 ~ 19-04 : 상속과 프로토타입
// 19-03 : 생성자 함수의 문제점
const CircleFn = function(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2
  }
}

const Circle_01 = new CircleFn(1);
const Circle_02 = new CircleFn(2);
console.log(Circle_01.getArea === Circle_02.getArea) //* false
console.log(Circle_01.getArea())
console.log(Circle_02.getArea())

//* new CircleFn(n)의 방식, 즉 생성자 함수로 생성하면 
//* 인스턴스(객체)를 생성할 때마다 getArea 메서드가 중복 생성되고, 또한 각 인스턴스가 이를 중복으로 소유
//* 10개의 인스턴스 생성 시 10개의 메서드가 생성되므로, 메모리와 퍼포먼스에 모두 악영향


// 19-04 : 상속을 통해 불필요한 중복 제거하기
const CircleFn_inheritance = function(radius) {
  this.radius = radius
}

//* CircleFn_inheritance 생성자 함수가 생성한 모든 인스턴스가
//* getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가한다.
//* 프로토타입은 CircleFn_inheritance 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
CircleFn_inheritance.prototype.getArea = function() {
  return Math.PI * this.radius ** 2
}

const Circle_inheritance_01 = new CircleFn_inheritance(1);
const Circle_inheritance_02 = new CircleFn_inheritance(2);
console.log(new CircleFn_inheritance(1))
console.log(new CircleFn_inheritance(1).getArea)

//* CircleFn_inheritance 생성자 함수가 생성한 모든 인스턴스는
//* 부모 객체의 역할을 하는 프로토타입 CircleFn_inheritance.prototype으로부터
//* getArea 메서드를 상속받는다.
//* 즉, CircleFn_inheritance 생성자 함수가 생성한 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(Circle_inheritance_01.getArea === Circle_inheritance_02.getArea) //* true
console.log(Circle_inheritance_01.getArea())
console.log(Circle_inheritance_02.getArea())