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
    <span class="text">按钮</span>
    <!-- <- 插槽内容 -->
  </Button>
</template>
<!-- 子组件中定义该片段渲染的位置（插槽出口） -->
<template>
  <button>
    <slot></slot>
    <!-- <- 插槽出口 -->
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

## key 的本质

key 的作用：vue 在更新 dom 的时候，会通过 key 值，来判断当前元素是否发生了改变，如果没有发生改变则会复用，大大提高了更新的效率。

## 插件

插件的作用：扩展 vue 的功能，比如：添加全局组件，添加全局指令，添加全局过滤器，添加全局方法等。

## vue-router

在单页面应用中，通过对路由信息变化的拦截，阻止浏览器重新向浏览器发出请求，根据路由信息与已经注册在路由中的组件进行匹配，从而渲染新的组件。
在 vue 中主要使用的路由模式有：

- hash 模式：在浏览器的路由中，hash 值是 URL 组成的一部分，通常#之后的内容代表 URL 的 hash 值，在早起，hash 值更多的用作页面锚点。因为 hash 值的变化不会请求服务器
  所以在单页面应用中通过监听 hash 值**(`hashChange`)**的变化，通过 hash 值去匹配路由表，从而渲染新的组件。
- HTML5 模式：在 HTML5 中提供了对路由监听，修改的一套 API
  - `history.pushState(state, title, url)`：向浏览器的历史记录中添加一条记录
  - `history.replaceState(state, title, url)`：替换当前历史记录
  - `window.onpopstate`：监听浏览器原生的前进后退（浏览器左上角的前进后退按钮）事件
    HTML5 工作模式：
  1. 客户端拦截所有的链接点击事件，阻止其默认行为。
  2. 路由管理器使用`history.pushState(state, title, url)`或者`history.replaceState(state, title, url)`方法，更新 URL
  3. 当 URL 变化的时候，路由管理器会捕捉到这个变化。
  4. 根据新的 URL，查找预先定义好的路由规则，加载相应的组件

## vue3 自定义 ref

在 vue3 中，通过`customRef`来自定义一个响应式的数据，可以在原有响应式的基础上添加一些额外的逻辑。  
比如：自定义一个防抖的值，在输入框中使用：

```js
import { customRef } from "vue";

function debounce(fn, delay = 500) {
  let timer = null;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function debounceRef(value, delay = 500) {
  return customRef((track, trigger) => {
    let _value = value;
    let debounceFn = debounce((newValue) => {
      _value = newValue;
      trigger();
    });
    return {
      get() {
        track();
        return _value;
      },
      set(newValue) {
        debounceFn(newValue);
      },
    };
  });
}
```

## 使用 vue 实现虚拟列表

原理：设置一个可视区域，然后用户在滚动列表的时候，本质上是**动态修改可视区域里面的内容**

### 1. 列表中每一项的高度都是固定的虚拟列表

要计算渲染内容需要知道以下信息：

1. 可视区域起始数据索引
2. 可视区域结束数据索引
3. 可视区域的数据
4. 整个列表中偏移的位置

所以整个虚拟列表的设计如下：

```html
<div class="infinite-list-container">
  <!-- 设置一个高度为总列表高度的div，用于固定高度，形成滚动条 -->
  <div class="infinite-list-phantom"></div>
  <!-- 元素的可视区域 -->
  <div class="infinite-list">
    <!-- item1 -->
    <!-- item2 -->
    <!-- item3 -->
  </div>
</div>
```

虚拟列表滚动的步骤：

1. 监听`infinite-list-container`的滚动事件，获取滚动的高度 scrollTop，并且假定以下条件：

   - 可视区域的高度是固定的，称为`screenHeight`
   - 列表每一项的高度是固定的，称为`itemHeight`
   - 列表数据称为`listData`
   - 当前滚动高度为`scrollTop`

2. 计算出以下信息：

   - 列表的总高度： `totalHeight = listData.length * itemHeight`
   - 可以显示的列表项数： `visibleItemCount = Math.ceil(screenHeight / itemHeight)`
   - 可视区域起始数据索引： `startIndex = Math.floor(scrollTop / itemHeight)`
   - 可视区域结束数据索引： `endIndex = startIndex + visibleItemCount`
   - 可视区域数据： `visibleData = listData.slice(startIndex, endIndex)`

3. 当发生滚动之后，由于渲染区域相对于可视区域发生了偏移，因此需要计算出这个偏移量，然后使用 transform 属性移动回可视区域
   `startOffset = scrollTop - (scrollTop % itemHeight)`
   将滚动的偏移量与列表顶部进行对齐，避免显示不完整的列表项

