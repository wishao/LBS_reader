package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.User;

public interface UserService {
	public User loginUser(String name, String password);

	public User selectUserById(String id);

	public Map<String, Object> selectAllUser(String name, int start, int limit);

	public boolean addUser(User user);

	public boolean deleteUser(String id);

	public boolean updateUser(User user);

	public boolean updateUserByClient(User user);

	public boolean resetUserPassword(String id);

	public boolean updateByWeb(User user);

	public boolean updateSignature(User user);
}
