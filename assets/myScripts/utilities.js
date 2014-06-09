

//parametrizzare le funzioni


 function generatePositionOnSphere(r){
            
	var angle1 = Math.random()*180;
	var angle2 = Math.random()*360-180;

	positionX = r * Math.sin(angle1) * Math.cos(angle2);
	positionY = r * Math.cos(angle1);
	positionZ = r * Math.sin(angle1) * Math.sin(angle2);

	return {'x' : positionX , 'y' : positionY , 'z' : positionZ}
}

function addApple2Tree(chioma){

	for(var i = 0 ; i < 200 ; i++){
	  var pos = generatePositionOnSphere(8);
	  var apple = generateApple();
	  apple.position.set(pos.x , pos.y , pos.z);

	  chioma.add(apple);
}
         
function generateAppleTree(){

	var o = new THREE.Object3D();

	var geometry_t = new THREE.CylinderGeometry(2,2,20,se)
	var material_t = new THREE.MeshLambertMaterial( {color: 0x964B00} );
	var tronco_t = new THREE.Mesh( geometry_t , material_t );
	tronco_t.position.set(0,10,0);

	var sphereGeometry_t = new THREE.SphereGeometry(8,20,32);
	var sphereMaterial_t = new THREE.MeshLambertMaterial({color: 0x3CB371 });
	var chioma_t = new THREE.Mesh(sphereGeometry_t ,sphereMaterial_t );
	chioma_t.position.set(0,20,0);

	addApple2Tree(chioma_t);

	o.add(tronco_t)
	o.add(chioma_t);

	return o
}

function generateApple(){

    var geometry_m = new THREE.SphereGeometry(0.5,20,20);
    var material_m = new THREE.MeshLambertMaterial({color: 0xff0000})
    var apple = new THREE.Mesh(geometry_m , material_m);

    return apple
}

