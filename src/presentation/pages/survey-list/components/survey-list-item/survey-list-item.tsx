import React from 'react'

import { type LoadSurveyList } from '@/domain/usecases'

import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-item-styles.scss'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const SurveyListItem: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
    {surveys.length
      ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
      : <SurveyItemEmpty />
    }
  </ul>
  )
}

export default SurveyListItem
