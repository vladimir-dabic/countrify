import React, { Component } from 'react'
import styled from 'styled-components'
import {Wrapper, Background, Footer, TitleHeader} from '../components_styled/flags1.styled'
import { Grid } from '../components_styled/chooseGame.styled'
import { connect } from 'react-redux'
import { handleGame } from '../store/actions/gameAction'

class ChooseGame extends Component {

  handleClick = (event) => {
    // console.log(event.target.id)
    this.props.handleGame(event.target.id)
  }
  render() {
    return (
      <Background>
        {/* <Banner>more chalanges coming soon</Banner> */}
        <TitleHeader>
          WELCOME TO COUNTRIFY
          <p>choose your challenge</p>
        </TitleHeader>
        <Wrapper justify="start">
          <Grid id="Flags" onClick={this.handleClick.bind(this)}>
            COUNTRY <p id="Flags">vs flags</p>
          </Grid>
          <Grid id="One of many" onClick={this.handleClick.bind(this)}>
            FLAG <p id="One of many">vs countries</p>
          </Grid>
          <Grid id="flag vs capitals" onClick={this.handleClick.bind(this)}>
            FLAG <p id="flag vs capitals">vs capitals</p>
          </Grid>
          <Grid id="capitals" onClick={this.handleClick.bind(this)}>
            CAPITAL <p id="capitals">vs countries</p>
          </Grid>
          <Grid>
            ???
            <p> coming soon</p>
          </Grid>
        </Wrapper>
        <Footer>
          <a href="mailto:dabic.vladimir@gmail.com">@kostaricic</a>
        </Footer>
      </Background>
    )
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGame)