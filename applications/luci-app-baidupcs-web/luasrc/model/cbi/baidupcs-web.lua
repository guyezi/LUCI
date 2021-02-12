--[[

Copyright (C) 2020 KFERMercer <KFER.Mercer@gmail.com>
Copyright (C) 2020 [CTCGFW] Project OpenWRT

THIS IS FREE SOFTWARE, LICENSED UNDER GPLv3

]]--

m = Map("baidupcs-web")
m.title	= translate("BaiduPCS-Web")
m.description = translate("Based on BaiduPCS-Go,you can use Baidu cloud efficiently")

m:section(SimpleSection).template  = "baidupcs-web/baidupcs-web_status"

s = m:section(TypedSection, "baidupcs-web")
s.addremove = false
s.anonymous = true

enable = s:option(Flag, "enabled", translate("Enabled"))
enable.rmempty = false

o = s:option(Value, "port", translate("Web port"))
o.datatype = "port"
o.placeholder = "5299"
o.default = "5299"
o.rmempty = false

o = s:option(Value, "download_dir", translate("Download directory"))
o.placeholder = "/opt/baidupcsweb-download"
o.default = "/opt/baidupcsweb-download"
o.rmempty = false

o = s:option(Value, "max_download_rate", translate("Max download speed"))
o.placeholder = "0"

o = s:option(Value, "max_upload_rate", translate("Max upload speed"))
o.placeholder = "0"
o.description = translate("0 stands for unlimited, the unit is the transmission rate per second, and the suffix '/s' can be omitted, such as 2Mb/s, 2MB, 2m, 2MB")

o = s:option(Value, "max_download_load", translate("Max number of files to download at the same time"))
o.placeholder = "1"
o.description = translate("Don't be greedy, Beware of frozen account")

o = s:option(Value, "max_parallel", translate("Max number of concurrent connections"))
o.placeholder = "8"

return m
