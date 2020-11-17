/* eslint-disable react/jsx-indent */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard';
import Spells from '../pages/spells';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/spells/:index" component={Spells} />
    </Switch>
);

export default Routes;
