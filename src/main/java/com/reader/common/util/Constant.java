package com.reader.common.util;

public class Constant {
	public static final byte ADMIN_ROLE_SUPER = 1;// 超级管理员
	public static final byte ADMIN_ROLE_USER = 2;// 管理用户
	public static final byte ADMIN_ROLE_BOOK = 3;// 管理书籍

	public static final String RESET_PASSWORD = MD5Util.getMD5("123456");// 初始化密码

	public static final String RESET_READER_FONT = "10px";// 字体大小
	public static final String RESET_READER_FONT_COLOR = "000000";// 字体颜色
	public static final String RESET_READER_BACKGROUND_COLOR = "ffffff";// 背景颜色

	public static final byte RECORD_SHARE_YES = 1;// 分享
	public static final byte RECORD_SHARE_NO = 2;// 私有
}
