### p标签嵌套
p标签的省略规则，开始标签是必要的，如果开始标签后紧跟着下列标签，或者父元素没有其他内容，且父元素不是a标签，则可以省略结束标签
```html
<p class="p">p标签<p class="pp">嵌套p标签</p></p>
<p class="p">p标签<div class="pdiv">嵌套div标签</div></p>
<p>p标签<h1>嵌套h1标签</h1></p>
<p>p标签<ul>嵌套ul标签</ul></p>
<p>p标签<ol>嵌套ol标签</ol></p>
<p>p标签<li>嵌套li标签</li></p>
<p>p标签<table>嵌套table标签</table></p>
<p>p标签<form>嵌套form标签</form></p>
<p>p标签<section>嵌套section标签</section></p>
<p>p标签<nav>嵌套nav标签</nav></p>
<p>p标签<hr>嵌套hr标签</hr></p>
<p>p标签<article>嵌套article标签</article></p>
<p>p标签<aside>嵌套aside标签</aside></p>
<p>p标签<footer>嵌套footer标签</footer></p>

<p>p标签</p>
<div>嵌套div标签</div>
<p></p>
```

### jsDoc
在js中定义详细的类型，好处
1. 编辑器中识别需要的变量，函数等
2. 调用代码的时候给出对应的提示

使用
1. 最常用的为函数添加注释

```javascript
/**
 * @description 获取用户
 * @param {String} name 用户名字
 * @param {Number} age  用户年龄
 */
function getPerson(name, age) {
  
}
```
函数参数过长，通过一个对象来封装参数，需要额外定义对象的类型
```javascript
/**
 * @typedef {Object} Person
 * @property {string} name 名字
 * @property {number} age 年龄
 */
/**
 * @description 获取用户
 * @param {Person} person 用户信息
 */
function getPerson(person) {
  
}
```
参数为对象数组，比如常见的渲染列表
```javascript
/**
 * @typedef {Object} Person
 * @property {string} name 名字
 * @property {number} age 年龄
 */
/**
 * @description 获取用户
 * @param {Array<Person>} personList 用户信息
 */
function renderPerson(personList) {}
```
返回值和参数类型相似，使用@return来定义
2. 函数的参数或者返回值为一个函数
```javascript
/**
 * @description 创建一个函数
 * @param {(content: string) => void} success 成功回调
 * @param {(error: string) => void} fail 失败回调
 * @return {(res: string) =>  void} 
 */
function createFunction(success, fail) {
  return (res) => {}
}
```
或者返回一个promise
```javascript
/**
 * @return {Promise<number>}
 */
function testPromise() {
  return new Promise(function(resolve, reject) {
    resolve(1)
  })
}
```
4. 为变量标注类型
```javascript
/** @type {HTMLCanvasElement} */
var canvas = document.createElement('canvas');
/** @type {number} */
var number = 1;
```

### 字符串填充
将字符串前面补充到指定长度
```javascript
var str1 = "4"
str1.padStart(5, '0');
// 结果： 00004
```
在字符串后面补充到指定长度
```javascript
var str1 = "4";
str1.padEnd(5, "*");
// 结果： 5****
```

### css Grid 布局
通过grid布局划分区域
```css
.grid {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: 
  "A A B"
  "C D B"
  "C E E";
  border: 1px solid #eeeeee;
}
.grid-item {
  border: 1px solid #eeeeee;
  margin: 2px;
}
.item1 {
  grid-area: A;
}

.item2 {
  grid-area: B;
}

.item3 {
  grid-area: D;
}

.item4 {
  grid-area: E;
}

.item5 {
  grid-area: C;
}
```
```html
<div class="grid">
  <div class="grid-item item1"></div>
  <div class="grid-item item2"></div>
  <div class="grid-item item3"></div>
  <div class="grid-item item4"></div>
  <div class="grid-item item5"></div>
</div>
```
### ESM导入问题
在模块中导出数据
```javascript
// moduleA
export let count = 1;
export function incrementCount() {
  count++;
}
```
获取模块中导出的数据
```javascript
import {count, incrementCount} from "./moduleA";
console.log(count);
incrementCount();
console.log(count);
```
在ESM中``` import {count, incrementCount} from "./module" ``` 这样的导入，叫做具名导入
在js中解构数据
```javascript
function moduleA() {
  let count = 1;
  function incrementCount() {
    count++;
  }
  return {count, incrementCount};
}

const {count, incrementCount} = moduleA();
console.log(count);
incrementCount();
console.log(count);
```
在ESM中导入导出的是同一块内存地址，这个现象叫做符号绑定
