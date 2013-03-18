package com.reader.common.dao;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public abstract class BaseService {

	public static ApplicationContext context = new ClassPathXmlApplicationContext(
			"resources/../spring.xml");
}
