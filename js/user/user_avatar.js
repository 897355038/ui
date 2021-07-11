$(function(){
    var $img=$('#image');
    var layer =layui.layer
    const options={
        aspectRatio:1,
        preview:'.img-preview'
    }
    $img.cropper(options)
    $('#chooseImg').on('click',function(){
        $('#file').click()
    })
    $('#file').on('change',function(e){
        var fileList=e.target.files;
        if(fileList.length===0) {
            return layer.msg('请选择照片')
        }
        var file=e.target.files[0];
        var imgURL=URL.createObjectURL(file);
        $img.cropper('destroy').attr('src',imgURL).cropper(options)
    })
    $('#btnUpload').on('click',function(){
        var dataURL=$img.cropper('getCroppedCanvas',{
            width:100,
            height:100
        }).toDataURL('image/png')
        $.ajax({
            method:'POST',
            url:'/my/updateAvatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})