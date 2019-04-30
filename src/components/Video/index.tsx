

import React, { Component } from 'react'

import 'video.js';
import 'video.js/dist/video-js.css'
// import mp4 from 
const mp4 = require('../../assets/1.mp4')
const jpg = require('../../assets/yay.jpg')
const pdf = require('../../assets/1.pdf')



class Video extends Component<any, any>{
  render(){
    console.log()
    return(
      <div>
        <a  target='_blank' href={mp4}  >mp4</a>
        <a  target='_blank' href={pdf}  >pdf</a>
        <video id='my-video' className='video-js' controls={true} preload='auto' width='640' height='264' poster={jpg} data-setup='{}' >
          <source src={mp4} type='video/mp4'/>>
        </video>
      </div>
    )
  }
}

export default Video
