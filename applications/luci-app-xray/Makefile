include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-xray
PKG_VERSION:=8fc2d3b61fce1d7393910fe08873daef31e139e0
PKG_RELEASE:=6

PKG_LICENSE:=MPLv2
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=yichya <mail@yichya.dev>

include $(INCLUDE_DIR)/package.mk

LUCI_TITLE:=LuCI Support for Xray
LUCI_DEPENDS:=+xray +iptables +iptables-mod-tproxy +ca-bundle

define Package/$(PKG_NAME)/description
	LuCI Support for Xray (Client-side Rendered).
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
if [[ -z "$${IPKG_INSTROOT}" ]]; then
	if [[ -f /etc/uci-defaults/xray ]]; then
		( . /etc/uci-defaults/xray ) && rm -f /etc/uci-defaults/xray
	fi
	rm -rf /tmp/luci-indexcache /tmp/luci-modulecache
fi
exit 0
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/xray
endef

include ../../luci.mk
#$(eval $(call BuildPackage,$(PKG_NAME)))
