function unit(nmesh, response_func)
{
  this.Mesh = nmesh;
  this.ResponseFunc = function(mesh){response_func(mesh)};
}

function anim(ntr) {
  var self = this;

  // Camera debug flight
  var camL, camR;
  var camU, camD;
  var goF, goB;
  var goL, goR;
  var goC, goSp;
  window.onkeydown = function(e) {
    if (e.keyCode === 39)
      camL = 1;
    else if (e.keyCode === 37)
      camR = 1;
    else if (e.keyCode === 38)
      camU = 1;
    else if (e.keyCode === 40)
      camD = 1;
    if (e.keyCode === 68)
      goR = 1;
    else if (e.keyCode === 65)
      goL = 1;
    else if (e.keyCode === 87)
      goF = 1;
    else if (e.keyCode === 83)
      goB = 1;
    else if (e.keyCode === 67)
      goC = 1;
    else if (e.keyCode === 32)
      goSp = 1;
  };

  window.onkeyup = function (e){
    if (e.keyCode === 39)
      camL = 0;
    else if (e.keyCode === 37)
      camR = 0;
    else if (e.keyCode === 38)
      camU = 0;
    else if (e.keyCode === 40)
      camD = 0;
    if (e.keyCode === 68)
      goR = 0;
    else if (e.keyCode === 65)
      goL = 0;
    else if (e.keyCode === 87)
      goF = 0;
    else if (e.keyCode === 83)
      goB = 0;
    else if (e.keyCode === 67)
      goC = 0;
    else if (e.keyCode === 32)
      goSp = 0;
  };

  self.BattledoreLT = new THREE.Vector3(0, 0, 0);

  /* Time data */
  self.start = Date.now();
  self.time = 0;

  /* Color Tracker */
  if (ntr != undefined)
    this.tr = ntr;

  /* Render */
  var render_canvas = document.getElementById("render_canvas");


  self.CameraW = 320;
  self.CameraH = 240;
  /* Projection data */
  self.ScreenW = render_canvas.width;
  self.ScreenH = render_canvas.height;
  self.near = .1;
  self.far = 1000;
  self.fov = 75;

  /* Unit(mesh) data */
  self.Units = [];

  var vm = new vecmath();

  /* Three.js data(initialization) */
  self.MainScene = new THREE.Scene();
  self.MainCamera = new THREE.PerspectiveCamera(self.fov, self.ScreenW / self.ScreenH, self.near, self.far);
  self.MainRenderer = new THREE.WebGLRenderer({canvas: render_canvas, antialias: true});
  self.MainRenderer.setSize(self.ScreenW, self.ScreenH);
  document.body.appendChild(self.MainRenderer.domElement);

  /* Calculating projection */
  self.ProjW = 2 * self.near * Math.tan((self.fov / 2) * Math.PI / 180);
  self.ProjH = self.ProjW * self.ScreenH / self.ScreenW;

  /* Using interface */
  self.AddMesh = function (geometry, material, response_func) {
    mesh = new THREE.Mesh(geometry, material);
    self.Units.push(new unit(mesh, response_func));
    self.MainScene.add(mesh);
  };

  self.AddLight = function (light, npos) {
    var l = light;
    l.pos = npos;
    self.MainScene.add(l);
  };

  /* Main render */
  self.Render = function () {
    var oldtime = self.time;
    self.time = (Date.now() - self.start) / 1000.0;

    if (self.tr != undefined)
    {
      document.getElementById("log").innerHTML = self.tr.X + ";" + self.tr.Y;
      //self.MainCamera.position.set(0, 0, self.tr. X / 10.0);
    }
    self.MainCameraDir = new THREE.Vector3(0, 0, -1).applyMatrix4( self.MainCamera.matrixWorld ).sub( self.MainCamera.position ).normalize();
    self.MainCameraRight = new THREE.Vector3(1, 0, 0).applyMatrix4( self.MainCamera.matrixWorld ).sub( self.MainCamera.position ).normalize();
    self.MainCameraUp = self.MainCamera.up;

    self.deltacoordpx = new THREE.Vector2(self.CameraW / 2 - self.tr.X, self.CameraH / 2 - self.tr.Y);
    self.deltacoordpx.y /= self.CameraH / self.ProjH ;
    self.deltacoordpx.x /= self.CameraW / self.ProjW ;

    /*self.BattledoreLT = vm.Sum(vm.Sum(vm.Sum(self.MainCamera.position, vm.Mul(self.MainCameraDir, self.near)),
        vm.Mul(self.MainCameraUp, self.deltacoordpx.y)), vm.Mul(self.MainCameraRight, self.deltacoordpx.x));*/
    self.BattledoreLT = vm.Sum(vm.Sum(vm.Sum(self.MainCamera.position, vm.Mul(self.MainCameraDir, self.near)),
    vm.Mul(self.MainCameraRight, self.deltacoordpx.x)), vm.Mul(self.MainCameraUp, self.deltacoordpx.y));

    document.getElementById("log").innerHTML += "DIR" + self.MainCameraDir.x + ";" + self.MainCameraDir.y + ";" + self.MainCameraDir.z;

    for (var i = 0; i < (self.Units).length; i++)
      self.Units[i].ResponseFunc(self.Units[i].Mesh);
    (self.MainRenderer).render(self.MainScene, self.MainCamera);

    if (camR)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x, self.MainCamera.rotation.y + 0.05, self.MainCamera.rotation.z);
    if (camL)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x, self.MainCamera.rotation.y - 0.05, self.MainCamera.rotation.z);
    if (camU)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x + 0.05, self.MainCamera.rotation.y, self.MainCamera.rotation.z);
    if (camD)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x - 0.05, self.MainCamera.rotation.y, self.MainCamera.rotation.z);

    if (goF)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y, self.MainCamera.position.z - 0.05);
    if (goB)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y, self.MainCamera.position.z + 0.05);
    if (goL)
      self.MainCamera.position.set(self.MainCamera.position.x - 0.05, self.MainCamera.position.y , self.MainCamera.position.z);
    if (goR)
      self.MainCamera.position.set(self.MainCamera.position.x + 0.05, self.MainCamera.position.y , self.MainCamera.position.z);
    if (goC)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y - 0.05, self.MainCamera.position.z);
    if (goSp)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y + 0.05, self.MainCamera.position.z);
  };

  self.Start = function () {
    self.Render();
    window.requestAnimationFrame(self.Start);
  };

  self.LoadObj = function (objfile, mtlfile, objfunc) {

    var manager = new THREE.LoadingManager();
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'objects/' );
    mtlLoader.load( 'makartable.mtl', function( materials ) {
      materials.preload();
      var loader = new THREE.OBJLoader( manager );
      loader.setMaterials(materials);
      loader.setPath( 'objects/' );
      loader.load( 'makartable.obj', function ( object ) {
        objfunc(object);
        self.MainScene.add(object);
      } );
    });
  };
}


