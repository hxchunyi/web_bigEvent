$(
    function() {
        $.ajaxPrefilter(
            function(options) {
                // 自动添加根路径
                options.url = 'http://api-breakingnews-web.itheima.net' + options.url

                if (options.url.indexOf('/my') != -1) {
                    // 给需要权限的接口统一配置headers
                    options.headers = {
                            Authorization: localStorage.getItem('token') || ''
                        }
                        //统一给需要权限的添加认证
                    options.complete = function(res) {
                        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                            localStorage.removeItem('token')
                            location.href = '/login.html'
                        }
                    }
                }
            }
        )


    }
)