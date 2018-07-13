import React, { Component } from 'react' // eslint-disable-line
// import { Route, Redirect } from 'react-router-dom'
import '../../styles/common.css'
import Upload from 'rc-upload'
import Button from 'pile-ui/dist/components/button'
import Inputs from 'pile-ui/dist/components/inputs'
import Driver from 'pile-ui/dist/components/driver'

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      token: '',
      key: '',
    }
  }

  componentDidMount() {
  }

  handleBeforeUpload = (file) => {
    console.log('beforeUpload', file.name)
    if (!this.state.token || !this.state.key) {

      return false
    }
  }

  render() {
    const uploaderProps = {
      action: 'http://upload.qiniup.com/',
      method: 'POST',
      accept: 'file',
      multiple: false,
      beforeUpload: this.handleBeforeUpload,
      onStart: (file) => {
        console.log('onStart', file.name)
        // this.refs.inner.abort(file)
      },
      onSuccess(file) {
        console.log('onSuccess', file)
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name)
      },
      onError(err) {
        console.log('onError', err)
      },
    }

    return (
      <div className="app">
        <div className="page-header">
          <Driver
            avatarUrl="https://avatars3.githubusercontent.com/u/2748731?s=40&v=4"
            carColor="白"
            carType="架构师"
            card="liuwill@live.com"
            cntOrder={174}
            company="github-code"
            isMaster={false}
            name="刘伟"
            phone="15800000000"
          />
        </div>
        <div className="page-form">
          <div className="page-form-item">
            <Inputs placeholder="输入上传Token" mainValue={this.state.token} />
          </div>
          <div className="page-form-item">
            <Inputs placeholder="输入bucket key" mainValue={this.state.key} />
          </div>
        </div>
        <Upload
          {...uploaderProps}
          data={{
            token: this.state.token,
            key: this.state.key,
            crc32: '',
            accept: '',
          }}
          component="div"
        >
          <Button>上传文件</Button>
        </Upload>
      </div>
    )
  }
}
