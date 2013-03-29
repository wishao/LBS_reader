/**
 * 
 * 2011/07/18
 */
Ext.namespace('IsmpHB','IsmpHB.common');

(function(){
	IsmpHB.common.setSession = function(name,obj){
	var wn = null;
	try{
		wn = Ext.decode(window.name);
	}catch(ex){
		if(!wn){
			wn = {};
		}
	}
	wn[name] = obj;
	try {
        window.name = Ext.encode(wn);
    } 
    catch (ex) {
        return null;
    }
    return obj;
};

IsmpHB.common.getSession = function(name){
    var o = null;
    try {
        o = Ext.decode(window.name);
    } 
    catch (ex) {
        return null;
    }
    return o[name];
};
        
IsmpHB.common.clearSession = function(name){
    var o = null;
    try {
         o = Ext.decode(window.name);
    } 
    catch (ex) {
        return null;
    }
    var tmp = o[name];
    delete o[name];
    window.name = Ext.encode(o);
    return tmp;
};
Date.prototype.formatmat = function (formatmat) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(formatmat)) {
            formatmat = formatmat.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatmat)) {
                formatmat = formatmat.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return formatmat;
}

/**  
    *转换日期对象为日期字符串  
    * @param date 日期对象  
    * @param isFull 是否为完整的日期数据,  
    *               为true时, 格式如"2000-03-05 01:05:04"  
    *               为false时, 格式如 "2000-03-05"  
    * @return 符合要求的日期字符串  
    */  
IsmpHB.common.getSmpFormatDate=function(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return IsmpHB.common.getFormatDate(date, pattern);
    }
    /**  
    *转换当前日期对象为日期字符串  
    * @param date 日期对象  
    * @param isFull 是否为完整的日期数据,  
    *               为true时, 格式如"2000-03-05 01:05:04"  
    *               为false时, 格式如 "2000-03-05"  
    * @return 符合要求的日期字符串  
    */  

IsmpHB.common.getSmpFormatNowDate=function(isFull) {
        return IsmpHB.common.getSmpFormatDate(new Date(), isFull);
    }
    
    /**  
    *转换long值为日期字符串  
    * @param l long值  
    * @param isFull 是否为完整的日期数据,  
    *               为true时, 格式如"2000-03-05 01:05:04"  
    *               为false时, 格式如 "2000-03-05"  
    * @return 符合要求的日期字符串  
    */  
IsmpHB.common.getSmpFormatDateByLong=function(l, isFull) {
        return IsmpHB.common.getSmpFormatDate(new Date(l), isFull);
    }
    
    /**  
    *转换long值为日期字符串  
    * @param l long值  
    * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss  
    * @return 符合要求的日期字符串  
    */  
IsmpHB.common.getFormatDateByLong=function(l, pattern) {
        return IsmpHB.common.getFormatDate(new Date(l), pattern);
    }
    
    /**  
    *转换日期对象为日期字符串  
    * @param l long值  
    * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss  
    * @return 符合要求的日期字符串  
    */  
IsmpHB.common.getFormatDate=function(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.formatmat(pattern);
    }

IsmpHB.common.getPermission = function(name){
	if(IsmpHB.common.getSession("loginInfo")){
		var obj = IsmpHB.common.getSession("loginInfo").permission;
		if(obj)
			if(obj[name]) 
				return obj[name];
	}
	return 0;
	
}
/**
 * 
 * @param {Object} a 总权限值
 * @param {Object} b 权限值
 * @return {TypeName} 
 */
IsmpHB.common.isHasPermission = function(a,b){
	var i = Math.pow(2,b);
	return i == (i&a);
};
	
})();

IsmpHB.common.permission=[9,16];


/**
 * javascript 动态加载
 */
(function(){

    var Loader = Ext.extend(Ext.util.Observable, {
    
        LOADING: 1,
        LOADED: 2,
        
        constructor: function(){
        
            this.jsPathCache = {};
            
            this.addEvents({
                startLoad: true,
                loaded: true,
                startInclude: true,
                included: true
            });
            
            Loader.superclass.constructor.apply(this, arguments);
        },
        
        /**
         * 加载 javascript 文件
         * @param {String} js 文件路径
         * @param {Function} cb 回调函数
         * @param {Object} scope 回调函数中的 this 指向
         */
        load: function(js, cb, scope){
        
            this.fireEvent('startLoaded', js);
            //开始加载
            Ext.Ajax.request({
                url: "http://localhost:8080/admin/" + js ,
                method: 'GET',
                scope: this,
                callback: function(o, s, r){
                    if (s) {
                        eval(r.responseText);            
                        if (typeof cb == 'function') 
                            cb.call(scope || this, js);
                        this.fireEvent('loaded', js);
                    }
                }
            });
        },
        
        include: function(js, cb, scope){
        
            this.fireEvent('startInclude', js);
            
            if (this.jsPathCache[js]) {
                if (typeof cb == 'function') 
                    cb.call(scope || this, js);
                this.fireEvent('included', js);
                return;
            }
            
            Ext.Ajax.request({
                url: "http://localhost:8080/admin/" + js,
                method: 'GET',
                scope: this,
                callback: function(o, s, r){
                    if (s) {
                        this.jsPathCache[js] = this.LOADED;
                        eval(r.responseText);
                        if (typeof cb == 'function') 
                            cb.call(scope || this, js);
                        this.fireEvent('included', js);
                    }
                    else {
                        delete this.jsPathCache[js];
                    }
                }
            });
            
            this.jsPathCache[js] = this.LOADING;
            
        }
    });
    
    IsmpHB.common.ScriptLoader = new Loader();
    
})();
