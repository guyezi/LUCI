# OpenWrt luci feed

[![译文](https://hosted.weblate.org/widgets/openwrt/-/svg-badge.svg)](https://hosted.weblate.org/engage/openwrt/?utm_source=widget)

<br> [English](README.md) | [简体中文](README_ZH.md)

## 描述

这是包含luci - OpenWrt配置接口的OpenWrt “luci”提要

## 用法

feed 默认情况下处于启用状态. 你的 feeds.conf.default (或 feeds.conf) 应该包含一行:
```
src-git luci https://github.com/guyezi/luci.git
```

要定义安装其所有包, 运行:
```
./scripts/feeds update luci
./scripts/feeds install -a -p luci
```

## API 参考

您可以直接在Github上浏览生成的[API文档](http://htmlpreview.github.io/?http://raw.githubusercontent.com/guyezi/luci/master/documentation/api/index.html).

## 开发

开发和扩展LuCI的文档可以在 [Wiki](https://github.com/openwrt/luci/wiki) 中找到

## 授权

翻阅 [LICENSE](LICENSE) 文件.
 
## Package 指南

翻阅 [CONTRIBUTING.md](CONTRIBUTING.md) 文件.

## 翻译情况

[![翻译情况](https://hosted.weblate.org/widgets/openwrt/-/multi-auto.svg)](https://hosted.weblate.org/engage/openwrt/?utm_source=widget)
