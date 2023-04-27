import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { HeaderContent } from '../Header';
import { FooterContent } from '../Footer';
import { StyledFooter } from './styles';

const { Header, Content } = Layout;

type PageLayoutProps = {
  back?: boolean;
};

export function PageLayout({ back }: PageLayoutProps) {
  return (
    <>
      <Header style={{ backgroundColor: '#131313' }}>
        <HeaderContent back={back} />
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 154px)' }}>
        <Outlet />
      </Content>
      <StyledFooter>
        <FooterContent />
      </StyledFooter>
    </>
  );
}
