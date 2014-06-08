<?php
define('WEB_ROOT', 'D:/Solution/Hackthon/mdconference/web/');

function printarr($arr){
	echo '<pre>';
	print_r($arr);
	echo '</pre>';
}
function strexists($string, $find) {
	return !(strpos($string, $find) === FALSE);
}

function template($file, $templateid = 0, $tpldir = 'template') {

	$tplfile = $tpldir.'/'.$file.'.htm';//模板源文件，此处$tplfile变量的值可能是D:\discuz\templates\default\demo.htm
	$objfile='';
	$cachefile='';
	if(strexists($file,'/')){
		$arr=explode('/', $file);
		$filename='';
		$len=count($arr);
		for($i=0;$i<$len;$i++){
			if($i==($len-1))
				break;
			$s=$arr[$i];
			$filename.=$s.'/';
		}
		$objfile=WEB_ROOT.'data/template/'.$filename.$templateid.'_'.$arr[$len-1].'.tpl.php';
		$cachefile='data/template/'.$filename.$templateid.'_'.$arr[$len-1].'.tpl.php';
	}else{
		$objfile = WEB_ROOT.'data/template/'.$templateid.'_'.$file.'.tpl.php';//模板缓存文件，此处$objfile变量的值可能是D:\discuz\forumdata\templates\1_demo.tpl.php
		$cachefile='data/template/'.$templateid.'_'.$file.'.tpl.php';
	}
	
	require_once WEB_ROOT.'source/class_template.php';
	$template = new template();
	$template->parse_template($tplfile, $templateid, $tpldir,$file,$cachefile);
	//如果模板源文件的修改时间迟于模板缓存文件的修改时间，
	//就是模板源文件被修改而模板缓存没有更新的时候，
	//则调用parse_template函数重新生成模板缓存文件
	/*。
	if(@filemtime($tplfile) > @filemtime($objfile)) {
		require_once WEB_ROOT.'source/class_template.php';
		$template = new template();
		$template->parse_template($tplfile, $templateid, $tpldir,$file,$objfile);
	}
	*/

	//返回缓存文件名称
	//$objfile变量内容可能为D:\discuz\forumdata\templates\1_demo.tpl.php
	return $objfile;
}
