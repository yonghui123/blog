export function isObject(val) {
  return val !== null && typeof val === "object";
}

export const TrackOptionTypes = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate",
};

export const TriggerOptionTypes = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
};

export const ReactiveFlags = {
  RAW: Symbol("raw"),
};

export const ITERATE_KEY = Symbol("iterate");

// 建立映射关系的时候，根据获取信息的行为来建立的映射关系，
// 在进行设置操作的时候，需要将设置操作和那些获取信息的行为进行关联
export const traggerTypeMap = {
  [TriggerOptionTypes.SET]: [TrackOptionTypes.GET],
  [TriggerOptionTypes.ADD]: [TrackOptionTypes.HAS, TrackOptionTypes.GET, TrackOptionTypes.ITERATE],
  [TriggerOptionTypes.DELETE]: [TrackOptionTypes.HAS, TrackOptionTypes.GET, TrackOptionTypes.ITERATE],
};
