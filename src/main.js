import './style.css'
import pcUrl from '/Website/assets/pc.glb?url';
import deskUrl from '/Website/assets/desk.glb?url';
import chairUrl from '/Website/assets/chair.glb?url';
import bedUrl from '/Website/assets/untitled.glb?url';
import monitorUrl from '/Website/assets/monitor.glb?url';

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
    model.rotation.set(0, -Math.PI / 2, 0); 
    scene.add(model);
},undefined, (error) =>  {
    console.error('error loading gltf',error);
});


loader.load(pcUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(0.88,2.3,-2);
    scene.add(model);
},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(monitorUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-.3,1.77,-2);
    model.rotation.set(0, Math.PI /2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(chairUrl, (gltf) => {
    const model = gltf.scene
    //model.position.set(-.3,1.77,-2);
    model.rotation.set(0, 3 *Math.PI /4, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(-5,5,5);
//-renderer.render(scene,camera);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

const torus = new THREE.Mesh(geometry,material);
//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff,200);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(0,4,0);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper);

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

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

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
