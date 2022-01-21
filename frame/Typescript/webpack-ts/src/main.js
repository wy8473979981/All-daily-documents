"use strict";
document.write("Hello Webpack TS!");
// const studentBodyInfo:Pick<StudentInfos, 'tall' | 'weight'> = {
// 	tall: 165,
// 	weight: 120,
// }
// const studentParentsInfo:Pick<StudentInfos, 'mother' | 'father'> = {
// 	mother: 'mother',
// 	father: 'father',
// }
// const someStudentsInfo: Partial<StudentInfos> = {
//   tall: 165,
//   weight: 120,
//   mother: "mother",
// };
// type PickWithPartial<T, K extends keyof T> = {
//   [P in K]?: T[P];
// };
// const someStudentBodyInfo:PickWithPartial<StudentInfos, 'tall' | 'weight'> = {
// tall: 165
// }
// type name = Exclude<'小明' | '小张', '小张' | '小王'>
// type name = Exclude<'小明' | '小张', '小张' | '小王'>
// type RecordKeys = 'a' | 1;
// const a : Record<RecordKeys, string> = {
// 	a: 'a',
// 	1: 'a'
// }
// 关键字操作符
// 1.typeof 在 TypeScript 中， typeof 操作符可以用来获取一个变量或对象的类型。
// interface Person {
//   name: string;
//   age: number;
// }
// const sem: Person = { name: "semlinker", age: 30 };
// type Sem = typeof sem; // type Sem = Person
// // 在上面代码中，我们通过 typeof 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型
// const sem1: Sem = { name: "semlinker", age: 30 };
// 2.in 遍历
// type Names = "xiaoming" | "zhangsan";
// type Obj = {
//   [k in Names]: k;
// };
// let obj: Obj = {
//   xiaoming: "xiaoming",
//   zhangsan: "zhangsan",
// };
// 3.keyof 获取类，对象，接口的所有属性名组成的联合类型
// 接口
// interface Person {
//   name: string;
//   age: number;
// }
// type K1 = keyof Person;   // "name" | "age"
// type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
// // 对象
// let obj = { name: 'tao', age: 18 }
// // type newobj = typeof obj
// // type keyofObj = keyof newobj  //name | age
// type keyofObj = keyof typeof obj  //简写 name | age
// let newObj1: keyofObj = 'name'    //正确
// let newObj2: keyofObj = 'namexx'  //错误
// // 类
// class User {
//   constructor(public username: string, public age: number) { }
// }
// type UserType = keyof User  //username | age
// let userValue: UserType = 'username'
// type studentName = NonNullable<string | null | undefined> // string
// class Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   static isAnimal(instantce: any) {
//     return instantce instanceof Animal;
//   }
//   eat() {
//     console.log(`${this.name} is eating`);
//   }
// }
// const dog = new Animal("旺财");
// dog.eat(); //旺财 is eating
// Animal.isAnimal(dog); //true
// type boy = { name: string; age: number; mustache: string };
// type girl = { name: string; age: number };
// //交叉类型
// let result1: boy & girl = {
//   name: "tao",
//   age: 28,
//   mustache: "胡子",
// };
// console.log(result1.name); // 能.出所有属性
// //联合类型
// let result2: boy | girl = {
//   name: "shen",
//   age: 18,
//   mustache: "胡子",
// };
// console.log(result2.name); //只能.age和name（共有属性）
// console.log(result2.age); //只能.age和name（共有属性）
// console.log(result2.mustache); //只能.age和name（共有属性）
// tsc index.ts --strictNullChecks  //该命令可以检测null
//可选参数的处理
// function fn(x:number, y?:number){
//     return x + (y || 0)
// }
// fn(1, 2)
// fn(1)
// fn(1, undefined)
// // fn(1, null)  //报错
// //可选属性的处理
// class C{
//     a:number,
//     b?:number
// }
// let c = new C()
// c.a = 12
// c.a = undefined  //报错
// c.b = 13
// c.b = undefined  //可选的默认是undefined
// c.b = null       //报错，null不能赋值给联合类型或undefined 
// // 正常情况下，name不会为null
// // 但是ts编译器过不了，会认为name有可能为null
// // 因为编译器无法处理嵌套函数里的null，解决方法：name加！号
// function fn(name:string | null): string {
//     function postfix(epither:string){
//         return name!.charAt(0) + '. the' + epither
//     }
//     name = name || 'Bob'  
//     return postfix(name)
// }
// 写法一：
// 如果不断言，可能拿不到length，因为有可能传number
// function getLength(input:number | string):number{
//     const str = input as String  //断言为string
//     if(str.length){ //可以使用string的length
//         return str.length
//     }else{
//         const number as Number  //断言为number
//         return number.toString().length
//     }
// }
// 写法二：断言写法二
// function getLength(input:number | string):number{
//     if((<string>input).length){
//         return (<string>input).length
//     }else{
//         return input.toString().length
//     }
// }
//# sourceMappingURL=main.js.map