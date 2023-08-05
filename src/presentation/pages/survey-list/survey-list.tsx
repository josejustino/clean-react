import React, { useEffect, useMemo, useState } from 'react'

import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'

import { Footer, Header } from '@/presentation/components'
import { SurveyContext, SurveyListError, SurveyListItem } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(old => ({ ...old, surveys })) })
      .catch(error => { setState(old => ({ ...old, error: error.message })) })
  }, [])

  const context = useMemo(() => ({ state, setState }), [state, setState])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={context}>
        {state.error ? <SurveyListError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
