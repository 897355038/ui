var layer = layui.layer
$(function(){
    getUserInfo()
    $('#btnLogOut').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(data){
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(data.user_pic!==null) {
        $('.layui-nav-img').attr('src',data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}