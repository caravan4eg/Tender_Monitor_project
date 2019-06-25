import styled from 'styled-components'
import ky from 'ky-universal'

import { Layout } from '../src/components/Layout'

export const FetchPage = ({ data }) => {
  return (
    <Layout>
      <Root>
        {data.map(({ score, show: { id } }) => (
          <h1 key={id}>{score}</h1>
        ))}
      </Root>
    </Layout>
  )
}

export default FetchPage

FetchPage.getInitialProps = async () => {
  const res = await ky('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  return { data }
}

const Root = styled.footer`
  text-align: center;
  margin-bottom: 40px;

  span {
    font-size: 0.875rem;
  }
`
