import { gameReducer, countryReducer, loadingReducer } from './gameReducer'
import { combineReducers } from 'redux'
import { flagVSCountryReducer } from './flagVSCountry.reducer'


const rootReducer = combineReducers({
  game: gameReducer,
  oneOfMany: flagVSCountryReducer
})

export default rootReducer