import trigger from "../../effect/trigger.js";
import { TriggerOptionTypes } from "../../util.js";

export default function deleteHandler(target, key) {

  // 判断目标对象是否有删除的属性
  const hasKey = target.hasOwnProperty(key);

  const result = Reflect.deleteProperty(target, key);
  if(hasKey) {
    trigger(target, TriggerOptionTypes.DELETE, key);
  }
  return result;
}