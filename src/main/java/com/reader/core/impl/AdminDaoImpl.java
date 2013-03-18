package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.AdminDao;
import com.reader.core.model.Admin;

@Repository("adminDAO")
public class AdminDaoImpl extends BaseDao implements AdminDao {
	public Admin getById(String id) {
		return (Admin) getSqlMapClientTemplate().queryForObject(
				"selectAdminById", id);
	}

	public List<Admin> selectAll(int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		return getSqlMapClientTemplate().queryForList("selectAllAdmin", param);
	}

	public int countAll() {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countAllAdmin");
	}

	public Admin login(String name, String password) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("name", name);
		param.put("password", password);
		return (Admin) getSqlMapClientTemplate().queryForObject("loginAdmin",
				param);
	}

	public void add(Admin admin) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("name", admin.getName());
		param.put("password", admin.getPassword());
		param.put("role", admin.getRole());
		getSqlMapClientTemplate().insert("insertAdmin", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteAdmin", id);

	}

	public void update(Admin admin) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", admin.getId());
		param.put("name", admin.getName());
		param.put("password", admin.getPassword());
		param.put("role", admin.getRole());
		getSqlMapClientTemplate().update("updateAdmin", param);
	}

}
