import styled, { createGlobalStyle } from 'styled-components'

import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Container } from 'src/components/Container'

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    color: #161616;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1.2rem;
    -webkit-font-smoothing: antialiased;
    line-height: 1.4;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.3, 0.8, 0.2, 1) 0s;
    margin: 0;
    padding: 0;
  }
`
