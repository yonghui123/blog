// 实现reactive API。 该方法接受一个对象。返回一个代理对象
import handlers from "./handlers/index.js"
import { isObject, ReactiveFlags } from "./util.js";

const proxyMap = new WeakMap();



export function reactive(target) {

  if(!isObject(target)) {
    return target
  }

  if(proxyMap.has(target)) {
    return proxyMap.get(target)
  }

  const proxy = new Proxy(target, handlers)
  proxyMap.set(target, proxy)

  return proxy;
}