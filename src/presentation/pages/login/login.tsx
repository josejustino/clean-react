import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Context from '@/presentation/contexts/form/form-context'

import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components'

import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication, type SaveAccessToken } from '@/domain/usecases'

import Styles from './login-styles.scss'

type Props = {
  validation?: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const emailError = validation?.validate('email', state.email)
    const passwordError = validation?.validate('password', state.password)

    setState(state => ({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    }))
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(state => ({ ...state, isLoading: true }))

      const account = await authentication.auth({ email: state.email, password: state.password })

      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState(state => ({
        ...state,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  const context = useMemo(() => ({ state, setState }), [state, setState])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={context}>
        <form role='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu e-mail' />

          <Input type='password' name='password' placeholder='Digite sua senha' />

          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
