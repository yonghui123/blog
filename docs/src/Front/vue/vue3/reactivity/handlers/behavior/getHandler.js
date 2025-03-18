import track, { pauseTracking, resumeTracking } from "../../effect/track.js";
import { reactive } from "../../reactive.js";
import { isObject, TrackOptionTypes, ReactiveFlags } from "../../util.js";

function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function (...args) {
      let res = Array.prototype[key].apply(this, args);
      if (res === -1 || res === false) {
        res = Array.prototype[key].apply(this[ReactiveFlags.RAW], args);
      }
      return res;
    };
  });

  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking(); // 这几个方法先暂停收集
      let result = Array.prototype[key].apply(this, args);
      resumeTracking();
      return result;
    }
  })
  return instrumentations;
}

const arrayInstrumentations = createArrayInstrumentations();
export default function getHandler(target, key) {
  // 拦截到get操作，做一些额外的事情

  if (key === ReactiveFlags.RAW) {
    return target;
  }

  track(target, TrackOptionTypes.GET, key);

  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return Reflect.get(arrayInstrumentations, key);
  }

  const result = Reflect.get(target, key);
  if (isObject(result)) {
    return reactive(result);
  }

  return result;
}
