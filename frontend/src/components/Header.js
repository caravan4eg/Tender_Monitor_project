import styled from 'styled-components'
import Link from 'next/link'

import { Container } from 'src/components/Container'

export const Header = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <Link href="/">
            <Logo href="/">ЛОГО</Logo>
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

          <Navigation>
            <ul>
              <li>
                <Link href="/">
                  <a href="/">Попробовать бесплатно</a>
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
  display: inline-block;
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

      a {
        display: inline-block;
        text-decoration: none;
        padding-bottom: 24px;
        padding-top: 24px;
      }
    }
  }
`
