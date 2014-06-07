<?php

class Account{

	public $oauth;
	function __construct($oauth)
	{
		$this->oauth = $oauth;
	}
	
	function get_user_baseinfo(){
		$params = array();
		$params['access_token']=$this->oauth->access_token;
		$params['format']='json';
		$response = $this->oauth->oAuthRequest($this->oauth->host.'passport/detail', 'GET', $params);
		return $response;
	}
}

?>