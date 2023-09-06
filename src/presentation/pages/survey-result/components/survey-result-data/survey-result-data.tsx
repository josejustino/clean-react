import React from 'react'
import { useNavigate } from 'react-router-dom'
import FlipMove from 'react-flip-move'

import { type LoadSurveyResult } from '@/domain/usecases'

import { Calendar } from '@/presentation/components'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'

import Styles from './survey-result-data-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const SurveyResultData: React.FC<Props> = ({ surveyResult }) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        <>
          {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
        </>
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={() => { navigate('/') }}>Voltar</button>
    </>
  )
}

export default SurveyResultData
