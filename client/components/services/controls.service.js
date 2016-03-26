'use strict';

angular.module('threeTornado')
  .service('controlsService', function () {
    class ControlsService {
            constructor() {
              this.controls = {}
            }

            addControls(camera, element) {
                this.controls = new THREE.OrbitControls(camera, element);
                this.controls.rotateSpeed = 0.3;
                this.controls.zoomSpeed = 2.2;
                this.controls.panSpeed = 2;

                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.3;

                this.controls.keys = [65, 83, 68];
                this.controls.minDistance = 1.5;
            }

            getControls() {
              return this.controls;
            }
        }
        return new ControlsService();
  });
