import './style.css'
import pcUrl from './pc.glb?url';
import deskUrl from './desk.glb?url';
import chairUrl from './chair.glb?url';
import bedUrl from './untitled.glb?url';
import monitorUrl from './monitor.glb?url';
import closetUrl from './closet.glb?url';
import laundryUrl from './laundry.glb?url';
import plasticUrl from './plastic.glb?url';
import boardUrl from './board.glb?url';
import doorUrl from './door.glb?url';
import floorUrl from './floor.jpg?url';
import ceilingUrl from './ceiling.jpg?url';
import normalUrl from './normal.jpg?url';
import map1Url from './map1.glb?url';
import map2Url from './map2.glb?url';
import lampUrl from './lamp.glb?url';
import shelfUrl from './shelf.glb?url';
import bookUrl from './book.glb?url';



import * as THREE from 'three'

import { gsap } from "gsap";

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load(floorUrl, (tex) => {
    //tex.wrapS = THREE.RepeatWrapping; // Allow horizontal repetition
    //tex.wrapT = THREE.RepeatWrapping; // Allow vertical repetition
    //tex.repeat.set(4, 2); // Repeat the texture 4x in X, 2x in Y
});
const ceilingTexture = textureLoader.load(ceilingUrl, (tex) => {
    tex.wrapS = THREE.RepeatWrapping; // Allow horizontal repetition
    tex.wrapT = THREE.RepeatWrapping; // Allow vertical repetition
    tex.repeat.set(4, 4); // Repeat the texture 4x in X, 2x in Y
});
const normalTexture = textureLoader.load(normalUrl, (tex) => {
    tex.wrapS = THREE.RepeatWrapping; // Allow horizontal repetition
    tex.wrapT = THREE.RepeatWrapping; // Allow vertical repetition
    tex.repeat.set(2, 2); // Repeat the texture 4x in X, 2x in Y
});

const loader = new GLTFLoader();

loader.load(bedUrl, (gltf) => {
    const model = gltf.scene;
    //model.side = THREE.frontSide;
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

window.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        console.log("here");
        controls.enabled = false;

        const targetPosition = new THREE.Vector3(-0.82, 2.49, -0.53);
        const targetRotation = new THREE.Euler(-0, -0, 0);

        moveCamera(camera, targetPosition, targetRotation, 2);
        controls.target.set(-0.82,2.49,-1);
        //controls.update();
        
    } else if (event.key === 's' || event.key === 'S') {
        console.log("s press");
        logCameraState(camera);
        controls.enabled = true;
    }else if (event.key === 'l' || event.key === 'L') {
        console.log("l press");
        //controls.enabled = true;
    }

});
/*function setupRaycast(scene, camera, renderer, gltfModel) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(event) {
        // Clear previous clicked objects
        const clickedObjects = [];

        // Convert mouse click to normalized device coordinates (-1 to +1)
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Perform raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true); // Recursive search in children

        // Store intersected objects' world positions
        intersects.forEach(intersection => {
            const object = intersection.object;
            if (object.isMesh) {
                clickedObjects.push(object);
            }
        });

        console.log("Clicked Objects:", clickedObjects);

        // Check if the third object in the list belongs to the GLTF model
        if (clickedObjects.length >= 3 && gltfModel && gltfModel.contains(clickedObjects[2])) {
            console.log("The third object clicked is from the GLTF model:", clickedObjects[2]);
        }
    }

    // Add event listener
    renderer.domElement.addEventListener("click", onClick);
}*/


function setupRaycast(scene, camera, renderer, gltfModel) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(event) {
        // Clear previous clicked objects
        const clickedObjects = [];

        // Convert mouse click to normalized device coordinates (-1 to +1)
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Perform raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true); // Recursive search in children

        // Store intersected mesh objects
        intersects.forEach(intersection => {
            if (intersection.object.isMesh) {
                clickedObjects.push(intersection.object);
            }
        });

        console.log("Clicked Objects:", clickedObjects);

        // Check if the third object (index 2) belongs to the GLTF model
        if (clickedObjects.length >= 3) {
            const thirdObject = clickedObjects[2];

            // Check if the third object is inside the GLTF model
            let parent = thirdObject;
            while (parent) {
                if (parent === gltfModel) {
                    console.log("The third object clicked is part of the GLTF model:", thirdObject);
                    //controls.enabled = false;

                    const targetPosition = new THREE.Vector3(-0.82, 2.49, -0.53);
                    const targetRotation = new THREE.Euler(-0, -0, 0);

                    moveCamera(camera, targetPosition, targetRotation, 2);
                    controls.target.set(-0.82,2.49,-1);
                    //controls.enabled = true;
                    break;
                }
                parent = parent.parent;
            }
        }
    }

    // Add event listener
    renderer.domElement.addEventListener("click", onClick);
}

