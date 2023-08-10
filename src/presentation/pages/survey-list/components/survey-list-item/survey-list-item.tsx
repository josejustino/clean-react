import React, { useContext } from 'react'

import { type LoadSurveyList } from '@/domain/usecases'

import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-item-styles.scss'

const SurveyListItem: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
    {state.surveys.length
      ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
      : <SurveyItemEmpty />
    }
  </ul>
  )
}

export default SurveyListItem
