package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.RecordDao;
import com.reader.core.model.Record;

@Repository("recordDAO")
public class RecordDaoImpl extends BaseDao implements RecordDao {

	public List<Record> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllRecord");
	}

	public Record selectById(String id) {
		return (Record) getSqlMapClientTemplate().queryForObject(
				"selectRecordById", id);
	}

	public void add(Record record) {
		getSqlMapClientTemplate().insert("insertRecord", record);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteRecord", id);

	}

	public void update(Record record) {
		getSqlMapClientTemplate().update("updateRecord", record);

	}

}
