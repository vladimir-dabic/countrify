import styled from 'styled-components'
import backgroundImage from '../images/paper-bgd.jpg'
import backgroundImage2 from '../images/paper-bgd2.png'
import mapJpg from '../images/map-simple.jpg'
import mapEarthJpg from '../images/map-earth.jpg'
import grundgeP1 from '../images/grunge-background-wallpaper-texture-concrete-concept_53876-16270.jpg'
import grundgeP2 from '../images/grunge-background-wallpaper-texture-concrete-concept_53876-31757.jpg'
// colors
import {white89a, white95a} from './colors'

export const MainContainer = styled.div `
  font-family: 'Oswald', sans-serif;
`

export const Background = styled.div `
  height: 1000px;
  width: 100%;
  background: url(${mapEarthJpg});
  background-size: 1500px;
`
export const BackgroundSimple = styled(Background)`
  height: 1000px;
  width: 100%;
  background: url(${mapJpg});
  background-size: 900px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 45px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  /* justify-content: space-between; */
  justify-content: ${(props = 'space-between') => props.justify};
  :after {
    content: "";
    flex: auto;
  }
  `
export const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 45px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  justify-content: center;
  width: 60%;
`

export const FlagsContainer = styled.div`
  box-shadow: 0px 0px 10px 1px #b2b1b1;
  background: url(${backgroundImage2});
  background-size: contain;
  /* width: 80%; */
  margin-left: auto;
  margin-right: auto;
`

export const FlagDiv = styled.div `
  /* width: 200px; */
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 13px;
  margin-top: 13px;
`
export const FxScore = styled.div `
  position: absolute;
  z-index: 100000;
  top: ${props => props.inputY}px;
  left: ${props => props.inputX}px;
  font-size: 70px;
  opacity: .1;
  color: ${props => props.inputColor};
  font-weight: bolder;
`
export const Image = styled.img `
  box-shadow: 0px 0px 15px grey;
  height: 72px;
  align-self: flex-start;
  /* border: 5px solid white; */
  cursor: pointer;
`
export const HeaderContainer = styled.div `
  margin: 10px;
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding-left: 25px;
  padding-right: 25px;
  /* padding-top: 20px; */
  align-items: center;
`
export const Header = styled.h1 `
  font-size: 30px;
`
export const Statistics = styled.div `
  /* margin-left: 25px; */
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  line-height: ss8px;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 50%;
  /* height: 500px; */
  /* background: lightcoral; */
  margin-top: 100px;
  box-shadow: 0px 0px 10px 1px #b2b1b1;
  border-radius: 2px;
  background: ${white89a};
  /* background: url(${backgroundImage}); */
  div {
    display: flex;
    flex-flow: column;
  }
  h1 {
    margin-top: 10px;
  }
`

export const PlayAgain = styled.div `
  font-family: 'Oswald', sans-serif;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;

`

export const Timer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 7px solid ${props => props.borderColor}; */
  text-align: center;
  font-size: 30px;
  line-height: 60px;
  font-weight: bold;
  color: ${props => props.color};
  background: ${props => props.background};
`
export const PreGame = styled.div `
  font-family: 'Oswald', sans-serif;
  margin-top: 30px;
  height: 100px;
  width: 50%;
  display: flex;
  justify-content: space-around;
  /* flex-flow: column; */
  font-size: 25px;
  margin-left: auto;
  margin-right: auto;

  div {
    padding: 4px;
    display: flex;
    flex-flow: column;
  }
  label {
    padding-bottom: 8px;
  }
  select {
    border: 0;
    -webkit-appearance: none;
    height: 40px;
    width: 200px;
    border-radius: 0px;
    outline: none;
    background: transparent;
    border-bottom: 3px solid grey;
    font-size: 15px;
  }
  button {
    /* margin-top: 50px; */
    align-self: center;
  }
  /* div {
    display: flex;
  } */
`

export const BigButton = styled.button `
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;

    :hover {
      background-color: #3e8e41
    }

    :active {
      background-color: #3e8e41;
      box-shadow: 0 5px #666;
      transform: translateY(4px);
    }
`
export const Button2 = styled.button`
  /* background-color: #4CAF50; Green */
  border: none;
  background: ${white89a};
  color: grey;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 36px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.2s;
  border-radius: 4px;
  border: 3px solid grey;
  font-family: 'Dosis', sans-serif;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 15px 1px #b2b1b1;
    background: white;
    /* background: ${white95a}; */
  }
`;

export const Button3 = styled(Button2)`
  font-size: 25px;
  outline: none;
`

export const Footer = styled.div`
  font-family: 'Oswald';
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  /* border-top: 2px solid lightgrey;
  border-right: 2px solid lightgrey; */
  text-align: center;
  box-shadow: 2px 2px 10px 1px #b2b1b1;
  /* width: 10%; */
  padding-left: 10px;
  padding-right: 10px;
  background: url(${grundgeP1});
  justify-content: center;
  position: fixed;
  bottom: 0px;
  transition: all .2s ease-in-out;

  a {
    color: black;
    text-decoration: none;
  }

  :hover {
    box-shadow: 2px 2px 10px 4px #b2b1b1
  }

`

export const TitleHeader = styled.div`
  font-family: 'Oswald';
  font-size: 40px;
  color: #4c4c4c;
  /* background: ${white89a}; */
  /* background: #00000023; */
  /* background: url(${backgroundImage2}); */
  /* box-shadow: 2px 2px 10px 1px #b2b1b1; */
  width: 100%;
  height: 100px;
  text-align: center;
  padding: 20px;
  margin: auto;
  p {
    /* color: black; */
    font-size: 25px;
    /* font-family: 'Dosis'; */
    font-weight: bold;
  }
`
export const Banner = styled.div`
  padding: 10px;
  background: #e4e4e4;
  color: black;
  border: 2px solid white;
  position: absolute;
  box-shadow: 0px 3px 10px 1px #b2b1b1;
  bottom: 20px;
  right: 0;
  /* height: 40px; */
  font-size: 20px;
`