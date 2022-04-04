// 예제 16-01
const o = {};
o.__proto__
console.log(o.__proto__)
console.clear()


// 16-02 : 프로퍼티 어트리뷰트
const person = {
  "name":"Lee",
  "age":"28"
}
console.log(Object.getOwnPropertyDescriptor(person, "age"))
console.log(Object.getOwnPropertyDescriptors(person))
console.clear()


// 16-06 : 접근자 프로퍼티
const book = {
  "book_01":"책_01",
  "book_02":"책_02",
  "book_03":"책_03",
  "book_04":"책_04",

  get fullName() {
    return `${this.book_01} ${this.book_02}`;
  },

  set fullName(name) {
    [this.book_01, this.book_02] = name.split(' ');
  }

};

console.log(book.book_01 + ' ' + book.book_02)
book.fullName = "책_01 책_02"
console.log(book);
console.log(book.fullName);


let descriptor = Object.getOwnPropertyDescriptor(book, 'book_01');
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(book, 'fullName');
console.log(descriptor)
console.clear()


// 16-07 : 접근자 프로퍼티와 데이터 프로퍼티의 구별
const obj_01 = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')
const obj_02 = Object.getOwnPropertyDescriptor(function(){}, 'prototype')
console.log(obj_01)
console.log(obj_02)
console.clear()


// 16-08 : 프로퍼티 정의
const person_name = {};

Object.defineProperty(person_name, 'firstName', {
  "value":"Juwon",
  "writable":"true",
  "enumerable":"true",
  "configurable":"true"
});

Object.defineProperty(person_name, 'lastName', {
  "value":"Lee"
})

console.log(person_name)
//* {firstName: 'Juwon', lastName: 'Lee'}

const descriptor_01 = Object.getOwnPropertyDescriptor(person_name, 'firstName')
console.log('firstName', descriptor_01)
//* value: 'Juwon', writable: true, enumerable: true, configurable: true

const descriptor_02 = Object.getOwnPropertyDescriptor(person_name, 'lastName')
console.log('lastName', descriptor_02)
//* value: 'Lee', writable: false, enumerable: false, configurable: false

person_name.lastName = 'Jung'
console.log('lastName', descriptor_02)
//* value: 'Lee', writable: false, enumerable: false, configurable: false
//? writable: false 인 경우 해당 프로퍼티의 value는 변경되지 않는다. 값 변경 시도를 하면 에러는 발생하지 않으나 무시된다.

delete person_name.lastName
console.log(person_name)
//? configurable: false 인 경우 해당 프로퍼티의 value는 삭제되지 않는다. 값 삭제 시도를 하면 에러는 발생하지 않으나 무시된다.

// Object.defineProperty(person_name, 'lastName', {writable: true})
//? configurable: false 인 경우 해당 프로퍼티를 재정의할 수 없다. 재정의 시도를 하면 에러가 발생한다.


Object.defineProperty(person_name, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});
console.log(person_name)

const descriptor_03 = Object.getOwnPropertyDescriptor(person_name, 'fullName');
console.log('fullName', descriptor_03);

person_name.fullName = 'Juwon Lee'
console.log(person_name)
console.clear()


// 16-09 : 여러 개의 프로퍼티를 한 번에 정의 (Object.defineProperties) 
const name_Obj = {};

Object.defineProperties(name_Obj, {
  firstName: {
    value:"Juwon",
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value:"Lee",
    writable: true,
    enumerable: true,
    configurable: true
  },
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
  }
});

console.log(name_Obj)
name_Obj.fullName = 'minsoo Kim';
console.log(name_Obj)


