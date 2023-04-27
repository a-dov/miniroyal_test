import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from '../../images/logo.svg';

export function HeaderContent({ back }: { back?: boolean }) {
  return (
    <Link to="/">
      {!back ? (
        <img src={logo} style={{ height: '100%' }} alt="Logo Star Wars" />
      ) : <Button type="link" icon={<ArrowLeftOutlined />}>Back</Button>}
    </Link>
  );
}
