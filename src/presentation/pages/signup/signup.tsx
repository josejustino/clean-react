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
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState(state => ({
      ...state,
      nameError: validation?.validate('name', state.name)
    }))
  }, [state.name])

  const context = useMemo(() => ({ state, setState }), [state, setState])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={context}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>

          <Input type='text' name='name' placeholder='Digite seu e-mail' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Digite sua senha' />

          <button data-testid="submit" disabled className={Styles.submit} type='submit'>Entrar</button>
          <span className={Styles.link}>Voltar para Login</span>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
