package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.User;

public interface UserDao {
	public User getById(String id);

	public User getByName(String name);

	public List<User> selectAll(int start, int limit);

	public int countAll();

	public User login(String name, String password);

	public void add(User user);

	public void delete(String id);

	public void update(User user);

}
