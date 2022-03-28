// var obj = {
//   'name' : 'Lee',
//   'sayHi' : function(){
//     console.log('hi! '+this.name);
//   }
// }

var obj = {
  'name' : 'Lee',
  sayHi() {
    console.log('hi! '+this.name);
  }
}

obj.sayHi();