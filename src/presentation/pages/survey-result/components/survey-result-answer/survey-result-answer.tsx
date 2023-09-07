import React from 'react'

import { type SurveyResultAnswerModel } from '@/domain/models'

import Styles from './survey-result-answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const SurveyResultAnswer: React.FC<Props> = ({ answer }) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  return (
    <li data-testid="answer-wrap" className={[Styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default SurveyResultAnswer
