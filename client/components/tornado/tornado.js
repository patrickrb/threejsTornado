'use strict';

angular.module('threeTornado')
    .directive('tornado', function(sceneService, cameraService, animationService, controlsService, tornadoOptionsService) {
        return {
            restrict: 'E',
            link: function(scope, elem) {
                var time;
                var delta;
                var scene;
                var renderer;
                var clock = new THREE.Clock();
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;

                //init the scene
                init();
                animate();

                function init() {
                    cameraService.addCamera(windowWidth, windowHeight);  //add the camera to the scene
                    scene = new THREE.Scene();  //init the scene

                    renderer = new THREE.WebGLRenderer({ antialias: true }); //init the renderer

                    renderer.shadowMap.enabled = true;
                    renderer.shadowMapSoft = true;
                    renderer.physicallyBasedShading = true;

                    renderer.setSize(windowWidth, windowHeight);
                    renderer.sortObjects = true;

                    elem[0].appendChild(renderer.domElement);  //attach the renderer to the tornado directive


                    scene.width = sceneService.getWorldFieldOfView(35, 500, windowWidth, windowHeight).width;
                    scene.height = sceneService.getWorldFieldOfView(35, 500, windowWidth, windowHeight).height;
                    scene.maxSize = sceneService.getWorldFieldOfView(35, 5000, windowWidth, windowHeight).maxSize;

                    // Events
                    window.addEventListener('resize', onWindowResize, false);

                    controlsService.addControls(cameraService.getCamera(), elem[0].childNodes[0]); //add controls to the scene
                    sceneService.createScene(scene, tornadoOptionsService.getOptions());  //create the tornado and add it to the scene
                }

                function onWindowResize(event) {
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    cameraService.getCamera().aspect = window.innerWidth / window.innerHeight;
                    cameraService.getCamera().updateProjectionMatrix();
                }

                function animate(time) {
                    requestAnimationFrame(animate);
                    render();
                }

                function render() {
                    delta = clock.getDelta();
                    time += delta;

                    controlsService.getControls().update(); //update controls

                    animationService.updateVertex(sceneService.getTornadoObject(), delta, tornadoOptionsService.getOptions()); //rotate cubes

                    sceneService.getTornadoObject().rotation.y += tornadoOptionsService.getOptions().speedRot;  //rotate tornado object for added effect

                    cameraService.getCamera().lookAt(sceneService.getTarget().position);  //keep camera focused on the torando

                    renderer.clear();
                    renderer.render(scene, cameraService.getCamera()); 
                }
            }
        };
    });
