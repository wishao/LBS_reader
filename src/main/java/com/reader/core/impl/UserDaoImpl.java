package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.UserDao;
import com.reader.core.model.User;

@Repository("userDAO")
public class UserDaoImpl extends BaseDao implements UserDao {
	public User getById(String id) {
		return (User) getSqlMapClientTemplate().queryForObject(
				"selectUserById", id);
	}

	public List<User> selectAll(int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		return getSqlMapClientTemplate().queryForList("selectAllUser", param);
	}

	public int countAll() {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countAllUser");
	}

	public User login(String name, String password) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("name", name);
		param.put("password", password);
		return (User) getSqlMapClientTemplate().queryForObject("loginUser",
				param);
	}

	public void add(User user) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("name", user.getName());
		param.put("password", user.getPassword());
		param.put("address", user.getAddress());
		param.put("signature", user.getSignature());
		getSqlMapClientTemplate().insert("insertUser", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteUser", id);

	}

	public void update(User user) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", user.getId());
		param.put("name", user.getName());
		param.put("password", user.getPassword());
		param.put("address", user.getAddress());
		param.put("signature", user.getSignature());
		getSqlMapClientTemplate().update("updateUser", param);
	}

}
