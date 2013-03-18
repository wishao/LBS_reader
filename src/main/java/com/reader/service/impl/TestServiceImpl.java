package com.reader.service.impl;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.core.dao.AdminDao;
import com.reader.core.dao.BookDao;
import com.reader.core.model.Book;
import com.reader.service.dao.TestService;

@Service("testService")
public class TestServiceImpl extends BaseService implements TestService {
	public static void main(String[] args) {
		AdminDao testDAOImpl = (AdminDao) context.getBean("adminDAO");

		/*List<Admin> lt = testDAOImpl.selectAll();
		for (Admin t : lt) {
			System.out.println(t.getName());
		}*/
		Book admin = new Book();
		admin.setName("a");
		/*admin.setPassword("a");
		admin.setRole("a");*/
		admin.setName("a");
		admin.setAuthor("a");
		admin.setContent("a");
		admin.setRecommend("a");
		admin.setCover("a");
		//admin.setReader(1);
		//admin.setFocus(0);
		admin.setCatalog("");
		//admin.setScore(0);
		
		System.out.println(testDAOImpl.countAll());
		//testDAOImpl.add(admin);

	}
}
