ライト関連
===
```
Create : 2024-01-26
AUthor : Yugeta.Koji
```

# ライトをマウスドラッグで動かす
- 参照 : https://irukanobox.blogspot.com/2016/11/threejs3d.html
- デモ : https://webgl.irukanobox.com/sample/three/161120/draggablecubes.html


# Sample
```
// この平面に対してオブジェクトを平行に動かす
var plane = new THREE.Plane();
  
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();
var intersection = new THREE.Vector3();
  
// マウスオーバーしているオブジェクト
var mouseoveredObj;
// ドラッグしているオブジェクト
var draggedObj;
  
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
  

function onDocumentMouseDown( event ) {
  event.preventDefault();
  
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  
  if ( intersects.length > 0 ) {
    // マウスドラッグしている間はTrackballControlsを無効にする
    controls.enabled = false;
  
    draggedObj = intersects[ 0 ].object;
  
    // rayとplaneの交点を求めてintersectionに設定
    if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
      // ドラッグ中のオブジェクトとplaneの距離
      offset.copy( intersection ).sub( draggedObj.position );
    }
  }
}
  

function onDocumentMouseMove( event ) {
  event.preventDefault();
  
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  raycaster.setFromCamera( mouse, camera );
  
  if ( draggedObj ) {
    // オブジェクトをドラッグして移動させているとき
  
    // rayとplaneの交点をintersectionに設定
    if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
      // オブジェクトをplaneに対して平行に移動させる
      draggedObj.position.copy( intersection.sub( offset ) );
    }
  } else {
    // オブジェクトをドラッグしないでマウスを動かしている場合
    var intersects = raycaster.intersectObjects( objects );
  
    if ( intersects.length > 0 ) {
      if ( mouseoveredObj != intersects[ 0 ].object ) {
        // マウスオーバー中のオブジェクトを入れ替え
        mouseoveredObj = intersects[ 0 ].object;
  
        // plane.normalにカメラの方向ベクトルを設定
        // 平面の角度をカメラの向きに対して垂直に維持する
        camera.getWorldDirection( plane.normal );
      }
    } else {
      mouseoveredObj = null;
    }
  }
}
  

function onDocumentMouseUp( event ) {
  event.preventDefault();
  
  controls.enabled = true;
  
  if ( mouseoveredObj ) {
    draggedObj = null;
  }
}
```
