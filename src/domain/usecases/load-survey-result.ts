import { type SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model | undefined>
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel
}
