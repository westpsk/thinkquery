'use strict';

import Base from './base.js';

export default class extends Base {
	async indexAction(){
		let queryModel = this.model('query');
		let queryList = await queryModel.getQueryList(1);
		this.assign({
			queryList: queryList
		});
		return this.display('home');
	}
	async biuAction(){
		let queryModel = this.model('query');
		let type = this.get('type');
		let tpl = this.get('tpl');
		let num = this.get('num');
		if(num == null || num == ""){
			num = 50;
		}
		let queryList = await queryModel.getQueryBiu(type,tpl,num);
		return this.success({
			queryList
		})
	}
	async listAction(){
		let queryModel = this.model('query');
		let page = this.get('page');
		let queryList = await queryModel.getQueryList(page);
		this.assign({
			queryList: queryList
		});
		return this.display('list');
	}
	async queryAction(){
		let queryModel = this.model('query');
		let id = this.get('id');
		let querys = await queryModel.getQuerys(id);
		this.assign({
			querys: querys
		});
		return this.display('querys');
	}
	toJson(queryList){
		/* 1.从数据库中取，对ID进行过滤，然后转化为json格式的，格式形式如下：
			var queryJson = {"famous":
						{"famous_tpl1":{"id1":"query1", "id2":"query2"},
						"famous_tpl2":{"id3":"query3", "id4":"query4"}},
					"music":
						{"music_tpl1":{"id5":"query5", "id6":"query6"},
						"music_tpl2":{"id7":"query7", "id8":"query8"}}
					}; 
		*/
		var queryJson = {};
		for(var num in queryList){
			var qType = queryList[num].type,
				qTpl = queryList[num].tpl,
				qId = queryList[num].sub_tpl,
				query = '<a target=\'_blank\' href=\'/home/query/query/id/'+qId+'\'>显示所有query</a>';
			//如果json中已经有了指定type的key，则遍历该type类型下的所有模版
			//需要知道tpls的length和ids的length-> Object.keys(tpl_id_obj).length
			if(qType in queryJson){
				var tpl_id_obj = queryJson[qType];
				var len = Object.keys(tpl_id_obj).length;
				if(qTpl in tpl_id_obj){
					var id_query_obj = tpl_id_obj[qTpl];
					if(qId in id_query_obj){
						console.log(id_query_obj[qId]);
					}else{
						//json中没有id
						id_query_obj[qId] = query;
					}
				}else{
					//Json中没有tpl
					var id_tmp = {};
					id_tmp[qId] = query;
					tpl_id_obj[qTpl] = id_tmp;
				}
			}else{
				//json中没有type
				var id_tmp = {},
					tpl_tmp = {};
				id_tmp[qId] = query;
				tpl_tmp[qTpl] = id_tmp;
				queryJson[qType] = tpl_tmp;
			}
		}
		return queryJson;
	}
	async testAction(){
		let queryModel = this.model('onebox');
		let queryList = await queryModel.getQueryFenlei();
		var queryJson = this.toJson(queryList);
		this.assign({
			queryJson: queryJson
		});
		return this.display('test');
	}
	async searchAction(){
		let type = this.post('type');
		let tpl = this.post('tpl');
		let oneboxModel = this.model('onebox');
		if(type && tpl){
			let typeList = await oneboxModel.getTypeTpl(type,tpl);
			var queryJson = this.toJson(typeList);
		}else if(type){
			let typeList = await oneboxModel.getType(type);
			var queryJson = this.toJson(typeList);
		}else if(tpl){
			let typeList = await oneboxModel.getTpl(tpl);
			var queryJson = this.toJson(typeList);
		}else{
			var queryJson = {};
		}
		this.assign({
			queryJson: queryJson
		});
		return this.display('test');
	}
}