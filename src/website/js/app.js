import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import FontAwesome from 'react-fontawesome';

import NotFound from './components/notFound';
import GameContent from './containers/gameContent';
import About from './containers/about';
import MainLayout from './containers/mainLayout';

const App = () => (
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={GameContent} />
        <Route path="/about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
)

export default App
