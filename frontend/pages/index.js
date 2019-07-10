import { Layout } from '../src/components/Layout'
import { Hero } from '../src/components/Hero'
import { Features } from '../src/components/Features'
import { Feature } from '../src/components/Feature'
import { Solutions } from '../src/components/Solutions'
import { CallToAction } from '../src/components/CallToAction'

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <Feature />
      <Solutions />
      <CallToAction />
    </Layout>
  )
}

export default IndexPage
