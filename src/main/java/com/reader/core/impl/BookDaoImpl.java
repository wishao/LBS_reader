package com.reader.core.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.core.dao.BookDao;
import com.reader.core.model.Book;

@Repository("bookDAO")
public class BookDaoImpl extends BaseDao implements BookDao {

	public List<Book> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllBook");
	}

	public Book selectByName(String name) {
		return (Book) getSqlMapClientTemplate().queryForObject(
				"selectBookByName", name);
	}

	public void add(Book book) {
		getSqlMapClientTemplate().insert("insertBook", book);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteBook", id);

	}

	public void update(Book book) {
		getSqlMapClientTemplate().update("updateBook", book);

	}

}
