package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Reader;

public interface ReaderDao {
	public List<Reader> selectAll();

	public Reader selectByUserId(String userId);

	public void add(Reader reader);

	public void delete(String id);

	public void update(Reader reader);

}
