package com.reader.core.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.reader.core.model.Admin;
import com.reader.core.model.Contact;
import com.reader.service.dao.AdminService;
import com.reader.service.dao.ContactService;
import com.reader.service.impl.AdminServiceImpl;
import com.reader.service.impl.ContactServiceImpl;

public class ContactAction extends ActionSupport {
	private static final String LOGIN_NAME = "loginName";
	private static final String LOGIN_PASSWORD = "loginPassword";

	private static final long serialVersionUID = 1L;
	private Admin admin;
	private long results;
	private AdminService as = new AdminServiceImpl();
	private ContactService cs = new ContactServiceImpl();

	public String login() {
		// TODO Auto-generated method stub
		String name = ServletActionContext.getRequest().getParameter(LOGIN_NAME);
		String password = ServletActionContext.getRequest().getParameter(
				LOGIN_PASSWORD);
		admin = as.loginAdmin(name, password);
		Map<String,Object> c  = cs.selectAllContact(0, 1);
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e) { // TODO Auto-generated catch
			e.printStackTrace();
		}
		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		JSONObject json = new JSONObject();
		if (admin != null) {
			json.put("success", true);
			json.put("msg", admin + "µÇÂ¼³É¹¦");
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

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public long getResults() {
		return results;
	}

	public void setResults(long results) {
		this.results = results;
	}

	public AdminService getAs() {
		return as;
	}

	public void setAs(AdminService as) {
		this.as = as;
	}

}