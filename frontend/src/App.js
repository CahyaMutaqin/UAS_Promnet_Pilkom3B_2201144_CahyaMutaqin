import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
import ListKeuanganComponent from './components/ListKeuanganComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateKeuanganComponent from './components/CreateKeuanganComponent';
import ViewKeuanganComponent from './components/ViewKeuanganComponent';
import UpdateKeuanganComponent from './components/UpdateKeuanganComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                  <Switch> 
                    <Route path="/" exact component={ListKeuanganComponent}></Route>
                    <Route path="/add" component={CreateKeuanganComponent}></Route>
                    <Route path="/view/:id" component={ViewKeuanganComponent}></Route>
                    <Route path="/update/:id" component={UpdateKeuanganComponent}></Route>
                  </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
