SET NAMES UTF8;
DROP DATABASE IF EXISTS xxy;
CREATE DATABASE xxy CHARSET=UTF8;
USE xxy;


/**电影类别家族**/
CREATE TABLE film_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)                       #类别名
);

/**电影**/
CREATE TABLE film(
  mid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT,              #所属类别家族编号
  title VARCHAR(128),         #电影名
  subtitle VARCHAR(128),      #介绍
  shelf_time VARCHAR(64),     #上映时间
  goat DECIMAL(2,1),          #评分
  play_count DECIMAL(6,1),    #播放量
  director VARCHAR(32),       #导演
  role VARCHAR(64),           #主演
  county VARCHAR(32),         #国家
  pic VARCHAR(128),           #图片
  video VARCHAR(32),          #视频地址
  film_state INT,             #电影状态 1-即将上映 2-正在热映 3-已上映
  is_delete BOOLEAN           #是否被删除
);

/**用户信息**/
CREATE TABLE xxy_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**评论信息**/
CREATE TABLE xxy_comment_info(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  film_id INT,                 #影片编号
  user_id INT,                 #用户编号
  content VARCHAR(128),        #评论内容
  time VARCHAR(16),            #评论时间
  zan VARCHAR(16),             #赞
  callback VARCHAR(16),        #回复
  is_delete BOOLEAN           #是否删除
);

/**收藏夹条目**/
CREATE TABLE xz_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  film_id INT,      #电影编号
  play_time INT,    #播放时间
  is_delete BOOLEAN #是否已删除
);

/**播放记录**/
CREATE TABLE xxy_playrecord(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,           #用户编号
  film_id INT,           #电影编号
  play_time TIME,      #播放时间
  is_delete BOOLEAN      #是否已删除
)AUTO_INCREMENT=10000000;

/**用户订单**/
CREATE TABLE xz_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);

/****首页轮播电影****/
CREATE TABLE xxy_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);

/****首页推荐电影****/
CREATE TABLE xxy_index_recommend(
  rid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);

/****首页电影****/
CREATE TABLE xxy_index_film(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  subtitle VARCHAR(128),
  img VARCHAR(128),
  href VARCHAR(64),
  is_delete INT
);

/*******************/
/******数据导入******/
/*******************/
/**电影家族**/
INSERT INTO film_family VALUES
(NULL,'动作片'),
(NULL,'喜剧片'),
(NULL,'爱情片'),
(NULL,'恐怖片'),
(NULL,'科幻片'),
(NULL,'好莱坞'),
(NULL,'战争片'),
(NULL,'动画片'),
(NULL,'网络电影');

/**电影**/
INSERT INTO film VALUES
(1,1,'战狼2','硬汉吴京搏命出击','2017年7月27日',7.3,'19000','吴京',' 吴京 饰 冷锋/ 弗兰克·格里罗 饰 老爹/ 吴刚 饰 何建国/ 张翰 饰 卓亦凡/ 卢靖姗 饰 瑞秋','中国','img/action-movie/zhanlang2.jpg','其它',2,0),
(2,1,'蜘蛛侠：英雄归来','小蜘蛛决战秃鹰','2017年9月8日',7.4,'3350.6','汤姆·霍兰德',' 汤姆·霍兰德 饰 蜘蛛侠/彼得·帕克/ 小罗伯特·唐尼 饰 钢铁侠/托尼·史塔克/ 玛丽莎·托梅 饰 梅姨/ 迈克尔·基顿 饰 秃鹰','美国','img/action-movie/zhizhuxia.jpg','其它',1,0),
(3,1,'中南海保镖','李连杰保护钟丽缇','2017年9月8日',7.0,'1818.8','元奎','李连杰 饰 许正阳','中国','img/action-movie/zhongnanhaibaobiao.jpg','其它',3,0),
(4,1,'速度与激情8','范迪塞尔激吻女反派','2017年4月14日',6.8,'14000','F·加里·格雷',' 范·迪塞尔 饰 Dom/ 道恩·强森 饰 Hobbs/ 查理兹·塞隆 饰 Cipher/ 杰森·斯坦森 饰 Deckard/ 米歇尔·罗德里格兹 饰 Letty','美国','img/action-movie/suduyujiqing.jpg','其它',2,0),
(5,1,'复仇者联盟2：奥创纪元','复仇者联盟再续经典','2015年5月12日',6.9,'7115.7','乔斯·韦登',' 小罗伯特·唐尼 饰 托尼·斯塔克/ 克里斯·海姆斯沃斯 饰 雷神/ Chris Evans 饰 美国队长','美国','img/action-movie/fuchouzhelianmeng.jpg','其它',1,0),
(6,1,'雷神2黑暗世界','锤与火之歌','2013年11月8日',7.5,'3464','艾伦·泰勒','克里斯·海姆斯沃斯, 饰 雷神索尔/ 娜塔莉·波特曼 饰 简·福斯特/ 汤姆·希德勒斯顿 饰 洛基','美国','img/action-movie/leishen2.jpg','其它',3,0),
(7,3,'阿甘正传','傻人有傻福','1994年',8.9,'22000','罗伯特·泽米吉斯','汤姆·汉克斯，罗宾·莱特·潘','美国','img/love-movie/aganzhengzhuan.jpg','其它',3,0),
(8,1,'王牌特工：特工学院','酷炫科林叔大战刀锋女','2015年3月27日',8.5,'7782.8','马修·沃恩','克里斯·海姆斯沃斯, 饰 雷神索尔/ 娜塔莉·波特曼 饰 简·福斯特/ 汤姆·希德勒斯顿 饰 洛基','美国','img/action-movie/wangpaitegong.jpg','其它',3,0),
(9,1,'西游伏妖篇','周星驰徐克强势联手','2017年1月28日',5.6,'24000','徐克',' 吴亦凡 饰 唐僧/ 林更新 饰 孙悟空/ 姚晨 饰 九宫真人/ 林允 饰 小善/ 包贝尔 饰 国王/ 巴特尔 饰 沙僧/ 杨一威 饰 猪八戒','中国','img/action-movie/xiyoufuyao.jpg','其它',2,0),
(10,3,'七月与安生','安妮宝贝同名小说改编','2016年9月14日',7.9,'22000','曾国祥','周冬雨，马思纯，李程彬','中国','img/love-movie/qiyueyuansheng.jpg','其它',3,0),
(11,2,'羞羞的铁拳','开心麻花喜剧新电影','2017年9月30日',7.2,'24000','宋阳、张迟昱','艾伦 / 马丽 / 沈腾','中国','img/comedy-movie/xiuxiudetiequan.jpg','其它',1,0),
(12,3,'爱乐之城','奥斯卡最佳原创配乐','2016年12月16日',8.2,'18000','达米恩·查泽雷','艾玛·斯通，瑞恩·高斯林，J·K·西蒙斯','美国','img/love-movie/aiyuezhicheng.jpg','其它',1,0),
(13,3,'泰坦尼克号','感人爱情故事','1995年',9.5,'29000','詹姆斯·卡梅隆','莱昂纳多·迪卡普里奥，凯特·温斯莱特，比利·赞恩，格劳瑞亚·斯图尔特，凯西·贝茨','美国','img/love-movie/taitannike.jpg','其它',3,0),
(14,3,'你的名字','少男少女身体互换','2016年12月2日',8.8,'12000','新海诚','神木隆之介，上白石萌音','日本','img/love-movie/nidemingzi.jpg','其它',3,0),
(15,2,'大话西游','大话西游之大圣娶亲','1995年2月4日',9.0,'31000','刘镇伟','周星驰，吴孟达，朱茵，莫文蔚，蓝洁瑛，罗家英，刘镇伟，蔡少芬，江约诚，陆树铭，吴珏瑾','中国香港','img/comedy-movie/dahuaxiyou.jpg','其它',3,0),
(16,2,'喜剧之王','小人物的故事','1999年02月13日',7.8,'20000','周星驰，李力持','周星驰，莫文蔚，张柏芝，吴孟达，林子善，田启文，李兆基，成龙','中国香港','img/comedy-movie/xijuzhiwang.jpg','其它',3,0);

