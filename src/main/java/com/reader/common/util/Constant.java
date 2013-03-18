package com.reader.common.util;

public class Constant {
	public static final byte ADMIN_ROLE_SUPER = 1;// 超级管理员
	public static final byte ADMIN_ROLE_USER = 2;// 管理用户
	public static final byte ADMIN_ROLE_BOOK = 3;// 管理书籍

	public static final String RESET_PASSWORD = MD5Util.getMD5("123456");// 初始化密码
}
