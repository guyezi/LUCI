module("luci.controller.tencentddns",package.seeall)
function index()
entry({"admin", "ddns"}, firstchild(), "腾讯云设置", 30).dependent=false
entry({"admin", "ddns", "tencentddns"},cbi("tencentddns"),_("TencentDDNS"),2)
end
