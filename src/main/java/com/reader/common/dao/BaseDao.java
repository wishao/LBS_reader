package com.reader.common.dao;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public abstract class BaseDao extends SqlMapClientDaoSupport {
	
	/**
	 * 获取对象
	 * 
	 * @param id 配置在xml中的语句ID
	 * @param paramObject 传递的参数
	 * @return
	 */
	protected Object getObject(String id, Object paramObject){
		
		Object result = null;
		try {
			result = getSqlMapClientTemplate().queryForObject(id, paramObject);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
