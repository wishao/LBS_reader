package com.reader.core.model;

import java.sql.Date;

/**
 * @��������
 * @�����ˣ�wishao
 * @����ʱ�䣺2013-3-13 ����11:14:49
 */
public class Reader {

	private String id;
	private User user;
	private String font;
	private String backgroundColor;
	private String fontColor;
	private Date createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";userId=" + this.user + ";font="
				+ this.font + ";backgroundColor=" + this.backgroundColor
				+ ";fontColor=" + this.fontColor + ";createTime="
				+ this.createTime + ";";
		return str;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getFont() {
		return font;
	}

	public void setFont(String font) {
		this.font = font;
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public String getFontColor() {
		return fontColor;
	}

	public void setFontColor(String fontColor) {
		this.fontColor = fontColor;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
