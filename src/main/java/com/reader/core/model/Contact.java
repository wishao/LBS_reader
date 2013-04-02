package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:52:05
 * @email ws_wishao@163.com
 * @detail
 */
public class Contact {

	private String id;
	private User sendUser;
	private User receiveUser;
	private String content;
	private Timestamp createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";sendUser=" + this.sendUser
				+ ";receiveUser=" + this.receiveUser + ";content="
				+ this.content + ";createTime=" + this.createTime + ";";
		return str;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getSendUser() {
		return sendUser;
	}

	public void setSendUser(User sendUser) {
		this.sendUser = sendUser;
	}

	public User getReceiveUser() {
		return receiveUser;
	}

	public void setReceiveUser(User receiveUser) {
		this.receiveUser = receiveUser;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

}
