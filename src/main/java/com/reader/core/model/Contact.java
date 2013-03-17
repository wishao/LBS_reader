package com.reader.core.model;

import java.sql.Date;

/**
 * @类描述：
 * @创建人：wishao
 * @创建时间：2013-3-13 下午11:14:49
 */
public class Contact {

	private String id;
	private User sendUser;
	private User receiveUser;
	private String content;
	private Date createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";sendUserId=" + this.sendUser
				+ ";receiveUserId=" + this.receiveUser + ";content="
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
