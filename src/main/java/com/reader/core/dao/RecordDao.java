package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Record;

public interface RecordDao {
	public Record getById(String id);

	public List<Record> selectAll(int start, int limit);

	public int countAll();

	public List<Record> selectByUserId(String userId, int start, int limit,
			String share);

	public int countRecordByUserId(String userId);

	public void add(Record record);

	public void delete(String id);

	public void update(Record record);

}
