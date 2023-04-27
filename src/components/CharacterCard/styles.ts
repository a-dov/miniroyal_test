import styled from 'styled-components';

export const Container = styled.div`
  width: 15rem;
  position: relative;
  transition: all 0.3s ease-in;
  border-radius: 0.5rem;
  z-index: 2;

  @media screen and (max-width: 480px) {
    width: 100%;
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
  }

  .card-name {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

  }
`;
