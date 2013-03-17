package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Book;

public interface BookDao {
	public List<Book> selectAll();

	public Book selectByName(String name);

	public void add(Book book);

	public void delete(String id);

	public void update(Book book);
}
