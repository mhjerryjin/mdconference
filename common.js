var fs = require("fs");
var cfg = require("./config");
var logfile = cfg.config.logpath;

/*
 判断对象是否为空值、是否未定义等
 */
function IsNullOrEmpty(variable) {
	if (variable == null || undefined == variable || variable == "")
		return true;

	return false;
};

/*
 写入日志，自动在前面加入时间和末尾加入换行
 */
function WriteLog(stringLine) {
	fs.appendFile(logfile, new Date().toLocaleString() + '\t' + stringLine + "\r\n", function (err) {
		if (err)
			console.log(err);
	});
};

/*
 字符串替换
 originalStr :原字符串
 oldStr:待替换
 newStr:替换的字符串
 */
function Replace(originalStr, oldStr, newStr) {
	var reg = new RegExp(oldStr, 'g');
	return originalStr.replace(reg, newStr);
};

/*
 字符串替换，隐私信息
 originalStr :原字符串
 newStr:待替换
 */
function PartOfReplace(originalStr, newStr, begin, end) {
	var substr = originalStr.substring(begin, end);
	var rStr = "";
	for (var i = begin; i < end; i++) {
		rStr += newStr;
	}
	var str = Replace(originalStr, substr, rStr)
	return str;
};

/*
 判断数组是否包含指定值
 */
function ArrayContains(arr, value) {
	if (IsNullOrEmpty(arr))
		return false;
	if (IsNullOrEmpty(value))
		return false;

	arr.forEach(function (item) {
		if (item == value)
			return true;
	});

	return false;
};

function WriteMsg(res, req, reply, isjson, ok) {
	res.writeHead(200, { "Content-Type": "application/json" });
	if (ok) {
		if (IsNullOrEmpty(reply))
			res.write(JSON.stringify({ "MSG": "T" }));
		else if (isjson) {
			res.write(JSON.stringify(reply));
		}
		else
			res.write(reply);
	}
	else
		res.write(JSON.stringify({ "MSG": "F" }));

	res.end();
};

function Write(res, req, reply) {
	res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
	res.write(reply);
	res.end();
};

//跳转
function Redirect(res, req, uri) {
	res.writeHead(302, {
		'Location': uri,
		'content-type': 'text/html',
		'Cache-Control': 'no-cache'
	});
	res.end();
};

//获取时间戳
function Timestamp() {
	var timestamp = Math.round(new Date().getTime() / 1000).toString();
	return timestamp;
};

//获取时间点
function Time() {
	var date = new Date();
	var str = date.getFullYear().toString();
	str += (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString();
	str += date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString();
	str += date.getHours() > 9 ? date.getHours().toString() : "0" + date.getHours().toString();
	str += date.getMinutes() > 9 ? date.getMinutes().toString() : "0" + date.getMinutes().toString();
	str += date.getSeconds() > 9 ? date.getSeconds().toString() : "0" + date.getSeconds().toString();

	return str
};

function IsInt(value) {
	var regex = /^\+?[1-9][0-9]*$/;
	return regex.test(value);
};

//返回随机数
function RandomNumbers(number) {
	var str = "";
	for (var i = 0; i < number; i++) {
		str += Math.floor(Math.random() * 10);
	}

	return str;
};

exports.Replace = Replace;
exports.PartOfReplace = PartOfReplace;
exports.ArrayContains = ArrayContains;
exports.IsNullOrEmpty = IsNullOrEmpty;
exports.Log = WriteLog;
exports.Write = WriteMsg;
exports.WriteHtml = Write;
exports.Redirect = Redirect;
exports.Timestamp = Timestamp;
exports.Time = Time;
exports.Validateint = IsInt;
exports.GetRandom = RandomNumbers;

//console.log(this.Time());