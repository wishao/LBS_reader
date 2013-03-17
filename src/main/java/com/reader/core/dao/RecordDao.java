package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Record;

public interface RecordDao {
	public List<Record> selectAll();

	public Record selectById(String id);

	public void add(Record record);

	public void delete(String id);

	public void update(Record record);

}
