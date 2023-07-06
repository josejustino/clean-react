import React, { useEffect, useState } from 'react'

import Context from '@/presentation/contexts/form/form-context'

import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'

import Styles from './login-styles.scss'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases'

type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  console.log(state)

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) {
      return
    }
    setState({ ...state, isLoading: true })

    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu e-mail' />

          <Input type='password' name='password' placeholder='Digite sua senha' />

          <button role='button' disabled={!!(state.emailError || state.passwordError)} type='submit' className={Styles.submit}>Entrar</button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
