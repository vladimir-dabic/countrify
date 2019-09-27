
const gameState = "choose"

export const gameReducer = (state = gameState, action) => {

  if( action.type === "CHOOSE_GAME") {
    return action.payload
  }
  return state
}
