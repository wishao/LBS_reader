package com.reader.common.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport implements SessionAware,
		ServletResponseAware, ServletRequestAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected HttpSession session;
	protected HttpServletRequest request;
	protected HttpServletResponse response;

	public void setSession(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.session = (HttpSession) arg0;
	}

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;
	}
}
