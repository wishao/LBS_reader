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
	private static final long serialVersionUID = 1L;
	private AdminService as = new AdminServiceImpl();

	// 登录
	public String login() {
		String name = ServletActionContext.getRequest().getParameter(
				"loginName");
		String password = ServletActionContext.getRequest().getParameter(
				"loginPassword");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		Admin admin = as.loginAdmin(name, password);
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

	// 修改密码
	public String changePassword() {
		String name = ServletActionContext.getRequest().getParameter("name");
		String oldPwd = ServletActionContext.getRequest()
				.getParameter("oldPwd");
		String pwd = ServletActionContext.getRequest().getParameter("pwd");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		Admin admin = as.loginAdmin(name, oldPwd);
		JSONObject json = new JSONObject();
		if (admin != null) {
			admin.setPassword(pwd);
			boolean result = as.updateAdmin(admin);
			if(result){
				System.out.println("aaa");
				json.put("success", "true");
				json.put("message", "操作成功！");
			}else{
				System.out.println("bbb");
				json.put("message", "操作失败！");
			}
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			json.put("message", "操作失败！");
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

}