```vue
<script setup>
import { computed, ref, onMounted } from "vue";

const props = defineProps({
  listData: Array,
  itemHeight: Number,
});
const listContainerRef = ref(null);
const screenHeight = ref(0);
const startIndex = ref(0);
const endIndex = ref(0);
// 总列表高度
const totalHeight = computed(() => props.listData.length * props.itemHeight);
// 列表项数
const visibleItemCount = computed(() => Math.ceil(screenHeight / props.itemHeight));

const visibleData = computed(() => props.listData.slice(startIndex.value, Math.min(endIndex.value, props.listData.length)));

// 向下位移的距离
const startOffset = ref(0)
const listTransform = computed(() => `translateY(${startOffset.value}px)`);

const scrollHandler = (e) =>{
  let scrollTop = e.target.scrollTop;
  startIndex.value = Math.floor(scrollTop / props.itemHeight);
  endIndex.value = startIndex.value + visibleItemCount.value;
  startOffset.value = scrollTop - (scrollTop % props.itemHeight);
}

onMounted(() => {
  screenHeight.value = listContainerRef.value.clientHeight;
  startIndex.value = 0;
  endIndex.value = visibleItemCount.value;
});
</script>
```

### 2. 列表中每一项的高度都不固定的虚拟列表
由于每一项高度不固定，所以所有关于`itemHeight`的计算都会变得不准确。包括：
  - 列表的总高度： totalHeight
  - 渲染列表的偏移量：startOffset
  - 渲染列表的项目：包含起始索引，结束索引和数据

如何解决这些问题：
  1. 如何获取真实高度？  
  在实际渲染之前，无法获取到包括每一项的真实高度，以及列表的总高度，所以一个理想的状态是：提供一个预估的高度，在初始化的时候，使用预估的高度去计算，并维护一个高度的列表，当真实高度计算出来之后，再进行替换。

```vue
<script setup>
import { computed, ref, onMounted, watch, onUpdated } from "vue";
const props = defineProps({
  listData: Array,
  itemHeight: Number,
  estimateItemHeight: Number, // 预估的高度
});

const positions = [];
const initPositions = () => {
  positions = props.listData.map((_, index) => {
    return {
      index,
      height: props.estimateItemHeight,
      top: index * props.estimateItemHeight,
      bottom: (index + 1) * props.estimateItemHeight
    }
  })
}


// 每一个列表项对应一个itemRef
const listItemRefs = ref([]);
const updatePositions = () => {
  listItemRefs.value.forEach((node, index) => {
    // 获取真实高度
    const height = node.getBoundingClientRect().height;
    // 获取预估高度（可能已经更新过了，所以计算两个高度差，有高度差的时候更新）
    const estimateHeight = positions[index].height;
    let diffHeight = height - estimateHeight;
    if(diffHeight !== 0){
      positions[index].height = height;
      positions[index].bottom += diffHeight;
      // 更新之后的高度
      for(let i = index + 1; i < positions.length; i++){
        // 下一个的top，是上一个的bottom
        positions[i].top = positions[i - 1].bottom;
        positions[i].bottom += diffHeight;
      }
    }
  })
}

const totalHeight = ref(0);

const listContainerRef = ref(null);
const screenHeight = ref(0);

const startIndex = ref(0);
const endIndex = ref(0);
const startOffset = ref('');
const visibleData = ref([]);
const getStartIndex = (scrollTop) => {
  return positions.find((item, index) => {
    return item.top >= scrollTop
  })
}

const getEndIndex = (scrollTop) => {
  const screenBottom = scrollTop + screenHeight.value;
  return positions.find((item, index) => {
    return item.bottom >= screenBottom
  })
}

const getListOffset = () => {
  return positions[startIndex.value - 1].bottom + 'px';
}

const scrollHandler = (e) => {
  let scrollTop = e.target.scrollTop;
  startIndex.value = getStartIndex(scrollTop).index;
  endIndex.value = getEndIndex(scrollTop).index;
  visibleData.value = props.listData.slice(startIndex.value, endIndex.value);
}

onUpdated(() => {
  // 保证dom更新完成
  nextTick(() => {
    if(!listItemRefs.value.length) return;
    // 统计更新之后的高度
    updatePositions();
    // 更新虚拟列表的高度
    totalHeight.value = positions[positions.length - 1].bottom;
    // 设置列表偏移量
    startOffset.value = getListOffset();
  })
})

onMounted(() => {
  initPositions();
  totalHeight.value = positions[positions.length - 1].bottom;
  screenHeight.value = listContainerRef.value.clientHeight;
})

watch(() => props.listData, () => {
  initPositions();
})
</script>

```