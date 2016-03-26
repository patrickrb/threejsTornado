'use strict';

angular.module('threeTornado')
    .directive('tornado', function(animationService) {
        return {
            restrict: 'E',
            link: function(scope, elem) {
                var time;
                var delta;
                var scene;
                var camera;
                var controls;
                var renderer;
                var tornado = {};
								var cubeCount = 5000;
                var clock = new THREE.Clock();
                var target = new THREE.Object3D();
                var tornadoObject = new THREE.Object3D();
								var cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
								var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;

                //init the scene
                init();
                animate();

                function randNum(min, max) {
                    return Math.random() * (max - min) + min;
                }

                function addControls() {
                    controls = new THREE.OrbitControls(camera, elem[0].childNodes[0]);
                    controls.rotateSpeed = 0.3;
                    controls.zoomSpeed = 2.2;
                    controls.panSpeed = 2;

                    controls.enableDamping = true;
                    controls.dampingFactor = 0.3;

                    controls.keys = [65, 83, 68];
                    controls.minDistance = 1.5;
                }



                function init() {
                    camera = new THREE.PerspectiveCamera(40, windowWidth / windowHeight, 1, 10000);
                    camera.setLens(20);
                    camera.position.set(0, -20, 150);
                    scene = new THREE.Scene();

                    renderer = new THREE.WebGLRenderer({
                        antialias: true
                    });
                    renderer.shadowMap.enabled = true;
                    renderer.shadowMapSoft = true;
                    renderer.physicallyBasedShading = true;

                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.sortObjects = true;

                    elem[0].appendChild(renderer.domElement);


                    scene.width = getWorldFieldOfView(35, 500).width;
                    scene.height = getWorldFieldOfView(35, 500).height;
                    scene.maxSize = getWorldFieldOfView(35, 5000).maxSize;

                    tornado = {
                        speedRot: 0.002,
                        speedGrav: 0.008,
                        width: 80,
                        height: scene.height,
                        minWidth: 5,
                        posRadius: 50,
                        offsetPos: scene.height,
                        offsetVal: 1.5,
                        offsetSpeed: 0.2
                    };

                    // Events
                    window.addEventListener('resize', onWindowResize, false);

                    addControls();
                    createScene();
                }

                function onWindowResize(event) {
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                }

                function getWorldFieldOfView(fov, distance) {
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

                function createScene() {
                    var ambientLight = new THREE.AmbientLight(0x222222);
                    scene.add(ambientLight);

                    for (var i = 0; i < cubeCount; i++) {
                        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                        cube.velocity = new THREE.Vector3(
                            randNum(1000, 10000) / 20000,
                            randNum(1000, 10000) / 20000,
                            randNum(1000, 10000) / 20000
                        );

                        cube.time = randNum(0, 10);

                        var x = randNum(tornado.width / 2, tornado.width);
                        var y = Math.random() * tornado.height;
                        var z = randNum(tornado.width / 2, tornado.width);
                        cube.position.set(x, y, z);
                        cube.origin = {
                            x: x,
                            y: y,
                            z: z
                        }
                        tornadoObject.add(cube);
                    }
                    scene.add(tornadoObject);
                    target.position.y = 150;
                };

                function animate(time) {
                    requestAnimationFrame(animate);
                    render();
                }

                function render() {
                    delta = clock.getDelta();
                    time += delta;
                    controls.update();

                    animationService.updateVertex(tornadoObject, delta, tornado)
                    tornadoObject.rotation.y += tornado.speedRot;

                    // particlesArray[0].position.x = Math.cos(time * tornado.speedGrav) * tornado.posRadius;
                    // particlesArray[0].position.z = Math.sin(time * tornado.speedGrav) * tornado.posRadius;

                    // tornado.offsetPos = tornado.height/2 + Math.sin(time * tornado.offsetSpeed) * tornado.height/2;
                    camera.lookAt(target.position);
                    renderer.clear();
                    renderer.render(scene, camera);
                }
            }
        };
    });
