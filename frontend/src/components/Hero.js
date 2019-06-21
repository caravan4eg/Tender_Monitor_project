import styled from 'styled-components'

import { Container } from 'src/components/Container'
import { Button } from 'src/components/Button'

export const Hero = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <h1>Мониторинг тендеров и конкурсных закупок</h1>
          <h2>Пользуясь сервисом ТендерМонитор вы можете сосредоточиться на главном, а рутину предоставьте нам. </h2>
          <Button>Давайте попробуем</Button>
        </Inner>
        <Promo src={'https://apres.io/static/media/concept-header.3b2837d9.png'} alt="" />
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
