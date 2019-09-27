import React, { Component } from 'react';
import { connect } from 'react-redux'
// actions
import { getCountries } from '../../store/actions/gameAction'
import { selectRegion, selectNumber, selectRounds } from '../../store/actions/flagVSCountry.action'
import { gameStatus } from  '../../store/actions/flagVSCountry.action'
// styled components
import {
  Button2,
  PreGame
} from '../../components_styled/flags1.styled'

// options
const regionsOpt = ['africa', 'americas', 'asia', 'europe', 'oceania']
const numbersOpt = [3, 4, 5]
const roundsOpt = [2, 10, 20, 30]

class FlagVSCountryPreGame extends Component {

  regionChange(event) {
    let region = event.target.value
    this.props.selectRegion(region)
  }
  numbersChange(event) {
    let number = Number(event.target.value)
    this.props.selectNumber(number)
  }
  roundsChange(event) {
    let number = Number(event.target.value)
    this.props.selectRounds(number)
  }
  startGame() {
    this.props.getCountries(this.props.selectedRegion, this.props.selectedNumber, this.props.selectedRounds)
    this.props.gameStatus('started')
  }

  render() {
    const preGame = (
      <PreGame>
        <div>
          <label>
            choose region
          </label>
          <select onChange={this.regionChange.bind(this)} value={this.props.selectedRegion}>
            {
              regionsOpt.map((region, index) => {
                return <option value={region} key={index}>
                  {region}
                </option>
              })
            }
          </select>
        </div>
        <div>
          <label>
            number of countries
          </label>
          <select onChange={this.numbersChange.bind(this)} value={this.props.selectedNumber}>
            {
              numbersOpt.map((num, index) => {
                return <option value={num} key={index}>
                  {num}
                </option>
              })
            }
          </select>
        </div>
        <div>
          <label>
            number of rounds
          </label>
          <select onChange={this.roundsChange.bind(this)} value={this.props.selectedRounds}>
            {
              roundsOpt.map((num, index) => {
                return <option value={num} key={index}>
                  {num}
                </option>
              })
            }
          </select>
        </div>
        <Button2 onClick={this.startGame.bind(this)}>GO!</Button2>
      </PreGame>
    )

    return preGame
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedRegion: state.oneOfMany.selectedRegion,
    selectedNumber: state.oneOfMany.selectedNumber,
    selectedRounds: state.oneOfMany.selectedRounds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: (region, number, rounds) => {
      dispatch(getCountries(region, number, rounds))
    },
    selectRegion: (region) => {
      dispatch(selectRegion(region))
    },
    selectNumber: (number) => {
      dispatch(selectNumber(number))
    },
    selectRounds: (number) => {
      dispatch(selectRounds(number))
    },
    gameStatus: (status) => {
      dispatch(gameStatus(status))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlagVSCountryPreGame)