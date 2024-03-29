import styled from 'styled-components'

export const Container = ({ children }) => {
  return <Root>{children}</Root>
}

const Root = styled.div`
  width: 100%;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;

  padding-left: 16px;
  padding-right: 16px;
`
