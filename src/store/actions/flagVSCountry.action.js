import { randomize } from '../../functions'

export const newQuestions = (_dispatch, countries, numberOfCountries, numberOfRounds) => {
  console.log('number', numberOfCountries)
  let questions = randomize(countries).splice(0, numberOfRounds)
  return {
    type: 'NEW_QUESTIONS',
    payload: {
      questions,
      numberOfCountries,
      loading: false
    }
  }
}

export const nextQuestion = () => {
  return {
    type: 'NEXT_QUESTION',
    // payload: countries
  }
}

export const mainTimerStart = () => {
  return { type: 'MAIN_TIMER_START' }
}

export const mainTimerStop = () => {
  return { type: 'MAIN_TIMER_STOP' }
}

export const selectRegion = (payload) => {
  return {
    type: 'SELECT_REGION', payload
  }
}

export const selectNumber = (payload) => {
  return {
    type: 'SELECT_NUMBER', payload
  }
}

export const selectRounds = (payload) => {
  return {
    type: 'SELECT_ROUNDS', payload
  }
}

export const gameStatus = (payload) => {
  return {
    type: 'GAME_STATUS', payload
  }
}

export const clearQuestions = () => {
  return {
    type: 'CLEAR_QUESTIONS'
  }
}

export const statistics = (payload) => {
  return {
    type: 'STATISTICS', payload
  }
}
