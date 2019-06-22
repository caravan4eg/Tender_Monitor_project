import styled from 'styled-components'
import Link from 'next/link'

import { Container } from '../components/Container'

import promoPic from '../../static/images/review-illustration.png'

export const Feature = () => {
  return (
    <Root>
      <Container>
        <Inner>
          <div style={{ flexBasis: '45%' }}>
            <h1>Create custom training models.</h1>
            <p>
              Connect your data source, training tool and delivery method. Upload data you've already labeled or
              generate new annotations. Apres will create a private model and start training automatically.
            </p>
            <Link href="/">
              <a href="/">Get started with TenderMonitor</a>
            </Link>
          </div>
          <div style={{ flexBasis: '40%' }}>
            <img src={promoPic} />
          </div>
        </Inner>
      </Container>
    </Root>
  )
}

const Root = styled.section`
  margin-top: 48px;
  margin-bottom: 48px;

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.3rem;
  }

  a {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.red};
  }
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`
