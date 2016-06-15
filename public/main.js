  var Sc = new screentracker();

  CameraCapture();
  Sc.TrackColor();

  var A = new anim(Sc);

  var enviurls = ["textures/px.jpg", "textures/nx.jpg", "textures/py.jpg", "textures/ny.jpg", "textures/pz.jpg", "textures/nz.jpg"];
  var enviloader = new THREE.CubeTextureLoader();
  var envitex = enviloader.load(enviurls);
  var envishad = THREE.ShaderLib["cube"];
  envishad.uniforms["tCube"].value = envitex;
  var envimtl = new THREE.ShaderMaterial({
    fragmentShader: envishad.fragmentShader,
    vertexShader: envishad.vertexShader,
    uniforms: envishad.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  A.AddMesh(new THREE.BoxGeometry(1000, 1000, 1000), envimtl, function (mesh)
  {
    mesh.position.set(A.MainCamera.position.x, A.MainCamera.position.y, A.MainCamera.position.z);
  });

  A.AddMesh(new THREE.BoxGeometry(5, 5, .01), new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(0, 5, -4.05);
  });

  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(-2.3, 7.5, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 7.5, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(-2.3, 2.8, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 2.8, -4.05);
  });

  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 2.8, -4.05);
  });

  A.AddMesh(new THREE.PlaneGeometry(.05, .05, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(A.BattledoreLT.x, A.BattledoreLT.y, A.BattledoreLT.z);
  });

  A.MainCamera.position.z = 10;
  A.MainCamera.position.y = 5;

  A.LoadObj("makartable.obj", "makartable.mtl", function(object){
    object.rotation.set(3.14 / 2, 0, 0);
    object.position.set(0, 0, 0);
    //object
    object.scale.set(3, 3, 3);
  });

  var R = .2;

  //var b = new ball(
  //            /* Ball data       */    new THREE.Vector3(0, 5, 4.05), new THREE.Vector3(0, -0.05, -0.09), .01, R, 40,
  //            /* Table data      */    new THREE.Vector3(-2.3, 2.4, 4.05), new THREE.Vector3(4.6, 0, 8.1),
  //            /* Battledore data */    new THREE.Vector3(-2.3, 2.8, -4.05), new THREE.Vector3(4.6, 7.5 - 2.8, 0),
  //                                     new THREE.Vector3(A.BattledoreLT.x - 0.025, A.BattledoreLT.y - 0.25, A.BattledoreLT.z), new THREE.Vector3(0.05, 0.05, 0));
  A.AddMesh(new THREE.SphereGeometry(R, 100, 100), new THREE.MeshBasicMaterial({color: 0xff0000}), function (mesh){

    document.getElementById("log").innerHTML = "Battledore:  [" + A.BattledoreLT.x + "]  [" + A.BattledoreLT.y + "]  [" + A.BattledoreLT.z + "]";
    document.getElementById("log1").innerHTML = "CamPos:  [" + A.MainCamera.position.x + "]  [" + A.MainCamera.position.y + "]  [" + A.MainCamera.position.z + "]";
    //document.getElementById("log2").innerHTML = "BALL:  [" + Math.floor(b.Position.x) + "]  [" + Math.floor(b.Position.y) + "]  [" + Math.floor(b.Position.z) + "]";

    var ballPos = new THREE.Vector3(0, 0, 0);

    socket.emit('battledore', {x: A.BattledoreLT.x, y: A.BattledoreLT.y, z: A.BattledoreLT.z});
    //console.log("X: " + ballPos.x + "Y: " + ballPos.y + "Z: " + ballPos.z);
    socket.emit('move', function () {});
    socket.on('ballpos', function (Pos) {
        ballPos = new THREE.Vector3(Pos.x, Pos.y, Pos.z);
        //console.log("X: " + ballPos.x + " Y: " + ballPos.y + " Z: " + ballPos.z);
        mesh.position.set(ballPos.x, ballPos.y, ballPos.z);
    });
    //mesh.position.set(0, -3, 0);
    //b.Move(A.time);
    //console.log("X: " + ballPos.x + " Y: " + ballPos.y + " Z: " + ballPos.z);

    if (mesh.position.y < -3)
        A.MainScene.remove(mesh);
  });
  A.Start();
  