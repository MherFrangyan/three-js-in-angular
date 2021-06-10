import * as THREE from 'three';
import {ElementRef, Injectable, NgZone, OnDestroy} from '@angular/core';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({providedIn: 'root'})
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public initModel(content, img) {
    //Scene
    let camera;
    let renderer;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(content.THREEColor);

    //Camera
    camera = new THREE.PerspectiveCamera(content.objectSize, content.innerWidth / content.innerHeigh, 0.1, 3000);
    camera.position.z = content.positionZ;
    camera.position.y = content.positionY;
    camera.position.x = content.positionX;
    console.log(content)
    //render
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(content.rendSizeW, content.rendSizeH);
    document.querySelector(content.area).appendChild(renderer.domElement);

    //OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableDamping = true;
    controls.minDistance = 40;

    //light
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    let light = new THREE.PointLight(0xc4c4c4, 1);
    light.position.set(0, 300, 500);
    scene.add(light);

    let light2 = new THREE.PointLight(0xc4c4c4, 1);
    light2.position.set(500, 300, 500);
    scene.add(light2);

    let light3 = new THREE.PointLight(0xc4c4c4, 1);
    light3.position.set(0, 300, -500);
    scene.add(light3);

    let light4 = new THREE.PointLight(0xc4c4c4, 1);
    light4.position.set(-500, 300, 500);
    scene.add(light4);

    //model
    const loader = new GLTFLoader();

    loader.load(img, gltf => {
      scene.add(gltf.scene);
    });

    //Resize
    window.addEventListener('resize', () => {
      this.onWindowResize(camera, renderer, content);
    }, false);


    this.animate1(controls, renderer, scene, camera);
  }

  animate1(controls, renderer, scene, camera) {
    requestAnimationFrame(() => {
      this.animate1(controls, renderer, scene, camera);
    });
    controls.update();
    renderer.render(scene, camera);
  }

  public onWindowResize(camera, renderer, content) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(content.rendSizeW, content.rendSizeH);
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
