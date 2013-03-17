package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
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
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("userId", record.getUser().getId());
		param.put("bookId", record.getBook().getId());
		param.put("record", record.getRecord());
		param.put("evaluation", record.getEvaluation());
		param.put("score", record.getScore());
		param.put("share", record.getShare());
		getSqlMapClientTemplate().insert("insertRecord", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteRecord", id);

	}

	public void update(Record record) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", record.getId());
		param.put("userId", record.getUser().getId());
		param.put("bookId", record.getBook().getId());
		param.put("record", record.getRecord());
		param.put("evaluation", record.getEvaluation());
		param.put("score", record.getScore());
		param.put("share", record.getShare());
		getSqlMapClientTemplate().update("updateRecord", param);

	}

}
