package com.reader.service.impl;

import org.springframework.stereotype.Service;

import com.reader.common.dao.BaseService;
import com.reader.core.dao.TestDao;
import com.reader.core.model.Test;
import com.reader.service.dao.TestService;

@Service("testService")
public class TestServiceImpl extends BaseService implements TestService {
	private static TestDao testDao = (TestDao) context.getBean("testDAO");

	public Test select() {
		Test test = testDao.select().get(1);
		return test;
	}
}
