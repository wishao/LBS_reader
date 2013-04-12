package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Book;

public interface BookDao {
	public Book getById(String id);

	public List<Book> selectAll(String name, int start, int limit);

	public int countAll(String name);

	public void add(Book book);

	public void delete(String id);

	public void update(Book book);
}
