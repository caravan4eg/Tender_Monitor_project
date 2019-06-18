import styled from 'styled-components'

export const Container = ({ children }) => {
  return <Root>{children}</Root>
}

const Root = styled.div`
  max-width: 100%;
  width: 1140px;
  margin-left: auto;
  margin-right: auto;
`
