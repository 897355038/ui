$(function(){
    var form = layui.form
    var layer= layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6) {
                return '昵称名称不能超过6位'
            }
        }
    })
    getUserInfo()
    function getUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo',res.data)

            }
        })
    }
    $('.resetBtn').on('click',function(e){
        e.preventDefault();
        getUserInfo()
    })
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
               if(res.status!==0) {
                   return layer.msg('修改用户信息失败')
               }
               layer.msg('修改用户信息成功')
               window.parent.getUserInfo()
            }
        })
    })
})