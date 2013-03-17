package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Admin;

public interface AdminDao {
	public List<Admin> selectAll();

	public Admin login(String name, String password);

	public void add(Admin admin);

	public void delete(String id);

	public void update(Admin admin);

}
