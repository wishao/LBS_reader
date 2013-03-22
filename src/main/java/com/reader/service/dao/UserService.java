package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.User;

public interface UserService {
	public User loginUser(String name, String password);

	public Map<String, Object> selectNewUser(int start, int limit);

	public boolean addUser(User user);

	public boolean deleteUser(String id);

	public boolean updateUser(User user);

	public boolean resetUserPassword(String id);

}