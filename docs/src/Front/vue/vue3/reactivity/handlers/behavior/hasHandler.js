import track from "../../effect/track";
import { TrackOptionTypes } from "../../util";

export default function hasHandler(target, key) {
  track(target, TrackOptionTypes.HAS, key);

  return Reflect.has(target, key);
}