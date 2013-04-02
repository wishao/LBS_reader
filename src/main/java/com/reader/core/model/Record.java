package com.reader.core.model;

import java.sql.Timestamp;

/**
 * @author zengjw
 * @date 2013-4-2 下午2:53:00
 * @email ws_wishao@163.com
 * @detail
 */
public class Record {

	private String id;
	private User user;
	private Book book;
	private int record;
	private String evaluation;
	private int score;
	private Timestamp createTime;
	private byte share;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";user=" + this.user + ";book="
				+ this.book + ";record=" + this.record + ";evaluation="
				+ this.evaluation + ";score=" + this.score + ";createTime="
				+ this.createTime + ";share=" + this.share + ";";
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

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public int getRecord() {
		return record;
	}

	public void setRecord(int record) {
		this.record = record;
	}

	public String getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(String evaluation) {
		this.evaluation = evaluation;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public byte getShare() {
		return share;
	}

	public void setShare(byte share) {
		this.share = share;
	}

}
