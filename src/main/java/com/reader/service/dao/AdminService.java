package com.reader.service.dao;

import java.util.List;

import com.reader.core.model.Admin;

public interface AdminService {
	public Admin loginAdmin(String name, String password);

	public List<Admin> selectAllAdmin();

	public boolean addAdmin(Admin admin);

	public boolean deleteAdmin(String id);

	public boolean updateAdmin(Admin admin);

	public boolean resetAdminPassword(String id);

}
