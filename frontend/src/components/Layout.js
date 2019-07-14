import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { modernNormalize } from 'styled-modern-normalize'

import { Header } from 'components/Header'
import { ExtraHeader } from 'components/ExtraHeader'
import { Footer } from 'components/Footer'

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
        <>
          <ExtraHeader />
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      </ThemeProvider>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
${modernNormalize}

  body {
    color: #161616;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;components    -webkit-font-smoothing: antialiased;
    transition: all 0.4s cubic-bezier(0.3, 0.8, 0.2, 1) 0s;
  }
`
