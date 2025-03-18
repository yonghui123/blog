import trigger from "../../effect/trigger.js";
import { TriggerOptionTypes } from "../../util.js";

export default function setHandler(target, key, value) {
  const type = target.hasOwnProperty(key) ? TriggerOptionTypes.SET : TriggerOptionTypes.ADD;
  // 保存原始值
  let oldValue = Reflect.get(target, key);
  // 数组长度变化，手动触发一下更新
  let oldLength = Array.isArray(target) ? target.length : undefined;

  // 先设置进去
  const result = Reflect.set(target, key, value);
  
  // 需不需要触发更新判断后再决定
  if (!Object.is(oldValue, value)) {
    console.log("属性", key, "被修改了");
    trigger(target, type, key);

    if (Array.isArray(target) && oldLength !== target.length) {
      const newLength = target.length;
      if (key !== 'length') {
        trigger(target, TriggerOptionTypes.SET, "length");
      } else {
        if(newLength < oldLength) {
          // 新数组的长度小于旧数组的长度，说明有元素被删除了
          // 遍历每一个被删除的元素，触发对应的删除操作
          for (let i = newLength; i < oldLength; i++) {
            trigger(target, TriggerOptionTypes.DELETE, i);
          }
        }
      }
    }

  }

  return result;
}
