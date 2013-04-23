package com.reader.service.dao;

import java.util.Map;

import com.reader.core.model.Contact;

public interface ContactService {

	public Map<String, Object> selectAllContact(String content, int start,
			int limit);

	public Map<String, Object> selectContactByUser(String userId, int start,
			int limit);

	public Contact selectContactById(String id);

	public boolean addContact(Contact contact);

	public boolean deleteContact(String id);

	public boolean updateContact(Contact contact);

}
