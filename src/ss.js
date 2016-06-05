var Person = function (name) {

    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}


var p1 = new Person("joshny");
p1.job='showmaker'
var p2 = new Person("payly");
var obj1={prop1:"ac"};
var obj2= Object.create(obj1);
var obj3= Object.create(null);

obj1.prop2="ffak"


var p3=new Object(p1);


Attribute binding to dynamic values (use $=):
<div class$="{{foo}}"></div>

p1.sayName();
p2.sayName();

//console.log(obj1.__proto__);


console.log(Object.getPrototypeOf(p2));
