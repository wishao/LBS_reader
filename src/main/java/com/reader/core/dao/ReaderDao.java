package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Reader;

public interface ReaderDao {
	public Reader getById(String id);

	public List<Reader> selectAll(int start, int limit);

	public int countAll();

	public Reader selectByUserId(String userId, int start, int limit);

	public int countReaderByUser(String userId);

	public void add(Reader reader);

	public void delete(String id);

	public void update(Reader reader);

}
