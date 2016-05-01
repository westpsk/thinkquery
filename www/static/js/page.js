/* jQuery Plugin HaosouPager 
 * params:[currPage,totalPage,wrapPage,callback]
 * currPage 当前页
 * totalPage 总页码
 * wrapPage 当前页两侧展示页码的个数，默认1，
 * callback 点击页码的回调，参数为当前页码
 */
(function($) {
	/* Object.create兼容处理 */
	if (typeof Object.create !== 'function') {
		Object.create = function(obj) {
			function F() {}
			F.prototype = obj;
			return new F();
		};
	}
	var HaosouPager = {
		/* 初始化组件 */
		init : function(container,options){
			this.options = $.extend({},$.fn.haosouPager.defaults, options);
			this.$container = $(container); /* 当前容器对象转换存储为jquery对象 */
			if(this.options.totalPage > 1){
				this.createHtml(this.options.currPage,this.options.totalPage,this.options.wrapPage); /* 创建组件Html结构 */
				this.unbind(); /* 取消事件绑定，解决事件重复绑定 */
				this.bind(); /* 添加事件绑定 */
			}
		},
		/* 生成组件HTML结构
		 * 参数 currPage,totalPage,wrapPage
		 * currPage 当前页
		 * totalPage 总页码
		 * wrapPage 当前页两侧展示页码的个数
		 */
		createHtml : function(currPage,totalPage,wrapPage){
			var html = [];

			var startPage = currPage - wrapPage;
			var endPage   = currPage + wrapPage;

			// console.log("t:",totalPage,"e:",endPage,"s:",startPage,"c:",currPage,"w:",wrapPage);
			if (currPage > totalPage) {
				startPage = totalPage;
			}
			
			if(wrapPage==1){
				if (currPage <= wrapPage * 3) {
					endPage = 4 * wrapPage + 1;
				}
				if (totalPage - currPage <= wrapPage * 3) {
					startPage = totalPage - 4 * wrapPage;
				}
				if (startPage <= wrapPage*3) {
					startPage = 1;
				}
			}else{
				if (currPage <= wrapPage) {
					endPage = 2 * wrapPage + 1;
				}
				if (totalPage - currPage <= wrapPage) {
					startPage = totalPage - 2 * wrapPage;
				}
				if (startPage <= 2) {
					startPage = 1;
				}
			}
			if (endPage >= totalPage || totalPage - currPage <= 2) {
				endPage = totalPage;
			}
			
			// console.log("e:",endPage,"s:",startPage,"c:",currPage,"w:",wrapPage);
			html.push('<span class="g-page">');
			if(currPage == 1){
				html.push('<strong class="g-page-pre"><span class="g-icon g-icon-arr-left"></span></strong>')
			}
			if (currPage > 1) {
				html.push('<a href="javascript:void(0)" class="g-page-pre"><span class="g-icon g-icon-arr-left"></span></a>');
			}
			if (currPage + 1 >= 2 * wrapPage && totalPage > 2 * wrapPage && startPage != 1) {
				html.push('<a href="javascript:void(0)" data-page="1">1</a><strong>...</strong>');
			}
			for (var i = startPage; i <= endPage; i++) {
				if (i == currPage) {
					html.push('<strong>' + i + '</strong>');
				}else{
					html.push('<a href="javascript:void(0)" data-page="' + i + '">' + i + '</a>');
				}
			}
			if (totalPage - currPage > wrapPage && totalPage > 2 * wrapPage && totalPage != endPage) {
				if(totalPage - endPage == 1){
					html.push('<a href="javascript:void(0)" data-page="' + totalPage + '">' + totalPage + '</a>');
				}else{
					html.push('<strong>...</strong><a href="javascript:void(0)" data-page="' + totalPage + '">' + totalPage + '</a>');
				}
			}
			if (currPage < totalPage) {
				html.push('<a href="javascript:void(0)" class="g-page-nxt"><span class="g-icon g-icon-arr-right"></span></a>');
			}
			if (currPage == totalPage) {
				html.push('<strong class="g-page-nxt"><span class="g-icon g-icon-arr-right"></span></strong>');
			}
			html.push('</span>');

			return this.$container.empty().html(html.join(''));
		},
		/* 添加事件绑定
		 * 采用delegate方法将点击事件代理到容器
		 */
		bind: function(){
			var currPage  = this.options.currPage,
				totalPage = this.options.totalPage,
				wrapPage  = this.options.wrapPage,
				callback  = this.options.callback;
				
			var me = this,
				container = this.$container;

			container.delegate(".g-page-pre", "click.hsPager", function(e){
				e.preventDefault();
				if(currPage <= 1) return ;
				currPage --;
				me.createHtml(currPage,totalPage,wrapPage);
				callback(currPage);
			});
			container.delegate(".g-page-nxt", "click.hsPager", function(e) {
				e.preventDefault();
				if(currPage >= totalPage) return ;
				currPage++;
				me.createHtml(currPage,totalPage,wrapPage);
				callback(currPage);
			});
			container.delegate("a[data-page]", "click.hsPager", function(e) {
				e.preventDefault();
				currPage = parseInt($(this).attr('data-page'));
				me.createHtml(currPage,totalPage,wrapPage);
				callback(currPage);
			});
		},
		/* 取消事件绑定
		 * 采用undelegate方法将事件解绑
		 */
		unbind: function(){
			var container = this.$container;
			container.undelegate(".g-page-pre", "click.hsPager");
			container.undelegate(".g-page-nxt", "click.hsPager");
			container.undelegate("a[data-page]", "click.hsPager");
		}
	}
	$.fn.haosouPager = function(options) {
		return this.each(function() {
			var haosouPager = Object.create(HaosouPager).init(this,options);
			haosouPager;
		});
	};
	/* 组件默认配置 */
	$.fn.haosouPager.defaults = {
		currPage :1,
		totalPage:1,
		wrapPage :1,
		callback : function(){}
	};
})(jQuery);
