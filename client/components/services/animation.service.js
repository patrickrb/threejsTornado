'use strict';

angular.module('threeTornado')
  .service('animationService', function () {
    class AnimationService {
            constructor() {
            }

            clampNum(num, min, max) {
                return Math.min(Math.max(num, min), max);
            }

            normalize(value, length) {
                return value / length;
            }

            distance(p1x, p1y, p2x, p2y) {
                return Math.sqrt(Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2));
            }

            updateVertex(tornadoObject, delta, tornadoOptions) {
                tornadoObject.children.forEach(function(mesh) {
                    mesh.time += delta;

                    mesh.y += mesh.velocity.y;

                    if (mesh.position.y > tornadoOptions.height) {
                        mesh.position.y = 0;
                    }

                    mesh.progress = this.clampNum(mesh.position.y / tornadoOptions.height, 0, 1);

                    var dist = this.distance(0, mesh.position.y, 0, tornadoOptions.offsetPos);
                    var norm = 1 - this.normalize(dist, tornadoOptions.height);
                    mesh.offset = tornadoOptions.offsetVal * norm;

                    var speedX = Math.cos(mesh.time * mesh.velocity.x) + mesh.offset;
                    var speedZ = Math.sin(mesh.time * mesh.velocity.x) + mesh.offset;

                    mesh.position.x = -(speedX * tornadoOptions.minWidth + mesh.progress * speedX * mesh.origin.x);
                    mesh.position.z = speedZ * tornadoOptions.minWidth + mesh.progress * speedZ * mesh.origin.x;
                }.bind(this));
            }
        }
        return new AnimationService();
  });
