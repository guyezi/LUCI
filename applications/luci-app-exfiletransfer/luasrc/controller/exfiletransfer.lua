module("luci.controller.exfiletransfer", package.seeall)

function index()
	entry({"admin", "NAS", "exfiletransfer"}, form("exupdownload"), _("EXFileTransfer"), 89)
end
