$(
    function() {
        var form = layui.form
        var layer = layui.layer
        initArtList()
            // 获取文章列表
        function initArtList() {
            $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取文章分类失败!')
                    }
                    var htmlStr = template('tpl-artList', res)
                    $('tbody').html(htmlStr)
                }
            })
        }
        var indexAdd = null
            // 弹出添加框
        $('#addCate').on('click', function() {
                indexAdd = layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '添加文章分类',
                    content: $('#pop-up-box-add').html()
                })
            })
            // 确认添加
        $('body').on('submit', '#form-add', function(e) {
                e.preventDefault()
                $.ajax({
                    method: 'POST',
                    url: '/my/article/addcates ',
                    data: $(this).serialize(),
                    success: function(res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layer.msg('添加文章失败!')
                        }
                        initArtList()
                        layer.msg('添加文章成功!')
                        layer.close(indexAdd)
                    }
                })
            })
            // 弹出修改框
        var indexEdit = null
        $('tbody').on('click', '#editCate', function(e) {
                indexEdit = layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '修改文章分类',
                    content: $('#pop-up-box-edit').html()
                })
                var Id = $(this).attr('data-Id')
                console.log(Id);
                $.ajax({
                    method: "GET",
                    url: '/my/article/cates/' + Id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg("获取信息失败")
                        }
                        form.val('form-edit', res.data)
                    }
                })
            })
            // 确认修改
        $('body').on('click', '#confirm', function(e) {
                e.preventDefault()
                $.ajax({
                    method: 'POST',
                    url: '/my/article/updatecate',
                    data: $('#form-edit').serialize(),
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg("修改失败！")
                        }
                        layer.close(indexEdit)
                        layer.msg("修改成功")
                        initArtList()
                    }
                })
            })
            // 删除
        $('tbody').on('click', '.btn-delete', function() {
            var Id = $(this).attr('data-Id')
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg("删除失败！")
                        }
                        layer.close(index)
                        layer.msg("删除成功！")
                        initArtList()
                    }
                })
            })
        })
    }
)