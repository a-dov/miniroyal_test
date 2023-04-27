import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  img {
    width: 80px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
