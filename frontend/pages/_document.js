import Document, { Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    return renderPage()
  }

  render() {
    return (
      <html>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
