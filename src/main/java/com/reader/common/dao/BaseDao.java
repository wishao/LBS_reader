package com.reader.common.dao;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public abstract class BaseDao extends SqlMapClientDaoSupport {

	/**
	 * ��ȡ����
	 * 
	 * @param id
	 *            ������xml�е����ID
	 * @param paramObject
	 *            ���ݵĲ���
	 * @return
	 */
	protected Object getObject(String id, Object paramObject) {

		Object result = null;
		try {
			result = getSqlMapClientTemplate().queryForObject(id, paramObject);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	/*public static ApplicationContext context = new ClassPathXmlApplicationContext(
			"resources/../spring.xml");*/
}
