package com.reader.core.model;

import java.sql.Date;

/**
 * @类描述：
 * @创建人：wishao
 * @创建时间：2013-3-13 下午11:14:30
 */
public class Record {

	private String id;
	private User userId;
	private Book bookId;
	private int record;
	private String evaluation;
	private int score;
	private Date createTime;
	private byte share;

	@Override
	public String toString() {
		String str = "id=" + this.id + ";userId=" + this.userId + ";bookId="
				+ this.bookId + ";record=" + this.record + ";evaluation="
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

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Book getBookId() {
		return bookId;
	}

	public void setBookId(Book bookId) {
		this.bookId = bookId;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public byte getShare() {
		return share;
	}

	public void setShare(byte share) {
		this.share = share;
	}

}
