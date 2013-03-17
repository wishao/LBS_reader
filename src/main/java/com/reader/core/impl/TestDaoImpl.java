package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.TestDao;
import com.reader.core.model.Test;

@Repository("testDAO")
public class TestDaoImpl extends BaseDao implements TestDao {

	public static void main(String[] args) {
		TestDao testDAOImpl = (TestDao) context.getBean("testDAO");

		List<Test> lt = testDAOImpl.select();
		for (Test t : lt) {
			System.out.println(t.getName());
		}

	}

	public List<Test> select() {

		return getSqlMapClientTemplate().queryForList("selectAllTest", null);
	}

}
