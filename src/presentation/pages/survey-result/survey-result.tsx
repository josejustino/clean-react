import React from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
        <h2>Qual é seu framework web favorito?</h2>
        </hgroup>
        <FlipMove className={Styles.anwersList}>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>

          <li className={Styles.active}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>VueJS</span>
            <span className={Styles.percent}>30%</span>
          </li>

          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>AngularJS</span>
            <span className={Styles.percent}>20%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>

       {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
