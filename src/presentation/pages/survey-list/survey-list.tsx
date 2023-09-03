import React, { useEffect, useMemo, useState } from 'react'

import { type LoadSurveyList } from '@/domain/usecases'

import { useErrorHandler } from '@/presentation/hooks'
import { Footer, Header, Error } from '@/presentation/components'
import { SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const reload = (): void => {
    setState(state => ({ surveys: [], error: '', reload: !state.reload }))
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(old => ({ ...old, surveys })) })
      .catch(handleError)
  }, [state.reload])

  const context = useMemo(() => ({ state, setState }), [state, setState])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={context}>
        {state.error ? <Error error={state.error} reload={reload} /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
