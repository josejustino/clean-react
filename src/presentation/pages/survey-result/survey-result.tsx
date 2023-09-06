import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'

import { type LoadSurveyResult } from '@/domain/usecases'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu framework web favorito? Qual é seu framework web favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.anwersList}>
              <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>

              <li className={Styles.active}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
                <span className={Styles.answer}>VueJS</span>
                <span className={Styles.percent}>30%</span>
              </li>

              <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
                <span className={Styles.answer}>AngularJS</span>
                <span className={Styles.percent}>20%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
