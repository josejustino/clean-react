import React, { useEffect, useMemo, useState } from 'react'

import Context from '@/presentation/contexts/form/form-context'

import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'

import { type Validation } from '@/presentation/protocols/validation'

import Styles from './signup-styles.scss'

type Props = {
  validation?: Validation
}

const SignUp: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState(state => ({
      ...state,
      nameError: validation?.validate('name', state.name),
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password),
      passwordConfirmationError: validation?.validate('passwordConfirmation', state.passwordConfirmation)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const context = useMemo(() => ({ state, setState }), [state, setState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setState(state => ({ ...state, isLoading: true }))
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={context}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>

          <Input type='text' name='name' placeholder='Digite seu e-mail' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />

          <button data-testid="submit" disabled={!!(state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError)} className={Styles.submit} type='submit'>Entrar</button>
          <span className={Styles.link}>Voltar para Login</span>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
