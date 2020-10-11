const Koa = require("koa");
const KoaRouter = require("koa-router");
const fly = require("flyio");

// 1. 创建服务器应用实例
const app = new Koa();

// 3. 注册路由
const router = new KoaRouter();

// 4. 使用中间件
app.use(router.routes()).use(router.allowedMethods());

/* 
	5. 注册后端路由
	ctx: req+res		ctx.body: 响应数据
	next: 执行下一个中间件函数
*/
// series banner
router.get("/api/seriesBanner", async (ctx, next) => {
  let res = await fly.get(
    "https://sspai.com/api/v1/recommend/page/get?limit=5&offset=0&type=series_banner"
  );
  ctx.body = res.response.body;
});

// series 今日推荐
router.get("/api/seriesRecommend", async (ctx, next) => {
  let res = await fly.get(
    "https://sspai.com/api/v1/series/recommend/page/get?limit=5&offset=0&type=1"
  );
  ctx.body = res.response.body;
});

// series 最新上架
router.get("/api/seriesLatest", async (ctx, next) => {
  let res = await fly.get(
    "https://sspai.com/api/v1/series/search/page/get?limit=5&offset=0&sort=weight&released_at=0&title="
  );
  ctx.body = res.response.body;
});

// series 精选试读
router.get("/api/seriesTrial", async (ctx, next) => {
  let res = await fly.get(
    "https://sspai.com/api/v1/series/recommend/page/get?limit=5&offset=0&type=2"
  );
  ctx.body = res.response.body;
});

// series 全部分类
router.get("/api/seriesCategories", async (ctx, next) => {
  let res = await fly.get("https://sspai.com/api/v1/series/tag/all/get");
	ctx.body = res.response.body;
	// console.log(res);
});

// 2. 运行并监听服务器
app.listen(3001, (err) => {
  if (err) {
    console.log("服务器启动失败");
  } else {
    console.log("服务器启动成功 http://localhost:3001");
  }
});
