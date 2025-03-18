import { ITERATE_KEY, TrackOptionTypes } from "../util.js";
import { activeEffect, targetMap } from "./effect.js";

let shouldTrack = true;

export function pauseTracking() {
  shouldTrack = false;
}

export function resumeTracking() {
  shouldTrack = true;
}

/**
 * 用于收集依赖
 * @param {*} target 依赖的原始对象
 * @param {*} type 操作的类型
 * @param {*} key 对象的属性名
 */
export default function (target, type, key) {
  if (!shouldTrack) return;

  // targetMap 存储响应式对象和属性的关系
  // propMap 存储响应式属性和对应操作的关系
  // typeMap 操作类型最终对应set集合，里面存放着监听函数

  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  // 之前如果是遍历所有属性，key就是undefined
  // 对key进行参数归一化
  if (type === TrackOptionTypes.ITERATE) {
    key = ITERATE_KEY;
  }

  let depsMap = propMap.get(key);
  if (!depsMap) {
    depsMap = new Map();
    propMap.set(key, depsMap);
  }

  let dep = depsMap.get(type);
  if (!dep) {
    dep = new Set();
    depsMap.set(type, dep);
  }

  // 找到set集合了，存储依赖函数
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
