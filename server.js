const Koa = require('koa')
const KoaRouter = require('koa-router')
const fly = require('flyio')

// 1. 创建服务器应用实例
const app = new Koa()

// 3. 注册路由
const router = new KoaRouter()

// 4. 使用中间件
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

// 运行并监听服务器
app.listen(3001, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功 http://localhost:3001')
  }
})
