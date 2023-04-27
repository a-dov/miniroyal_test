import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  max-width: 1024px;
  margin: auto;

  @media screen and (max-width: 580px) {
    padding: 1rem;
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .character-data-info-field {
    display: flex;
  }

  .character-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
    gap: 1em;

    & .btn-wrapper {
      gap: 1em;
      display: flex;
      margin-left: auto;
    }
  }

  .character-image {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .character-data {
    width: 100%;
    margin-right: 3rem;

    &-info {
      font-size: 1.3em;
    }

    &-details {
      background-color: var(--color-dark-500);
      padding: 1rem;
      width: 100%;
      border-radius: 0.5rem;

      h1 {
        font-weight: 500;
        font-size: 2rem;
        display: inline-block;
        color: white;
        transition: transform 0.3s ease;
        
        &:after {
          display: block;
          height: 4px;
          content: "";
          width: 100%;
          background-color: var(--color-primary-main);
          animation-duration: 3s;
          animation-name: slidein;
          transform-origin: top left;
        }
      }

      p {
        span {
          color: var(--color-primary-main);

          a {
            transition: all 0.3s ease-in-out;

            &:hover {
              color: ${({ theme }) => theme.colors.primary.light};
            }
          }
        }
      }
    }

    &-others {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 1rem;

      &-data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        h2 {
          font-weight: 400;
          font-size: 1rem;
          border-bottom: 2px solid var(--color-primary-main);
        }
      }
    }
  }

  @media screen and (max-width: 580px) {
    flex-direction: column;
    align-items: center;

    .character-image {
      margin-top: 2rem;
    }

    .character-data {
      margin-right: 0;

      &-others {
        flex-direction: column;

        &-data {
          margin-top: 1rem;
        }
      }
    }
  }
`;

export const StyledForm = styled(Form)`
  & {
    .ant-form {
      color: white;
    }

    .ant-form-item-control-input-content {
      color: var(--color-primary-main);
      font-size: 1.2em;
      font-weight: 500;
    }

    .ant-form-item .ant-form-item-label > label {
      color: white;
      font-size: 1.2em;
    }
  }
`;
