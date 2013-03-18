package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.TestDao;
import com.reader.core.model.Test;

@Repository("testDAO")
public class TestDaoImpl extends BaseDao implements TestDao {

	public List<Test> select() {

		return getSqlMapClientTemplate().queryForList("selectAllTest", null);
	}

}
