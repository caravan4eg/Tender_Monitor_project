import styled from 'styled-components'

export const Footer = () => {
  return (
    <Root>
      <span>Copyright © {new Date().getFullYear()} TenderMonitor, Inc. 👋</span>
    </Root>
  )
}

const Root = styled.footer`
  text-align: center;
  margin-bottom: 40px;

  span {
    font-size: 0.875rem;
  }
`
