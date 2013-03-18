package com.reader.core.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.reader.common.dao.BaseDao;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.BookDao;
import com.reader.core.model.Book;

@Repository("bookDAO")
public class BookDaoImpl extends BaseDao implements BookDao {
	public Book getById(String id) {
		return (Book) getSqlMapClientTemplate().queryForObject(
				"selectBookById", id);
	}

	public List<Book> selectAll(int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		return getSqlMapClientTemplate().queryForList("selectAllBook", param);
	}

	public int countAll() {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countAllBook");
	}

	public Book selectByName(String name, int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("start", start);
		param.put("limit", limit);
		param.put("name", name);
		return (Book) getSqlMapClientTemplate().queryForObject(
				"selectBookByName", param);
	}

	public int countBookByName(String name) {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"countBookByName", name);
	}

	public void add(Book book) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", IDUtil.getID());
		param.put("name", book.getName());
		param.put("author", book.getAuthor());
		param.put("content", book.getContent());
		param.put("recommend", book.getRecommend());
		param.put("cover", book.getCover());
		param.put("reader", book.getReader());
		param.put("focus", book.getFocus());
		param.put("catalog", book.getCatalog());
		param.put("score", book.getScore());
		getSqlMapClientTemplate().insert("insertBook", param);

	}

	public void delete(String id) {
		getSqlMapClientTemplate().delete("deleteBook", id);

	}

	public void update(Book book) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", book.getId());
		param.put("name", book.getName());
		param.put("author", book.getAuthor());
		param.put("content", book.getContent());
		param.put("recommend", book.getRecommend());
		param.put("cover", book.getCover());
		param.put("reader", book.getReader());
		param.put("focus", book.getFocus());
		param.put("catalog", book.getCatalog());
		param.put("score", book.getScore());
		getSqlMapClientTemplate().update("updateBook", param);

	}

}
