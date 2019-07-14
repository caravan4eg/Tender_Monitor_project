import styled from 'styled-components'

import { Container } from 'components/Container'

export const ExtraHeader = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <Message>Это альфа версия продукта, донт джадж ми плиз 👋</Message>
        </Inner>
      </Container>
    </Root>
  )
}

const Message = styled.span`
  display: inline-block;
  color: #fff;
  font-size: 0.9375rem;
  padding-bottom: 8px;
  padding-top: 8px;
`

const Inner = styled.div`
  text-align: center;
`

const Root = styled.header`
  background-color: ${({ theme }) => theme.colors.red};
`
