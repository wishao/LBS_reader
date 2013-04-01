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

public class Test1Action extends ActionSupport {
	private static final String LOGIN_NAME = "loginName";
	private static final String LOGIN_PASSWORD = "loginPassword";

	private static final long serialVersionUID = 1L;
	private Contact contact;
	private long results;
	private ContactService as = new ContactServiceImpl();

	public String login() {
		// TODO Auto-generated method stub
		String name = ServletActionContext.getRequest()
				.getParameter(LOGIN_NAME);
		String password = ServletActionContext.getRequest().getParameter(
				LOGIN_PASSWORD);
		// contact = as.selectAllContact(0, 1);
		Map<String, Object> c = as.selectAllContact(0, 1);
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e) { // TODO Auto-generated catch
			e.printStackTrace();
		}
		System.out.println(((List<Contact>) c.get("contactList")).get(0));
		// return null;

		ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		JSONObject json = new JSONObject();
	/*	if (admin != null) {
			json.put("success", true);
			json.put("msg", admin + "��¼�ɹ�");
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null;
		} else {
			json.put("failure", true);
			json.put("msg", "��¼ʧ��");
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null;
		}
*/
		return null;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public long getResults() {
		return results;
	}

	public void setResults(long results) {
		this.results = results;
	}

	public ContactService getAs() {
		return as;
	}

	public void setAs(ContactService as) {
		this.as = as;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}