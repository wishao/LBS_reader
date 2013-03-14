package com.reader.core.model;

import java.sql.Date;

/**
 * @类描述：
 * @创建人：wishao
 * @创建时间：2013-3-13 下午11:14:49
 */
public class Contact {

	private String id;
	private User sendUserId;
	private User receiveUserId;
	private String content;
	private Date createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";sendUserId=" + this.sendUserId
				+ ";receiveUserId=" + this.receiveUserId + ";content="
				+ this.content + ";createTime=" + this.createTime + ";";
		return str;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getSendUserId() {
		return sendUserId;
	}

	public void setSendUserId(User sendUserId) {
		this.sendUserId = sendUserId;
	}

	public User getReceiveUserId() {
		return receiveUserId;
	}

	public void setReceiveUserId(User receiveUserId) {
		this.receiveUserId = receiveUserId;
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
