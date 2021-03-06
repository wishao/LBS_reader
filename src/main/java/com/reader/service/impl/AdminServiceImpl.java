package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.common.util.Constant;
import com.reader.core.dao.AdminDao;
import com.reader.core.model.Admin;
import com.reader.service.dao.AdminService;

@Service("adminService")
public class AdminServiceImpl extends BaseService implements AdminService {
	private static AdminDao adminDao = (AdminDao) context.getBean("adminDAO");

	public Admin loginAdmin(String name, String password) {
		Admin admin = adminDao.login(name, password);
		if (admin == null) {
			return null;
		} else if (admin.getStatus() == Constant.STATUS_YES) {
			return admin;
		} else {
			return null;
		}
	}

	public Admin selectAdminById(String id) {
		Admin admin = adminDao.getById(id);
		return admin;
	}

	public Map<String, Object> selectAllAdmin(String name, int start, int limit) {
		try {
			int count = adminDao.countAll(name);
			List<Admin> adminList = adminDao.selectAll(name, start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("adminList", adminList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public boolean addAdmin(Admin admin) {
		try {
			if (adminDao.getByName(admin.getName()) == null) {
				admin.setPassword(Constant.RESET_PASSWORD);
				adminDao.add(admin);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteAdmin(String id) {
		try {
			if (adminDao.getById(id) == null) {
				return false;
			} else {
				adminDao.delete(id);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateAdmin(Admin admin) {
		try {
			if (adminDao.getById(admin.getId()) == null) {
				return false;
			} else {
				adminDao.update(admin);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updatePassword(Admin admin) {
		try {
			if (adminDao.getById(admin.getId()) == null) {
				return false;
			} else {
				adminDao.updatePassword(admin);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean resetAdminPassword(String id) {
		try {
			Admin admin = adminDao.getById(id);
			if (admin == null) {
				return false;
			} else {
				admin.setPassword(Constant.RESET_PASSWORD);
				adminDao.resetPassword(admin);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public AdminDao getAdminDao() {
		return adminDao;
	}

	public void setAdminDao(AdminDao adminDao) {
		this.adminDao = adminDao;
	}

}
