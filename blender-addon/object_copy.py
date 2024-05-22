import bpy

#2重forループ
for i in range(5):
    for j in range(5):
        
        #選択オブジェクトをコピー
        bpy.ops.object.duplicate()
        
        #オブジェクトの座標を指定
        bpy.context.object.location.x = i * 2
        bpy.context.object.location.y = j * 2
        
        #オブジェクトのスケールを指定
        bpy.context.object.scale.x = (5-i) / 5
        bpy.context.object.scale.y = (5-i) / 5
        bpy.context.object.scale.z = (5-i) / 5
        
        #オブジェクトの角度をオイラー角[rad]で指定
        bpy.context.object.rotation_euler.x = i / 5
        bpy.context.object.rotation_euler.y = j / 5