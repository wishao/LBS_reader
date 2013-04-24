package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.Reader;

public interface ReaderService {

	public Map<String, Object> selectAllReader(int start, int limit);

	public Reader selectReaderByUser(String userId);
	
	public Reader selectReaderById(String id);

	public boolean addReader(Reader reader);
	
	public boolean initReader(String userId);

	public boolean deleteReader(String id);

	public boolean updateReader(Reader reader);

	public boolean resetReader(String id);

}
