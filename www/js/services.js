angular.module('starter.services', [])

.factory("Simulator",function(){

  var imgLeftUrl = "img/scene2_view1_left.jpg";
  var imgRightUrl = "img/scene2_view1_right.jpg";

 
  return{

    start:function(){

      //Scenes
      var sceneRTTLeft = new THREE.Scene();
      var sceneRTTRight = new THREE.Scene();

      var scene = new THREE.Scene();


      //Cameras
      var cameraRTTLeft = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);
      var cameraRTTRight = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);

      var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

      //Renderer
      var renderer = new THREE.WebGLRenderer({clearColor:0x888888,antialias:true});
      renderer.setSize( window.innerWidth, window.innerHeight );
     
      document.querySelector(".simulator").appendChild( renderer.domElement );



      //Geometry
      var sphereGeometry = new THREE.SphereGeometry( 20, 32, 32 );
      var planeGeometry = new THREE.PlaneGeometry( window.innerWidth / 2, window.innerHeight );

      

      //Textures
      var textureRTTLeft = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
      var textureRTTRight = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );


      //Materials
      var materialRTTLeft = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: THREE.ImageUtils.loadTexture(imgLeftUrl)
      });

      var materialRTTRight = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: THREE.ImageUtils.loadTexture(imgRightUrl)
      });

     var materialLeft =  new THREE.MeshBasicMaterial({map:textureRTTLeft} );
     var materialRight = new THREE.MeshBasicMaterial({map:textureRTTRight} );



      //Meshes
      var sphereLeft  = new THREE.Mesh( sphereGeometry, materialRTTLeft );
      var sphereRight = new THREE.Mesh( sphereGeometry, materialRTTRight );

      var planeLeft  = new THREE.Mesh( planeGeometry, materialLeft );
      var planeRight = new THREE.Mesh( planeGeometry, materialRight );
      

      sceneRTTLeft.add(  sphereLeft );
      sceneRTTRight.add( sphereRight );

      scene.add(planeLeft);
      scene.add(planeRight);


      planeLeft.position.z = -1000;
      planeRight.position.z = -1000;


      planeLeft.position.x = -window.innerWidth / 4;
      planeRight.position.x = -window.innerWidth / -4;


      controlsLeft = new DeviceOrientationController( cameraRTTLeft, renderer.domElement );
      controlsLeft.connect();  

      controlsLeft.enableManualZoom = false;     

      controlsRight = new DeviceOrientationController( cameraRTTRight, renderer.domElement );
      controlsRight.connect();     

      controlsRight.enableManualZoom = false;

      controlsMain = new DeviceOrientationController( camera, renderer.domElement );
      controlsMain.connect(); 


      
 

      var render = function () {
        requestAnimationFrame( render );

        controlsLeft.update();
        controlsRight.update();

        controlsMain.update();

        renderer.render(sceneRTTLeft, cameraRTTLeft,textureRTTLeft,true);

        renderer.render(sceneRTTRight, cameraRTTRight,textureRTTRight,true);

        renderer.render(scene,camera);
      };

      render();
     
    }


  }




})