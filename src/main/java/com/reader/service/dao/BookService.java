package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.Book;

public interface BookService {

	public Map<String, Object> selectAllBook(String name, int start, int limit);
	
	public Map<String, Object> selectAllBookByClient(String name, int start, int limit);

	public Book selectBookById(String id);

	public boolean addBook(Book book);

	public boolean deleteBook(String id);

	public boolean updateBook(Book book);

	public boolean readBook(String id);

	public boolean focusBook(String id);
}
