include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-adbyby-plus
PKG_VERSION:=1.0
PKG_RELEASE:=7
LUCI_TITLE:=LuCI support for Adbyby
LUCI_DEPENDS:=+wget +ipset +coreutils +coreutils-nohup +dnsmasq-full +ca-certificates
PKGARCH:=all

define Package/$(PKG_NAME)/description
	Luci Support for Adbyby.
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
[ -n "${IPKG_INSTROOT}" ] || {
	(. /etc/uci-defaults/luci-app-adbyby) && rm -f /etc/uci-defaults/luci-app-adbyby
	exit 0
}
endef

include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
