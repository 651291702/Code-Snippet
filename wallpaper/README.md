# 主页屏保 与 锁屏屏保 同步

### 脚本命令

**npm install**  安装依赖

**npm start** 或 **node main.js**  更新壁纸



#### 执行顺序

1. npm install 
2. 修改`main.js`中的变量`USERNAME`, 填入**用户名**
3. npm start
4. 设置 → 背景 → 幻灯片放映 → 选择 `npm文件中的images`



#### 关机时自动更新

1. 运行 → gpedit.msc

2. 用户配置  → Windows设置 → 脚本（登录/注销） → 注销

3. 添加 → 脚本名（选择脚本路径）→ 脚本参数（该npm文件的位置）

   如  脚本名：`C:\Users\username\Pictures\my_wallpaper\update_wallpaper.bat`

   ​     脚本参数：`C:\Users\username\Pictures\my_wallpaper`