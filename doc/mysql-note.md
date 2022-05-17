

### mysql 密码遗忘解决方法
* window下

1. 管理员打开 cmd 运行： `net stop mysql` 停止 mysql 服务
2. 执行 `mysqld --console --skip-grant-tables --shared-memory` 
3. 开启新的 cmd 窗口， 执行 `mysql -u root -p`
4. 执行`use mysql`， 进入 mysql 
5. 执行 `select user,host from user`  查看 user 表

