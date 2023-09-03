import React from 'react'
import FlipMove from 'react-flip-move'
import { Footer, Header, Spinner } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <FlipMove className={Styles.anwersList}>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>

          <li className={Styles.active}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>

          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/360px-React-icon.svg.png" alt="" />
            <span className={Styles.anwer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>

        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
