package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Admin;

public interface AdminDao {
	public Admin getById(String id);

	public Admin getByName(String name);

	public List<Admin> selectAll(String name, int start, int limit);

	public int countAll(String name);

	public Admin login(String name, String password);

	public void add(Admin admin);

	public void delete(String id);

	public void update(Admin admin);

	public void updatePassword(Admin admin);

	public void resetPassword(Admin admin);

}
