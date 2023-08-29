import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FormContext, ApiContext } from '@/presentation/contexts'

import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components'

import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases'

import Styles from './login-styles.scss'

type Props = {
  validation?: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const { setCurrentAccount } = useContext(ApiContext)

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

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(state => ({ ...state, isLoading: true }))

      const account = await authentication.auth({ email: state.email, password: state.password })

      setCurrentAccount(account)
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
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={context}>
        <form role='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu e-mail' />

          <Input type='password' name='password' placeholder='Digite sua senha' />

          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
