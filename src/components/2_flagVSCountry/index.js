import React, { Component } from 'react';
import { connect } from 'react-redux'
// components
import FlagsVSCountries from './flagVSCountry.container'
import PreGame from './flagVSCountry.preGame'
import { StatisticsComponent } from '../reusable/index'


class Flags2Container extends Component {
  state = {
    numberOfCountries: null,
    numberOfRounds: null,
    region: null
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.region !== this.props.region || 
      nextProps.numberOfCountries !== this.props.numberOfCountries ||
      nextProps.numberOfRounds !== this.props.numberOfRounds
      ) return false
    return true
  }
  componentWillReceiveProps() {
    this.setState({
      numberOfCountries: this.props.numberOfCountries,
      numberOfRounds: this.props.numberOfRounds,
      region: this.props.region
    })
  }

  render() {
    const evaluatePreGame = () => {
      return (
        // if first time -> do not render statistics
        <div>
          { this.props.score !== null ? statistics_component : null}
          <PreGame />
        </div>
      )
    }
    const statistics_component = (
      <StatisticsComponent
        bonus={this.props.bonus}  
        penalties={this.props.penalties}
        questionsLeft={this.props.questionsLeft}
        numberOfRounds={this.state.numberOfRounds}
        numberOfCountries={this.state.numberOfCountries}
        timeLeftBonus={this.props.timeLeftBonus}
        region={this.state.region}
        score={this.props.score}
        />
    )
    const evaluateComponent = {
      'preGame': evaluatePreGame(),
      'started': this.props.loading ? <h1>loading</h1> : <FlagsVSCountries/>,
    }

    return <div>
      { evaluateComponent[this.props.gameStatus] }
      </div>

  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    gameStatus: state.oneOfMany.gameStatus,
    loading: state.oneOfMany.loading,
    bonus: state.oneOfMany.bonus,
    timeLeftBonus: state.oneOfMany.timeLeftBonus,
    penalties: state.oneOfMany.penalties,
    score: state.oneOfMany.score,
    questionsLeft: state.oneOfMany.questionsLeft,
    region: state.oneOfMany.selectedRegion,
    numberOfRounds: state.oneOfMany.selectedRounds,
    numberOfCountries: state.oneOfMany.selectedCountries,
  }
}


export default connect(mapStateToProps)(Flags2Container)