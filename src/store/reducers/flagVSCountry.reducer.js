
import { randomize, getIncludedRandomizeCountries } from '../../functions'

const oneOfMany = {
  allCountries: [],
  questions: [],
  answers: [],
  loading: true,
  mainCounter: 10,
  selectedRegion: 'europe',
  selectedRounds: 10,
  selectedNumber: 3,
  questionsLeft: 0,
  bonus: 0,
  timeLeftBonus: 0,
  penalties: 0,
  gameStatus: 'preGame',
  score: null
}

export const flagVSCountryReducer = (state = oneOfMany, action) => {
  const evaluateReducerObj = {
    'GET_COUNTRIES': () => {
      state = {
        ...state,
        allCountries: action.payload.data
      }
    },
    'GAME_STATUS': () => {
      state = {
        ...state,
        gameStatus: action.payload
      }
    },
    'SELECT_REGION': () => {
      state = {
        ...state,
        selectedRegion: action.payload,
      }
    },
    'SELECT_NUMBER': () => {
      state = {
        ...state,
        selectedNumber: action.payload,
      }
    },
    'SELECT_ROUNDS': () => {
      state = {
        ...state,
        selectedRounds: action.payload,
      }
    },
    'NEW_QUESTIONS': () => {
      state = {
        ...state,
        questions: action.payload.questions,
        answers: getIncludedRandomizeCountries(action.payload.questions[0],state.allCountries,action.payload.numberOfCountries),
        loading: action.payload.loading
      }
    },
    'NEXT_QUESTION': () => {
      let newQuestions = state.questions.map(q => q).splice(1, state.questions.length)
      let newAnswers = getIncludedRandomizeCountries(newQuestions[0], state.allCountries, state.selectedNumber)
      state = {
        ...state,
        questions: newQuestions,
        answers: newAnswers
      }
    },
    'EXIT_GAME': () => {
      state = {
        ...state,
        score: null
      }
    },
    'CLEAR_QUESTIONS': () => {
      state = {
        ...state,
        questions: [],
        answers: [],
        questionsLeft: 0
      }
    },
    'STATISTICS': () => {
      const timeLeftBonus = action.payload.timeLeftBonus
      const penalties = action.payload.penalties
      const questionsLeft = action.payload.questionsLeft
      const bonus = action.payload.bonus
      const selectedRounds = state.selectedRounds
      const score = (selectedRounds - questionsLeft) + bonus + timeLeftBonus - penalties
      state = {
        ...state, bonus, timeLeftBonus, penalties, questionsLeft, score
      }
    }
  }

  if (evaluateReducerObj[action.type]) evaluateReducerObj[action.type]()

  return state
}
