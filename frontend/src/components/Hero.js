import styled from 'styled-components'
import Link from 'next/link'

import { Container } from 'components/Container'
import { Button } from 'components/Button'
import heroIllustration from 'static/images/hero-illustration.png'

export const Hero = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <h1>Мониторинг тендеров и конкурсных закупок</h1>
          <h2>Пользуясь сервисом ТендерМонитор вы можете сосредоточиться на главном, а рутину предоставьте нам. </h2>
          <Link href="/fetch">
            <Button>Давайте попробуем</Button>
          </Link>
        </Inner>
        <Promo src={heroIllustration} alt="" />
      </Container>
    </Root>
  )
}

const Root = styled.div`
  margin-bottom: 48px;
`

const Inner = styled.div`
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  h1 {
    font-size: 4rem;
    line-height: 1.3;
  }
  h2 {
    font-size: 1.7rem;
    font-weight: normal;
    margin-bottom: 48px;
  }
`

const Promo = styled.img`
  height: auto;
  max-width: 100%;
`
