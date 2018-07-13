import React, { Component } from 'react' // eslint-disable-line
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'

const Router = HashRouter // process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter
// const nodeEnv = process.env.NODE_ENV

export default class App extends Component {
  render () {
    // const { store } = this.props;
    // if (!this.route) this.route = route
    return (
      // <Provider store={store}>
      <Router children={
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      } />
      // </Provider>
    )
  }
}
