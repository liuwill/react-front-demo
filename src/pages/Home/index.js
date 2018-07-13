import React, { Component } from 'react' // eslint-disable-line
// import { Route, Redirect } from 'react-router-dom'
import '../../styles/common.css'
import Upload from 'rc-upload'
import Button from 'pile-ui/dist/components/button'
import Inputs from 'pile-ui/dist/components/inputs'
import Driver from 'pile-ui/dist/components/driver'

// import Dialog from 'pile-ui/dist/components/dialog'
// const { Toast } = Dialog

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.host = ''
    this.uploadData = {
      token: '',
      key: '',
      // crc32: '',
      // accept: '',
    }
  }

  componentDidMount() {
  }

  handleInputToken = (e) => {
    this.uploadData.token = e.target.value
  }

  handleInputKey = (e) => {
    this.uploadData.key = e.target.value
  }

  handleInputHost = (e) => {
    this.host = e.target.value
  }

  handleBeforeUpload = (file) => {
    console.log('beforeUpload', file.name)
    if (!this.uploadData.token || !this.uploadData.key) {
      alert('请先填写token和文件名')
      return false
    }
  }

  handleUploadSuccess = (file, data) => {
    alert('文件上传成功，具体信息见控制台')
    console.log('onSuccess', file, data)

    if (this.host) {
      if (this.host.indexOf('http') < 0 || this.host.indexOf('//') < 0) {
        this.host = `http://${this.host}`
      }

      window.open(`${this.host}/${this.uploadData.key}`, '_blank')
    }
  }

  render() {
    const uploaderProps = {
      action: '//upload.qiniup.com/',
      method: 'POST',
      accept: 'file',
      multiple: false,
      beforeUpload: this.handleBeforeUpload,
      onStart: (file) => {
        console.log('onStart', file.name)
        // this.refs.inner.abort(file)
      },
      onSuccess: this.handleUploadSuccess,
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
            avatarUrl="https://avatars3.githubusercontent.com/u/2748731?s=100&v=4"
            carColor="白"
            carType="架构师"
            card="liuwill"
            cntOrder={174}
            company="github-code"
            isMaster={false}
            name="liuwill@live.com"
            phone="15800000000"
          />
        </div>
        <div className="page-form">
          <div className="page-form-item">
            <Inputs placeholder="bucke主机名(填写可预览)" onChange={this.handleInputHost} mainValue='' />
          </div>
          <div className="page-form-item">
            <Inputs placeholder="输入上传Token" onChange={this.handleInputToken} mainValue='' />
          </div>
          <div className="page-form-item">
            <Inputs placeholder="输入bucket key" onChange={this.handleInputKey} mainValue='' />
          </div>
        </div>
        <Upload
          {...uploaderProps}
          data={this.uploadData}
          component="div"
        >
          <Button>上传文件</Button>
        </Upload>

        {/* <Toast
          content='请先填写上传信息'
          toastShow={true}
          type='warning' // 类型：失败：fail，成功：success，错误：warning,loading : loading
          time={3000}
          callback={function () { console.log("状态更改时的触发") }}
        /> */}
      </div>
    )
  }
}
