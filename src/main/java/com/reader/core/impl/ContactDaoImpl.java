package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.ContactDao;
import com.reader.core.model.Contact;

@Repository("contactDAO")
public class ContactDaoImpl extends BaseDao implements ContactDao {

	public List<Contact> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllContact");
	}

	public Contact selectByUserId(String userId) {
		return (Contact) getSqlMapClientTemplate().queryForObject(
				"selectContactByUser", userId);
	}

	public void add(Contact contact) {
		getSqlMapClientTemplate().insert("insertContact", contact);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteContact", id);

	}

	public void update(Contact contact) {
		getSqlMapClientTemplate().update("updateContact", contact);

	}

}
