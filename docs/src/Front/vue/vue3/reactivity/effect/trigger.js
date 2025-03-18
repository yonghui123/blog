import { ITERATE_KEY, triggerTypeMap } from "../util";
import { activeEffect, targetMap } from "./effect"

/**
 * 触发器，写入操作触发操作
 * @param {*} target 哪个对象的写入操作
 * @param {*} type 触发的类型
 * @param {*} key 操作的哪一个属性
 */
export default function trigger(target, type, key) {
  console.log("trigger", target, type, key)
  let effectFns = getEffectFns(target, type, key);
  if(!effectFns) return;
  for(const fn of effectFns) {
    if(fn === activeEffect) continue;
    fn();
  }
}

/**
 * 根据target，type，key这些信息获取到对应的依赖函数集合
 * @param {*} target 
 * @param {*} type 
 * @param {*} key 
 */
function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if(!propMap) return;

  const keys = [key];
  if(type === TriggerOptionTypes.ADD || type === TriggerOptionTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }

  const effectFns = new Set();
  for(const key of keys) {
    const typeMap = propMap.get(key);
    if(!typeMap) continue;
    const trackTypes = triggerTypeMap[type];
    for(const trackType of trackTypes) {
      const dep = typeMap.get(trackType);
      if(!dep) continue;
      for(const fn of dep) {
        effectFns.add(fn);
      }
    }
  }

  return effectFns;
}