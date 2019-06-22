import { Layout } from '../src/components/Layout'
import { Hero } from '../src/components/Hero'
import { Features } from '../src/components/Features'
import { CallToAction } from '../src/components/CallToAction'

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <CallToAction />
    </Layout>
  )
}

export default IndexPage
