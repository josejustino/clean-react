export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model | undefined>
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string
    date: Date
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
