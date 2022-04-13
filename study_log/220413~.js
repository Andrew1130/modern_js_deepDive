//? 19-43 ~ 19-45 : 인스턴스에 의한 프로토타입의 교체
// 19-43 ~ 19-44
const Fn_01 = function (name) {
  this.name = name;
}

const Obj_01 = new Fn_01('Ju won')

//* 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`)
  }
};

console.log(Obj_01.__proto__) //* {constructor: ƒ}
Object.setPrototypeOf(Obj_01, parent); 
console.log(Obj_01.__proto__) //* {sayHello: ƒ}
Obj_01.sayHello() //* Hi! My name is Ju won

console.log(Obj_01.constructor) //* ƒ Object() { [native code] }
console.log(Fn_01) //* ƒ (name) { this.name = name; }
console.log(Object) //* ƒ Object() { [native code] }
//* Object.setPrototypeOf(Obj_01, parent); 에 의해 Obj_01에 있던 {constructor: ƒ}가 사라짐
//* 프로토타입 체인에 의해 Object의 constructor가 출력

console.log(Fn_01.prototype)
console.clear()


// 19-45 : constructor 프로퍼티 추가
const Fn_02 = function (name) {
  this.name = name;
}

const Obj_02 = new Fn_02('Young Jun')

//* 프로토타입으로 교체할 객체
const parent_02 = {
  //* constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Fn_02,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

//* 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Fn_02.prototype = parent_02

//* me 객체의 프로토타입을 parent_02 객체로 교체한다.
Object.setPrototypeOf(Obj_02, parent_02)

Obj_02.sayHello();


//? 추가 : 19-42와의 비교
console.log(Obj_02.constructor) //* ƒ (name) { this.name = name }
console.log(Fn_02) //* ƒ (name) { this.name = name }
console.log(Object) //* ƒ Object() { [native code] }

console.log(Fn_02.prototype) 
console.log(Object.getPrototypeOf(Obj_02))
//* Fn_02.prototype = parent_02 을 해주지 않으면
//* Fn_02.prototype >> {constructor: ƒ}
//* Object.getPrototypeOf(Obj_02) >> {constructor: ƒ, sayHello: ƒ}
//* 위와 같이 결과가 다르게 나타난다.
console.clear()



//? 19-46 ~ 19-50 : instanceof 연산자
// 19-46
const Fn_03 = function(name) {
  this.name = name;
}

const Obj_03 = new Fn_03("Joon hee")

console.log(Obj_03)
console.log(Obj_03 instanceof Fn_03) //* true
//* Fn_03.prototype이 Obj_03 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(Obj_03 instanceof Object) //* true
//* Object.prototype이 Obj_03 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.clear()


// 19-47
const Fn_04 = function(name) {
  this.name = name;
}

const Obj_04 = new Fn_04("Ga young")

//* 프로토타입으로 교체할 객체
const parent_03 = {}

//* 프로토타입의 교체
Object.setPrototypeOf(Obj_04, parent_03)

// 19-48 parent_03 객체를 Fn_04 생성자 함수의 prototype 프로퍼티에 바인딩
// Fn_04.prototype = parent_03

console.log(Object.getPrototypeOf(Obj_04)) //* {}

console.log(Fn_04.prototype) //* {constructor: ƒ}
// Fn_04.prototype = parent_03 코드가 활성화되면 콘솔 로그의 결과는 {}이 된다.
console.log(parent_03) //* {}
console.log(parent_03.constructor) //* ƒ Object() { [native code] }
console.log(Fn_04) //* ƒ (name) { this.name = name; }

console.log(Obj_04 instanceof Fn_04) //* false
//* Fn_04.prototype이 Obj_04 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
// Fn_04.prototype = parent_03 코드가 활성화되면 true가 된다.
console.log(Obj_04 instanceof Object) //* true
//* Object.prototype이 Obj_04 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.clear()



//? 19-51 ~ 19-54 : Object.create에 의한 직접 상속
// 19-51
//* 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입의 종점에 위치한다.
//* obj_05 -> null
let obj_05 = Object.create(null);
console.log(Object.getPrototypeOf(obj_05)) //* null
//* Object.prototype을 상속받지 못한다.

//* obj_05 -> Object.prototype -> null
//* obj_05 = {} 와 동일하다.
obj_05 = Object.create(Object.prototype) 
console.log(obj_05)
console.log(Object.getPrototypeOf(obj_05))
console.log(Object.getPrototypeOf(obj_05) === Object.prototype) //* true

//* obj_05 -> Object.prototype -> null
//* obj_05 = { x: 1 }; 과 동일하다.
obj_05 = Object.create(Object.prototype, {
  x : {value: 1, writable: true, enumerable: true, configurable: true}
});
//* 위 코드는 아래와 동일하다.
//* obj_05 = Object.create(Object.prototype);
//* obj_05.x = 1;
console.log(obj_05)
console.log(obj_05.x) //* 1
console.log(Object.getPrototypeOf(obj_05) === Object.prototype) //* true

const myProto = { x: 10 }
//* 임의의 개체를 직접 상속받는다.
//* obj_05 -> myProto -> Object.prototype -> null
obj_05 = Object.create(myProto)
console.log(obj_05)
console.log(obj_05.x) //* 10
console.log(Object.getPrototypeOf(obj_05) === myProto) //* true


//* 생성자 함수
const Fn_05 = function(name) {
  this.name = name;
}
//* obj_05 -> Fn_05.prototype -> Object.prototype -> null
//* obj_05 = new Fn_05("Ju won Lee") 와 동일
obj_05 = Object.create(Fn_05.prototype);
obj_05.name = "Ju won Lee"

console.log(obj_05)
console.log(obj_05.name)
console.log(Object.getPrototypeOf(obj_05)) //* {constructor: ƒ}
console.log(Fn_05.prototype) //* {constructor: ƒ}


// 19-52