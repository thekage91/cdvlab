


function generatePositionOnSphere(r){
            
	var angle1 = Math.random()*180;
	var angle2 = Math.random()*360-180;

	positionX = r * Math.sin(angle1) * Math.cos(angle2);
	positionY = r * Math.cos(angle1);
	positionZ = r * Math.sin(angle1) * Math.sin(angle2);

	return {'x' : positionX , 'y' : positionY , 'z' : positionZ}
}

function generatePositionOnCirc(r){

	var timer = new Date().getTime() * 0.0005;

	positionX = Math.floor(Math.cos( timer ) * 70);
	positionZ = Math.floor(Math.sin( timer ) * 70);

	return {'x': positionX , 'z': positionZ}
}

function generateApple(){

	var geometry_m = new THREE.SphereGeometry(3,15,15);
	var material_m = new THREE.MeshLambertMaterial({color: 0xff0000})
	var apple = new THREE.Mesh(geometry_m , material_m);
	apple.castShadow = true;

	return apple
}

function addApple2Tree(chioma){

	var apples = new Array();
	for(var i = 0 ; i < 200 ; i++){
		var pos = generatePositionOnSphere(50);
		var apple = generateApple();
		apple.position.set(pos.x , pos.y , pos.z);

		chioma.add(apple);
		apples[i] = apple;
	}
	return apples;
}

function generateTree(){

	var o = new THREE.Object3D();

	var geometry_t = new THREE.CylinderGeometry(16,16,125,26)
	var material_t = new THREE.MeshLambertMaterial( {color: 0x964B00} );
	var tronco_t = new THREE.Mesh( geometry_t , material_t );
	tronco_t.position.set(0,62.5,0);
	tronco_t.castShadow = true;

	var sphereGeometry_t = new THREE.SphereGeometry(50,25,25);
	var sphereMaterial_t = new THREE.MeshLambertMaterial({color: 0x3CB371 });
	var chioma_t = new THREE.Mesh(sphereGeometry_t ,sphereMaterial_t );
	chioma_t.position.set(0,150,0);
	chioma_t.castShadow = true;

	o.apples = addApple2Tree(chioma_t);

	o.add(tronco_t)
	o.add(chioma_t);

	return o
}
