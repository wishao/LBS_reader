package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.core.dao.ContactDao;
import com.reader.core.dao.UserDao;
import com.reader.core.model.Contact;
import com.reader.service.dao.ContactService;

@Service("contactService")
public class ContactServiceImpl extends BaseService implements ContactService {
	private static ContactDao contactDao = (ContactDao) context
			.getBean("contactDAO");
	private static UserDao userDao = (UserDao) context.getBean("userDAO");

	public Map<String, Object> selectAllContact(int start, int limit) {
		try {
			int count = contactDao.countAll();
			List<Contact> contactList = contactDao.selectAll(start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("contactList", contactList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public Map<String, Object> selectContactByUser(String userId, int start,
			int limit) {
		try {
			if (userDao.getById(userId) == null) {
				return null;
			} else {
				int count = contactDao.countContactByUser(userId);
				List<Contact> contactList = contactDao.selectByUserId(userId,
						start, limit);
				Map<String, Object> result = new HashMap<String, Object>();
				result.put("count", count);
				result.put("contactList", contactList);
				return result;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public boolean addContact(Contact contact) {
		try {
			if (userDao.getById(contact.getReceiveUser().getId()) == null
					|| userDao.getById(contact.getReceiveUser().getId()) == null) {
				return false;
			} else {
				contactDao.update(contact);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteContact(String id) {
		try {
			if (contactDao.getById(id) == null) {
				return false;
			} else {
				contactDao.delete(id);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateContact(Contact contact) {
		try {
			if (contactDao.getById(contact.getId()) == null) {
				return false;
			} else {
				contactDao.update(contact);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static ContactDao getContactDao() {
		return contactDao;
	}

	public static void setContactDao(ContactDao contactDao) {
		ContactServiceImpl.contactDao = contactDao;
	}

	public static UserDao getUserDao() {
		return userDao;
	}

	public static void setUserDao(UserDao userDao) {
		ContactServiceImpl.userDao = userDao;
	}

}
