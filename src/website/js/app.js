import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import FontAwesome from 'react-fontawesome';

import NotFound from './components/notFound';
import GameContent from './containers/gameContent';
import About from './containers/about';
import MainLayout from './containers/mainLayout';

const createElement = (Component, props) => {
  return <Component {...props} />
}
const App = () => (
    <Router history={browserHistory} createElement={createElement}>
      <Route component={MainLayout}>
        <Route path="/" component={GameContent} />
        <Route path="/about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
)

export default App
