import styled from 'styled-components'
import { Menu } from 'react-feather'
import Link from 'next/link'

import { Container } from 'components/Container'
import logo from 'static/images/logo.svg'

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
              {links.map(({ slug, title }) => (
                <li key={title}>
                  <Link href={`/${slug}`}>
                    <a href={`/${slug}`}>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Navigation>

          <Navigation callToAction>
            <ul>
              <li>
                <Link href="/">
                  <a href="/">Войти</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Action href="/">Регистрация</Action>
                </Link>
              </li>
            </ul>
          </Navigation>
          <BurgerMenu>
            <MenuIcon />
          </BurgerMenu>
        </Inner>
      </Container>
    </Root>
  )
}

const links = [
  { slug: '/', title: 'О сервисе' },
  { slug: 'search', title: 'Поиск' },
  { slug: '/', title: 'Тарифы' },
  { slug: '/', title: 'Помощь' },
  { slug: '/', title: 'Контакты' },
]

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

    @media (max-width: 980px) {
      display: none;
    }
  }
`

const Action = styled.a`
  color: ${({ theme }) => theme.colors.red} !important;
`

const BurgerMenu = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  @media (min-width: 980px) {
    display: none;
  }
`

const MenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.colors.red} !important;
`
