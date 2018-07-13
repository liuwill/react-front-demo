import React, { Component } from 'react' // eslint-disable-line
// import { Route, Redirect } from 'react-router-dom'
import Button from 'pile-ui/dist/components/button'

import '../../styles/common.css'

export default class Home extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="app">
        <Button>hello Pile</Button>
      </div>
    )
  }
}
