import React, { Component } from 'react';
import styled from 'styled-components'
//components
import ChooseGame from './components/ChooseGame'
import Flags1 from './components/1_countryVSFlags'
import { connect } from 'react-redux'
import { BigButton, Button2, BackgroundSimple, Footer } from './components_styled/flags1.styled'
import { handleGame, exitGame } from './store/actions/gameAction'
import Flags2Container from './components/2_flagVSCountry'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 1000px; */
`

const MainMenuButton = styled(Button2)`
  width: 250px;
  align-self: center;
  margin-top: 70px;
`
const Separator = styled.div`
  width: 100%;
  height: 3px;
  background: grey;
  margin: auto;
  margin-top: 50px;
`

class App extends Component {
  render() {
    const flags1 = <Flags1/>
    const flags2 = <Flags2Container/>
    const choose = <ChooseGame/>
    const evaluateGame = {
      'Flags': flags1,
      'One of many': flags2,
      'capitals': flags2,
      'flag vs capitals': flags2,
      'choose': choose
    }
    return (
      <BackgroundSimple>
        <Wrapper>
          { evaluateGame[this.props.game]}
          {
            this.props.game !== 'choose' ?
            <Wrapper>
              {/* <Separator></Separator> */}
                <MainMenuButton onClick={() => this.props.handleGame('choose')}>MAIN MENU</MainMenuButton>
            </Wrapper>
            :
            ''
          }
        </Wrapper>
      </BackgroundSimple>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGame: (id) => {
      dispatch(handleGame(id))
      dispatch(exitGame())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
