import React, { Component } from 'react';
import {
  Timer,
  PreGame,
  Statistics,
  PlayAgain } from '../../components_styled/flags1.styled'

export const BigTimer = (props) => {
  return (
    <Timer
      color={props.mainCounter <= 5 ? 'red' : 'grey'}
      // borderColor={props.mainCounter <= 5 ? '#ff6e6e' : '#d3d3d380'}
      background={props.mainCounter <= 5 ? '#ff6e6e8c' : '#d3d3d380'}
      >
      {props.mainCounter > 0 ? props.mainCounter : ""}
    </Timer>
  )
}

export const StatisticsComponent = ({
    region,
    questionsLeft,
    numberOfRounds,
    numberOfCountries,
    penalties,
    bonus,
    timeLeftBonus,
    score
  }) => {
    return (
      <PlayAgain>
        <Statistics>
          <div>
            <p>region: {region}</p>
            <p>answers: {numberOfRounds - questionsLeft} / {numberOfRounds}</p>
            <p>penalties: {penalties}</p>
            <p>bonus: {bonus}</p>
            <p>time left bonus: {timeLeftBonus}</p>
            <h1>score: {score}</h1>
          </div>
        </Statistics>
      </PlayAgain>
    )
}
