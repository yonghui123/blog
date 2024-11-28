## 属性透传

在 vue 中独有的特性：在子组件中没有被声明为 props 的属性，依然能传递给子组件。常见的比如，id，class， style.
当父组件中调用子组件的时候，传入了这些属性，会直接绑定在子组件的根元素上。

### 细节：

1. 对 style 和 class 属性，会将子组件和父组件中设置的值进行合并，子组件中其他的同名属性， 子组件中的值会被忽略，应用父组件中设置的值

2. 深层组件集成：在某些情况下，子组件中的根组件是另一个组件，那么透传的属性会继续继续透传下去， 透传的属性不包括生命的 props 和 emit 中声明的 v-on 侦听函数

3. 如何禁用属性透传：

```vue
defineOptions({ inheritAttrs: false })
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

4. 多个根节点：在 vue3 中允许多个根节点的形式，这时如果不指定`$attrs`，会报出警告，因为无法确定透传到哪个元素上。这时需要手动指定透传到哪个元素上。

5. 在 js 中访问透传属性：

- 如果使用了`<script setup>`: vue 中提供了一个`useAttrs`方法，会返回绑定的属性
- 如果使用了`setup(props,ctx)`, 这些属性会放在 ctx 中，可以通过 ctx.attrs 获取

## 依赖注入

祖先组件使用 provide 向后代组件注入数据，后代组件使用 inject 获取注入的数据。

## 组合式函数

代码复用的一种方式，对有状态的逻辑进行复用，类似自定义 hooks.
极大地改善了 mixin 中来源不清晰，命名空间冲突等问题。
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
    el.focus();
  },
};
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
        el.focus();
      },
    },
  },
};
</script>
```

全局指令：

```js
// main.js
const app = createApp(App);
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
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
};
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
- vnode：绑定元素的底层 VNode
- prevNode：更新前的 VNode

> 不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为。

## 插槽

在设计子组件的时候，可能当下无法确定某些地方应该渲染成什么样子，只有在父组件实际调用的时候才会真正确定。  
父组件调用子组件时，希望子组件中可以接收父组件传递的模版片段，在指定的位置渲染这些片段。达到自定义的效果。

在 vue 中提供了插槽(`slot`)的方式，可以实现自定义渲染的内容。

在 vue 中使用插槽：

```vue
<!-- 父组件中调用子组件，传入想要渲染的内容（插槽内容） -->
<template>
  <Button>
    <span class="text">按钮</span> <!-- <- 插槽内容 -->
  </Button>
</template>
<!-- 子组件中定义该片段渲染的位置（插槽出口） -->
<template>
  <button>
    <slot></slot> <!-- <- 插槽出口 -->
  </button>
</template>
```

### 插槽作用域

在 vue 中模版只能访问其定义时所处的作用域，比如：插槽内容在父组件中定义，则如果内容中需要有表达式数据，能直接访问的只有父组件的数据，不能直接将子组件的数据拿来使用

### 插槽默认内容

在实际开发中，子组件的内容可能大部分情况下是相同的，只有极个别情况才会不一样，那么最好的做法是给插槽一个默认值

```vue
<template>
  <button>
    <slot><span class="text">submit</span></slot>
  </button>
</template>
```

在调用子组件的时候如果没有传入内容，则会使用默认内容。

### 具名插槽

为插槽起个名字，从而满足一个子组件中有多处需要自定义的部分。

```vue
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```
### 插槽传参数

```vue
<template>
  <MyComponent>
    <template #header="headerProps">
      {{ headerProps }}
    </template>

    <template #default="defaultProps">
      {{ defaultProps }}
    </template>

    <template #footer="footerProps">
      {{ footerProps }}
    </template>
  </MyComponent>
</template>
```

## key的本质
key的作用：vue在更新dom的时候，会通过key值，来判断当前元素是否发生了改变，如果没有发生改变则会复用，大大提高了更新的效率。  

## 插件

插件的作用：扩展vue的功能，比如：添加全局组件，添加全局指令，添加全局过滤器，添加全局方法等。 

## vue-router
在单页面应用中，通过对路由信息变化的拦截，阻止浏览器重新向浏览器发出请求，根据路由信息与已经注册在路由中的组件进行匹配，从而渲染新的组件。
在vue中主要使用的路由模式有：
  - hash模式：在浏览器的路由中，hash值是URL组成的一部分，通常#之后的内容代表URL的hash值，在早起，hash值更多的用作页面锚点。因为hash值的变化不会请求服务器
    所以在单页面应用中通过监听hash值**(`hashChange`)**的变化，通过hash值去匹配路由表，从而渲染新的组件。
  - HTML5模式：在HTML5中提供了对路由监听，修改的一套API
    - `history.pushState(state, title, url)`：向浏览器的历史记录中添加一条记录
    - `history.replaceState(state, title, url)`：替换当前历史记录
    - `window.onpopstate`：监听浏览器原生的前进后退（浏览器左上角的前进后退按钮）事件
    HTML5工作模式：
    1. 客户端拦截所有的链接点击事件，阻止其默认行为。
    2. 路由管理器使用`history.pushState(state, title, url)`或者`history.replaceState(state, title, url)`方法，更新URL
    3. 当URL变化的时候，路由管理器会捕捉到这个变化。
    4. 根据新的URL，查找预先定义好的路由规则，加载相应的组件

### 1. 对路由的拦截



