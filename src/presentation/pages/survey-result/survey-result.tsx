import React, { useEffect, useMemo, useState } from 'react'

import { type SaveSurveyResult, type LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

import { Error, Footer, Header, Loading } from '@/presentation/components'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }

    setState(state => ({ ...state, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => { setState(state => ({ ...state, isLoading: false, surveyResult })) })
      .catch(handleError)
  }

  const reload = (): void => {
    setState(state => ({ isLoading: false, surveyResult: null, error: '', reload: !state.reload }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(state => ({ ...state, surveyResult })) })
      .catch(handleError)
  }, [state.reload])

  const context = useMemo(() => ({ onAnswer }), [onAnswer])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={context}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}

          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
