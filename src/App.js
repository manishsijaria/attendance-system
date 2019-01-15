import React, { Component } from 'react';

import { history } from './_helpers';
import { ConnectedRouter } from 'connected-react-router';

import Header from './components/header'
import Main from './components/main'
import './css/overall-layout.css'


class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div className='border'>
          <div className='grid-container'>
              <div className='header'>
                <Header/>
              </div> 
              
              {/* show this div when isLoggedIn=false*/}
              <div className='center-grid'>
                <Main/>
              </div>
              {/* show these div when isLoggedIn=true*/}
              {/*
              <div className='aside'> 
                  <TreeNode node={tree} 
                    nodeSelected={this.state.nodeSelected} 
                    onNodeClick={this.handelClick} 
                  />
              </div>
              <div className='contents'> Main Contents </div>
              */}

              <div className='footer'>Copyright @2019-2020 Amiseq Inc.</div>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
