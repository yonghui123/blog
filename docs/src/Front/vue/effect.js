let activeEffect = null;
const targetMap = new Map();
function track(target, key) {
  if (activeEffect) {
    deps = targetMap.get(key);
    if(!deps) {
      deps = new Set();
      targetMap.set(key, deps);
    }
    deps.add(activeEffect);
    activeEffect.depList.push(deps);
  }
  console.log("重新执行了收集依赖的函数", key)
}

function trigger(target, key) {
  console.log('trigger function key: ', key);
  const deps = targetMap.get(key);
  if(deps) {
    // set: [effec1.name, effect2.name]
    // 执行第一个effect1.name 将effect1.name从依赖集合中移除，重新收集依赖，添加到set集合末尾
    // 执行第二个effect2.name 将effect2.name从依赖集合中移除，重新收集依赖，添加到set集合末尾
    // 等于说deps 中的effect1.name 和 effect2.name 一直在不断删除老的依赖，增加新的依赖到末尾，所以两个effect会不断交替执行
    // 解决方案：重新创建一个新的专门用于执行effect的集合
    const runDeps = new Set(deps);
    runDeps.forEach((effect, index) => {
      console.log('deps run key: ', deps);
      effect();
    })
  }
}

const obj = {
  name: "zfb",
  age: 18,
  gender: "male",
  address: {
    city: "beijing",
    street: "beijing street",
  },
};

const state = new Proxy(obj, {
  get(target, key, receiver) {
    track(target, key);
    return target[key];
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value);
    trigger(target, key);
    return result;
  },
});

function cleanup(environment) {
  let depList = environment.depList;
  if(depList) {
    for(let i = 0; i < depList.length; i++) {
      const deps = depList[i];
      deps.delete(environment);
      if(deps.size === 0) {
        targetMap.delete(deps);
      }
    }
  }
  environment.depList.length = 0;
}

function effect(fn) {
  const environment = () => {
    activeEffect = environment;
    // 在重新收集之前，清空上一次保存的依赖
    cleanup(environment);
    // fn里面包含了对响应式数据的访问，会通过track收集依赖
    fn();
    activeEffect = null;
  };
  environment.depList = []; // 记录一下当前执行的effect函数在那些集合里面
  environment();
}

// 测试用例
effect(() => {
  if (state.name === "zfb") {
    state.age;
  } else {
    state.gender;
  }
  console.log("运行了第一个effect");
});

// 在track函数中，每次state.name被访问时，都会重新添加当前的activeEffect到依赖集合中
// 而在trigger函数中，当state.name被修改时，会触发所有state.name的effect函数，
// 这些effect函数中，又会重新访问state.name，从而导致了无限循环，具体来讲：
//  1. 初始执行effect时，state.name的值为zfb，因此第一个effect会访问state.name，和state.age，第二个会访问state.name，和state.age,
//  2. state.name 被修改的时候，tragger函数会触发所有依赖state.name的effect函数
//  3. 第二个Effect函数触发的时候，会访问state.name，会将第二个effect函数添加到依赖集合中
//  4. 因为state.name的值被修改，会再次触发trigger，导致第二个effect函数再次执行，如此循环往复，导致无限循环
effect(() => {
  state.name;
  state.age;
  console.log("运行了第二个effect");
});
state.name = 'wx'