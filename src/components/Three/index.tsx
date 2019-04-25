
import React, { Component } from 'react'
import * as THREE from 'three';
import './utils/OrbitControls.js';


const img = require('../../assets/yay.jpg')
const imgs =require('../../assets/topo_host.png')


export default class ThreeDemo extends Component<any,any>{
  dom:any = null
  camera:any = null
  scene:any = null
  renderer:any = null
  cube:any = null
  controls:any = null
  componentDidMount(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.init({ width, height });
  }

  init = ({ width=1300, height=790 }) => {
    this.camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000 );
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x0000FF, 70, 150 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.dom.appendChild(  this.renderer.domElement );
    
    this.controls = new THREE.OrbitControls( this.camera, this.dom )
    
    this.draw({})
    this.camera.position.z = 100;
    this.camera.target = new THREE.Vector3();

    this.animate()
  }

  animate = () => {
    this.renderer.render( this.scene, this.camera );
    // this.controls.update();
    requestAnimationFrame( this.animate );
  }

  draw = ({ boxSize=[10,10,0.1],  }) => {
    let geometry = new THREE.BoxGeometry(boxSize[0], boxSize[1], boxSize[2]);

    let spriteMap = new THREE.TextureLoader().load( imgs );
    let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );

    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(10, 10, -10)
    // this.scene.add( sprite );

    let material = new THREE.MeshBasicMaterial({  map: spriteMap  });
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
  }

  render(){
    return(
      <div ref={e=> this.dom=e} id='xx' />
    )
  }
}



