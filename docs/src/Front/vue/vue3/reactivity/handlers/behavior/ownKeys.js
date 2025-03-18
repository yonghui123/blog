import track from "../../effect/track.js";
import { TrackOptionTypes } from "../../util.js";

export default function ownKeysHandler(target) {
  track(target, TrackOptionTypes.ITERATE);
  return Reflect.ownKeys(target);
}