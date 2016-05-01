'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getQueryFenlei() {
    	return this.distinct('type,tpl,sub_tpl').select();
    }
    getType(type){
        return this.where({type: type}).select();
    }
    getTpl(tpl){
        return this.where({tpl: tpl}).select();
    }
    getTypeTpl(type,tpl){
        return this.where({type: type, tpl: tpl}).select();
    }
}
