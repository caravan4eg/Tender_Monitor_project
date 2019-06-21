import styled from 'styled-components'

export const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  border: 0;
  border-radius: 8px;
  color: #fff;
  padding: 18px 32px;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`
