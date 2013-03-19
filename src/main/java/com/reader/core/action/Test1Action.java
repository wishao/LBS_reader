package com.reader.core.action;

import java.io.UnsupportedEncodingException;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.reader.core.model.Test;
import com.reader.service.dao.TestService;
import com.reader.service.impl.TestServiceImpl;

public class Test1Action extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Test test;
	private long results;
	private TestService ts = new TestServiceImpl();

	/*
	 * public String select() { // TODO Auto-generated method stub
	 * response.setCharacterEncoding("gb2312"); list = testDAO.select(); results
	 * = list.size(); return SUCCESS; }
	 */

	public String login() {
		// TODO Auto-generated method stub
		System.out.println("wwwwwwwwwwwwwwwwww");
		Test result = ts.select();
		System.out.println(result.getName());
		/*
		 * try {
		 * ServletActionContext.getRequest().setCharacterEncoding("utf-8"); }
		 * catch (UnsupportedEncodingException e) { // TODO Auto-generated catch
		 * block e.printStackTrace(); }
		 * ServletActionContext.getResponse().setCharacterEncoding("gb2312");
		 * Test result = testDAO.select(); if (result != null) { return
		 * ("{success:true,msg:'" + result.getName() + "µÇÂ¼³É¹¦'}"); } else {
		 * return ("{failure:true,msg:'µÇÂ¼Ê§°Ü'}"); }
		 */return null;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}

	public TestService getTs() {
		return ts;
	}

	public void setTs(TestService ts) {
		this.ts = ts;
	}

	public long getResults() {
		return results;
	}

	public void setResults(long results) {
		this.results = results;
	}

}