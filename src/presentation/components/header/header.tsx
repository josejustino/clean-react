import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

import { Logo } from '@/presentation/components'

import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login')
  }

  return (
    <div className={Styles.headertWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>José Justino</span>
            <a data-testid="logout" href="#" onClick={logout}>Sair</a>
          </div>
        </div>
      </header>

    </div>
  )
}

export default memo(Header)
