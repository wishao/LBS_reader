package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.UserDao;
import com.reader.core.model.User;

@Repository("userDAO")
public class UserDaoImpl extends BaseDao implements UserDao {

	private User user = null;

	public List<User> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllUser", null);
	}

	public User login(String name, String password) {
		user.setName(name);
		user.setPassword(password);
		return (User) getSqlMapClientTemplate().queryForObject("loginUser",
				user);
	}

	public void add(User user) {
		getSqlMapClientTemplate().insert("insertUser", user);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteUser", id);

	}

	public void update(User user) {
		getSqlMapClientTemplate().update("updateUser", user);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
