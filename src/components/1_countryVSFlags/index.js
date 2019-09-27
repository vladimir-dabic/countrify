import React, { Component } from 'react';
import api from '../../services/countries'
// css
import '../../CSS/animate.css'
// transition group
import Transition from 'react-transition-group/Transition'
// components
import { BigTimer } from '../reusable/index'
// styled
import {
  MainContainer,
  FlagDiv,
  FxScore,
  Header,
  HeaderContainer,
  Statistics,
  Image,
  Wrapper,
  Timer,
  FlagsContainer,
  PlayAgain,
  PreGame,
  Button2,
  Footer
} from '../../components_styled/flags1.styled'

let chooseNumCountries = 10

const pointValue = 1
const bigTimer = chooseNumCountries * 2
const regionsOpt = ['africa', 'americas', 'asia', 'europe', 'oceania']
const countriesOpt = [10, 20, 30, 40, 'all']
const cheatWord = 'please'
const animations = ['bounce', 'flash', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat']

let prevStat = {
  numCountries: '',
  region: ''
}

const MainHeader = (props) => {
  if (!props.evaluateFinish) {
    return (
      <HeaderContainer>
        <div>
          <h4>
            bonus: {props.bonusCounter}
          </h4>
        </div>

        <Header>{props.question[0]}</Header>

        <BigTimer mainCounter={props.mainCounter}/>
      </HeaderContainer>
    )
  }
  return null
}

class Flags1 extends Component {

  defaultState = {
    numberOfGames: '', //TODO: fix this!
    countries: [],
    question: [],
    loading: true,
    previousCountry: '',
    mainCounter: bigTimer,
    hint: '',
    showAnswer: false,
    randomAnimation: '',
    // choose
    chooseRegion: 'europe',
    chooseNumCountries: 20,
    //
    gameStarted: true,
    bonusCounter: 3,
    timeleftBonus: 0,
    clicks: 0,
    answers: 0,
    bonus: 0,
    gameFinished: false,
    penalties: 0,
    clickPoints: '',
    currentScore: 0,
    animation: '',
    fxScorerPosition: {
      x: 0,
      y: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = this.defaultState
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  /* life cycle hooks */

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  /* methods */

  async getCountries() {
    try {
      let response = await api.get(`region/${this.state.chooseRegion}`)

      let rCountries = this.getNCountries(response.data.filter(c => c.name !== 'Republic of Kosovo'), this.state.chooseNumCountries)

      this.setState({
        countries: this.randomize(rCountries),
        question: this.randomize(rCountries.map(r => r.name)),
        loading: false,
        mainCounter: rCountries.length * 2
      })
      this.mainCounter()
      this.bonusCounter()

      prevStat.numCountries = this.state.question.length;
      prevStat.region = this.state.chooseRegion;

    } catch (err) {
      throw err
    }
  }

  getNCountries(arr, n) {
    if (n === 'all') return this.randomize(arr);
    return this.randomize(arr).splice(0, n)
  }

  randomize(arr) {
    return arr.sort(() =>  0.5 - Math.random() )
  }

  newCountry(event) {
    // console.log('new country')
    let country = event.target.id
    let target = this.state.question[0]
    let newCountries = this.state.countries.filter(country => country.name !== target)
    // right answer
    if (country === target) {
      this.setState({
        loading: true,
        previousCountry: country,
        question: this.randomize(newCountries.map(r => r.name)),
        countries: newCountries,
        answers: this.state.answers + pointValue,
        clicks: this.state.clicks + 1,
        bonus: this.state.bonus + this.state.bonusCounter,
        bonusCounter: 3,
        clickPoints: this.state.bonusCounter + pointValue,
        currentScore: this.state.currentScore + pointValue + this.state.bonusCounter
      })

      clearInterval(this.bonusInterval)
      this.bonusInterval = setInterval(() => this.bonusCounter(), 1000)
    // wrong answer
    } else {
      this.setState({
        penalties: this.state.penalties + 1,
        clicks: this.state.clicks + 1,
        clickPoints: -1,
        currentScore: this.state.currentScore - 1
      })
    }

    this.setAnimationScore()
    this.setState({
      fxScorerPosition: {
        x: event.clientX,
        y: event.clientY
      },
      gameFinished: !this.state.mainCounter || !this.state.question.length ? true : false,
      showAnswer: false,
      hint: ''
    })

  }

  setAnimationScore() {
    this.setState({
      animation: 'fadeOutUp animated'
    })
    setTimeout(() => {
      this.setState({
        animation: '',
        clickPoints: '',
      })
    }, 1000)
  }

  bonusCounter() {
    this.setState(state => ({
      bonusCounter: state.bonusCounter > 0 ? state.bonusCounter - 1 : state.bonusCounter
    }))
  }

  mainCounter() {
    let num = this.state.question.length * 2
    let mc = setInterval(() => {
      num --
      this.setState({
        mainCounter: num,
      })
      // end of time
      if (this.state.mainCounter < 1) {
        clearInterval(mc)
        clearInterval(this.bonusInterval);
        this.setState({
          gameStarted: false
        })
      // end of questions
      } else if (this.state.question.length < 1) {
        clearInterval(mc)
        clearInterval(this.bonusInterval)
        this.setState({
          timeleftBonus: this.state.mainCounter + 1,
          gameStarted: false
        })
      }
    }, 1000)
  }

  evaluateFinish(counter, question) {
    return (!counter || !question.length)
    // && this.state.gameFinished // gamefinished only for development
  }

  startGame() {
    this.setState(this.defaultState)
    this.getCountries()
    // start bonus counter
    this.bonusInterval = setInterval(() => this.bonusCounter(), 1000);
    // add one to be sure that it's not first game
    this.defaultState.numberOfGames += 1
  }

  /* event handlers */

  regionChange(event) {
    let region = event.target.value
    this.setState({
      chooseRegion: region
    })
    this.defaultState.chooseRegion = region

  }

  countriesChange(event) {
    let num = typeof num === 'number' ?  Number(event.target.value) : event.target.value
    this.setState({
      chooseNumCountries: num,
    })
    this.defaultState.chooseNumCountries = num
    // this.defaultState.mainCounter = typeof num === 'number' ? num * 2 : num
  }

  handleKeyPress(e) {
    this.setState({
      hint: this.state.hint + e.key,
      showAnswer: false,
      randomAnimation: this.randomize(animations)[0]
    });
    if (this.state.hint.match(cheatWord)) {
      this.setState(state => {
        state.hint = ""
        state.showAnswer = true
      })
    }
  }

  /* render */

  render() {

    const main_header = <MainHeader
        bonusCounter={this.state.bonusCounter}
        mainCounter={this.state.mainCounter}
        question={this.state.question}
        evaluateFinish={this.evaluateFinish(this.state.mainCounter, this.state.question)}
      />

    const flags_container = <FlagsContainer>
      <Wrapper>
        <FxScore
          className={this.state.animation}
          inputX={this.state.fxScorerPosition.x}
          inputY={this.state.fxScorerPosition.y}
          inputColor={this.state.clickPoints > 0 ? 'green' : 'red'}
        >
          {this.state.clickPoints > 0 ? `+${this.state.clickPoints}` : this.state.clickPoints}
        </FxScore>

        {
          this.state.countries.map(country => {
            return (
              <FlagDiv key={country.name}>
                <Image
                  // className={country.name === this.state.previousCountry ? 'fadeOutDown animated' : ''}
                  className={country.name === this.state.question[0] && this.state.showAnswer ? `${this.state.randomAnimation} animated` : ''}
                  src={country.flag}
                  id={country.name}
                  onClick={this.newCountry.bind(this)}
                />
              </FlagDiv>
            )
          })
        }
      </Wrapper>
    </FlagsContainer>

    const play_again = <PlayAgain>
      <Statistics>
        <div>
          <p>region: {prevStat.region}</p>
          <p>answers: {this.state.answers}/{prevStat.numCountries}</p>
          <p>penalties: {this.state.penalties}</p>
          <p>bonus: {this.state.bonus}</p>
          <p>time left bonus: {this.state.timeleftBonus}</p>
          <h1>score: {this.state.currentScore + this.state.timeleftBonus}</h1>
        </div>
      </Statistics>
    </PlayAgain>

    const pre_game = <PreGame>
      <div>
        <label>
          choose region
        </label>
        <select onChange={this.regionChange.bind(this)} value={this.state.chooseRegion}>
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
        <select onChange={this.countriesChange.bind(this)} value={this.state.chooseNumCountries}>
          {
            countriesOpt.map((timer, index) => {
              return <option value={timer} key={index}>
                {timer}
              </option>
            })
          }
        </select>
      </div>
      <Button2 onClick={this.startGame.bind(this)}>GO!</Button2>
    </PreGame>

    const evaluateRender = () => {
      if (!this.evaluateFinish(this.state.mainCounter, this.state.question) && this.state.numberOfGames) {
        return <div>

          { main_header }
          { flags_container }

        </div>
      }
      return <div>
          {this.state.numberOfGames && play_again}
          {pre_game}
        </div>;
    }

    /* render return  */

    return <MainContainer> { evaluateRender() } </MainContainer>
  }
}

export default Flags1