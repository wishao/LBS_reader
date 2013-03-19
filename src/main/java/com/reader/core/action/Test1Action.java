package com.reader.core.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.validation.JSONValidationInterceptor;

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
		Test result = ts.select();

		try {
			ServletActionContext.getRequest().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) { // TODO Auto-generated catch
			e.printStackTrace();
		}
		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		JSONObject json = new JSONObject();
		if (result != null) {
			json.put("success", true);
			json.put("msg", result.getName() + "µÇÂ¼³É¹¦");
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		} else {
			json.put("failure", true);
			json.put("msg", "µÇÂ¼Ê§°Ü");
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
		// return null;
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