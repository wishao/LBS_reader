package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.AdminDao;
import com.reader.core.model.Admin;

@Repository("adminDAO")
public class AdminDaoImpl extends BaseDao implements AdminDao {

	private Admin admin = null;

	public List<Admin> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllAdmin", null);
	}

	public Admin login(String name, String password) {
		admin.setName(name);
		admin.setPassword(password);
		return (Admin) getSqlMapClientTemplate().queryForObject("loginAdmin",
				admin);
	}

	public void add(Admin admin) {
		getSqlMapClientTemplate().insert("insertAdmin", admin);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteAdmin", id);

	}

	public void update(Admin admin) {
		getSqlMapClientTemplate().update("updateAdmin", admin);
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

}
