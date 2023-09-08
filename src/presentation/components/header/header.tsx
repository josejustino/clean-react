import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { useLogout } from '@/presentation/hooks'
import { Logo, currentAccountState } from '@/presentation/components'

import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <div className={Styles.headertWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" href="#" onClick={buttonClick}>Sair</a>
          </div>
        </div>
      </header>

    </div>
  )
}

export default memo(Header)
