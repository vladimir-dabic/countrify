import api from "../../services/countries";
import { newQuestions } from "./flagVSCountry.action";

export const handleGame = (payload) => {
  return {
    type: "CHOOSE_GAME",
    payload,
  };
};

export const exitGame = () => {
  return { type: "EXIT_GAME" };
};

export const getCountries = (region, numberOfCountries, numberOfRounds) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "PRE_GET_COUNTRIES",
        payload: { loading: true },
      });

      let result = await api.get(`region/${region}`);
      let response = result.data.filter((c) => c.name !== "Republic of Kosovo");

      dispatch({
        type: "GET_COUNTRIES",
        payload: { data: response, loading: true },
      });

      dispatch(newQuestions(null, response, numberOfCountries, numberOfRounds));
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ERR_GET_COUNTRIES",
        payload: { loading: false, error },
      });
    }
  };
};
