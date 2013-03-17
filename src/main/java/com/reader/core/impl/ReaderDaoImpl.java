package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.ReaderDao;
import com.reader.core.model.Reader;

@Repository("readerDAO")
public class ReaderDaoImpl extends BaseDao implements ReaderDao {

	public List<Reader> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllReader");
	}

	public Reader selectByUserId(String userId) {
		return (Reader) getSqlMapClientTemplate().queryForObject(
				"selectReaderByUser", userId);
	}

	public void add(Reader reader) {
		getSqlMapClientTemplate().insert("insertReader", reader);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteReader", id);

	}

	public void update(Reader reader) {
		getSqlMapClientTemplate().update("updateReader", reader);

	}

}
