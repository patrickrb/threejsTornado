'use strict';

angular.module('threeTornado')
  .service('animationService', function (utilsService, tornadoOptionsService) {
    class AnimationService {
            constructor() {
              this.globalSpeed = 5;
            }

            setSpeed(newSpeed){
              this.globalSpeed = newSpeed;
            }

            updateVertex(tornadoObject, delta) {
                tornadoObject.children.forEach(function(cube) {
                    //update the cubes time
                    cube.time += delta;

                    //move the cube to the bottom of the tornado when reaching max height
                    if (cube.position.y > tornadoOptionsService.getOptions().height) {
                        cube.position.y = 0;
                        cube.velocity.x = utilsService.randNum(5000, 10000) / 20000;
                    }

                    //funnel the cubes
                    cube.progress = (cube.position.y / tornadoOptionsService.getOptions().height);
                    var speedX = Math.cos(cube.time * cube.velocity.x  * this.globalSpeed);
                    var speedZ = Math.sin(cube.time * cube.velocity.x  * this.globalSpeed);

                    //rotate the cube for chaos
                    cube.rotation.z +=  this.globalSpeed * 0.1;
                    cube.rotation.x +=  this.globalSpeed * 0.1;

                    //update cube position
                    cube.position.x = -(cube.progress * speedX * cube.origin.x);
                    cube.position.y += cube.velocity.y + cube.progress;
                    cube.position.z = cube.progress * speedZ * cube.origin.x;
                }.bind(this));
            }
        }
        return new AnimationService();
  });
