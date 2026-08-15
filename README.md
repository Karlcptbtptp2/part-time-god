# part-time-god（兼职上帝）

> 对话的同时也兼职作为上帝，创造一个你自己的世界。

这是一个 **DeepSeek Harness（DSH）插件**：你正常用 harness 做任何事时，插件会把你发的每一句话当作一串“密码”，打乱成乱码后交给当前默认模型“破译”成一条**友善、合理**的世界改动（比如“村民学会了烤面包”“一只温和的小怪兽搬来同住”），并把它种进一个俯视像素小镇里。世界以桌面宠物的形式缩略成一个旋转的像素地球，新事件以气泡弹出，点击地球展开完整世界。

## 安装（给使用者的说明）

1. 安装本包到你的 web profile：

   ```sh
   dsh plugin --profile web add part-time-god
   ```

2. 在你的宿主组合（`$DSH_HOME/cordis.patch.yml` 或对应 profile 的组合文件）里加一行：

   ```yaml
   - id: part-time-god
     name: part-time-god
   ```

3. 启动 harness（`dsh web`）即可。

> 注意：插件调用的是**使用者自己的默认模型**，每条消息会额外触发一次小规模模型调用，消耗使用者自己的模型额度。

## 目录结构

```
package.json          # name / main / exports["./client"] / dsh.client 清单
lib/index.js          # 宿主半边：监听消息、LLM 破译、落盘、webServer 路由
lib/client.js         # 浏览器半边：世界渲染、NPC 模拟、地球宠物（__ModuleLoader__ bundle）
```

## 发布（作者用）

```sh
npm login                     # 登录（默认用 npmjs 官方源）
npm publish --access public   # 首次发布
npm version patch             # 之后发新版本
npm publish
```

发布前确认 registry 指向官方源：

```sh
npm config set registry https://registry.npmjs.org/
```

## 数据落盘位置

每个会话的世界状态写到该会话工作区的 `.gameworlds/gameworld-<sessionId>.json`，刷新/重启不丢。
