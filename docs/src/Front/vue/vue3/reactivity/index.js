import { reactive } from "./reactive.js";

const obj = {
  name: "why",
  age: 18,
  gender: "male",
  project: {
    frontend: "vue",
    backend: "node"
  }
};

// const proxyObj = reactive(obj);

// // proxyObj.name = 'Jhon';
// // proxyObj.grade = 100;

// // 'age' in proxyObj;

// for(const key in proxyObj) {
//   proxyObj[key];
// }

const arr = ['1', obj, '2'];
const proxyArr = reactive(arr);
// proxyArr[0];
// for (const key in proxyArr) {
//   proxyArr[key];
// }

// console.log(proxyArr.includes(obj))

// proxyArr.length = 1;