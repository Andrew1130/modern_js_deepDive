//? 19-23 ~ 19-28 : 객체 생성 방식과 프로토타입의 결정
// 19-23 : 객체 리터럴에 의해 생성된 객체의 프로토타입
const obj_01 = { "name":"Lee" }
console.log(obj_01)
console.log(obj_01.constructor) //* ƒ Object() { [native code] }
console.log(Object) //* ƒ Object() { [native code] }
console.log(obj_01.hasOwnProperty('name')) //* true

//* obj_01이 평가되면 OrdinaryObjectCreate에 의해 Object.prototype을 프로토타입으로 갖게 되며
//* 이로써 Object.prototype을 상속받는다.
console.clear()


// 19-25 : Object 생성자 함수에 의해 생성된 객체의 프로토타입
const obj_02 = new Object();
obj_02.x = 10;

//* 위 코드가 실행되면 OrdinaryObjectCreate에 의해 
//* Object 생성자 함수와 Object.prototype과 생성된 객체(obj_02) 사이에 연결이 만들어져
//* 이로써 Object.prototype을 상속받는다.

console.log(obj_02) 
console.log(obj_02.constructor) //* ƒ Object() { [native code] } 
console.log(Object) //* ƒ Object() { [native code] } 
console.log(obj_02.hasOwnProperty('x')) //* true
console.clear()


// 19-27 : 생성자 함수에 의해 생성된 객체의 프로토타입
const Fn_01 = function(x, y){ return x * y }
const obj_03 = new Fn_01(5, 9)

//* 위 코드가 실행되면 OrdinaryObjectCreate에 의해
//* 생성자 함수와 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체와 
//* 생성된 객체(obj_03) 사이에 연결이 만들어진다.

console.log(Fn_01)
console.log(obj_03)
console.log(obj_03.constructor)
console.clear()


// 19-28 : 프로토타입 메서드
const Fn_02 = function(name) { this.name = name; }

//* 프로토타입 메서드
Fn_02.prototype.sayHello = function(){
  console.log(`Hi! My name is ${this.name}`)
};

console.log(Fn_02) //* ƒ (name) { this.name = name; }
console.log(Fn_02.prototype) //* {sayHello: ƒ, constructor: ƒ}
console.log(Fn_02.__proto__) //* ƒ () { [native code] }
const me = new Fn_02('Lee')
const you = new Fn_02('Jung')

me.sayHello(); //* Hi! My name is Lee
you.sayHello(); //* Hi! My name is Jung

//* Person 생성자 함수를 통해 생성된 모든 객체는
//* 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.
console.clear()



//? 19-29 ~ 19-35 : 프로토타입 체인
// 19-29
const Fn_03 = function(phone) {
  this.phone = phone;
}

//* 프로토타입 메서드
Fn_03.prototype.Phone = function() {
  console.log(`I use ${this.phone}`);
}

const person_01 = new Fn_03('Galaxy 21 S')

console.log(Object.prototype)
console.log(person_01.__proto__)
console.log(person_01)

console.log(person_01.hasOwnProperty('phone')) //* true
//* hasOwnProperty는 Object.prototype의 메서드다.
//* person_01 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색해서 사용한다.

person_01.Phone();
// console.clear()


// 19-30 ~ 19-33
console.log(Object.getPrototypeOf(person_01) === Fn_03.prototype) //* true
//* person_01 객체의 프로토타입은 Fn_03.prototype과 같다.

console.log(Object.getPrototypeOf(Fn_03.prototype) === Object.prototype) //* true
//* Fn_03 객체의 프로토타입은 Object.prototype과 같다.

console.log(person_01.hasOwnProperty('phone')); //* true
console.log(Object.prototype.hasOwnProperty.call(person_01, 'phone')) //* true
console.clear()


// 19-34
console.log(Object.prototype.randommethod) //* undefined
//* 프로토타입 체인의 종점인 Object.prototype에서도 메소드 검색이 불가능한 경우
//* undefined가 반환된다 (에러가 발생하지 않음에 주의)
console.clear()



//? 19-36 ~ 19-39 : 오버라이딩과 프로퍼티 섀도잉
// 19-36
const Fn_04 = (function () {
  //* 생성자 함수
  function smartphone(name) {
    this.name = name;
  }

  //* 프로토타입 메서드
  smartphone.prototype.phonename = function () {
    console.log(`I use ${this.name}`)
  }

  //* 생성자 함수를 반환
  return smartphone
}());

const myphone = new Fn_04('Samsung Galaxy');
console.log(myphone)

//* 인스턴스 메서드
myphone.phonename = function () {
  console.log(`I use ${this.name}`)
}

//* 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
myphone.phonename(); //* I use Samsung Galaxy


// 19-37 ~ 19-39
console.log(myphone) //* smartphone {name: 'Samsung Galaxy', phonename: ƒ}
delete myphone.phonename;
console.log(myphone) //* smartphone {name: 'Samsung Galaxy'}
myphone.phonename() //* I use Samsung Galaxy
console.log(Fn_04.prototype) //* {phonename: ƒ, constructor: ƒ}
//* myphone 인스턴스에서 phonename 메서드를 삭제했더라도
//* smartphone.prototype에 phonename 메서드가 있으므로 동작한다.

delete myphone.phonename; //* 프로토타입 체인을 통해 상위의 메소드 삭제 시도
myphone.phonename() //* I use Samsung Galaxy (하위 객체를 통해 프로토타입의 프로퍼티를 변경, 삭제할 수 없음)

delete Fn_04.prototype.phonename; //* 프로토타입 프로퍼티 제거를 위해서는 프로토타입에 직접 접근해야 함
// myphone.phonename() //* Uncaught TypeError: myphone.phonename is not a function
console.clear()



//? 19-40 ~ 19-45: 프로토타입의 교체
// 19-40 ~ 19-41 : 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
const Fn_05 = (function(){
  function Note(name) {
    this.name = name
  }

  Note.prototype = {
    OwnNote() {
      console.log(`I use ${this.name}`);
    }
  };

  return Note;
}());

const mynote = new Fn_05('legalPad')

console.log(Fn_05)  //* ƒ Note(name) { this.name = name }
console.log(Fn_05.prototype) //* {OwnNote: ƒ}
console.log(mynote)
console.log(mynote.constructor) //* ƒ Object() { [native code] }
console.log(Object) //* ƒ Object() { [native code] }

console.log(mynote.constructor === Fn_05) //* false
//* 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간 연결이 파괴됨
console.log(mynote.constructor === Object) //* true
//* 프로토타입 체인을 따라 Object.constructor 프로퍼티가 검색된다.
//* console.clear()


// 19-42 :
// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체 + constructor 추가
const Fn_06 = (function(){
  function Note(name) {
    this.name = name
  }

  Note.prototype = {
    constructor: Note,
    //* constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    OwnNote() {
      console.log(`I use ${this.name}`);
    }
  };

  return Note;
}());

const mynote_02 = new Fn_06('handNote')

console.log(Fn_06)
console.log(Fn_06.prototype) //* {constructor: ƒ, OwnNote: ƒ}
console.log(mynote_02.constructor) //* ƒ Note(name) { this.name = name }
console.log(Fn_06) //* ƒ Note(name) { this.name = name }
console.log(Object) //* ƒ Object() { [native code] }

console.log(mynote_02.constructor === Fn_06) //* true
//* constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(mynote_02.constructor === Object) //* false
 
 

