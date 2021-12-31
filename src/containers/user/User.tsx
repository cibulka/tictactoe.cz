import React, { FC } from 'react';

import Layout from 'src/components/layout/Layout';
import UserGate from 'src/components/user-gate/UserGate';
import useTranslate from 'src/hooks/useTranslate';

import UserScores from './components/UserScores';
import localization from './User.localization';

const User: FC = () => {
  const translate = useTranslate(localization);

  return (
    <Layout pageTitle={translate('pageTitle') as string}>
      <div className="m-auto">
        <UserGate LoggedInView={() => <UserScores translate={translate} />} />
      </div>
    </Layout>
  );
};

export default User;
