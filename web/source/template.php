<?php
include_once ('./config/config.php');

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
		$cachefile='data/template/'.$filename.$templateid.'_'.$arr[$len-1].'.tpl.php';
	}else{
		$cachefile='data/template/'.$templateid.'_'.$file.'.tpl.php';
	}
	$objfile=WEB_ROOT.$cachefile;
	
	if(!file_exists(WEB_ROOT.$cachefile)||filemtime(WEB_ROOT.$tplfile)>filemtime($objfile))
	{
		require_once WEB_ROOT.'source/class_template.php';
		$template = new template();
		$template->parse_template($tplfile, $templateid, $tpldir,$file,$cachefile);
	}
	
	return $objfile;
}
