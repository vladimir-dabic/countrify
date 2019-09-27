import React from 'react';
import {
  HeaderContainer,
  Header,
  Timer,
  FlagDiv,
  Image
} from '../../components_styled/flags1.styled'

export const BigTimer = ({ mainCounter }) => {
  return (
    <Timer
      color={mainCounter <= 5 ? 'red' : 'grey'}
      // borderColor={mainCounter <= 5 ? '#ff6e6e' : '#d3d3d380'}
      background={mainCounter <= 5 ? '#ff6e6e8c' : '#d3d3d380'}
      >
      {mainCounter > 0 ? mainCounter : ""}
    </Timer>
  )
}

export const HeaderContainerComponent = ({ question, mainCounter, bonusCounter, mode = 'flag' }) => {
  let flag = <Image src={ question ? question['flag'] : '' }/>
  let text = <h1>{ question ? question['capital'] : '' }</h1>
  let lookupObj = {
    flag,
    text
   }

  return (
    <HeaderContainer>
      <div>
        <h4> bonus: {bonusCounter} </h4>
      </div>
      <Header>
        <FlagDiv>
          { lookupObj[mode] }
        </FlagDiv>
      </Header>
      <BigTimer mainCounter={ mainCounter }/>
    </HeaderContainer>
  )
}