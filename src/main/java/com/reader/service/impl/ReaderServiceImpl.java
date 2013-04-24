package com.reader.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.common.util.Constant;
import com.reader.common.util.IDUtil;
import com.reader.core.dao.ReaderDao;
import com.reader.core.dao.UserDao;
import com.reader.core.model.Reader;
import com.reader.service.dao.ReaderService;

@Service("readerService")
public class ReaderServiceImpl extends BaseService implements ReaderService {
	private static ReaderDao readerDao = (ReaderDao) context
			.getBean("readerDAO");
	private static UserDao userDao = (UserDao) context.getBean("userDAO");

	public Map<String, Object> selectAllReader(int start, int limit) {
		try {
			int count = readerDao.countAll();
			List<Reader> readerList = readerDao.selectAll(start, limit);
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("count", count);
			result.put("readerList", readerList);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Reader selectReaderById(String id) {
		try {
			Reader reader = readerDao.getById(id);
			return reader;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Reader selectReaderByUser(String userId) {
		try {
			if (userDao.getById(userId) == null) {
				return null;
			} else if (readerDao.selectByUserId(userId) == null) {
				Reader reader = new Reader();
				reader.setId(IDUtil.getID());
				reader.setFont(Constant.RESET_READER_FONT);
				reader.setFontColor(Constant.RESET_READER_FONT_COLOR);
				reader.setBackgroundColor(Constant.RESET_READER_BACKGROUND_COLOR);
				reader.setUser(userDao.getById(userId));
				readerDao.add(reader);
				return reader;
			} else {
				return readerDao.selectByUserId(userId);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean addReader(Reader reader) {
		try {
			reader.setId(IDUtil.getID());
			reader.setFont(reader.getFont());
			reader.setFontColor(reader.getFontColor());
			reader.setBackgroundColor(reader.getBackgroundColor());
			reader.setUser(reader.getUser());
			readerDao.add(reader);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean initReader(String userId) {
		try {
			if (userDao.getById(userId) == null) {
				return false;
			} else {
				Reader reader = new Reader();
				reader.setId(IDUtil.getID());
				reader.setFont(Constant.RESET_READER_FONT);
				reader.setFontColor(Constant.RESET_READER_FONT_COLOR);
				reader.setBackgroundColor(Constant.RESET_READER_BACKGROUND_COLOR);
				reader.setUser(userDao.getById(userId));
				readerDao.add(reader);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean deleteReader(String id) {
		try {
			if (readerDao.getById(id) == null) {
				return false;
			} else {
				readerDao.delete(id);
				return true;

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean updateReader(Reader reader) {
		try {
			if (userDao.getById(reader.getUser().getId()) == null) {
				return false;
			} else {
				readerDao.update(reader);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean resetReader(String id) {
		try {
			if (userDao.getById(readerDao.getById(id).getUser().getId()) == null) {
				return false;
			} else {
				Reader reader = readerDao.getById(id);
				reader.setFont(Constant.RESET_READER_FONT);
				reader.setFontColor(Constant.RESET_READER_FONT_COLOR);
				reader.setBackgroundColor(Constant.RESET_READER_BACKGROUND_COLOR);
				readerDao.update(reader);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static ReaderDao getReaderDao() {
		return readerDao;
	}

	public static void setReaderDao(ReaderDao readerDao) {
		ReaderServiceImpl.readerDao = readerDao;
	}

	public static UserDao getUserDao() {
		return userDao;
	}

	public static void setUserDao(UserDao userDao) {
		ReaderServiceImpl.userDao = userDao;
	}

}
