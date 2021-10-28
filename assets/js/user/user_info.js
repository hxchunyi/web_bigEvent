$(
    function() {
        var form = layui.form
        var layer = layui.layer
        initUserInfo()
            // 初始化用户信息
        function initUserInfo() {
            $.ajax({
                method: 'GET',
                url: '/my/userinfo',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取用户信息失败！')
                    }
                    // 快速给表单添加数据
                    form.val('user_info', res.data)
                }
            })
        }
        // 自定义验证规则
        form.verify({
                nickname: function(value) {
                    if (value.length > 6) {
                        return '昵称长度必须在 1 ~ 6 个字符之间！'
                    }
                }
            })
            // 重置表单
        $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })

        // 修改信息
        $('#from_User_Info').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('修改用户信息失败！')
                    }
                    window.parent.getUSerInfo()
                }
            })
        })

    }

)