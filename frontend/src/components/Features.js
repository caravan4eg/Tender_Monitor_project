import styled from 'styled-components'

import { Container } from 'components/Container'

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
            <p>Проповедник с телеэкрана вытягивал из верующих миллионы. Его не остановила даже тюрьма</p>
          </li>
          <li>
            <Header>
              <span>2</span>
              <h3>Преимущество</h3>
            </Header>
            <p>Проповедник с телеэкрана вытягивал из верующих миллионы. Его не остановила даже тюрьма</p>
          </li>
          <li>
            <Header>
              <span>3</span>
              <h3>Преимущество</h3>
            </Header>
            <p>Проповедник с телеэкрана вытягивал из верующих миллионы. Его не остановила даже тюрьма</p>
          </li>
        </ul>
      </Container>
    </Root>
  )
}

const Root = styled.header`
  border-bottom: 1px solid #eee;
  padding-bottom: 56px;
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

        line-height: 1.5;
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
