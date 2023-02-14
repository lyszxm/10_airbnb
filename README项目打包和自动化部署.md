# 项目打包和自动化部署

线上版本

<https://juejin.cn/post/7074119398704807944#heading-0>

<https://blog.csdn.net/daddykei/article/details/121132176>

<https://juejin.cn/post/6844903870313791501#heading-1>

## 一. 项目部署和DevOps

### 1.1. 传统的开发模式

在传统的开发模式中，开发的整个过程是按部就班就行：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ebfc063b36a415db513fe6a9fc74793~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="早期的开发模式" style="zoom:67%;" />

但是这种模式存在很大的弊端：

* 工作的不协调：开发人员在开发阶段，测试和运维人员其实是处于等待的状态。等到测试阶段，开发人员等待测试反馈bug，也会处于等待状态。
* 线上bug的隐患：项目准备交付时，突然出现了bug，所有人员需要加班、等待问题的处理；

### 1.2. DevOps开发模式

DevOps是Development和Operations两个词的结合，将开发和运维结合起来的模式：

![打开格局](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3af010f5cfa4bd983affc71291f7382~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt33f78kdj60fk0fkgmc02.jpg" alt="DevOps模式" style="zoom:67%;" />

### 1.3. 持续集成和持续交付

伴随着DevOps一起出现的两个词就是持续集成和持续交付(部署)：

* CI是Continuous Integration（持续集成）；
* CD是两种翻译：Continuous Delivery（持续交付）或Continuous Deployment（持续部署）；

持续集成CI：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3971bc00b4444febac9b885750e69dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="持续集成" style="zoom:67%;" />

持续交付和持续部署：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/797e25b4776244edb9a99b9844d286ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="持续交付" style="zoom:67%;" />

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56af98ec2f2b457cbd098e434ca68d18~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="持续部署" style="zoom:67%;" />

### 1.4. 自动化部署流程

![自动化部署的流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e606654d455146b5b050eead86d032ab~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 二. 购买云服务器

### 2.1. 注册阿里云的账号

云服务器我们可以有很多的选择：阿里云、腾讯云、华为云。

* 目前在公司使用比较多的是阿里云；
* 我自己之前也一直使用阿里云，也在使用腾讯云；
* 之前华为云也有找我帮忙推广他们的活动；

但是在我们的课程中，我选择目前使用更加广泛的阿里云来讲解：

我们需要注册阿里云账号

* https://aliyun.com/

* 注册即可，非常简单

### 2.2. 购买云服务器

购买云服务器其实是购买一个实例。

1.来到控制台：

![image-20201204152032769](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0bda14b3a146979854ac53689c2448~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

2.创建实例，选择类型和配置

![image-20201204152133800](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ef77649cca74203a73c79ef5120c007~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![image-20201203103047329](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf5de17d0c9f484aabe092194a160b99~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

3.配置网络安全组

![image-20201203103725892](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/915b6d749fc54bc7a997f694548e59f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

4.创建实例

![image-20201203104249296](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8e1ecd1c0904ea3b07ef88381671779~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 三. 搭建服务器环境

### 3.1. jenkins自动化部署

#### 3.1.1. 安装Java环境

Jenkins本身是依赖Java的，所以我们需要先安装Java环境：

* 这里我安装了Java1.8的环境

```shell
dnf search java-1.8

dnf install java-1.8.0-openjdk.x86_64
建议用最新的这个---》dnf install java-17-openjdk
```

#### 3.1.2. 安装Jenkins

因为Jenkins本身是没有在dnf的软件仓库包中的，所以我们需要连接Jenkins仓库：

* wget是Linux中下载文件的一个工具，-O表示输出到某个文件夹并且命名为什么文件；
* rpm：全称为**The RPM Package Manage**，是Linux下一个软件包管理器；

```shell
wget –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo

# 导入GPG密钥以确保您的软件合法（一个服务器搞一次就行了）
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
# 或者
rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
```

编辑一下文件/etc/yum.repos.d/jenkins.repo

* 可以通过vim编辑

```bash
[jenkins]

name=Jenkins-stable

baseurl=http://pkg.jenkins.io/redhat

gpgcheck=1
```

安装Jenkins

```shell
dnf install jenkins # --nogpgcheck(可以不加)
```

启动Jenkins的服务：

```shell
systemctl start jenkins
systemctl status jenkins   ##查看状态
systemctl enable jenkins
```

Jenkins默认使用8080端口提供服务，所以需要加入到安全组中：

![image-20201204173117359](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2c23f06e6b14427878a3eecf74e2acf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 3.1.3. Jenkins用户

我们后面会访问centos中的某些文件夹，默认Jenkins使用的用户是 `jenkins`，可能会没有访问权限，所以我们需要修改一下它的用户：

修改文件的路径：`/etc/sysconfig/jenkins`

![image-20210825162827962](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cee206ea69614a258a3ee67ab89cd216~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

之后需要重启一下Jenkins：

```shell
# 也可以将Jenkins添加到root组中
sudo usermod -a -G root jenkins

# 也可以给Jenkins目录权限
chown -R jenkins  /xxx/xxx 

systemctl restart jenkins
```

#### 3.1.4. 服务器需要安装git

```shell
dnf install git
```

#### 3.1.4. Jenkins配置

打开浏览器，输入：<http://8.134.60.235:8080/>

* 注意：你输入自己的IP地址

获取输入管理员密码：

* 在下面的地址中 `cat /var/lib/jenkins/secrets/initialAdminPassword`

![image-20201203173047824](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3706884cafdb426fb420d45b0524243f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

可以安装推荐的插件：

![安装推荐的插件](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd4f88d32e33472db8b36f55bb8c9af7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 3.1.5. Jenkins任务

**新建任务：**

![新建任务](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a62abbe5c110456abac891ac07920f6a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![image-20201204185613061](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/420d5bea82854753a164d7688faddea0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**配置项目和保留策略：**

![image-20210825160744119](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35cf69eda40f48e2aa5a805b01e85641~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**源码管理：**

![image-20210825160818122](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af36f815636b4f4ab380fc031a3c3eb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**构建触发器：**

这里的触发器规则是这样的：

* 定时字符串从左往右分别是：分 时 日 月 周

```js
#每半小时构建一次OR每半小时检查一次远程代码分支，有更新则构建
H/30 * * * *

#每两小时构建一次OR每两小时检查一次远程代码分支，有更新则构建
H H/2 * * *

#每天凌晨两点定时构建
H 2 * * *

#每月15号执行构建
H H 15 * *

#工作日，上午9点整执行
H 9 * * 1-5

#每周1,3,5，从8:30开始，截止19:30，每4小时30分构建一次
H/30 8-20/4 * * 1,3,5
```

![触发器](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f47bf74c41b4c4b980708e48d2c422d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**构建环境：**

注意：我们需要搭建Node的环境

* 第一步：配置Node的环境；
* 第二步：安装Node的插件；

![image-20201204190055096](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3c6d86cd9b04f459f77ba6ac6d08d81~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

第一步：配置Node的环境

![node环境](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbf3ffd497904a33856555264c78d4f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

第二步：安装Node的插件

* 这里因为我已经安装过了，所以没有搜索到；

![image-20201204185949452](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45787a82bc0148c2b6587e7124c090a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

构建执行的任务：

* 查看Node的版本等是否有问题；
* 执行 `npm install` 安装项目的依赖；
* 移除原来mall_cms文件的所有内容；
* 将打包的dist文件夹内容移动到mall_cms文件夹；

```shell
pwd
node -v
npm -v

npm install 
npm run build

pwd

echo '构建成功'

ls

# 删除/root/mall_cms文件夹里所有的内容
rm -rf /root/mall_cms/* 

cp -rf ./dist/* /root/mall_cms/
```

![执行构建任务](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5874cd4f998d47d88e51aacc804ef074~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 3.2. nginx安装和配置

#### 3.2.1. 安装nginx

后续我们部署会使用nginx，所以需要先安装一下nginx：

```shell
dnf install nginx
```

启动nginx：

```shell
systemctl start nginx
systemctl status nginx
systemctl enable nginx
```

#### 3.2.2. 配置nginx

nginx配置文件所在目录

```shell
/etc/nginx/nginx.conf
```

我们这里主要配置nginx的用户和默认访问目录：

配置用户：

![image-20210825163329209](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/125005af40b144d39318ff1465095a1d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

通过Linux命令创建文件夹和文件：

```shell
mkdir /root/mall_cms
cd /root/mall_cms
touch index.html

vi index.html
```

配置访问目录：

![image-20210825163406566](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a05881c3cffb4545bc0bc17901fd0c79~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
