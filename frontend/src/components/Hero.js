import styled from 'styled-components'

import { Button } from 'src/components/Button'

export const Hero = () => {
  return (
    <Root>
      <Inner>
        <h1>Automate AI training with active learning.</h1>
        <h2>Build human intelligence into automations that generate high-confidence training data.</h2>
      </Inner>
      <Button>Давайте попробуем</Button>
      <Promo src={'https://apres.io/static/media/concept-header.3b2837d9.png'} alt="" />
    </Root>
  )
}

const Root = styled.div``

const Inner = styled.div`
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  h1 {
    font-size: 4.625rem;
  }
  h2 {
    font-weight: normal;
  }
`

const Promo = styled.img`
  height: auto;
  max-width: 100%;
`
