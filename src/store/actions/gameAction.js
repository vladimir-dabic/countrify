import api from '../../services/countries'
import { newQuestions } from './flagVSCountry.action'

export const handleGame = (payload) => {
  return {
    type: 'CHOOSE_GAME',
    payload
  }
}

export const exitGame = () => {
  return { type: 'EXIT_GAME'}
}


export const getCountries = (region, numberOfCountries, numberOfRounds) => {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PRE_GET_COUNTRIES',
        payload: {loading: true}
      })

      let response = await api.get(`region/${region}`)

      dispatch({
        type: 'GET_COUNTRIES',
        payload: {data: response.data, loading: true}
      })

      dispatch(newQuestions(null, response.data, numberOfCountries, numberOfRounds))

    } catch (error) {
      dispatch({
        type: 'ERR_GET_COUNTRIES',
        payload: {loading: false, error}
      })
    }

  }
}
