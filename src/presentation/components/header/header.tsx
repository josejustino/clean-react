import React, { memo } from 'react'
import Styles from './header-styles.scss'

import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
    <div className={Styles.headertWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>José Justino</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

    </div>
  )
}

export default memo(Header)
