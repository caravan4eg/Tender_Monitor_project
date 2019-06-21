import styled from 'styled-components'
import { Container } from 'src/components/Container'
import { Button } from 'src/components/Button'

export const CallToAction = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <div>
            <h2>Используй TenderMonitor бесплатно</h2>
            <p>Никаких ограничений в течении 14 дней</p>
          </div>
          <Button>Попробуй бесплатно</Button>
        </Inner>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  margin: 56px 0;
`

const Inner = styled.div`
  padding: 64px 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
`
