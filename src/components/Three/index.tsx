
import React, { Component } from 'react'
import * as THREE from 'three';
import './utils/OrbitControls.js';
import transformObj from './utils/transformObj'

const img = require('../../assets/yay.jpg')
const imgs =require('../../assets/topo_host.png')
const bg = require('../../assets/bg.jpg')

export default class ThreeDemo extends Component<any,any>{
  dom:any = null
  camera:any = null
  scene:any = null
  renderer:any = null
  cube:any = null
  controls:any = null
  mouse: any= null
  raycaster: any= null
  componentDidMount(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.init({ width, height });
    window.addEventListener( 'click', this.click, false );
  }

  init = ({ width=1300, height=790 }) => {
    this.camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000 );
    this.camera.position.set(50,-500,500)
    this.camera.lookAt(0,0,0)
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog( 0x0000FF, 70, 150 );  //雾

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.dom.appendChild(  this.renderer.domElement );
    
    this.controls = new THREE.OrbitControls( this.camera, this.dom )
 
    //bg

    this.draBg()

//     var geometry = new THREE.PlaneBufferGeometry( 5, 20, 6);
// var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// var plane = new THREE.Mesh( geometry, material );
// this.scene.add( plane );


    let {lineArr, imgArr} = transformObj()
    console.log(lineArr)
    imgArr.forEach(i => {
      this.drawImg({ position:i.position})
    })
    lineArr.forEach(i => {
      this.drawLine(i.parent, i.child)
    })
    // this.camera.position.z = 50;
    // this.camera.position.set(100,100,100)
    // this.camera.target = new THREE.Vector3();

    this.animate()
  }

  animate = () => {

    this.renderer.render( this.scene, this.camera );
    // this.controls.update();
    requestAnimationFrame( this.animate );
  }

  drawImg = ({ position=[0,0,1000],  img=imgs }) => {

    let spriteMap = new THREE.TextureLoader().load( img );
    let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );

    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(10, 10, 10)
    sprite.position.set(position[0], position[1], position[2])
    this.scene.add( sprite );
  }

  drawLine = (parent=[0,0,0], child=[0,0,0]) => {
    let material = new THREE.LineBasicMaterial( { color: 0x4169E1 } );
    let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( ...parent) );
        geometry.vertices.push(new THREE.Vector3(...child) );
        let line = new THREE.Line( geometry, material );
        this.scene.add( line );
  }

  draBg = () => {
    console.log('bg')
    let textureSquares = new THREE.TextureLoader().load( bg );
    var groundMaterial = new THREE.MeshBasicMaterial( {
      // shininess: 80,
      color: 0xffffff,
      // specular: 0xffffff,
      map: textureSquares
    } );
    // 地面形状
    var planeGeometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    // 生成地面
    var ground = new THREE.Mesh( planeGeometry, groundMaterial );
    ground.position.set( -500, -500, 0 );
    // ground.rotation.x = - Math.PI / 2;
    ground.scale.set( 10, 10, 10 );
    ground.receiveShadow = true;
    this.scene.add( ground );
  }

  click = (e:any) => {
    // console.log('click', e)
        // 通过摄像机和鼠标位置更新射线
	this.raycaster.setFromCamera( this.mouse, this.camera );

	// 计算物体和射线的焦点
	var intersects = this.raycaster.intersectObjects( this.scene.children );

    // console.log('intersects', intersects)
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  } 


  render(){
    return(
      <div ref={e=> this.dom=e} id='xx' />
    )
  }
}

// 主机: mainframe,  服务器: service, IDS : ids, 路由器: router, 交换机: interchanger, 放火墙: firewall
// 坐标为相对坐标，且子级的坐标为相对于父级的坐标


// const getObj = () => {

// }

