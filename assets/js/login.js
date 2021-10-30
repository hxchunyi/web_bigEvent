$(
    function() {
        // 登录和注册的切换
        $('.login-box').on('click', 'a', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        $('.reg-box').on('click', 'a', function() {
                $('.login-box').show()
                $('.reg-box').hide()
            })
            // 自定义验证规则
            // 将layui的form拿过来
        var form = layui.form
        var layer = layui.layer
        form.verify({
                // 密码规则
                pwd: [/^[\S]{6,15}$/, '密码必须6到12位，且不能出现空格'],
                // 判断密码是否相等
                repwd: function(value) {

                    if ($('.reg-box [name=password]').val() !== value) {
                        return '两次密码不一致'
                    }
                }
            })
            // 注册功能
        $("#form_reg").on('submit', function(e) {
                e.preventDefault()
                var data = {
                    username: $('#form_reg [name = username]').val(),
                    password: $('#form_reg [name = password]').val()
                }
                $.post('/api/reguser', data, function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    $('#link_login').click()
                })
            })
            // 登录功能
        $("#form_login").on('submit', function(e) {
            e.preventDefault()
                // 获取表单的数据
            var data = $('#form_login').serialize()
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: data,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败！')
                    }
                    // 将token存到本地储存
                    localStorage.setItem('token', res.token)
                    layer.msg('登陆成功！')
                    location.href = 'index.html'
                }
            })
        })
    }
)