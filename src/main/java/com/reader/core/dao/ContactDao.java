package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Contact;

public interface ContactDao {
	public Contact getById(String id);

	public List<Contact> selectAll(String content, int start, int limit);

	public int countAll(String content);

	public List<Contact> selectByUserId(String userId, int start, int limit);

	public int countContactByUser(String userId);

	public void add(Contact contact);

	public void delete(String id);

	public void update(Contact contact);

}
