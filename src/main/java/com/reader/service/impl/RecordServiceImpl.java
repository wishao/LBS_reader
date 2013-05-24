package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.core.dao.BookDao;
import com.reader.core.dao.RecordDao;
import com.reader.core.dao.UserDao;
import com.reader.core.model.Book;
import com.reader.core.model.Record;
import com.reader.service.dao.RecordService;

@Service("recordService")
public class RecordServiceImpl extends BaseService implements RecordService {
	private static RecordDao recordDao = (RecordDao) context
			.getBean("recordDAO");
	private static UserDao userDao = (UserDao) context.getBean("userDAO");
	private static BookDao bookDao = (BookDao) context.getBean("bookDAO");

	public Map<String, Object> selectAllRecord(int start, int limit) {
		try {
			int count = recordDao.countAll();
			List<Record> recordList = recordDao.selectAll(start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("recordList", recordList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Map<String, Object> selectByUser(String userId, int start, int limit) {
		try {
			int count = recordDao.countRecordByUserId(userId);
			List<Record> recordList = recordDao.selectByUserId(userId, start,
					limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("recordList", recordList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Record selectRecordById(String id) {
		try {
			Record record = recordDao.getById(id);
			return record;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean addRecord(Record record) {
		try {
			if (userDao.getById(record.getUser().getId()) == null
					|| bookDao.getById(record.getBook().getId()) == null) {
				return false;
			} else {
				recordDao.add(record);
				Book book = bookDao.getById(record.getBook().getId());
				book.setReader(book.getReader() + 1);
				bookDao.update(book);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteRecord(String id) {
		try {
			if (recordDao.getById(id) == null) {
				return false;
			} else {

				Book book = bookDao.getById((recordDao.getById(id).getBook())
						.getId());
				book.setReader(book.getReader() - 1);
				bookDao.update(book);
				recordDao.delete(id);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateRecord(Record record) {
		try {
			if (recordDao.getById(record.getId()) == null
					|| userDao.getById(record.getUser().getId()) == null
					|| bookDao.getById(record.getBook().getId()) == null) {
				return false;
			} else {
				recordDao.update(record);
				Book book = bookDao.getById(record.getBook().getId());
				book.setScore((book.getScore() * book.getReader() + record
						.getScore()) / book.getReader());
				bookDao.update(book);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static RecordDao getRecordDao() {
		return recordDao;
	}

	public static void setRecordDao(RecordDao recordDao) {
		RecordServiceImpl.recordDao = recordDao;
	}

	public static UserDao getUserDao() {
		return userDao;
	}

	public static void setUserDao(UserDao userDao) {
		RecordServiceImpl.userDao = userDao;
	}

	public static BookDao getBookDao() {
		return bookDao;
	}

	public static void setBookDao(BookDao bookDao) {
		RecordServiceImpl.bookDao = bookDao;
	}

}
