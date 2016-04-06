'use strict';

angular.module('threeTornado')
  .service('sceneService', function (utilsService, tornadoOptionsService) {
    class SceneService {
            constructor() {
              this.cubeCount = 5000;
              this.tornadoObject = new THREE.Object3D();
              this.cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
              this.cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
            }


            getTornadoObject() {
              return this.tornadoObject;
            }

            createScene(scene) {
                //add cubes to the tornado object
                for (var i = 0; i < this.cubeCount; i++) {
                    this.addCube();
                }

                //add tornado object to the scene
                scene.add(this.tornadoObject);
            }

            setCubeCount(newCubeCount){
              var i = 0;
              var cubeDiff = this.cubeCount - newCubeCount;
              this.cubeCount = newCubeCount;

              if(cubeDiff > 0 ){
                for(i = 0; i < cubeDiff; i++){
                  this.removeCube();
                }
              }
              else{
                var inverseCubeDiff = -1 * (cubeDiff);
                for(i = 0; i < inverseCubeDiff; i++){
                  this.addCube();
                }
              }
            }

            removeCube(){
              var removedCube = _.sample(this.tornadoObject.children);
              this.tornadoObject.remove(removedCube);
            }

            addCube(){
              //create new cube
              var cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);

              //set a random velocity
              cube.velocity = new THREE.Vector3(
                  utilsService.randNum(5000, 10000) / 20000,
                  utilsService.randNum(100, 5000) / 20000,
                  utilsService.randNum(1000, 10000) / 20000
              );

              //set a random time on the cube
              cube.time = utilsService.randNum(0, 10);

              //pick random xyz coords
              var x = utilsService.randNum(tornadoOptionsService.getOptions().width / 2, tornadoOptionsService.getOptions().width);
              var y = Math.random() * tornadoOptionsService.getOptions().height;
              var z = utilsService.randNum(tornadoOptionsService.getOptions().width / 2, tornadoOptionsService.getOptions().width);

              //set posiion
              cube.position.set(x, y, z);

              //remember its origin
              cube.origin = {
                  x: x,
                  y: y,
                  z: z
              };

              //add the cube to the tornado object
              this.tornadoObject.add(cube);
            }

        }
        return new SceneService();
  });
