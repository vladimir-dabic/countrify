import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCountries } from '../../store/actions/gameAction'
import { nextQuestion, statistics, gameStatus, clearQuestions } from  '../../store/actions/flagVSCountry.action'
// styled components
import {
  MainContainer,
  FlagsContainer,
  Wrapper2,
  Button3,
  FxScore
} from '../../components_styled/flags1.styled'
// components
import { HeaderContainerComponent } from './flagVSCountry.components'

const pointValue = 1
const optionsRenderResolver = {
  'One of many': {
    header: 'flag',
    body: 'name'
  },
  'flag vs capitals': {
    header: 'flag',
    body: 'capital'
  },
  'capitals': {
    header: 'text',
    body: 'name'
  }
}

class Flags2 extends Component {

  /* State */

  state = {
    mainCounter: this.props.rounds * 2,
    bonusCounter: 3,
    bonus: 0,
    penalties: 0,
    questionsLeft: 0,
    animation: '',
    clickPoints: '',
    fxScorerPosition: {
      x: 0,
      y: 0
    },
  }

  /* Methods */

  async mainController(event) {
    // event.persist when using event on async code
    event.persist()


    this.setState({
      animation: 'fadeOutUp animated',
      fxScorerPosition: {
        x: event.clientX,
        y: event.clientY
      }
    })

    let userAnswer = event.target.id
    let rightAnswer = this.props.questions[0]['name']
    // RIGHT answer
    if (userAnswer === rightAnswer ) {
      this.setState({
        bonusCounter: 3,
        bonus: this.state.bonus + this.state.bonusCounter,
        questionsLeft: this.props.questions - 1,
        clickPoints: this.state.bonusCounter + pointValue
      })
      // clear bonus interval
      clearInterval(this.bonusInterval)
      // next question
      await this.props.nextQuestion()
      // start bonus interval
      this.bonusInterval = setInterval(() => this.bonusCounter(), 1000)

    // WRONG answer
    } else {
      this.setState({
        penalties: this.state.penalties + 1,
        clickPoints: -1
      })
    }

    this.fxTimer = setTimeout(() => {
      this.setState({
        animation: '',
        clickPoints: '',
      })
    }, 500)

    this.endOfGame(this.props.questions.length < 1)
  }

  endOfGame(evaluation) {
    if (evaluation) {
      clearInterval(this.mainInterval)
      this.props.gameStatus('preGame')
      let stats = {
        bonus: this.state.bonus,
        penalties: this.state.penalties,
        timeLeftBonus: this.state.mainCounter,
        questionsLeft: this.props.questions.length
       }
      this.props.statistics(stats)
    }
  }

  mainCounter() {
    this.setState(state => ({
      mainCounter: state.mainCounter - 1
    }))
    this.endOfGame(this.state.mainCounter < 1)
  }

  bonusCounter() {
    this.setState(state => ({
      bonusCounter: state.bonusCounter > 0 ? state.bonusCounter - 1 : state.bonusCounter
    }))
  }

  /* life cycle hooks */

  componentWillMount() {
    this.setState({ questionsLeft: this.props.questions.length })
    this.mainInterval = setInterval(() => this.mainCounter(), 1000)
    this.bonusInterval = setInterval(() => this.bonusCounter(), 1000)
  }

  componentWillUnmount() {
    this.props.clearQuestions()
    clearInterval(this.mainInterval)
    clearInterval(this.bonusInterval)
    clearTimeout(this.fxTimer)
    // change game status
    this.props.gameStatus('preGame')
  }

  /* Render */

  render() {
    return (
      <MainContainer>
        <FxScore
          className={this.state.animation}
          inputX={this.state.fxScorerPosition.x}
          inputY={this.state.fxScorerPosition.y}
          inputColor={this.state.clickPoints > 0 ? 'green' : 'red'}
        >
          {this.state.clickPoints > 0 ? `+${this.state.clickPoints}` : this.state.clickPoints}
        </FxScore>
        {
          this.props.loading
          ?
          <h1>Loading...</h1>
          :
          <div>
            <HeaderContainerComponent
              question={this.props.questions[0]}
              mainCounter={this.state.mainCounter}
              bonusCounter={this.state.bonusCounter}
              mode={optionsRenderResolver[this.props.game]['header']}
              />
            <FlagsContainer>
              <Wrapper2>
                {
                  this.props.answers.map((item, index) => {
                    return (
                      <Button3 key={index} id={item.name} onClick={this.mainController.bind(this)}>
                        {
                          item[optionsRenderResolver[this.props.game]['body']]
                        }
                      </Button3>
                    )
                  })
                }
              </Wrapper2>
            </FlagsContainer>
          </div>
        }
      </MainContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: state.game,
    questions: state.oneOfMany.questions,
    answers: state.oneOfMany.answers,
    loading: state.oneOfManyloading,
    mainCounter: state.oneOfMany.mainCounter,
    rounds: state.oneOfMany.selectedRounds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: (region) => {
      dispatch(getCountries(region))
    },
    nextQuestion: (countries) => {
      dispatch(nextQuestion(countries))
    },
    gameStatus: (status) => {
      dispatch(gameStatus(status))
    },
    clearQuestions: () => {
      dispatch(clearQuestions())
    },
    statistics: (stats) => {
      dispatch(statistics(stats))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flags2)