import { NonEmptyList } from 'purify-ts'
import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex } from 'theme-ui'

export type Step = {
  name: string
  title: string
  url?: string
}

type StepperProps = {
  selectable?: boolean
  steps: NonEmptyList<Step>
  onStepChanged?: (step: Step) => void
}

const wrapStep = (step: Step, index = 0) => ({ step, index })

const StepperComponent: FunctionComponent<StepperProps> = ({
  selectable = true,
  steps,
  onStepChanged,
}) => {
  const history = useHistory()

  const [selectedStep, setSelectedStep] = useState(wrapStep(steps[0]))

  const onStepChangedInternal = (index: number) => {
    if (!selectable) return
    if (selectedStep.index === index) return

    const wrappedStep = wrapStep(steps[index])

    setSelectedStep(wrappedStep)

    if (wrappedStep.step.url) history.push(wrappedStep.step.url)
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
            color: textColor(index),
            justifyContent: 'center',
            height: '100%',
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

export default StepperComponent
