$(function(){
    $('.to-register a').on('click',function(){
        $('.login-box').hide()
        $('.register-box').show()
    })
    $('.to-login a').on('click',function(){
        $('.login-box').show()
        $('.register-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        'pwd':[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        'repwd':function(value){
           var pwd= $('.register-box [name=password]').val()
           console.log(pwd)
           if(pwd!==value) {
               return '两次密码不一致'
           }
        }
    })
    $('#form_reg').on('submit',function(e){
        console.log(e)
        e.preventDefault();
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0) {
                return layer.msg(res.msg)
            }
            layer.msg('注册成功请登录')
            $('.login-box').show()
            $('.register-box').hide()
        })
    })
    $('#form_log').submit(function(e){
        e.preventDefault();
        console.log($(this).serialize())
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token',res.token)
                layer.msg('登录成功')
                location.href='/index.html'
            }
        })
    })
})