import React, { useEffect, useState } from 'react'

import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'

import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll().then(surveys => { setState({ surveys }) })
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {state.surveys.length
            ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
