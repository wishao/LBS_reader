package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.ContactDao;
import com.reader.core.model.Contact;

@Repository("contactDAO")
public class ContactDaoImpl extends BaseDao implements ContactDao {
	public Contact getById(String id) {
		return (Contact) getSqlMapClientTemplate().queryForObject(
				"selectContactById", id);
	}

	public List<Contact> selectAll(int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		return getSqlMapClientTemplate()
				.queryForList("selectAllContact", param);
	}

	public int countAll() {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countAllContact");
	}

	public List<Contact> selectByUserId(String userId, int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		param.put("userId", userId);
		return getSqlMapClientTemplate().queryForList("selectContactByUser",
				param);
	}

	public int countContactByUser(String userId) {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countContactByUser", userId);
	}

	public void add(Contact contact) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("sendUserId", contact.getSendUser().getId());
		param.put("receiveUserId", contact.getReceiveUser().getId());
		param.put("content", contact.getContent());
		getSqlMapClientTemplate().insert("insertContact", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteContact", id);

	}

	public void update(Contact contact) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", contact.getId());
		param.put("sendUserId", contact.getSendUser().getId());
		param.put("receiveUserId", contact.getReceiveUser().getId());
		param.put("content", contact.getContent());
		getSqlMapClientTemplate().update("updateContact", param);

	}

}
