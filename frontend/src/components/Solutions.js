import styled from 'styled-components'

import { Container } from './Container'

const cards = [
  {
    image: 'https://cdn.buttercms.com/T63cTahMT9qwO5psJGWM',
    title: 'SMS spam detection',
  },
  {
    image: 'https://cdn.buttercms.com/T63cTahMT9qwO5psJGWM',
    title: 'SMS spam detection',
  },
  {
    image: 'https://cdn.buttercms.com/T63cTahMT9qwO5psJGWM',
    title: 'SMS spam detection',
  },
]

export const Solutions = () => {
  return (
    <Root>
      <Container>
        <h1>Solutions</h1>
        <Inner>
          {cards.map(({ image, title }) => (
            <Card key={title}>
              <img src={image} />
              <h3>{title}</h3>
            </Card>
          ))}
        </Inner>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  border-top: 1px solid #eee;
  padding-top: 40px;
  padding-bottom: 40px;
`

const Inner = styled.section`
  display: flex;
  justify-content: space-between;
`

const Card = styled.article`
  flex-basis: calc(100% / 3 - 24px);
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.05);

  img {
    display: block;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    max-width: 100%;
    height: auto;
  }

  h3 {
    padding-left: 24px;
    padding-right: 24px;
  }
`
