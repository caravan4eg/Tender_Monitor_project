import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { Header } from './Header'
import { ExtraHeader } from './ExtraHeader'
import { Footer } from './Footer'

const theme = {
  colors: {
    red: '#fb505d',
  },
}

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ExtraHeader />
      </ThemeProvider>
      <Header />
      <ThemeProvider theme={theme}>
        <main>{children}</main>
      </ThemeProvider>
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
