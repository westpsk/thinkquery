'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getQueryList(currentPage) {
        return this.getQueryListByPage(currentPage, 10);
    }
    getQueryListByPage(currentPage, everyPage) {
        return this.page(currentPage, everyPage).select();
    }
    getQueryTest(type) {
    	return this.distinct(type).select();
    }
    getQueryBiu(type,tpl,num) {
        return this.limit(num).where({type: type, tpl:tpl}).order("update_time DESC").select();
    }
    getQuerys(id){
        //查询query
        return this.limit(200).where({sub_tpl: id}).order("update_time DESC").select();
    }
    getQueryFenlei() {
    	// select distinct sub_tpl,tpl,type from think_query;
    	return this.distinct('type,tpl,sub_tpl').select();
    }
}
