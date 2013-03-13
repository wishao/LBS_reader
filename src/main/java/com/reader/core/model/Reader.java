package com.reader.core.model;

import java.util.Date;

/**
 * @类描述：
 * @创建人：wishao
 * @创建时间：2013-3-13 下午11:14:49
 */
public class Reader {

	private String id;
	private User userId;
	private String font;
	private String backgroundColor;
	private String fontColor;
	private Date createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";userId=" + this.userId + ";font="
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

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
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
