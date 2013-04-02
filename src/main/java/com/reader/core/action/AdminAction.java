package com.reader.core.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.reader.core.model.Admin;
import com.reader.service.dao.AdminService;
import com.reader.service.impl.AdminServiceImpl;

public class AdminAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final String LOGIN_NAME = "loginName";
	private static final String LOGIN_PASSWORD = "loginPassword";
	private static final long serialVersionUID = 1L;
	private AdminService as = new AdminServiceImpl();

	public String login() {
		String name = ServletActionContext.getRequest()
				.getParameter(LOGIN_NAME);
		String password = ServletActionContext.getRequest().getParameter(
				LOGIN_PASSWORD);
		Admin admin = as.loginAdmin(name, password);
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		System.out.println(admin);

		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		JSONObject json = new JSONObject();
		if (admin != null) {
			json.put("result", true);
			json.put("msg", admin.getName() + "登陆成功");
			json.put("id", admin.getId());
			json.put("name", admin.getName());
			json.put("role", admin.getRole());
			json.put("createTime", sf.format(admin.getCreateTime()));
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			json.put("result", false);
			json.put("msg", "登陆失败");
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		return null;

	}

	public AdminService getAs() {
		return as;
	}

	public void setAs(AdminService as) {
		this.as = as;
	}

	public static String getLoginName() {
		return LOGIN_NAME;
	}

	public static String getLoginPassword() {
		return LOGIN_PASSWORD;
	}

}
