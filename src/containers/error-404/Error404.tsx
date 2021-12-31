import React, { FC } from 'react';

import Layout from 'src/components/layout/Layout';
import NoticePage from 'src/components/notice-page/NoticePage';
import useTranslate from 'src/hooks/useTranslate';

import localization from './Error404.localization';

const Error404: FC = () => {
  const translate = useTranslate(localization);
  return (
    <Layout>
      <NoticePage
        action={{
          href: '/',
          label: translate('action'),
        }}
        textContact={translate('contactMe')}
        title="404"
        translate={translate}
      />
    </Layout>
  );
};

export default Error404;
