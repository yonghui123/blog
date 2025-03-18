export let activeEffect = null;
export const targetMap = new WeakMap(); // 通过对象target保存对象和其属性的依赖
const effectStack = [];


export function effect(fn) {
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanUp(environment);
      return fn();

    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1]; 
    }
  };
  environment.deps = [];
  environment();
}

function cleanUp(effect) {
  let deps = effect.deps;
  if(deps.length) {
    deps.forEach(dep => {
      dep.delete(environment)
    });
    deps.length = 0;
  }
}


