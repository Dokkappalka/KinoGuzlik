import React from 'react'
import styled from 'styled-components/native'
import { OptionContainer, OptionText } from '../../App'
import ChoiceButton from './ChoiceButton'

const AllChoiceButtons = () => {
  return (
    <>
      <OptionContainer>
        <OptionText>Популярность</OptionText>
        <PopButtonContainer>
          <ChoiceButton
            buttonType='pop'
            buttonText='😕'
            buttonWidth='52px'
            buttonName='5000-25000'
          />
          <ChoiceButton
            buttonType='pop'
            buttonText='😑'
            buttonWidth='52px'
            buttonName='25001-250000'
          />
          <ChoiceButton
            buttonType='pop'
            buttonText='☺️'
            buttonWidth='52px'
            buttonName='250001-500000'
          />
          <ChoiceButton
            buttonType='pop'
            buttonText='🤩'
            buttonWidth='52px'
            buttonName='500001-9999999'
          />
        </PopButtonContainer>
      </OptionContainer>
      <OptionContainer>
        <OptionText>Сколько годиков?</OptionText>
        <PopButtonContainer>
          <ChoiceButton
            buttonType='age'
            buttonText='0'
            buttonWidth='41px'
            buttonName='0'
          />
          <ChoiceButton
            buttonType='age'
            buttonText='6'
            buttonWidth='41px'
            buttonName='6'
          />
          <ChoiceButton
            buttonType='age'
            buttonText='12'
            buttonWidth='41px'
            buttonName='12'
          />
          <ChoiceButton
            buttonType='age'
            buttonText='16'
            buttonWidth='41px'
            buttonName='16'
          />
          <ChoiceButton
            buttonType='age'
            buttonText='18'
            buttonWidth='41px'
            buttonName='18'
          />
        </PopButtonContainer>
      </OptionContainer>
    </>
  )
}

export default AllChoiceButtons

const PopButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`
