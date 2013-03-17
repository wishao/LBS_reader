package com.reader.core.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.AdminDao;
import com.reader.core.dao.BookDao;
import com.reader.core.dao.TestDao;
import com.reader.core.model.Admin;
import com.reader.core.model.Book;
import com.reader.core.model.Test;

@Repository("testDAO")
public class TestDaoImpl extends BaseDao implements TestDao {

	public static void main(String[] args) {
		BookDao testDAOImpl = (BookDao) context.getBean("bookDAO");

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
		
		System.out.println();
		testDAOImpl.add(admin);

	}

	public List<Test> select() {

		return getSqlMapClientTemplate().queryForList("selectAllTest", null);
	}

}
