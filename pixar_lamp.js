  // once everything is loaded, we run our Three.js stuff.
  $(  

    function () {

          /////////////////////////////
          // Configurations Variables
          // STANLEY
          /////////////////////////////

          //Plane
          var x_plane = 600;
          var y_plane = 600;
          var planeBackground = 0x87CEFA;

          //Camera
          var cameraX = 0;
          var cameraY = 200;
          var cameraZ = 500;
          var lookUpVector = new THREE.Vector3(0,1,0);

          //Pivot Angle
          var alfaTo = Math.PI*2;
          var betaTo = Math.PI/2;
          var gammaTo = Math.PI/2;
          var gamma2To = Math.PI*2;
          var epslonTo = Math.PI/2;

          //Variables's arm
          var rTop = 2;
          var rBottom = 2;
          var heightArm = 20;
          var segmentO = 20;

          //Variables's base
          var rTopBase = 15;
          var rBottomBase = 15;
          var heightBase = 2;

          //Variables's pivot
          var radius = 2;

          //Variables's lamp
          var r1 = 5;
          var r2 = 7;
          var r3 = 15; 
          var heightCono = 10;

          //Phong Options
          var phongOptions = { 
           specular: 0xffffff, 
           color: 0x3399ff, 
           shininess: 100, 
           metal: true
         };

         var angleRotate = Math.PI/2;

          // Light
          var intensityDirectional = 0.7;
          var intensityLamp = 2.5;
          var castShadowDirectional = true;
          var castShadowLamp = false;
          var pointColorLightLamp = 0xADD8E6;
          var pointColorDirectional = 0xffffff; 

          //Text
           var optionsText = {
            size: 85,
            height: 22,
            bevelThickness: 1.3,
            bevelSize: 1.65,
            bevelSegments: 15,
            bevelEnabled: true,
            curveSegments: 20,
          };

          /////////////////////////////
          /////////////////////////////

          scene = new THREE.Scene()

          var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.set(cameraX,cameraY,cameraZ);
          camera.up = lookUpVector;
          camera.lookAt(scene.position);

          var inspectedCamera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 10, 1);
          var trackballControls = new THREE.TrackballControls(camera);
          var axisHelper = new THREE.AxisHelper(3);

          var renderer = new THREE.WebGLRenderer();
          renderer.setClearColor(new THREE.Color(planeBackground));
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.shadowMapEnabled = true;

          var directionalLight = new THREE.DirectionalLight( pointColorDirectional );
          directionalLight.intensity = intensityDirectional;
          directionalLight.position.set(cameraX,cameraY,cameraZ);
          directionalLight.castShadow = castShadowDirectional;
          directionalLight.shadowCameraNear = 50;
          directionalLight.shadowCameraFar = 800;
          directionalLight.shadowCameraLeft = -500;
          directionalLight.shadowCameraRight = 500;
          directionalLight.shadowCameraTop = 500;
          directionalLight.shadowCameraBottom = -500;
          directionalLight.shadowCameraVisible = false;
          directionalLight.shadowMapHeight = 1024;
          directionalLight.shadowMapWidth = 1024;

          phongOptions['color'] = 0x3CB371;          
          var cubeGeometry = new THREE.PlaneGeometry(x_plane,y_plane,100,100);
          var plane = createMesh(cubeGeometry , "basic" , {color: planeBackground})
          
          plane.position.set(0,0,0);
          plane.rotation.x=-0.5*Math.PI;
          plane.receiveShadow = true;

          var options = {color: 0x04FE32}
          var j1 = createJoint(heightArm , radius);
          var j2 = createJoint(heightArm , radius);
          var pivotTop = generatePivot(radius,2);

          j1.attach.add(j2);
          j2.attach.add(pivotTop);
          //positioning j1 on base
          j1.position.y = 1;

          phongOptions['color'] = 0x3399ff;
          var base = generateCylinder(heightBase , 0 , rTopBase , rBottomBase , phongOptions , "phong");
          base.add(j1);
          base.position.set(0,2,150);
          base.castShadow = true; 

          //create lamp
          var lamp = createTopLamp(r1,r2,r3,heightCono,segmentO,radius);
          j2.attach.add(lamp);

         
          c = createMesh(new THREE.TextGeometry("C", optionsText), "phong");
          v = createMesh(new THREE.TextGeometry("v", optionsText), "phong");
          d = createMesh(new THREE.TextGeometry("d", optionsText), "phong");
          l = createMesh(new THREE.TextGeometry("l", optionsText), "phong");
          a = createMesh(new THREE.TextGeometry("a", optionsText), "phong");
          b = createMesh(new THREE.TextGeometry("b", optionsText), "phong");

          c.castShadow = true;
          v.castShadow = true;
          d.castShadow = true;
          l.castShadow = true;
          a.castShadow = true;
          b.castShadow = true;

          c.position.set(-150,2,0);
          v.position.set(-60,2,0);
          d.position.set(0,2,0);
          l.position.set(70,2,0);
          a.position.set(100,2,0);
          b.position.set(170,2,0);

          // Add tree to scene
          //var tree = generateTree();
          //tree.position.set(-190,2,0);

          scene.add(camera);
          scene.add(base);
          //scene.add(tree);
          scene.add(axisHelper);
          scene.add(plane);
          scene.add(directionalLight);

          scene.add(c);
          scene.add(v);
          scene.add(d);
          scene.add(l);
          scene.add(a);
          scene.add(b);

          var controls = new function() {
            this.pivot_alfa = 0;
            this.pivot_beta = 0;
            this.pivot_gamma = 0;
            this.pivot_gamma2 = 0;
            this.pivot_epslon = 0;

            this.lamp_x = 0;
            this.lamp_z = 0;

            this.animate_Scene = function(){ animateScene() };

            this.on_off = true;
          }

          var gui = new dat.GUI();

          var arm = gui.addFolder("Arms");
          //var debug = gui.addFolder("Debug");
          var lampG = gui.addFolder("Lamp");

          arm.add(controls, 'pivot_alfa',0,alfaTo).onChange(function (e){
            j1.rotation.y = e;
          });
          arm.add(controls, 'pivot_beta',0,betaTo).onChange(function (e){
            j1.pivot.rotation.x = e;
          });
          arm.add(controls , 'pivot_gamma',0,gammaTo).onChange(function (e){
            j2.pivot.rotation.x = e;
          });
          arm.add(controls , 'pivot_gamma2',0,gamma2To).onChange(function (e){
            j2.rotation.y = e;
          });
          arm.add(controls , 'pivot_epslon',0,epslonTo).onChange(function (e){
            lamp.pivot.rotation.x = e;
          });

          lampG.add(controls , 'lamp_x' , -250 , 250).onChange( function (e){
            base.position.x = e;
          });
          lampG.add(controls , 'lamp_z' , -250 , 250).onChange( function (e){
            base.position.z = e;
          });
          lampG.add(controls , 'on_off').onChange(function (e){
            if(e){
              lamp.light.intensity = 2.5;             
            }
            else{
              lamp.light.intensity = 0;
            }
          });

          gui.add(controls , 'animate_Scene');


          $('body').append(renderer.domElement)
          //document.getElementByClass('renderer').appendChild(renderer.domElement);

          animation();

          function animateScene(){

            directionalLight.intensity = 0;
            startAnimation(lamp.rotation , j2.rotation)
            lightIntensity(directionalLight);
            bouncingAnimator(base , l , j1.pivot , j2.pivot);

            var letters = new THREE.Object3D();
            letters.c = c;
            letters.v = v;
            letters.d = d;
            letters.a = a;
            letters.b = b;

            jumpLetterAnimation(letters);

            setTimeout( function() { jumpLamp.start(); 
                                     contractArmDuringJump.start(); } , 6500);
            setTimeout( function() { scalingLetter.start();
                                     contractArmOnLetter.start(); } , 10000);
            setTimeout( function() { /*applesGoDown(tree.apples)*/
                                     jumpLetterAnimator.start(); } , 11800);
            setTimeout( function() { turnBackLamp(lamp.rotation) } , 12000);
          }

          function animation(){

            KF.update();
            TWEEN.update();
            trackballControls.update();
            requestAnimationFrame(animation);
            renderer.render(scene, camera);
          }

          function generateCylinder(height , trasl , rTop , rBottom , options , meshType){
            var planeGeometry = new THREE.CylinderGeometry(rBottom,rTop,height,segmentO);
            var cylinder = createMesh(planeGeometry,meshType,options)
            cylinder.position.set(0,trasl,0);
            
            return cylinder;
          }

          function generateSphere(radius ,vertical , horizontal , options){
            var geometry_m = new THREE.SphereGeometry(radius,vertical,horizontal);
            var sphere = createMesh(geometry_m,"phong",options)

            return sphere
          }

          function generatePivot(radius , transl){
            var pin = generateSphere(radius,20,20);
            pin.position.set(0,transl,0);

            return pin;
          }

          function createJoint(height , radius){

            var joint = new THREE.Object3D();

            phongOptions['color'] = 0xF5F5F5;
            var cylinder = generateCylinder(heightArm , (heightArm/2)+radius , rTop , rBottom ,
             phongOptions , "phong");

            phongOptions['color'] = 0x3399ff;
            var pivot = generatePivot(radius , 2 , phongOptions);
            pivot.add(cylinder);

            var attach = new THREE.Object3D();
            attach.position.set(0,(heightArm/2),0);
            cylinder.add(attach);

            cylinder.castShadow = true;
            pivot.castShadow = true;

            joint.pivot = pivot;
            joint.arm = cylinder;
            joint.attach = attach;

            joint.add(pivot);

            return joint;
          }

          function createMesh(geometry , meshType , options){

            var meshMaterial;
            switch(meshType){
              case "phong":
              meshMaterial = new THREE.MeshPhongMaterial(options);
              break;
              case "basic":
              meshMaterial = new THREE.MeshBasicMaterial(options);
              break;
              case "lambert":
              meshMaterial = new THREE.MeshLambertMaterial(options);
              break;
            }
            meshMaterial.side = THREE.DoubleSide;
            var mesh = new THREE.Mesh(geometry , meshMaterial);

            return mesh;
          }

          function createTopLamp(r1,r2,r3,height,segmentO,radius){

            var conoGeom = new THREE.CylinderGeometry(r2,r1,height,segmentO);
            var sphereGeom = new THREE.SphereGeometry(r3,20,20,6,6.3,1.4,1.5);
            var pivot = generatePivot(radius,radius);

            phongOptions['color'] = 0x3399ff;
            var cono = createMesh(conoGeom , "phong" , phongOptions);
            var sphere = createMesh(sphereGeom , "phong" ,phongOptions);
            var bulb = generateSphere(r1-0.5,segmentO,segmentO,{color:0xffffff});

            cono.castShadow = true;
            sphere.castShadow = true;

            cono.position.set(0,(height+radius)/2,0);
            sphere.position.set(0,(height-1+r3),0);
            sphere.material.side = THREE.DoubleSide;

            pivot.add(sphere);
            pivot.add(cono);

            //Add light to lamp
            var fooTarget = new THREE.Object3D();
            fooTarget.position.y = 30;         

            var spotLight = new THREE.SpotLight(pointColorLightLamp);
            spotLight.intensity = intensityLamp;
            spotLight.angle = Math.PI/3;
            spotLight.target = fooTarget;
            spotLight.castShadow = castShadowLamp;
            spotLight.shadowCameraVisible = true;
            spotLight.shadowCameraNear =30;
            spotLight.shadowCameraFar = 500;
            spotLight.shadowCameraLeft = -500;
            spotLight.shadowCameraRight = 500;
            spotLight.shadowCameraTop = 500;
            spotLight.shadowCameraBottom = -500;
            spotLight.shadowCameraFov = 70;
            spotLight.shadowDarkness = 0.5;
            spotLight.shadowMapWidth = 256;
            spotLight.shadowMapHeight = 256;   

            var spotLightBulb = new THREE.SpotLight(pointColorLightLamp);
            spotLightBulb.intensity = intensityLamp;
            spotLightBulb.distance = 1;
            spotLightBulb.angle = Math.PI/3;     
            
            bulb.position.y = 4;
            bulb.add(spotLight);
            bulb.add(fooTarget);
            bulb.add(spotLightBulb);
            cono.add(bulb);

            var topLamp = new THREE.Object3D();
            topLamp.pivot = pivot;
            topLamp.light = spotLight;

            topLamp.add(pivot);

            return topLamp;
          }
        });