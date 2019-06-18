import styled from 'styled-components'
import Link from 'next/link'

import { Monitor } from 'react-feather'
import { Container } from 'src/components/Container'

export const Header = () => {
  return (
    <Container>
      <header>
        <Link href="/">
          <Logo href="/">
            <Monitor size="64" />
            <span>TenderMonitor</span>
          </Logo>
        </Link>
      </header>
    </Container>
  )
}

const Logo = styled.a`
  color: #161616;
  text-decoration: none;
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
    margin-left: 8px;
  }
`
