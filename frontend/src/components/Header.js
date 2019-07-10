import styled from 'styled-components'
import Link from 'next/link'

import { Container } from './Container'

import logo from '../../static/images/logo.svg'

export const Header = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <Link href="/">
            <Logo href="/">
              <img src={logo} />
            </Logo>
          </Link>

          <Navigation>
            <ul>
              <li>
                <Link href="/">
                  <a href="/">Продукты</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a href="/">Ресурсы</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a href="/">Стоимость</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a href="/">Как это работает</a>
                </Link>
              </li>
            </ul>
          </Navigation>

          <Navigation callToAction>
            <ul>
              <li>
                <Link href="/">
                  <Action href="/">Попробовать бесплатно</Action>
                </Link>
              </li>
            </ul>
          </Navigation>
        </Inner>
      </Container>
    </Root>
  )
}

const Root = styled.header`
  border-bottom: 1px solid #eee;
`

const Logo = styled.a`
  display: block;

  img {
    display: block;
    width: auto;
    height: 32px;
  }
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navigation = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      display: inline-block;
      margin-right: 32px;
      font-size: 0.9375rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    padding-bottom: 24px;
    padding-top: 24px;

    color: #000;

    transition: all 0.3s;

    &:hover {
      opacity: 0.55;
    }
  }
`

const Action = styled.a`
  color: ${({ theme }) => theme.colors.red} !important;
`
