package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.common.util.Constant;
import com.reader.core.dao.UserDao;
import com.reader.core.model.User;
import com.reader.service.dao.UserService;

@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {
	private static UserDao userDao = (UserDao) context.getBean("userDAO");

	public User loginUser(String name, String password) {
		User user = userDao.login(name, password);
		if (user == null) {
			return null;
		} else if (user.getStatus() == Constant.STATUS_YES) {
			return user;
		} else {
			return null;
		}
	}

	public User selectUserById(String id) {
		User user = userDao.getById(id);
		return user;
	}

	public Map<String, Object> selectAllUser(String name, int start, int limit) {
		try {
			int count = userDao.countAll(name);
			List<User> userList = userDao.selectAll(name, start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("userList", userList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean addUser(User user) {
		try {
			if (userDao.getByName(user.getName()) == null) {
				user.setPassword(Constant.RESET_PASSWORD);
				userDao.add(user);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteUser(String id) {
		try {
			if (userDao.getById(id) == null) {
				return false;
			} else {
				userDao.delete(id);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateUser(User user) {
		try {
			if (userDao.getById(user.getId()) == null) {
				return false;
			} else {
				userDao.update(user);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean resetUserPassword(String id) {
		try {
			User user = userDao.getById(id);
			if (user == null) {
				return false;
			} else {
				user.setPassword(Constant.RESET_PASSWORD);
				userDao.update(user);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

}
