import styled from 'styled-components'

import { Container } from './Container'

export const Features = () => {
  return (
    <Root>
      <Container>
        <ul>
          <li>
            <Header>
              <span>1</span>
              <h3>Преимущество</h3>
            </Header>
            <p>
              Create your own annotations or automate labeling using our experts. Supervise training in real-time with
              interactive tools and graphical results.
            </p>
          </li>
          <li>
            <Header>
              <span>2</span>
              <h3>Преимущество</h3>
            </Header>
            <p>
              Create your own annotations or automate labeling using our experts. Supervise training in real-time with
              interactive tools and graphical results.
            </p>
          </li>
          <li>
            <Header>
              <span>3</span>
              <h3>Преимущество</h3>
            </Header>
            <p>
              Create your own annotations or automate labeling using our experts. Supervise training in real-time with
              interactive tools and graphical results.
            </p>
          </li>
        </ul>
      </Container>
    </Root>
  )
}

const Root = styled.header`
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;

    li {
      flex-basis: 28%;
      list-style: none;

      p {
        margin: 0;
        margin-left: 40px;
        font-size: 1rem;
      }
    }
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  span {
    display: inline-block;
    position: relative;
    z-index: 5;
    margin-right: 32px;
    color: #fff;

    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 32px;
      height: 32px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${({ theme }) => theme.colors.red};
      border-radius: 50%;
    }
  }

  h3 {
    margin: 0;
  }
`
