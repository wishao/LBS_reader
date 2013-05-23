package com.reader.core.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.opensymphony.xwork2.ActionSupport;
import com.reader.core.model.Contact;
import com.reader.core.model.User;
import com.reader.service.dao.ContactService;
import com.reader.service.dao.UserService;
import com.reader.service.impl.ContactServiceImpl;
import com.reader.service.impl.UserServiceImpl;

public class ContactAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
	private ContactService cs = new ContactServiceImpl();
	private UserService us = new UserServiceImpl();

	// 删除
	@SuppressWarnings("unchecked")
	public String delete() {
		String id = ServletActionContext.getRequest().getParameter("id");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		JSONObject json = new JSONObject();
		try {
			if (cs.deleteContact(id)) {
				json.put("success", true);
				json.put("message", "操作成功！");
			} else {
				json.put("success", false);
				json.put("message", "操作失败！");
			}
		} catch (Exception e) {
			json.put("success", false);
			json.put("message", "操作失败！");
			e.printStackTrace();
		} finally {
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;

	}

	// 更新
	@SuppressWarnings("unchecked")
	public String update() {
		String id = ServletActionContext.getRequest().getParameter("id");
		String sendUserId = ServletActionContext.getRequest().getParameter(
				"send_user_id");
		String receiveUserId = ServletActionContext.getRequest().getParameter(
				"receive_user_id");
		String content = ServletActionContext.getRequest().getParameter(
				"content");
		Contact contact = cs.selectContactById(id);
		User sendUser = us.selectUserById(sendUserId);
		User receiveUser = us.selectUserById(receiveUserId);
		JSONObject json = new JSONObject();
		if (contact != null && sendUser != null && receiveUser != null) {
			contact.setId(id);
			contact.setSendUser(sendUser);
			contact.setReceiveUser(receiveUser);
			contact.setContent(content);
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				if (cs.updateContact(contact)) {
					json.put("success", true);
					json.put("message", "操作成功！");
				} else {
					json.put("success", false);
					json.put("message", "操作失败！");
				}
			} catch (Exception e) {
				json.put("success", false);
				json.put("message", "操作失败！");
				e.printStackTrace();
			} finally {
				try {
					ServletActionContext.getResponse().getWriter()
							.println(json.toString());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		} else {
			json.put("success", false);
			json.put("message", "操作失败！");
		}

		return null;

	}

	// 新增
	@SuppressWarnings("unchecked")
	public String add() {
		String sendUserId = ServletActionContext.getRequest().getParameter(
				"send_user_id");
		String receiveUserId = ServletActionContext.getRequest().getParameter(
				"receive_user_id");
		String content = ServletActionContext.getRequest().getParameter(
				"content");
		Contact contact = new Contact();
		User sendUser = us.selectUserById(sendUserId);
		User receiveUser = us.selectUserById(receiveUserId);
		JSONObject json = new JSONObject();
		if (sendUser != null && receiveUser != null) {
			contact.setSendUser(sendUser);
			contact.setReceiveUser(receiveUser);
			contact.setContent(content);
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				if (cs.addContact(contact)) {
					json.put("success", true);
					json.put("message", "操作成功！");
				} else {
					json.put("success", false);
					json.put("message", "操作失败！");
				}
			} catch (Exception e) {
				json.put("success", false);
				json.put("message", "操作失败！");
				e.printStackTrace();
			} finally {
				try {
					ServletActionContext.getResponse().getWriter()
							.println(json.toString());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		} else {
			json.put("success", false);
			json.put("message", "操作失败！");
		}
		return null;
	}

	// 查询所有
	@SuppressWarnings("unchecked")
	public String all() {
		String content = ServletActionContext.getRequest().getParameter(
				"content");
		int start = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("start"));
		int limit = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("limit"));
		content = content == null ? "" : content;
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		JSONArray rows = new JSONArray();
		try {
			Map<String, Object> result = cs.selectAllContact(content, start,
					limit);
			List<Contact> contactList = (List<Contact>) result
					.get("contactList");
			for (Contact contact : contactList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", contact.getId());
				jsonTemp.put("send_user_id", contact.getSendUser().getId());
				jsonTemp.put("receive_user_id", contact.getReceiveUser()
						.getId());
				jsonTemp.put("send_user_name", contact.getSendUser().getName());
				jsonTemp.put("receive_user_name", contact.getReceiveUser()
						.getName());
				jsonTemp.put("content", contact.getContent());
				jsonTemp.put("create_time", sf.format(contact.getCreateTime()));
				rows.add(jsonTemp);
			}
			json.put("rows", rows);
			json.put("total", result.get("count"));
		} catch (Exception e) {
			json.put("rows", new JSONArray());
			json.put("total", 0);
			e.printStackTrace();
		} finally {
			try {
				ServletActionContext.getResponse().getWriter()
						.println(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;

	}
	
	// 查询所有对话用户
		@SuppressWarnings("unchecked")
		public String getByClient() {
			String userId = ServletActionContext.getRequest().getParameter(
					"user_id");
			int start = Integer.parseInt(ServletActionContext.getRequest()
					.getParameter("start"));
			int limit = Integer.parseInt(ServletActionContext.getRequest()
					.getParameter("limit"));
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse().setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			JSONObject json = new JSONObject();
			JSONArray rows = new JSONArray();
			try {
				Map<String, Object> result = cs.selectContactByUser(userId, start, limit);
				List<Contact> contactList = (List<Contact>) result
						.get("contactList");
				for (Contact contact : contactList) {
					JSONObject jsonTemp = new JSONObject();
					jsonTemp.put("id", contact.getId());
					jsonTemp.put("send_user_id", contact.getSendUser().getId());
					jsonTemp.put("receive_user_id", contact.getReceiveUser()
							.getId());
					jsonTemp.put("send_user_name", contact.getSendUser().getName());
					jsonTemp.put("receive_user_name", contact.getReceiveUser()
							.getName());
					jsonTemp.put("content", contact.getContent());
					jsonTemp.put("create_time", sf.format(contact.getCreateTime()));
					rows.add(jsonTemp);
				}
				json.put("rows", rows);
				json.put("total", result.get("count"));
			} catch (Exception e) {
				json.put("rows", new JSONArray());
				json.put("total", 0);
				e.printStackTrace();
			} finally {
				try {
					ServletActionContext.getResponse().getWriter()
							.println(json.toString());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			return null;

		}

	public ContactService getCs() {
		return cs;
	}

	public void setCs(ContactService cs) {
		this.cs = cs;
	}

	public UserService getUs() {
		return us;
	}

	public void setUs(UserService us) {
		this.us = us;
	}
}
