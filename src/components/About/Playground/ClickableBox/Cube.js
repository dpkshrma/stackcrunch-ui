import React from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import boxImg from './box.png';

const Container = styled.div`
  border-radius: 2px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 111;
`;

class Cube extends React.Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Add lights
    const aLight = new THREE.AmbientLight(this.props.color);
    scene.add(aLight);

    const dLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    dLight1.position.set(1, 0.8, 1);
    scene.add(dLight1);

    const dLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    dLight2.position.set(-1, -0.5, 1);
    scene.add(dLight2);

    const dLight3 = new THREE.DirectionalLight(0xffffff, 0.1);
    dLight3.position.set(0.5, 0.5, 1);
    scene.add(dLight3);

    const texture = new THREE.TextureLoader().load(boxImg);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = Array.from({ length: 6 }, (v, i) => {
      const options = { map: texture };
      if (i === 2 || i === 3) {
        options.map = null;
      }
      return new THREE.MeshLambertMaterial(options);
    });
    const cube = new THREE.Mesh(geometry, materials);

    camera.position.z = 4;
    scene.add(cube);
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    // this.material = material;
    this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <Container
        {...this.props}
        style={{ width: '70px', height: '70px' }}
        innerRef={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Cube;
