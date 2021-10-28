$(
    function() {
        // 自定义校验规则
        layui.form.verify({
                pwd: [/^[\S]{6,15}$/, '密码必须6到12位，且不能出现空格'],
                samePwd: function(value) {
                    if (value === $('[name=oldPwd]').val()) {
                        return '新密码不能与旧密码相同！'
                    }
                },
                rePwd: function(value) {
                    if (value !== $('[name=newPwd]').val()) {
                        return '新密码不一致'
                    }
                }
            })
            // 修改密码
        $('.layui-form').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('修改密码失败！')
                    }
                    layui.layer.msg('修改密码成功！')
                    $('.layui-form')[0].reset()
                }
            })
        })
    }
)