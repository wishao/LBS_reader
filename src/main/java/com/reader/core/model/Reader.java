package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:52:30
 * @email ws_wishao@163.com
 * @detail
 */
public class Reader {

	private String id;
	private User user;
	private String font;
	private String backgroundColor;
	private String fontColor;
	private Timestamp createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";user=" + this.user + ";font="
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

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

}
