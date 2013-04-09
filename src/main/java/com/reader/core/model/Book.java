package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:51:18
 * @email ws_wishao@163.com
 * @detail
 */
public class Book {

	private String id;
	private String name;
	private String author;
	private String content;
	private Timestamp createTime;
	private Timestamp updateTime;
	private String recommend;
	private String cover;
	private int reader;
	private int focus;
	private String catalog;
	private int score;
	private byte status;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";name=" + this.name + ";author="
				+ this.author + ";content=" + this.content + ";createTime="
				+ this.createTime + ";updateTime=" + this.updateTime
				+ ";recommend=" + this.recommend + ";cover=" + this.cover
				+ ";reader=" + this.reader + ";focus=" + this.focus
				+ ";catalog=" + this.reader + ";catalog=" + this.reader
				+ ";score=" + this.score + ";status=" + this.status + ";";
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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
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

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	public String getRecommend() {
		return recommend;
	}

	public void setRecommend(String recommend) {
		this.recommend = recommend;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public int getReader() {
		return reader;
	}

	public void setReader(int reader) {
		this.reader = reader;
	}

	public int getFocus() {
		return focus;
	}

	public void setFocus(int focus) {
		this.focus = focus;
	}

	public String getCatalog() {
		return catalog;
	}

	public void setCatalog(String catalog) {
		this.catalog = catalog;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public byte getStatus() {
		return status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

}
