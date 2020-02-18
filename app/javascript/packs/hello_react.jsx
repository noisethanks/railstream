// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { RecordRTCPromisesHandler } from "recordrtc";
import Webcam from 'react-webcam'
import Player from 'react-player'

import { loadModels, getFullFaceDescription, createMatcher } from './face';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

const INIT_STATE = {
  // imageURL: testImg,
  fullDesc: null,
  detections: null,
  descriptors: null,
  expressions: null,
  match: null
};
class Video extends React.Component {
  state = {...INIT_STATE,
    faceMatcher:null,
    recorder: null,
    videoURL: null,
    live: false
  };

  async componentWillMount(){
    await loadModels();
  }

  startKinesis = () => {
    // const stream = this.webcam.stream;
    // console.log(stream)

    // console.log(stream.getVideoTracks())
    // var remoteconnection = new RTCPeerConnection()
    // console.log(remoteconnection)
    // const recorder = new RecordRTCPromisesHandler(stream, {
    //   type: "video"
    // });
    // this.setState({ recorder: recorder, });
  };
  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  capture = async () => {
    // if (!!this.webcam.current) {
    //   console.log('webcam is on')
      await getFullFaceDescription(
        this.webcam.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        if (!!fullDesc) {
          this.setState({
            detections: fullDesc.map(fd => fd.detection),
            descriptors: fullDesc.map(fd => fd.descriptor),
            expressions: fullDesc.map(fd => fd.expressions)
          });
        }else{
          this.setState({
            detections: null,
            descriptors:null,
            expressions:null
          })
        }
      });

      // if (!!this.state.descriptors && !!this.state.faceMatcher) {
      //   let match = await this.state.descriptors.map(descriptor =>
      //     this.state.faceMatcher.findBestMatch(descriptor)
      //   );
      //   this.setState({ match });
      // }
    // }
  };
  start = () => {
    this.interval = setInterval(() => {
      this.capture();
      // console.log('capturing')
    }, 30);
  };

  startCapture = () => {
    this.setState({live:true})
    this.start();
    // this.state.recorder.startRecording();
  };

  stopCapture = async () => {
    clearInterval(this.interval);
    // await this.state.recorder.stopRecording();
    // let videoURL = await this.state.recorder.getDataURL();
    this.setState({
      // videoURL: videoURL,
      live:false
    });

    // console.log(videoURL);
  };

  render() {
    let drawBox = null;
    var message = (<div></div>)
    if (!!this.state.detections) {

      if(!!this.state.expressions[0] &&this.state.expressions[0]['happy'] > 0.5){
        message = (<h1>Keep Smiling!</h1>)
      }else{
        message = (<h1>You should smile more!</h1>)
      }
      drawBox = this.state.detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {/* {!!match && !!match[i] ? ( */}
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {/* {match[i]._label} */}
                </p>
              )
              {/* : null} */}
            </div>
          </div>
        );
      });
    }
    var player = (<div></div>)
    if(this.state.live===true){
     player = (
     <div>
                   {!!drawBox ? drawBox : null}
       <Player url={this.webcam.stream} width="640px" height="480px" playing={true}/>
       {message}
      </div>)
    }
    return (
      <div>
            {/* {!!drawBox ? drawBox : null} */}
            <div style={{fontSize:50}}>Input Stream!
            <button style={{width:'70px',height:'70px', backgroundColor:'green'}} onClick={this.startCapture}>PIPE</button>
            <button style={{width:'70px',height:'70px', backgroundColor:'red'}} onClick={this.stopCapture}>Stop</button>
            <button style={{width:'70px',height:'70px', backgroundColor:'red'}} onClick={this.startKinesis}>Stop</button>
            </div>
            <Webcam
              ref={e => (this.webcam = e)}
              // onUserMedia={this.handleUserMedia}
              audio={false}
              screenshotFormat="image/jpeg"
            />

            <div style={{fontSize:50}}>Output Stream!</div>
        {player}

      </div>
    );
  }

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Video name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
