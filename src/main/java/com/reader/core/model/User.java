package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:53:40
 * @email ws_wishao@163.com
 * @detail
 */
public class User {

	private String id;
	private String name;
	private String password;
	private Timestamp createTime;
	private String address;
	private String signature;
	private Timestamp updateTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";name=" + this.name + ";password="
				+ this.password + ";createTime=" + this.createTime
				+ ";address=" + this.address + ";signature=" + this.signature
				+ ";updateTime=" + this.updateTime + ";";
		return str;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}
}
