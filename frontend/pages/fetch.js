import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import { Layout } from '../src/components/Layout'

export const FetchPage = ({ data }) => {
  return (
    <Layout>
      <Root>
        {data.map(({ score, show: { id } }) => (
          <h1 key={id}>{score}</h1>
        ))}
        <span>Copyright © {new Date().getFullYear()} TenderMonitor, Inc. 👋</span>
      </Root>
    </Layout>
  )
}

export default FetchPage

FetchPage.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
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
