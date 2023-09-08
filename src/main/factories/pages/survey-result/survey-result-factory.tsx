import React from 'react'
import { useParams } from 'react-router-dom'

import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/useCases'
import { SurveyResult } from '@/presentation/pages'

export const MakeSurveyResult: React.FC = () => {
  const { id } = useParams()

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
