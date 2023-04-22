import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ParamsSlice } from '../store/reducers/ParamsSlice'

interface PropTypes {
  buttonText: string
  buttonWidth: string
  buttonName: string
  buttonType: string
  value?: boolean
}

const ChoiceButton = ({
  buttonText,
  buttonWidth,
  buttonName,
  buttonType,
}: PropTypes) => {
  const dispatch = useAppDispatch()
  const { chosenPopular, chosenAges } = useAppSelector(
    (state) => state.ParamsReducer
  )
  const { updateChosenAges, updateChosenPopular } = ParamsSlice.actions
  const [chosen, setChosen] = useState(false)
  useEffect(() => {
    if (buttonType === 'pop' && buttonName !== chosenPopular) {
      setChosen(false)
    } else if (buttonType === 'pop' && buttonName === chosenPopular) {
      setChosen(true)
    } else if (
      buttonType === 'age' &&
      chosenAges.find((el) => el === buttonName) === buttonName
    ) {
      setChosen(true)
    }
  }, [chosenPopular])
  return (
    <PopButton
      width={buttonWidth}
      color={chosen ? '#f58807' : 'gray'}
      onPress={() => {
        setChosen((prev) => !prev)
        if (buttonType === 'pop') {
          dispatch(updateChosenPopular({ value: buttonName, rule: chosen }))
        } else if (buttonType === 'age') {
          dispatch(updateChosenAges({ value: buttonName, rule: chosen }))
        }
      }}
    >
      <PopButtonText>{buttonText}</PopButtonText>
    </PopButton>
  )
}

export default ChoiceButton

interface ProButtonProps {
  color: string
  width: string
}
const PopButton = styled.TouchableOpacity<ProButtonProps>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: 50px;
`

const PopButtonText = styled.Text`
  font-family: anton-regular;
  color: white;
  margin-top: 20%;
  text-align: center;
`
