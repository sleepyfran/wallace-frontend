import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import React, { FunctionComponent, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Flex } from 'theme-ui'

import { matchesRoute } from '../utils'

export type Step = {
  name: string
  title: string
  url: string
}

type StepperProps = {
  selectable?: boolean
  steps: NonEmptyArray<Step>
  onStepChanged?: (step: Step) => void
}

const wrapStep = (step: Step, index = 0) => ({ step, index })

const UrlStepperComponent: FunctionComponent<StepperProps> = ({
  selectable = true,
  steps,
  onStepChanged,
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedIndexByPath = useMemo(
    () => steps.findIndex(s => matchesRoute(location.pathname, s.url)),
    [location, steps]
  )

  const selectedStep = useMemo(
    () => wrapStep(steps[selectedIndexByPath], selectedIndexByPath),
    [steps, selectedIndexByPath]
  )

  const onStepChangedInternal = (index: number) => {
    if (!selectable) return
    if (selectedStep.index === index) return

    const wrappedStep = wrapStep(steps[index])

    if (wrappedStep.step.url) navigate(wrappedStep.step.url)
    if (onStepChanged) onStepChanged(wrappedStep.step)
  }

  const isSelectedStep = (index: number) => selectedStep.index === index

  const backgroundColor = (index: number) =>
    isSelectedStep(index) ? 'backgroundDimmed' : 'backgroundOutlineDimmed'

  const textColor = (index: number) =>
    isSelectedStep(index) ? 'invertedText' : 'text'

  const hoverBackgroundColor = (index: number) =>
    selectable
      ? isSelectedStep(index)
        ? 'backgroundDimmed'
        : 'main'
      : backgroundColor(index)

  const hoverTextColor = (index: number) =>
    selectable ? 'invertedText' : textColor(index)

  const isFirst = (index: number) => index === 0

  const isLast = (index: number) => index === steps.length - 1

  const elementBorderRadius = (index: number) =>
    isFirst(index) ? '20px 0 0 20px' : isLast(index) ? '0 20px 20px 0' : ''

  return (
    <Flex
      sx={{
        border: theme => `2px solid ${theme.colors.backgroundDimmed}`,
        borderRadius: 'default',
        cursor: selectable ? 'pointer' : 'default',
        justifyContent: 'space-between',
        height: '50px',
        width: '100%',
      }}
    >
      {steps.map(({ name, title }, index) => (
        <Flex
          key={name}
          onClick={() => onStepChangedInternal(index)}
          sx={{
            alignItems: 'center',
            backgroundColor: backgroundColor(index),
            borderRadius: elementBorderRadius(index),
            color: textColor(index),
            justifyContent: 'center',
            height: '100%',
            mx: isSelectedStep(index) ? '-3px' : '',
            width: '100%',
            '&:hover': {
              backgroundColor: hoverBackgroundColor(index),
              color: hoverTextColor(index),
            },
          }}
        >{`${index + 1}. ${title}`}</Flex>
      ))}
    </Flex>
  )
}

export default UrlStepperComponent
