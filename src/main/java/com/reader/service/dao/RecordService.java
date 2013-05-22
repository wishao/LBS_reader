package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.Record;

public interface RecordService {

	public Map<String, Object> selectAllRecord(int start, int limit);

	public Map<String, Object> selectByUser(String userId);

	public Record selectRecordById(String id);

	public boolean addRecord(Record record);

	public boolean deleteRecord(String id);

	public boolean updateRecord(Record record);

}
