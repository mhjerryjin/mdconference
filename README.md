#语音会议插件

## 模块安装
```bash
npm install
```

##方法说明

请求基本路径：http://172.16.21.101
路径区分大小写

* 状态码
    0 == 失败
    1 == 成功

* 获取子账号，返回子账号信息
    1. 请求方式 post
    2. 请求路径 /getUser
    3. POST内容 json，{id:"用户唯一编号", appid:"不同应用编号"}，不同应用编号主要是为了考虑到不同社交账号的登陆支持，存储会将两者都作为key存储
    4. 返回内容 json，{status:"状态码",user:{"id":"子账号编号","token":"子账号令牌","voip":"VPIP编号","voipPwd":"VOIP密码"}}

* 获取会议信息
    1. 请求方式 post
    2. 请求路径 /getConf
    3. POST内容 json，{id:"云通讯会议编号"}
    4. 返回内容 json，{status:"状态码",id:"会议编号",uid:"创建用户编号",appid:"不同应用编号",vid:"voip会议编号",name:"会议名称",time:"会议开始时间",pwd:"会议密码",ctime:"会议创建时间"}

* 获取某个用户创建的所有会议信息
    1. 请求方式 post
    2. 请求路径 /getUserConfs
    3. POST内容 json，{id:"用户唯一编号",appid:"不同应用编号"}
    4. 返回内容 json，{status:"状态码",confs:[{id:"会议编号",uid:"创建用户编号",appid:"不同应用编号",vid:"voip会议编号",name:"会议名称",time:"会议开始时间",ctime:"会议创建时间}...{}]}

* 获取会议当前状态，并且返回当前所有用户
    1. 请求方式 post
    2. 请求路径 /getConfUsers
    3. POST内容 json，{id:"云通讯会议编号"}
    4. 返回内容 json，{status:"状态码",id:"会议编号",users:[{callid:"云通讯发放的通话编号，只有state为1、2的时候才有",id:"邀请用户编号",number:"电话号码",name:"用户姓名",state:"状态值 0表示未接入;1表示已经拨入;2表示被主持人踢出会议或者主动断掉会议"}...{}]}

* 创建会议
    1. 请求方式 post
    2. 请求路径 /createConf
    3. POST内容 json，{id:"用户唯一编号",appid:"不同应用编号", name:"会议名称", time:"会议开始时间，为空代表马上开始会议，如果不为空则代表预约会议", pwd:"会议密码，可以为空字符串或者没有这个节点，为空字符串或者没有这个节点表示加入会议不需要密码"}
    4. 返回内容 json，{status:"状态码",id:"会议编号",vid:"voip会议编号"}

* 停止会议
    1. 请求方式 post
    2. 请求路径 /stopConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", }
    4. 返回内容 json，{status:"状态码"}

* 加入会议，将人加入会议当中去，并不拨出
    1. 请求方式 post
    2. 请求路径 /joinConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", users:[{id:"邀请用户编号",number:"电话号码",name:"用户姓名"}...{}]}
    4. 返回内容 json，{status:"状态码"}

* 邀请加入会议，如果包含手机号码则直接拨打
    1. 请求方式 post
    2. 请求路径 /inviteConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", users:[{id:"邀请用户编号",number:"电话号码",name:"用户姓名"}...{}]}
    4. 返回内容 json，{status:"状态码"}

* 通知会议所有加入方为手机的并发起会议呼叫
    1. 请求方式 post
    2. 请求路径 /callAllConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", }
    4. 返回内容 json，{status:"状态码"}

* 批量退出会议
    1. 请求方式 post
    2. 请求路径 /quitConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", users:[{callid:"云通讯发放的通话编号"}...{}]}
    4. 返回内容 json，{status:"状态码"}

* 批量静音
    1. 请求方式 post
    2. 请求路径 /muteConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", users:[{callid:"云通讯发放的通话编号"}...{}]}
    4. 返回内容 json，{status:"状态码"}

* 批量取消静音
    1. 请求方式 post
    2. 请求路径 /unmuteConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", users:[{callid:"云通讯发放的通话编号"}...{}]}
    4. 返回内容 json，{status:"状态码"}

* 设置会议密码
    1. 请求方式 post
    2. 请求路径 /pwdConf
    3. POST内容 json，{id:"云通讯会议编号", uid:"操作用户编号", appid:"不同应用编号", pwd:"会议密码，为空代表不需要密码，都可以加入"}
    4. 返回内容 json，{status:"状态码"}

* callid 说明
    callid 是云通讯的为每路呼叫建立的编号，是在某个会议里面的唯一编号，踢人、静音等用户级别的会控操作必须参数

##其他

* 发送会议提醒短信
    1. 请求方式 post
    2. 请求路径 /sendNotice
    3. POST内容 json，{mps:"手机号码，用英文逗号分隔"}
    4. 返回内容 json，{status:"状态码"}







