import { type SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model | undefined>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  }

  export type Model = SurveyResultModel
}
