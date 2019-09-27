import styled from 'styled-components'
import backgroundImage from '../images/paper-bgd.jpg'
import paper2 from '../images/paper-bgd2.png'
import grundgeImg1 from '../images/grunge-background-wallpaper-texture-concrete-concept_53876-16270.jpg'
import grundgeImg2 from '../images/grunge-background-wallpaper-texture-concrete-concept_53876-31757.jpg'

const height = 130

export const Grid = styled.div `
  display: flex;
  background: white;
  height: ${height}px;
  width: 280px;
  padding: 5px;
  margin: 7px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.2s;
  border-radius: 4px;
  border: 2px dashed #00000056;
  justify-content: center;
  line-height: ${height}px;
  color: #525252;
  background: #d3d3d329;
  font-family: 'Oswald';
  font-size: 33px;
  font-weight: bold;
  cursor: pointer;
  p {
    font-family: 'Pacifico'
  }
  :hover {
    box-shadow: 0px 0px 20px 1px #b2b1b1;
    /* border: 5px solid #abdbab; */
    border: 5px solid white;
    background: url(${grundgeImg2});
    background-blend-mode: 1;
    color: grey;
    font-weight: bold;
    margin: 4px;
  }
  #soon {
    font-family: 'Oswald';
    font-size: 20px;
    line-height: 90px;
  }
`