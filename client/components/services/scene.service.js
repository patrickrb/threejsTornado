'use strict';

angular.module('threeTornado')
  .service('sceneService', function () {
    class SceneService {
            constructor() {
              this.cubeCount = 5000;
              this.target = new THREE.Object3D();
              this.tornadoObject = new THREE.Object3D();
              this.cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
              this.cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
            }

            randNum(min, max) {
                return Math.random() * (max - min) + min;
            }

            getTarget(){
              return this.target;
            }

            getTornadoObject() {
              return this.tornadoObject;
            }

            createScene(scene, tornadoOptions) {
                var ambientLight = new THREE.AmbientLight(0x222222);
                scene.add(ambientLight);

                for (var i = 0; i < this.cubeCount; i++) {
                    var cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
                    cube.velocity = new THREE.Vector3(
                        this.randNum(1000, 10000) / 20000,
                        this.randNum(1000, 10000) / 20000,
                        this.randNum(1000, 10000) / 20000
                    );

                    cube.time = this.randNum(0, 10);

                    var x = this.randNum(tornadoOptions.width / 2, tornadoOptions.width);
                    var y = Math.random() * tornadoOptions.height;
                    var z = this.randNum(tornadoOptions.width / 2, tornadoOptions.width);
                    cube.position.set(x, y, z);
                    cube.origin = {
                        x: x,
                        y: y,
                        z: z
                    };
                    this.tornadoObject.add(cube);
                }
                scene.add(this.tornadoObject);
                this.target.position.y = 150;
            }

            getWorldFieldOfView(fov, distance, windowWidth, windowHeight) {
                var vFOV = fov * Math.PI / 180; // convert vertical fov to radians
                var height = 2 * Math.tan(vFOV / 2) * distance; // visible height

                var aspect = windowWidth / windowHeight;
                var width = height * aspect;

                return {
                    width: width,
                    height: height,
                    maxSize: width > height ? width : height,
                    minSize: width > height ? height : width
                };
            }
        }
        return new SceneService();
  });
