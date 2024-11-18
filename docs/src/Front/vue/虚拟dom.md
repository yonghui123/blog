

## DOM执行的顺序

### 从js代码到浏览器引擎中c++代码的过程

逆推： 从cpp到js中间有几个流程？以`document.createElement`为例

1. 在浏览器中，定义document的接口，并使用cpp实现这些接口，比如`document.createElement`

2. 通过webIDL（web interface definition language）将cpp实现的接口绑定到js中，告诉js如何调用这些接口

3. 在js引擎中，注册绑定的代码

4. js 引擎解析js代码。

所以，当我们在代码中调用`document.createElement`时，会执行以下步骤
1. js引擎解析js代码；
2. 当解析到`document.createElement`时，会将其解析成一个API调用
3. 如果发现是js与浏览器内核之间的一个接口，会通过绑定层，将js的函数调用转换为cpp的函数调用，绑定层会将js的参数安全的传递给cpp
4. 到了cpp成，会调用相应的cpp函数，并得到结果
5. cpp进行内存分配等工作，得到结果后，将结果给到绑定层，绑定层将cpp对象包装成一个js对象，js代码中就可以像使用正常对象一样使用这个DOM元素
6. js引擎执行赋值操作，赋值给用户的变量，完成整个过程。

## 什么是虚拟DOM？
> 虚拟DOM是一个编程的概念，将UI以某种理想化的表现形式存储在内存中。理论上来讲，无论用什么结构，只要可以将文档结构描述出来，就可以认为他是虚拟DOM。
> 通常都是使用js对象来描述，目前主流的框架都是使用js对象来描述。

在vue中调用h函数，就可以得到一个vnode，就是虚拟DOM

```js
import { h } from 'vue'
const vnode = h('div', 'hello')
console.log(vnode) // { type: 'div', children: 'hello' }
```

## 为什么需要虚拟DOM？
因为使用了虚拟DOM可以提升效率，这个效率其实可以分为两方面：
1. 开发效率
对于开发来说，浏览器提供了一整套操作dom的API，比如：
```js
//  1. 创建一个div
const div = document.createElement('div')
// 2. 获取一个div，并设置其文本内容
const div2 = document.querySelector('#div')
div2.innerText = 'hello'
// 3. 删除一个节点
const parent = div2.parentNode;
parent.removeChild(div2)
// 4. 插入一个节点
const div3 = document.createElement('div')
const p = document.createElement('p')
p.innerText = 'hello'
div3.appendChild(p)
```
直接调用这些API的执行效率一定是最高的，但是这样的操作，我们往往需要为了一点点的修改而写大量的代码。  
而浏览器为了解决这个问题，也提供了一个`innerHTML`的方式去修改dom。但是使用`innerHTML`的方式，会有两个问题：
  1. 性能问题：使用innerHTML的方式，代码执行会经历两个阶段，解析字符串 -> 创建DOM。
  2. 有大量的DOM标签样式的字符串存在于JS代码中
但是，相对于这样的问题，在开发的时候，也更倾向于使用`innerHTML`的方式。

在使用虚拟DOM的时候，也会经历两个阶段： JS运算 -> 创建DOM。
但是在使用虚拟DOM的时候，对js对象的操作方法会更清晰，代码层次更分明。开发效率也会更高。  
尤其是在使用基于虚拟DOM的框架（比如vue,react）开发的时候，代码可维护性更高，

2. 性能效率
在性能效率上，最高的一定还是浏览器提供的原生DOM API。

在初次渲染的时候，使用innerHTML和使用虚拟DOM的差距其实不大，宏观上看都需要做个层面的计算和操作

但是当页面更新的时候，使用innerHTML需要的操作：
1. 删除旧的DOM元素
2. 解析新的字符串
3. 重新生成新的DOM元素

而使用虚拟DOM涉及的操作有：
1. 通过diff计算出需要更新的节点
2. 更新需要更新的节点

因为通过结算只更新需要更新的节点，所以在大多数情况下（通常认为，一个页面中大部分属于静态部分），虚拟DOM的更新效率是比直接innerHTML 更高的。

第三点效率提升，也是性能上面的，在没有虚拟DOM的时候，我们直接使用DOM API进行操作。通常是会将某一块直接全部替换掉，因为不好区分对比哪些是静态的，哪些是动态的（内存中通常不会保存，都是在需要的时候才去获取）。
而更多的DOM操作，也会比js操作要慢很多（因为需要js和cpp进行通信）。所以我们也可以说是使用更多的js计算，换取更少的DOM操作。

## 使用虚拟DOM的好处

1. 跨平台性：虚拟 DOM实际上是增加了一层抽象层，将用户代码和底层操作DOM的API进行了隔离，这其实就是设计模式中的依赖倒置原则

> 依赖倒置原则： 高层次的模块不应该依赖于低层次的模块（底层DOM接口），二者都应该依赖于抽象（虚拟DOM）。
加一层抽象的好处，高层次的（用户代码）模块只关心虚拟DOM，而抽象层已经可以描述UI的结构。底层代码只需要实现虚拟DOM到DOM的转换，就可以在任意平台上进行渲染，而不局限于浏览器

2. 使用虚拟DOM的框架更灵活

比如React框架从15升级到16，内部处理虚拟DOM的方法也从Stack改成了Fiber，但是React对用户提供的API并没有改变，所以用户代码完全无感知

## vue中的模板

vue在运行的过程中本身是不需要模版的，只需要有渲染函数，以及调用渲染函数之后的虚拟DOM。  
但是使用渲染函数，对开发者的开发和学习成本太大。  
所以vue允许使用模版的方式来描述视图，而vue使用模版引擎将模版编译成虚拟DOM。    
模版其实就是特定形式的字符串。    
模版引擎中主要分为三个部分：
1. 解析器： 将模版字符串解析成模板抽象语法树（AST）
2. 转换器： 将模版AST转换成jsAST
3. 生成器： 根据jsAST生成渲染函数

