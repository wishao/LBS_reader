package com.reader.common.util;

public class Constant {
	public static final byte ADMIN_ROLE_SUPER = 1;// ��������Ա
	public static final byte ADMIN_ROLE_USER = 2;// �����û�
	public static final byte ADMIN_ROLE_BOOK = 3;// �����鼮

	public static final String RESET_PASSWORD = MD5Util.getMD5("123456");// ��ʼ������

	public static final String RESET_READER_FONT = "10px";// �����С
	public static final String RESET_READER_FONT_COLOR = "000000";// ������ɫ
	public static final String RESET_READER_BACKGROUND_COLOR = "ffffff";// ������ɫ

	public static final byte RECORD_SHARE_YES = 1;// ����
	public static final byte RECORD_SHARE_NO = 2;// ˽��
}