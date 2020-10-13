const Koa = require('koa')
const KoaRouter = require('koa-router')
const fly = require('flyio')

// 1. 创建服务器应用实例
const app = new Koa()

// 3. 注册路由
const router = new KoaRouter()

// 4. 使用中间件
app.use(router.routes()).use(router.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

/* 
	5. 注册后端路由
	ctx: req+res		ctx.body: 响应数据
	next: 执行下一个中间件函数
*/

// 1-搜索关键字
router.get('/api/getkeywords', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/setting/get?t=1602290678533'
  )
  ctx.body = res.response.body
})

// 2-首页轮播图 https://sspai.com/api/v1/recommend/page/get?limit=5&offset=0&type=home_main
router.get('/api/getMainBannerList', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/recommend/page/get?limit=5&offset=0&type=home_main'
  )
  ctx.body = res.response.body
})

// 2-轮播图下-卡片
router.get('/api/cardList', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/recommend/page/get?limit=4&offset=0&type=home_sub'
  )
  ctx.body = res.response.body
})

// 3-右侧一派卡片
router.get('/api/getYipaiCard', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/bullet/search/page/get?limit=3&offset=0'
  )
  ctx.body = res.response.body
})

// 4-
// https://sspai.com/api/v1/article/tag/special/page/get?limit=10&offset=0&created_at=0&tag=效率技巧&search_type=1
router.get('/api/addArticalCardList', async (ctx, next) => {
  let { limit, offset, tag, time } = ctx.request.query
  let tag1 = encodeURI(tag)
  console.log(tag1)
  let res = await fly.get(
    `https://sspai.com/api/v1/article/index/page/get?limit=${limit}&offset=${offset}&created_at=${time}&tag=${tag1}&search_type=1`
  )
  ctx.body = res.response.body
})
// series banner
router.get('/api/seriesBanner', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/recommend/page/get?limit=5&offset=0&type=series_banner'
  )
  ctx.body = res.response.body
})

// 社区广场列表
// 首次 https://sspai.com/api/v1/article/matrix/page/get?limit=20&offset=0
// 更多 https://sspai.com/api/v1/article/matrix/page/get?limit=20&offset=20
// 更多 https://sspai.com/api/v1/article/matrix/page/get?limit=20&offset=40
router.get('/api/matrixList', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/article/matrix/page/get?limit=20&offset=0'
  )
  ctx.body = res.response.body
})

// 社区广场一派
// https://sspai.com/api/v1/bullet/search/page/get?limit=1&offset=0
router.get('/api/matrixYipai', async (ctx, next) => {
  let res = await fly.get('https://sspai.com/api/v1/bullet/search/page/get')
  ctx.body = res.response.body
})

// 社区广场推荐关注
router.get('/api/matrixCommend', async (ctx, next) => {
  let res = await fly.get('https://sspai.com/api/v1/user/worth/follow/page/get')
  ctx.body = res.response.body
})

// 社区广场推荐专栏
router.get('/api/matrixSpecial', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/special/column/search/page/get'
  )
  ctx.body = res.response.body
})

// 全部专栏
router.get('/api/matrixSpecialColumn', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/special/column/search/page/get?limit=20&offset=0&created_at=1602590192'
  )
  ctx.body = res.response.body
})

// series 今日推荐
router.get('/api/seriesRecommend', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/series/recommend/page/get?limit=5&offset=0&type=1'
  )
  ctx.body = res.response.body
})

// series 最新上架
router.get('/api/seriesLatest', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/series/search/page/get?limit=5&offset=0&sort=weight&released_at=0&title='
  )
  ctx.body = res.response.body
})

// series 精选试读
router.get('/api/seriesTrial', async (ctx, next) => {
  let res = await fly.get(
    'https://sspai.com/api/v1/series/recommend/page/get?limit=5&offset=0&type=2'
  )
  ctx.body = res.response.body
})

// series 全部分类
router.get('/api/seriesCategories', async (ctx, next) => {
  let res = await fly.get('https://sspai.com/api/v1/series/tag/all/get')
  ctx.body = res.response.body
  // console.log(res);
})

// w 商城首页数据
router.get('/api/seetingInfo', async (ctx, next) => {
  let res = await fly.get(
    `https://sspai.com/api/v1/item/class/item/recommend/all/get?class_id=4`
  )
  ctx.body = res.response.body
})
// w 分类数据
router.get('/api/bannerInfo', async (ctx, next) => {
  let res = await fly.get('https://sspai.com/api/v1/item/class/sub/all/get')
  ctx.body = res.response.body
})

// w 内容区数据
router.get('/api/self', async (ctx, next) => {
  let res = await fly.get('https://sspai.com/api/v1/item/recommend/all/get')
  ctx.body = res.response.body
})

// w 根据点击分类列表筛选数据
router.get('/api/switchInfo', async (ctx, next) => {
  let { offset, class_id } = ctx.request.query

  let res = await fly.get(
    `https://sspai.com/api/v1/item/class/item/page/get?limit=12&offset=${offset}&class_id=${class_id}&platform_attribute=`
  )
  ctx.body = res.response.body
})

// w 详情页数据请求
//sspai.com/api/v1/item/info/get?id=4
router.get('/api/detailInfo', async (ctx, next) => {
  let { id } = ctx.request.query
  let res = await fly.get(`https://sspai.com/api/v1/item/info/get?id=${id}`)
  ctx.body = res.response.body
})

// 话题banner
router.get('/api/getTopicsList', async (ctx, next) => {
	let res = await fly.get('https://sspai.com/api/v1/topic/search/page/get?limit=3&offset=0&recommend=true')
	ctx.body = res.response.body
})

//  全部话题
router.get('/api/getTopics', async (ctx, next) => {
	let res = await fly.get('https://sspai.com/api/v1/topic/search/page/get?limit=16&offset=0&created_at=1602342509')
	ctx.body = res.response.body
})

//  点击切换
router.get('/api/getTopicsAll', async (ctx, next) => {
	let {tag} = ctx.request.query
	let newTag = encodeURI(tag)
	let res = await fly.get(`https://sspai.com/api/v1/topic/search/page/get?limit=16&offset=0&tag_title=${newTag}&created_at=1602465970`)
	ctx.body = res.response.body
})

//  加载更多
router.get('/api/getTopicsMore', async (ctx, next) => {
	let res = await fly.get('https://sspai.com/api/v1/topic/search/page/get?limit=16&offset=80&tag_title=&created_at=1602432094')
	ctx.body = res.response.body
})

// 详情页接口

//  banner头部数据
router.get('/api/getTopicDetailBanner', async (ctx, next) => {
	let {topicId} = ctx.request.query
	let res = await fly.get(`https://sspai.com/api/v1/topic/single/info/get?id=${topicId}`)
	ctx.body = res.response.body
})

//  banner最新区域
router.get('/api/getPostItem', async (ctx, next) => {
	let {topicId} = ctx.request.query
	let res = await fly.get(`https://sspai.com/api/v1/article/topic/page/get?limit=10&offset=0&topic_id=${topicId}&created_at=1602469649`)
	ctx.body = res.response.body
})

//  banner推荐区域
router.get('/api/getRecommend', async (ctx, next) => {
	let {topicId} = ctx.request.query
	let res = await fly.get(`https://sspai.com/api/v1/article/topic/page/get?limit=2&offset=0&topic_id=${topicId}&recommend=true`)
	ctx.body = res.response.body
})

// 运行并监听服务器
app.listen(3001, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功 http://localhost:3001')
  }
})
