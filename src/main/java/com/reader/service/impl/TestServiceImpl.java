package com.reader.service.impl;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.common.util.Constant;
import com.reader.core.dao.AdminDao;
import com.reader.core.dao.TestDao;
import com.reader.core.model.Admin;
import com.reader.core.model.Test;
import com.reader.service.dao.TestService;

@Service("testService")
public class TestServiceImpl extends BaseService implements TestService {
	private static TestDao testDao = (TestDao) context.getBean("testDAO");
	private static AdminDao adminDao = (AdminDao) context.getBean("adminDAO");

	public Test select() {
		Test test = testDao.select().get(1);
		return test;
	}
	
	public static void main(String[] args){
		Admin admin = adminDao.getById("3ed26c7b-fb02-4237-ab9f-a942592819bf");
		//admin.setId("3ed26c7b-fb02-4237-ab9f-a942592819bf");
		/*admin.setName("admin");
		admin.setPassword("a");
		admin.setRole(Constant.ADMIN_ROLE_SUPER);
		adminDao.add(admin);*/
		admin.setPassword("aa");
		adminDao.update(admin);
	}
}
