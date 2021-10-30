$(
    function() {
        var form = layui.form
        var layer = layui.layer
        var laypage = layui.laypage
            // 定义查询的数据
        var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        initArticleTable()
        initCate()

        // 定义时间过滤器
        template.defaults.imports.dataFormat = function(date) {
                const dt = new Date(date)

                var y = dt.getFullYear()
                var m = padZero(dt.getMonth() + 1)
                var d = padZero(dt.getDate())

                var hh = padZero(dt.getHours())
                var mm = padZero(dt.getMinutes())
                var ss = padZero(dt.getSeconds())
                return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
            }
            // 定义补零函数
        function padZero(n) {
            return n > 9 ? n : '0' + n
        }
        // 定义获取文章列表数据的方法
        function initArticleTable() {
            $.ajax({
                method: 'GET',
                url: '/my/article/list',
                data: q,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("获取数据失败！")
                    }
                    var htmlStr = template('tpl-article-list', res)
                    $('tbody').html(htmlStr)
                    pageRender(res.total)
                    form.render()
                }
            })

        }
        // 定义 `initCate` 函数请求文章分类的列表数据
        function initCate() {
            $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取文章分类失败！')
                    }
                    var htmlStr = template('tpl-article-differ', res)
                    $('[name=cate_id]').html(htmlStr)
                    form.render()
                }
            })
        }
        // 为提交绑定事件
        $('#form-search').on('click', '.layui-btn', function(e) {
                e.preventDefault()
                var cate_id = $('[name = cate_id]').val()
                var state = $('[name = state]').val()
                q.cate_id = cate_id
                q.state = state
                initArticleTable()
            })
            // 分页功能
        function pageRender(total) {
            laypage.render({
                elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 5, 7],
                jump: function(obj, first) {
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    if (!first) {
                        initArticleTable()
                    }
                }
            });
        }
        // 删除文章
        $('tbody').on('click', '.artDelete', function() {
                var id = $(this).attr('data-id')
                layer.confirm('确定要删除吗?', { icon: 3, title: '提示' },
                    function(index) {
                        $.ajax({
                            method: 'GET',
                            url: '/my/article/delete/' + id,
                            success: function(res) {
                                if (res.status !== 0) {
                                    return layer.msg("删除失败!")
                                }
                                layer.msg("删除成功!")
                                initArticleTable()
                            }
                        })
                    });
            })
            // 编辑
    }
)