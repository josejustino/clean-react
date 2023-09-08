import React from 'react'
import { Link } from 'react-router-dom'

import { type LoadSurveyList } from '@/domain/usecases'

import { Calendar, Icon, IconName } from '@/presentation/components'

import Styles from './survey-item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer><Link data-testid="link" to={`/surveys/${survey.id}`}>Ver Resultado</Link></footer>
    </li>
  )
}

export default SurveyItem
