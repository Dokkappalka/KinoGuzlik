import React, { useState, useCallback, useEffect } from 'react'
import Label from '../Slider/Label'
import Notch from '../Slider/Notch'
import Rail from '../Slider/Rail'
import RailSelected from '../Slider/RailSelected'
import Thumb from '../Slider/Thumb'
import RangeSlider from 'rn-range-slider'
import { OptionContainer, OptionText } from '../../App'
import { useAppDispatch } from '../hooks/redux'
import { ParamsSlice } from '../store/reducers/ParamsSlice'

interface PropTypes {
  lowValue: number
  highValue: number
  step: number
  name: string
  currentLow: number
  currentHigh: number
}

const RangeSliderComponent = ({
  lowValue,
  highValue,
  name,
  step,
  currentLow,
  currentHigh,
}: PropTypes) => {
  const dispatch = useAppDispatch()
  const { setRange } = ParamsSlice.actions
  const [low, setLow] = useState(currentLow)
  const [high, setHigh] = useState(currentHigh)
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback((value: number) => <Label text={value} />, [])
  const renderNotch = useCallback(() => <Notch />, [])
  const handleValueChange = useCallback((low: number, high: number) => {
    setLow(low)
    setHigh(high)
  }, [])
  return (
    <OptionContainer style={{ paddingTop: 20, paddingBottom: 20 }}>
      <OptionText>
        {name}: {low}-{high}
      </OptionText>
      <RangeSlider
        low={low}
        high={high}
        style={{ width: 200 }}
        min={lowValue}
        max={highValue}
        step={step}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        onTouchEnd={() => {
          dispatch(
            setRange({ rangeName: name, lowValue: low, hightValue: high })
          )
        }}
      />
    </OptionContainer>
  )
}

export default RangeSliderComponent
