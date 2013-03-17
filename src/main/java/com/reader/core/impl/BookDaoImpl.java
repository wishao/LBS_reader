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

	public List<Book> selectAll() {
		return getSqlMapClientTemplate().queryForList("selectAllBook");
	}

	public Book selectByName(String name) {
		return (Book) getSqlMapClientTemplate().queryForObject(
				"selectBookByName", name);
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
