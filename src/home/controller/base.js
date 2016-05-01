'use strict';
// import uuap from 'uuap'
// import moment from 'moment'
export default class extends think.controller.base {
  /**
   * some base method in here
   */
  /**
   * [checkAuthor 检查登录访问用户是否有权限，如第一次访问记录其信息]
   * @return {[type]} [description]
   */
  /*async checkAuthor(){
  	let userInfo = await uuap.getUserInfo(this.http.req, this.http.res);
  	let result = await this.model("USER").where({userName: userInfo.userName}).select();

  	if(think.isEmpty(result)){
  		await this.model("USER").add({
  			userName: userInfo.userName,
  			displayName: userInfo.displayName,
  			userMail: userInfo.userMail,
  			loginTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  			allowable: false
  		});

  		return false;
  	}

  	if(result[0].allowable === "true"){
  		return true;
  	}else{
  		return false;
  	}
  }*/

  async checkIP(){
    let _this = this;
    // 公司内外均可访问，IP以10.****
    let allowIp = '10.',
        ip = _this.ip();

    console.log(`ip:`+ip);
   /* ip = '10.19';
    console.log(allowIp == ip.substr(0, 3));*/
    if( ip == '127.0.0.1' || ip == '180.153.227.164' || (allowIp == ip.substr(0, 3))){
      console.log('allowed ip');
      return true;
    }else{
      console.log('not allowed ip');
      return false;
    }
  }

  async __before(){
  	let isAllowed = await this.checkIP();

  	if(!isAllowed){
  		this.display("tips.html");
  	}
  }

}
