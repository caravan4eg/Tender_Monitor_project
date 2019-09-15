import styled from 'styled-components'

import { Container } from 'components/Container'

export const ExtraHeader = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <Message>
            Продукт находится в альфа-версии{' '}
            <span role="img" aria-label="smile">
              😜
            </span>
          </Message>
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