/*function setupRaycast(scene, camera, renderer) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const clickedObjects = []; // Stores encountered objects

    function onClick(event) {
        // Convert mouse click to normalized device coordinates (-1 to +1)
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Perform raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true); // Recursive search in children

        // Filter GLTF objects and store their world positions
        intersects.forEach(intersection => {
            const object = intersection.object;
            if (object.isMesh) {
                clickedObjects.push(object.position.clone());
            }
        });

        console.log("Clicked Objects:", clickedObjects);
    }

    // Add event listener
    renderer.domElement.addEventListener("click", onClick);
}
*/


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
    setupRaycast(scene,camera,renderer,model);

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

loader.load(laundryUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(3.75,0,3.5);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(plasticUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(2.25,0,4.25);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(boardUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-.7,2.8,5.55);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(doorUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(-3.65,0,4.45);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(map1Url, (gltf) => {
    const model = gltf.scene
    model.position.set(4.65,3.5,0);
    model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(map2Url, (gltf) => {
    const model = gltf.scene
    model.position.set(-0.5,3.65,-3.05);
    model.rotation.set(0,  Math.PI, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(lampUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(4,0,5);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(shelfUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(2.3,2.8,5.6);
    //model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(bookUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(1.2,3.2,5.6);
    model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(bookUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(1.31,3.2,5.6);
    model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});

loader.load(bookUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(1.42,3.2,5.6);
    model.rotation.set(0,  Math.PI/2, 0);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});
/*loader.load(bookUrl, (gltf) => {
    const model = gltf.scene
    model.position.set(1.54,3.2,5.6);
    model.rotation.set(-3*Math.PI/8,  Math.PI/4, Math.PI/4);
    scene.add(model);

},undefined, (error) =>  {
    console.error('error loading gltf',error);
});*/

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
//-renderer.render(scene,camera);


const geometry = new THREE.PlaneGeometry(8.7, 7);
const geometry2 = new THREE.PlaneGeometry(8.7, 8.7);
const geometry3 = new THREE.PlaneGeometry(2, 4.5);
const material = new THREE.MeshStandardMaterial({
    color: 0xFFFFE4,
    normalMap: normalTexture,
    //color: 0xb0b5ae,
    transparent:true,
    opacity:0.9,
});
const material2 = new THREE.MeshStandardMaterial({
    color: 0xFFFFE4,
    transparent:true,
    opacity:0.1,
});
//floor
const material3 = new THREE.MeshStandardMaterial({
    map: floorTexture,
    color: 0x3b3b3b,
    //transparent:true,
    //opacity:0.9,
});
//doorway
const material4 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    //map: wallTexture,
    //transparent:true,
    //opacity:0.9,
});
//ceiling
const material5 = new THREE.MeshStandardMaterial({
    map: ceilingTexture,
    color: 0xC8C8B5,
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
const wall11 = new THREE.Mesh(geometry2,material5);
const wall12 = new THREE.Mesh(geometry2,material2);
const doorway = new THREE.Mesh(geometry3,material4);

doorway.position.set(-3.75,2.25,4.35);
doorway.rotation.set(0,Math.PI/2,0);

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
scene.add(doorway);

const pointLight = new THREE.PointLight(0xffffff,10);
const pointLight2 = new THREE.PointLight(0xffffff,20);
const pointLight3 = new THREE.PointLight(0xffffff,1);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(0.5,6.5,1);
pointLight2.position.set(0,3.5,0.25);
pointLight3.position.set(4,3.75,5);
scene.add(pointLight, pointLight2,pointLight3, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight3);
//scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-15,15,15);

//scene.background = bgTexture;


//texture map on objects and normal maps
/* 
 new mesh( { map: texture, normalMap: texture
 * */

function moveCamera(camera, targetPosition, targetRotation, duration = 1) {
    controls.enabled = false;
    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: duration,
        ease: "power2.out"
    });

    gsap.to(camera.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: duration,
        ease: "power2.out",
        onComplete: () => {
            controls.enabled = true; // Re-enable OrbitControls after animation
        }
    });
}
//document.body.onscroll = some function

function addStar() {
    const geometry = new THREE.SphereGeometry(.25,24,24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(() => 7 + THREE.MathUtils.randFloatSpread(93));

    star.position.set(x,y,z);
    scene.add(star);
}

function logCameraState(camera) {
    console.log(`Position: { x: ${camera.position.x.toFixed(2)}, y: ${camera.position.y.toFixed(2)}, z: ${camera.position.z.toFixed(2)} }`);
    console.log(`Rotation: { x: ${camera.rotation.x.toFixed(2)}, y: ${camera.rotation.y.toFixed(2)}, z: ${camera.rotation.z.toFixed(2)} }`);
}

Array(200).fill().forEach(addStar);

function animate() {
    requestAnimationFrame(animate);

    //torus.rotation.x += 0.01;
    //torus.rotation.y += 0.005;
    //torus.rotation.z += 0.01;


    renderer.render(scene,camera);
    controls.update();
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
