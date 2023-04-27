import styled from 'styled-components';
import { Layout } from 'antd';

export const Container = styled.div`
`;

export const StyledFooter = styled(Layout.Footer)`
  &.ant-layout-footer {
    display: flex;
    justify-content: center;
    background: #131313;
    color: #ffc107;
  }
`;
