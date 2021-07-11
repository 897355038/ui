$(function(){
    var layer=layui.layer
    var form = layui.form
    getArticleList()
    function getArticleList(){
        $.ajax({
            method:'GET',
            url:'/my/artic/cates',
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('获取文章分类失败')
                }
                let str=template('tmp',res)
                $('.content').html(str)
            }
        })
    }
    var index
    $('#addCate').on('click',function(){
        index=layer.open({
            type:1,
            area:['500px','300px'],
            title: '添加文章分类',
            content: $('#dialog').html()
          }); 
    })
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/artic/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败!')
                }
                layer.msg('新增分类成功!')
                getArticleList()
                layer.close(index)
            }
        })
    })
    var indexEdit
    $('body').on('click','.btn-edit',function(e){
        indexEdit=layer.open({
            type:1,
            area:['500px','300px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
          }); 
          var id=$(this).attr('data-id')
          $.ajax({
              method:'GET',
              url:'/my/artic/getcate/'+id,
              success:function(res){
                  if(res.status!==0) {
                      return layer.msg('获取分类详情失败')
                  }
                  form.val('form-edit',res.data)
              }
          })
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        console.log($(this).serialize())
        $.ajax({
            method:'POST',
            url:'/my/artic/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改分类失败!')
                }
                layer.msg('修改分类成功!')
                getArticleList()
                layer.close(indexEdit)
            }
        })
    })
    $('body').on('click','.btn-del',function(e){
        var id=$(this).attr('data-id')
        layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/artic/deletecate/'+id,
                success:function(res){
                    if(res.status!==0) {
                        return layer.msg('删除文章分类失败')
                    }
                    layer.msg('删除文章分类成功')
                    layer.close(index)
                    getArticleList()
                }
            })
        })
    })
})