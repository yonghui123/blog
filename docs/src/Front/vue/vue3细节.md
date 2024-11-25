
## 属性透传

在vue中独有的特性：在子组件中没有被声明为props的属性，依然能传递给子组件。常见的比如，id，class， style.
当父组件中调用子组件的时候，传入了这些属性，会直接绑定在子组件的根元素上。  

### 细节：
1. 对style和class属性，会将子组件和父组件中设置的值进行合并，子组件中其他的同名属性， 子组件中的值会被忽略，应用父组件中设置的值

2. 深层组件集成：在某些情况下，子组件中的根组件是另一个组件，那么透传的属性会继续继续透传下去， 透传的属性不包括生命的props和emit中声明的v-on侦听函数

3. 如何禁用属性透传：
```vue
defineOptions({
  inheritAttrs: false
})
```
除了可以禁用透传，还可以指定透传属性的位置
```vue
<template>
  <div>
    <!-- 禁用了透传之后，不会出现在默认的根元素上，而可以放在子组件中的任意一个元素中 -->
    <p v-bind="$attrs">子组件</p>
  </div>
</template>
```
4. 多个根节点：在vue3中允许多个根节点的形式，这时如果不指定`$attrs`，会报出警告，因为无法确定透传到哪个元素上。这时需要手动指定透传到哪个元素上。

5. 在js中访问透传属性：
  - 如果使用了`<script setup>`: vue中提供了一个`useAttrs`方法，会返回绑定的属性
  - 如果使用了`setup(props,ctx)`, 这些属性会放在ctx中，可以通过ctx.attrs获取
  
## 依赖注入

祖先组件使用provide向后代组件注入数据，后代组件使用inject获取注入的数据。

## 组合式函数

代码复用的一种方式，对有状态的逻辑进行复用，类似自定义hooks.
极大地改善了mixin中来源不清晰，命名空间冲突等问题。
组合式函数的命名，通常是使用`useXXX`的形式
返回值返回一个普通对象将响应式数据包裹。

## 自定义指令

自定义指令时另一种代码重用的方式，自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑
在组件中：
  1. 如果是用来了`<script setup>`的方式，则任何一个以`v`开头的对象，里面包含了类似组件生命周期钩子的成员属性，就可以视为一个自定义指令。
  ```vue 
  <script setup>
    const vFocus = {
      mounted(el) {
        el.focus()
      },
    }
  </script>
  ```
  2. 如果没有使用`<script setup>`，而是使用了`setup`函数的形式，自定义指令需要在`directive`中注册，然后通过`v-xxx`的形式来使用。
  ```vue
  <script>
    export default {
      setup() {},
      directives: {
        focus: {
          mounted(el) {
            el.focus()
          }
        }
      }
    }
  </script>
  ```
全局指令：
```js
// main.js
const app = createApp(App)
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

在指令中的钩子函数
```vue
<script setup>
const vDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {},
}
</script>
```

钩子函数的参数：
- el：指令所绑定的元素，可以用来直接操作 DOM 。
- binding：一个对象，包含以下属性：
  - value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，value 的值是 2。
  - oldValue：指令绑定的前一个值，仅在 beforeUpdate 和 updated 钩子中可用。无论值是否改变都可用。
  - arg：传给指令的参数，可选。例如，在 v-my-directive:foo 中，参数是 "foo"。
  - modifiers：一个包含修饰符的对象。例如，在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
  - dir：指令对象。
  - instance: 使用该指令的组件实例。
- vnode：绑定元素的底层VNode
- prevNode：更新前的VNode

> 不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为。



