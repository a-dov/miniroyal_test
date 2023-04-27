import styled from 'styled-components';

export const NoDataContainer = styled.div`
  color: white;
  & > svg {
    width: 15em;
    height: 15em;
  }
  & > p {
    font-size: 2em;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & svg {
    animation: rotating 3s linear infinite;
  }
`;

export const Container = styled.div`
  padding-top: 2em;

  .card-list {
    padding: 2em;
  }

  .pagination {
    & .ant-pagination-item {
      background-color: rgba(154, 153, 152, 0.2);
    }

    & .ant-pagination-item a,
    & .ant-pagination-item button {
      color: white;
    }
    & .ant-pagination-item.ant-pagination-item-active {
      background-color: var(--color-primary-main);
    }
    &
      .ant-pagination
      .ant-pagination-item:not(.ant-pagination-item-active):hover,
    & .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link {
      background-color: rgba(255, 255, 255, 0.3);
    }
    & .ant-pagination-item-container .ant-pagination-item-ellipsis,
    & .ant-pagination-item-link,
    & .ant-pagination .ant-pagination-disabled:hover .ant-pagination-item-link {
      color: white;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;

    @media screen and (max-width: 660px) {
      flex-direction: column;
      justify-content: center;

      .pagination {
        margin-top: 1rem;
      }
    }
  }

  & .ant-card .ant-card-body {
    padding: 1em;
    font-size: 1.1em;
    min-height: 80px;
  }

  & .ant-card .card-name {
    min-height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
