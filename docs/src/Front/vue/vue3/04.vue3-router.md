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

## vue3 router

### 1. RouterView 路由出口(视图)
页面路由匹配到的组件渲染的位置，就称为路由出口。通常情况下一个路由出口对应一个组件。

某些特殊情况下，一个路由对应多个组件，不同的组件需要渲染到不同的视图中，此时需要给视图设置不同的name加以区分。

比如有如下的路由配置:
```javascript
const router = createRouter({
  routes: [
    {
      path: "/",
      components: {
        default: Home,
        aside: Sidebar,
        header: Header
      }
    }
  ]
})
```

那么使用`<router-view>`渲染路由出口的时候需要定义三个渲染出口:
```vue
<template>

  <header>
    <router-view name="header"></router-view>
  </header>
  <div class="content">
    <router-view name="default"></router-view>
    <router-view name="aside"></router-view>
  </div>
</template>
```
如果视图没有设置名字，那么默认使用default。

### 2. 路由重定向（redirect）
在vue-router的路由配置中，设置重定向可以有三种方式:
1. redirect直接是一个路径
```js
redirect: '/home'
```
2. redirect是一个对象，可以配置重定向时携带的路由参数
```js
redirect: { name: 'home', params: { id: 1} }
```
3. redirect是一个函数，函数参数可以获取到要跳转的原始路由参数，动态返回一个路径
```js
redirect: (to) => {
  return `/home?id=${to.query.id}`
}
```
### 3. 路由懒加载
在路由配置中，component属性配置的是一个返回promise的函数，这意味着只有路由被访问的时候，才会加载对应的组件。

由于是动态导入，所以在打包的时候会在路由层面上对代码进行切割

相当于显式的定义了一个`defineAsyncComponent`

### 4. 路由匹配
可以对路由参数（params）的格式通过正则表达式进行限制。在参数后面加上一对小括号，里面可以写上正则表达式，比如`/user/:id(\\d+)`，表示id参数必须是数字。

`sensitive`属性表示是否忽略大小写，默认为false。
`strict`属性表示是否匹配末尾的斜杠，默认为false。

### 5. vue-router中的内置组件和函数

1. RouterLink中可以指定激活时的样式，添加对应的class:
  - `activeClass="router-link-active"`： 表示只要匹配到路由，就会添加该class，比如`/about`和`/about/me`都会匹配到，并添加`router-link-active`
  - `exact-active-class="router-link-exact-active"`：表示只有完全匹配的路由才会添加该class，比如`/about`和`/about/me`都会匹配，但`/about/me`不会添加该class

2. RouterView组件中暴露了一个插槽，这个插槽可以用来获取当前匹配的路由组件：
```vue
<template>
  <router-view v-slot="{Component}">
    <component :is="Component" />
  </router-view>
</template>
```
这样做可以方便的扩展一些其他功能：
  - keep-alive: 让组件保持活跃，在对路由组件使用的时候，通常是希望缓存实际渲染组件，而不是RouterView组件
  - transition: 添加动画效果，只对渲染组件添加过度动画，而不是RouterView组件

3. 内置函数
  - useRoute: 获取当前路由对象
  - useRouter: 获取路由实例
  - useLink: 可以获取到类似于RouterLink组件的所有属性，通常在自定义导航的时候使用
  ```vue
  <template>
    <a :href="link.href" @click.prevent="navigation" >
      <slot></slot>
    </a>
  </template>

  <script setup>
    import { useLink } from 'vue-router';
    const props = defineProps({
      to: {
        type: String,
        required: true
      }
    })
    const link = useLink(props);

    const navigation = () => {
      link.navigate();
    }
  </script>
  ```
  在自定义的过程中，可以加入自己项目的业务逻辑。

### 6. 路由守卫
在路由导航的时候，将其拦截下来，方便在跳转之前，做一些业务逻辑判断，并决定是否导航到该页面。

1. 全局路由守卫
  - 全局前置路由守卫(beforeEach)：在解析组件路由守卫和异步路由组件之前调用
  - 全局解析守卫(beforeResolve)：在导航被确认之前，组件守卫解析和异步路由组件解析之后
  - 全局后置守卫(afterEach)：导航被确认之后调用，该函数执行之后触发DOM更新。后置路由守卫常用于：
    - 记录页面访问历史：在路由跳转之后，记录当前路由的访问时间，方便后续做访问统计。
    - 关闭加载指示器：在跳转路由之前开启加载指示器，在路由跳转之后，关闭加载指示器
    - 添加页面标题：在路由跳转之后，添加页面标题
    - 页面切换动画：在afterEach中，添加页面切换的动画效果

2. 路由独享守卫
针对特定的路由设置单独的路由守卫`beforeEnter`,在路由配置中设置单独的守卫。

3. 组件内守卫
  - beforeRouteEnter：已经进入了该路由，组件开始渲染之前调用
  - beforeRouteUpdate：当前路由改变，但是该组件被复用时调用
  - beforeRouteLeave：离开当前路由，该组件被销毁之前调用

整体执行顺序：
1. 全局前置守卫(beforeEach)
2. 路由独享守卫(beforeEnter)
3. 组件内守卫(beforeRouteEnter)
4. 全局后置守卫(afterEach)
