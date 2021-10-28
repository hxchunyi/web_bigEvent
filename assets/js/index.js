$(
    function() {
        // 调用getUserInfo得到用户信息
        getUSerInfo()
            // 主页退出
        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                // 清空token
                localStorage.removeItem('token')
                    // 跳转到login.html
                location.href = 'login.html'
                    // 关闭 confirm 询问框
                layer.close(index)
            })
        })
    }
)

// 获取个人信息

function getUSerInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            randerAvatar(res.data)
        }
    })
}

function randerAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    $('#welcomeUser').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}