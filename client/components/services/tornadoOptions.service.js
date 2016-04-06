'use strict';

angular.module('threeTornado')
  .service('tornadoOptionsService', function () {
    class TornadoOptionsService {
            constructor() {
              this.tornadoOptions = {
                  speedRot: 0.002,
                  width: 100,
                  height: 315,
                  minWidth: 5
              };
            }

            getOptions() {
              return this.tornadoOptions;
            }

            setOptions(speedRot, width, height, minWidth, offsetPos, offsetVal) {
              this.tornadoOptions = {
                    speedRot: speedRot,
                    width: width,
                    height: height,
                    minWidth: minWidth,
                    offsetPos: offsetPos,
                    offsetVal: offsetVal
              };
            }
        }
        return new TornadoOptionsService();
  });
