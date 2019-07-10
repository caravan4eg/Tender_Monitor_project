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
  padding-bottom: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;

  span {
    font-size: 0.875rem;
  }
`
