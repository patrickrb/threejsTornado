'use strict';

angular.module('threeTornado')
  .service('cameraService', function () {
    class CameraService {
            constructor() {
              this.camera = {}
            }

            getCamera() {
              return this.camera;
            }

            addCamera(width, height) {
              this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 10000);
              this.camera.position.set(0, -20, 150);
            }
        }
        return new CameraService();
  });
