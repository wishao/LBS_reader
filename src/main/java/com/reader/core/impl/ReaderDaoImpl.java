package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
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
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("userId", reader.getUser().getId());
		param.put("font", reader.getFont());
		param.put("backgroundColor", reader.getBackgroundColor());
		param.put("fontColor", reader.getFontColor());
		getSqlMapClientTemplate().insert("insertReader", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteReader", id);

	}

	public void update(Reader reader) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", reader.getId());
		param.put("userId", reader.getUser().getId());
		param.put("font", reader.getFont());
		param.put("backgroundColor", reader.getBackgroundColor());
		param.put("fontColor", reader.getFontColor());
		getSqlMapClientTemplate().update("updateReader", param);

	}

}
