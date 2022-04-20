//? 함수 호출 방식과 this 바인딩 : 일반 함수 호출
// 22-09
//* var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;

const obj = {
  "value": 100,
  method_01() {
    console.log('method_01_this: ', this);
    console.log('method_01_this.value: ', this.value);

    //* 메서드 내에서 정의한 중첩 함수
    function method_02() {
      console.log('method_02_this: ', this);
      console.log('method_02_this.value: ', this.value);
    }

    //* 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면
    //* 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    method_02();
  }
}

// obj.method_01();
console.clear();


// 22-10
var value_02 = 1;

const obj_02 = {
  "value_02": 1000,
  method_01() {
    console.log('method_02_this: ', this);
    console.log('method_02_this.value: ', this.value_02);
    //* 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function(){
      console.log('callback_this: ', this);
      console.log('callback_this.value: ', this.value_02);
    }, 3000);
  }
};

// obj_02.method_01();
console.clear();


// 22-11 : 메서드 내부 콜백함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기
var value_03 = 10;

const obj_03 = {
  "value_03": 2000,
  method_01() {
    //* this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    //* 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function(){
      console.log(that.value_03)
    }, 3000);
  }
};

// obj_03.method_01();



//? 메서드 호출
// 22-14
const obj_04 = {
  "name":"Ju won Lee",
  getName() {
    //* 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

//* 메서드 getName을 호출한 객체는 obj_04이다.
console.log(obj_04.getName()); //* Ju won Lee
console.clear();


// 22-15
const obj_05 = {
  "name":"Hee Jung Kang"
}
//* 메서드는 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체이다.
//* 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수 있다.
//* 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

//* getName 메서드를 obj_05 객체의 메서드로 할당
obj_05.getName = obj_04.getName;

//* 메서드 getName을 호출한 객체는 obj_05이다.
console.log(obj_05.getName())

//* getName 메서드를 변수에 할당
const ex_01 = obj_04.getName

//* getName 메서드를 일반 함수로 호출
console.log(ex_01()); //* ''
//* 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
//* 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
//* Node.js 환경에서 this.name은 undefined이다.
console.clear();


// 22-16
const Fn_01 = function(name) {
  this.name = name;
}

Fn_01.prototype.getName = function() {
  return this.name;
}

const new_01 = new Fn_01('Andrew')
console.log(new_01)
//* getName 메서드를 호출한 객체는 new_01이다.
console.log(new_01.getName()) //* Andrew

console.log(Fn_01.prototype)
Fn_01.prototype.name = 'Andrei'

//* getName 메서드를 호출한 객체는 Fn_01.prototype이다.
console.log(Fn_01.prototype.getName()); //* Andrei



//? 생성자 함수 호출
// 22-17
//* 생성자 함수
const Fn_02 = function(radius) {
  //* 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  }
}

//* 반지름이 5인 Circle 객체를 생성
const circle_01 = new Fn_02(5);
//* 반지름이 10인 Circle 객체를 생성
const circle_02 = new Fn_02(10);

console.log(circle_01.getDiameter()); //* 10
console.log(circle_02.getDiameter()); //* 20


// 22-18
//* new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.
const circle_03 = Fn_02(20)
//* 일반 함수로 호출된 Fn_02에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle_03) //* undefined
//* 일반 함수로 호출된 Fn_02 내부의 this는 전역 객체를 가리킨다.
console.log(radius) //* 20
console.clear();



//? Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// 22-19
const getThisBinding = function() {
  return this;
}

//* this로 사용할 객체
const thisArg = { "name":"Ju won Lee" }
console.log(getThisBinding()) //* window

//* getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); //* {name: 'Ju won Lee'}
console.log(getThisBinding.call(thisArg)); //* {name: 'Ju won Lee'}
console.clear();


// 22-20
const getThisBinding_02 = function() {
  console.log(arguments)
  return this
}

//* this로 사용할 객체
const Mycar = { "car_name":"카렌스 2" }

//* getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
//* apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding_02.apply(Mycar, [1, 2, 3]))
//* Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
//* {car_name: '카렌스 2'}

//* call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding_02.call(Mycar, 1, 2, 3))
//* Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
//* {car_name: '카렌스 2'}
console.clear();


// 22-22
const getThisBinding_03 = function() {
  return this;
}

//* this로 사용할 객체
const Mythis = { "drink":"Coca-Cola" }

//* bind 메서드는 첫 번째 인수로 전달한 Mythis로 this 바인딩이 교체된
//* getThisBinding_03 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding_03.bind(Mythis));
//* bind 메서드는 함수를 호출하지는 않으므로, 별도로 호출해야 한다.
console.log(getThisBinding_03.bind(Mythis)()); //* {drink: 'Coca-Cola'}
console.clear();


// 22-23 ~ 22-24 : bind의 활용
//* bind가 없는 경우 
const person = {
  "name":"Ju won Lee",
  nameMethod(callback) {
    setTimeout(callback, 3000);
  }
};

person.nameMethod(function () {
  console.log(`Hi! my name is ${this.name}`); //* Hi! my name is
  //* 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  //* 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
  //* Node.js 환경에서 this.name은 undefined이다.
})

//* bind를 사용하는 경우
const person_02 = {
  "name":"Ju won Lee",
  nameMethod(callback) {
    //* bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 3000);
  }
};

person_02.nameMethod(function () {
  console.log(`Hi! my name is ${this.name}`); //* Hi! my name is Ju won Lee
})
