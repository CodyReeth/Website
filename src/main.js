import './style.css'
import pcUrl from './pc.glb?url';
import deskUrl from './desk.glb?url';
import chairUrl from './chair.glb?url';
import bedUrl from './untitled.glb?url';
import monitorUrl from './monitor.glb?url';
import closetUrl from './closet.glb?url';

import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const loader = new GLTFLoader();

loader.load(bedUrl, (gltf) => {
    const model = gltf.scene
    model.position.setX(3);
    scene.add(model);
},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(deskUrl, (gltf) => {
    const model = gltf.scene
    model.position.setZ(-2);
    model.position.setX(-.5);
    model.rotation.set(0, -Math.PI / 2, 0); 
    scene.add(model);
},undefined, (error) =>  {
    console.error('error loading gltf',error);
});


loader.load(pcUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(0.38,2.3,-2);
    scene.add(model);
},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(monitorUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-.8,1.77,-2);
    model.rotation.set(0, Math.PI /2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(chairUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-.5,0,0);
    model.rotation.set(0, 3 *Math.PI /4, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(closetUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-3.2,0,0);
    model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(-2,7,5);
//-renderer.render(scene,camera);


const geometry = new THREE.PlaneGeometry(8.7, 7);
const geometry2 = new THREE.PlaneGeometry(8.7, 8.7);
const material = new THREE.MeshStandardMaterial({
    color: 0xFFFFE4,
    transparent:true,
    opacity:0.9,
});
const material2 = new THREE.MeshStandardMaterial({
    color: 0xFFFFE4,
    transparent:true,
    opacity:0.1,
});
const material3 = new THREE.MeshStandardMaterial({
    color: 0x232b2b,
    //transparent:true,
    //opacity:0.9,
});

const wall1 = new THREE.Mesh(geometry,material);
const wall2 = new THREE.Mesh(geometry,material2);
const wall3 = new THREE.Mesh(geometry,material);
const wall4 = new THREE.Mesh(geometry,material2);
const wall5 = new THREE.Mesh(geometry,material);
const wall6 = new THREE.Mesh(geometry,material2);
const wall7 = new THREE.Mesh(geometry,material);
const wall8 = new THREE.Mesh(geometry,material2);
const wall9 = new THREE.Mesh(geometry2,material3);
const wall10 = new THREE.Mesh(geometry2,material2);
const wall11 = new THREE.Mesh(geometry2,material);
const wall12 = new THREE.Mesh(geometry2,material2);

wall1.position.set(0.4,3.5,-3.1);
wall2.position.set(0.4,3.5,-3.1);
wall2.rotation.set(0,Math.PI,0);

wall3.position.set(-3.95,3.5,1.25);
wall3.rotation.set(0,Math.PI/2,0);
wall4.position.set(-3.95,3.5,1.25);
wall4.rotation.set(0,3*Math.PI/2,0);

wall5.position.set(4.74,3.5,1.25);
wall5.rotation.set(0,-Math.PI/2,0);
wall6.position.set(4.74,3.5,1.25);
wall6.rotation.set(0,-3*Math.PI/2,0);


wall7.position.set(0.4,3.5,5.6);
wall7.rotation.set(0,Math.PI,0);
wall8.position.set(0.4,3.5,5.6);
//wall8.rotation.set(0,.PI,0);
//
wall9.position.set(0.4,0,1.25);
wall9.rotation.set(-Math.PI/2,0,Math.PI/2);
wall10.position.set(0.4,0,1.25);
wall10.rotation.set(Math.PI/2,0,Math.PI/2);

wall11.position.set(0.4,7,1.25);
wall11.rotation.set(Math.PI/2,0,Math.PI/2);
wall12.position.set(0.4,7,1.25);
wall12.rotation.set(-Math.PI/2,0,Math.PI/2);

scene.add(wall1);
scene.add(wall2);
scene.add(wall3);
scene.add(wall4);
scene.add(wall5);
scene.add(wall6);
scene.add(wall7);
scene.add(wall8);
scene.add(wall9);
scene.add(wall10);
scene.add(wall11);
scene.add(wall12);

const pointLight = new THREE.PointLight(0xffffff,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(0,4,0);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//const bgTexture = new THREE.TextureLoader().load('/Website/space.jpg');
//scene.background = bgTexture;


//texture map on objects and normal maps
/* 
 new mesh( { map: texture, normalMap: texture
 * */

//document.body.onscroll = some function

function addStar() {
    const geometry = new THREE.SphereGeometry(.25,24,24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
    requestAnimationFrame(animate);

    //torus.rotation.x += 0.01;
    //torus.rotation.y += 0.005;
    //torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene,camera);
}
// In your main.js
console.log('Window location:', window.location);
console.log('Document URL:', document.URL);
console.log('Base URL:', document.baseURI);

// For Vite-specific path information
console.log('Vite import.meta.url:', import.meta.url);
console.log('Vite base URL:', import.meta.env.BASE_URL);

// To see the path of your script element
const scriptElement = document.currentScript || document.querySelector('script[src*="main"]');
if (scriptElement) {
  console.log('Script src:', scriptElement.src);
}

animate();
