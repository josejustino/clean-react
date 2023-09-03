import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2023-07-30T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jul$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2023-06-03T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jun$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
