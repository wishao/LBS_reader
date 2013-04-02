package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:49:31
 * @email ws_wishao@163.com
 * @detail
 */
public class Admin {

	private String id;
	private String name;
	private String password;
	private byte role;
	private Timestamp createTime;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";name=" + this.name + ";password="
				+ this.password + ";role=" + this.role + ";createTime="
				+ this.createTime + ";";
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

	public byte getRole() {
		return role;
	}

	public void setRole(byte role) {
		this.role = role;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

}
