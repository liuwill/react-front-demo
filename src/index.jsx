import React, { Component } from 'react' // eslint-disable-line
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// import Pile from 'pile'
import 'pile-ui/dist/styles/pile.min.css'
import App from './app'
// import './images/favicon.ico'

if (_GLOBAL_CONFIG && _GLOBAL_CONFIG.version) {
  console.log(`%c🌍🚀 LiuWill[version:${_GLOBAL_CONFIG.version}] BUILD: ${_GLOBAL_CONFIG.currentTime}`, 'color:#666')
}

render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./app', () => {
    const RootContainer = require('./app').default
    render(
      <AppContainer>
        <RootContainer/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
