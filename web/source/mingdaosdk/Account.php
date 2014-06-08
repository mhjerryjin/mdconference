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
		return json_decode($response, true);
	}

	function get_user_all(){
		$params = array();
		$params['access_token']=$this->oauth->access_token;
		$params['format']='json';
		$params['pagesize']=10000;
		$response = $this->oauth->oAuthRequest($this->oauth->host.'user/all', 'GET', $params);
		return json_decode($response, true);
	}
	
	function get_user_by_uid($uid){
		$params = array('u_id'=>$uid);
		$params['access_token']=$this->oauth->access_token;
		$params['format']='json';
		$response = $this->oauth->oAuthRequest($this->oauth->host.'user/detail', 'GET', $params);
		return json_decode($response, true);
	}
	
	function get_users_by_uids($uids){
		$params = array('u_ids'=>$uids);
		$params['access_token']=$this->oauth->access_token;
		$params['format']='json';
		$response = $this->oauth->oAuthRequest($this->oauth->host.'user/list', 'GET', $params);
		return json_decode($response, true);
	}
}

?>