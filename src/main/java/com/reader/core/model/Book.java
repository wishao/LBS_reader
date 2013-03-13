package com.reader.core.model;

import java.util.Date;

/**
 * @类描述：
 * @创建人：wishao
 * @创建时间：2013-3-13 下午11:07:20
 */
public class Book {

	private String id;
	private String name;
	private String author;
	private String content;
	private Date createTime;
	private Date updateTime;
	private String recommend;
	private String cover;
	private int reader;
	private int focus;
	private String catalog;
	private int score;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";name=" + this.name + ";author="
				+ this.author + ";content=" + this.content + ";createTime="
				+ this.createTime + ";updateTime=" + this.updateTime
				+ ";recommend=" + this.recommend + ";cover=" + this.cover
				+ ";reader=" + this.reader + ";focus=" + this.focus
				+ ";catalog=" + this.reader + ";catalog=" + this.reader
				+ ";score=" + this.score + ";";
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
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

}
