import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { type LoadSurveyList } from '@/domain/usecases'

import { useErrorHandler } from '@/presentation/hooks'
import { Footer, Header, Error } from '@/presentation/components'
import { SurveyListItem, surveyListState } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyListState)

  const reload = (): void => {
    setState(state => ({ surveys: [], error: '', reload: !state.reload }))
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(old => ({ ...old, surveys })) })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <Error error={state.error} reload={reload} />
          : <SurveyListItem surveys={state.surveys} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
