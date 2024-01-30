import * as THREE from '../../libs/three.weapp.min'
import { OrbitControls } from '../../jsm/controls/OrbitControls'

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = THREE.global.registerCanvas(res[0].node)
        
        this.setData({ canvasId: canvas._canvasId })

        const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
        camera.position.z = 500;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaaaaa);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
      
        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.25;
        // controls.enableZoom = false;
        camera.position.set(200, 200, 500);
        controls.update();
        const geometry = new THREE.BoxBufferGeometry(100, 200, 200);
      
        const texture = new THREE.TextureLoader().load('../../image/logo.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });
      
        // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      
        // renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
        // renderer.setSize(canvas.width, canvas.height);
      
        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.width, canvas.height);
        }
        function render() {
          canvas.requestAnimationFrame(render);
          // mesh.rotation.x += 0.005;
          // mesh.rotation.y += 0.01;
          controls.update();
          renderer.render(scene, camera);
        }

        render()

      })
  },
  onUnload: function () {
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
  touchStart(e: any) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e: any) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e: any) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e: any) {
    // console.log('canvas', e)
  },
  longTap(e: any) {
    // console.log('canvas', e)
  },
  tap(e: any) {
    // console.log('canvas', e)
  },
  documentTouchStart(e: any) {
    // console.log('document',e)
  },
  documentTouchMove(e: any) {
    // console.log('document',e)
  },
  documentTouchEnd(e: any) {
    // console.log('document',e)
  },
})