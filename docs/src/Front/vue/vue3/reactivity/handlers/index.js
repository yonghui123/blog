import getHandler from "./behavior/getHandler.js"
import setHandler from "./behavior/setHandler.js"
import deleteHandler from "./behavior/deleteHandler.js"
import ownKeysHandler from "./behavior/ownKeys.js"

export default {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  ownKeys: ownKeysHandler
}