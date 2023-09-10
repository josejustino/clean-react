import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { type SaveSurveyResult, type LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

import { Error, Footer, Header, Loading } from '@/presentation/components'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState(state => ({ ...state, isLoading: true }))
      saveSurveyResult.save({ answer })
        .then(surveyResult => { setState(state => ({ ...state, isLoading: false, surveyResult })) })
        .catch(handleError)
    }
  }

  const reload = (): void => {
    setState(state => ({ isLoading: false, surveyResult: null, error: '', reload: !state.reload }))
  }

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(state => ({ ...state, surveyResult })) })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
