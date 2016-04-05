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
                    //init the scene
                    scene = new THREE.Scene();

                    //add the camera to the scene
                    cameraService.addCamera(windowWidth, windowHeight);

                    //set renderer options
                    renderer = new THREE.WebGLRenderer({ antialias: true }); //init the renderer
                    renderer.shadowMap.enabled = true;
                    renderer.shadowMapSoft = true;
                    renderer.physicallyBasedShading = true;
                    renderer.setSize(windowWidth, windowHeight);
                    renderer.sortObjects = true;

                    //add renderer to the DOM
                    elem[0].appendChild(renderer.domElement);  //attach the renderer to the tornado directive

                    // Handle resize events
                    window.addEventListener('resize', onWindowResize, false);

                    //add orbit controls to the scene
                    controlsService.addControls(cameraService.getCamera(), elem[0].childNodes[0]);

                    //create the tornado and add it to the scene
                    sceneService.createScene(scene, tornadoOptionsService.getOptions());
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

                    //update controls
                    controlsService.getControls().update();

                    //animate the cubes in the tornado
                    animationService.updateVertex(sceneService.getTornadoObject(), delta);

                    //rotate the tornado object for added effect
                    sceneService.getTornadoObject().rotation.y += tornadoOptionsService.getOptions().speedRot;

                    renderer.clear();
                    renderer.render(scene, cameraService.getCamera());
                }
            }
        };
    });
