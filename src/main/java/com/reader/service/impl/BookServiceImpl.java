package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.core.dao.BookDao;
import com.reader.core.model.Book;
import com.reader.service.dao.BookService;

@Service("bookService")
public class BookServiceImpl extends BaseService implements BookService {
	private static BookDao bookDao = (BookDao) context.getBean("bookDAO");

	public Map<String, Object> selectAllBook(int start, int limit) {

		try {
			int count = bookDao.countAll();
			List<Book> bookList = bookDao.selectAll(start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("bookList", bookList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Book selectBookById(String id) {
		try {
			Book book = bookDao.getById(id);
			return book;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean addBook(Book book) {
		try {
			bookDao.add(book);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteBook(String id) {
		try {
			Book book = bookDao.getById(id);
			if (book == null) {
				return false;
			} else {
				bookDao.delete(id);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateBook(Book book) {
		try {
			Book bookTemp = bookDao.getById(book.getId());
			if (bookTemp == null) {
				return false;
			} else {
				bookDao.update(book);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean readBook(String id) {
		try {
			Book book = bookDao.getById(id);
			if (book == null) {
				return false;
			} else {
				book.setReader(book.getReader() + 1);
				bookDao.update(book);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean focusBook(String id) {
		try {
			Book book = bookDao.getById(id);
			if (book == null) {
				return false;
			} else {
				book.setFocus(book.getFocus() + 1);
				bookDao.update(book);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static BookDao getBookDao() {
		return bookDao;
	}

	public static void setBookDao(BookDao bookDao) {
		BookServiceImpl.bookDao = bookDao;
	}

}