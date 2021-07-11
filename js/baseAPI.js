$.ajaxPrefilter(function(options){
    options.url='http://127.0.0.1:3007'+options.url
    if(options.url.indexOf('/my/'!==-1)){
        options.headers={
            Authorization:localStorage.getItem('token')||''
        }
    }
    //不论成功或者失败，队徽调用complete回调函数
    options.complete=function(res){
       if(res.responseJSON.status === 1) {
        localStorage.removeItem('token')
        location.href='/login.html'
       }
    }
})