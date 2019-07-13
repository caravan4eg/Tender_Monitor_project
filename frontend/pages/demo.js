import ky from 'ky-universal'

import { Layout } from '../src/components/Layout'
import { Container } from '../src/components/Container'

export const DemoPage = ({ data }) => {
  return (
    <Layout>
      <Container>
        <h1>Категории</h1>
        {data.results.map(({ category_descr, id }) => (
          <p key={id}>{category_descr}</p>
        ))}
      </Container>
    </Layout>
  )
}

export default DemoPage

DemoPage.getInitialProps = async () => {
  const res = await ky('http://tender-monitor.herokuapp.com/api/categories/')
  const data = await res.json()
  return { data }
}