/**用户信息**/
INSERT INTO xxy_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', 'img/avatar/default.png', '丁伟', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');

/**用户评论**/
INSERT INTO xxy_comment_info VALUES
(NULL,1,2,'lorem123123123132131321321','2017年11月1日',30,5,0);

/****首页轮播电影****/
INSERT INTO xxy_index_carousel VALUES
(NULL, 'img/index/banner1.jpg','轮播电影1','playpage.html?mid=1'),
(NULL, 'img/index/banner2.jpg','轮播电影2','playpage.html?mid=4'),
(NULL, 'img/index/banner3.jpg','轮播电影3','playpage.html?mid=6'),
(NULL, 'img/index/banner4.jpg','轮播电影4','playpage.html?mid=7');

/****首页推荐电影****/
INSERT INTO xxy_index_recommend VALUES
(NULL, 'img/index/r1.jpg','推荐电影1','playpage.html?mid=1'),
(NULL, 'img/index/r2.jpg','推荐电影2','playpage.html?mid=2'),
(NULL, 'img/index/r3.jpg','推荐电影3','playpage.html?mid=3'),
(NULL, 'img/index/r4.jpg','推荐电影4','playpage.html?mid=4'),
(NULL, 'img/index/r5.jpg','推荐电影5','playpage.html?mid=5'),
(NULL, 'img/index/r6.jpg','推荐电影6','playpage.html?mid=6');

/****首页电影****/
INSERT INTO xxy_index_film VALUES
(NULL, '战狼2','硬汉吴京搏命出击','img/index/zhanlang2.jpg','playpage.html?mid=1',0),
(NULL, '蜘蛛侠：英雄归来','小蜘蛛决战秃鹰','img/action-movie/zhizhuxia.jpg','playpage.html?mid=2',0),
(NULL, '中南海保镖','李连杰保护钟丽缇','img/action-movie/zhongnanhaibaobiao.jpg','playpage.html?mid=3',0),
(NULL,'速度与激情8','范迪塞尔激吻女反派','img/action-movie/suduyujiqing.jpg','playpage.html?mid=4',0),
(NULL,'复仇者联盟2：奥创纪元','复仇者联盟再续经典','img/action-movie/fuchouzhelianmeng.jpg','playpage.html?mid=5',0),
(NULL,'雷神2黑暗世界','锤与火之歌','img/action-movie/leishen2.jpg','playpage.html?mid=6',0),
(NULL,'王牌特工：特工学院','酷炫科林叔大战刀锋女','img/action-movie/wangpaitegong.jpg','playpage.html?mid=7',0),
(NULL,'西游伏妖篇','周星驰徐克强势联手','img/action-movie/xiyoufuyao.jpg','playpage.html?mid=8',0);

INSERT INTO xxy_playrecord VALUES
(1,1,1,'00:59:40',0);