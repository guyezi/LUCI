module("luci.controller.gyzddns",package.seeall)
function index()
if not nixio.fs.access("/etc/config/gyzddns")then
return
end
entry({"admin","ddns","gyzddns"},cbi("gyzddns/global"),_("gyzddns"),1).dependent=true
entry({"admin","ddns","gyzddns","config"},cbi("gyzddns/config")).leaf=true
entry({"admin","ddns","gyzddns","nslookup"},call("act_nslookup")).leaf=true
entry({"admin","ddns","gyzddns","curl"},call("act_curl")).leaf=true
end
function act_nslookup()
local e={}
e.index=luci.http.formvalue("index")
e.value=luci.sys.exec("nslookup %q localhost 2>&1|grep 'Address 1:'|tail -n1|cut -d' ' -f3"%luci.http.formvalue("domain"))
luci.http.prepare_content("application/json")
luci.http.write_json(e)
end
function act_curl()
local e={}
e.index=luci.http.formvalue("index")
e.value=luci.sys.exec("curl -s %q 2>&1"%luci.http.formvalue("url"))
luci.http.prepare_content("application/json")
luci.http.write_json(e)
end
