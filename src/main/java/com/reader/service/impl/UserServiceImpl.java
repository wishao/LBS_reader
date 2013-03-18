package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.common.util.Constant;
import com.reader.core.dao.UserDao;
import com.reader.core.model.Admin;
import com.reader.core.model.User;
import com.reader.service.dao.UserService;

@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {
	private static UserDao userDao = (UserDao) context.getBean("userDAO");

	public User loginUser(String name, String password) {
		User user = userDao.login(name, password);
		return user;
	}

	public Map<String, Object> selectNewUser(int start, int limit) {
		int count = userDao.countAll();
		List<User> userList = userDao.selectAll(start, limit);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("count", count);
		result.put("userList", userList);
		return result;
	}

	public boolean addUser(User user) {
		if (userDao.getByName(user.getName()) == null) {
			userDao.add(user);
			return true;
		} else {
			return false;
		}
	}

	public boolean deleteUser(String id) {
		if (userDao.getById(id) == null) {
			return false;
		} else {
			userDao.delete(id);
			return true;
		}
	}

	public boolean updateUser(User user) {
		if (userDao.getById(user.getId()) == null
				|| userDao.getByName(user.getName()) != null) {
			return false;
		} else {
			userDao.update(user);
			return true;
		}
	}

	public boolean resetUserPassword(String id) {
		User user = userDao.getById(id);
		if (user == null) {
			return false;
		} else {
			user.setPassword(Constant.RESET_PASSWORD);
			userDao.update(user);
			return true;
		}
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public static void main(String[] args) {
		String name = "a";
		String password = "a";
		String role = "a";
		User user = new User();
		user.setName(name);
		user.setPassword(password);
		userDao.add(user);
		// System.out.println(user.getId() == null ? null : user.getId());
	}
}
