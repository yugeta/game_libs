export class Data{
  static clock          = null
  static scene          = null
  static texture        = null
  static loader         = null
  static camera         = null
  static camera_control = null
  static renderer       = null
  static light          = null
  static ambient        = null
  static mesh           = null
  static mixer          = null
  static move_data      = null
  static move_weight    = 100
  static camera_center  = {x:0, y:0, z:0}
  static camera_pos     = {x:50, y:50, z:0}
  static object_scale   = 1
  static object_pos     = {x:0, y:0, z:0}
  static root           = {
    elm : document.getElementById("screen"),
    // bg_color : 0x00ffff,
    bg_color : 0x444444,
  }
  static axis = {
    x : 1,
    y : 1,
    z : 0,
  }

  static elm_upload_button = document.querySelector(`button[name="upload"]`)
  static elm_upload_file   = document.querySelector(`input[type="file"][name="glb"]`)
  static elm_grid_button   = document.querySelector(`input[name="grid"]`)
}