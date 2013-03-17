package com.reader.core.dao;

import java.util.List;

import com.reader.core.model.Contact;

public interface ContactDao {
	public List<Contact> selectAll();

	public Contact selectByUserId(String userId);

	public void add(Contact contact);

	public void delete(String id);

	public void update(Contact contact);

}
