import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigational from './components/Navigational';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Videos from './pages/Videos';
import Search from './pages/Search';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/videos" component={Categories}></Route>
        <Route
          path="/videos/:videoCatTitle/:videoCatId"
          component={Videos}></Route>
        <Route exact path="/search" component={Search}></Route>
      </Switch>
      <Navigational></Navigational>
    </div>
  );
};

export default App;
