package com.reader.service.impl;

import java.util.ArrayList;
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

	public Map<String, Object> selectAllUserByClient(String address) {
		int cLat = Integer.parseInt(address.substring(0, address.indexOf(",")));
		int cLon = Integer.parseInt(address.substring(address.indexOf(",") + 1,
				address.length()));
		int cLat1, cLon1, temp_A, temp_B;
		double C; // 用来储存算出来的斜边距离
		try {
			List<User> userList = userDao.selectAllUserByClient();
			List<User> resultList = new ArrayList<User>();
			for (User user : userList) {
				cLat1 = Integer.parseInt(user.getAddress().substring(0,
						address.indexOf(",")));
				cLon1 = Integer.parseInt(user.getAddress().substring(
						address.indexOf(",") + 1, user.getAddress().length()));
				temp_A = cLat > cLat1 ? (cLat - cLat1) : (cLat1 - cLat); // 横向距离
																			// (取正数，因为边长不能是负数)
				temp_B = cLon > cLon1 ? (cLon - cLon1) : (cLon1 - cLon); // 竖向距离
																			// (取正数，因为边长不能是负数)
				C = java.lang.Math.sqrt(temp_A * temp_A + temp_B * temp_B); // 计算
				if (C < Constant.MAP_OVERLAY) {
					resultList.add(user);
				}
			}
			int count = resultList.size();
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("userList", resultList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean addUser(User user) {
		try {
			if (userDao.getByName(user.getName()) == null) {
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

	public boolean updateUserAddress(User user) {
		try {
			if (userDao.getById(user.getId()) == null) {
				return false;
			} else {
				userDao.updateUserAddress(user);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateByWeb(User user) {
		try {
			if (userDao.getById(user.getId()) == null) {
				return false;
			} else {
				userDao.updateByWeb(user);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateSignature(User user) {
		try {
			if (userDao.getById(user.getId()) == null) {
				return false;
			} else {
				userDao.updateSignature(user);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateUserByClient(User user) {
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
