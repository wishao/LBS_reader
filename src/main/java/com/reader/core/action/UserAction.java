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
import com.reader.core.model.User;
import com.reader.service.dao.UserService;
import com.reader.service.impl.UserServiceImpl;

public class UserAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
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
			us.deleteUser(id);
			json.put("success", "true");
			json.put("message", "操作成功！");
		} catch (Exception e) {
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
		String name = ServletActionContext.getRequest().getParameter("name");
		String signature = ServletActionContext.getRequest().getParameter(
				"signature");
		String status = ServletActionContext.getRequest()
				.getParameter("status");
		User user = us.selectUserById(id);
		JSONObject json = new JSONObject();
		if (user != null) {
			user.setId(id);
			user.setName(name);
			user.setSignature(signature);
			user.setStatus(new Byte(status));
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				us.updateUser(user);
				json.put("success", "true");
				json.put("message", "操作成功！");
			} catch (Exception e) {
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
			json.put("message", "操作失败！");
		}

		return null;

	}

	// 新增
	@SuppressWarnings("unchecked")
	public String add() {
		String name = ServletActionContext.getRequest().getParameter("name");
		String signature = ServletActionContext.getRequest().getParameter(
				"signature");
		String status = ServletActionContext.getRequest()
				.getParameter("status");
		User user = new User();
		user.setName(name);
		user.setSignature(signature);
		user.setStatus(new Byte(status));
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		try {
			us.addUser(user);
			json.put("success", "true");
			json.put("message", "操作成功！");
		} catch (Exception e) {
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

	// 查询所有
	@SuppressWarnings("unchecked")
	public String all() {

		int start = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("start"));
		int limit = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("limit"));
		String name = ServletActionContext.getRequest().getParameter("name");
		name = name == null ? "" : name;
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		JSONArray rows = new JSONArray();
		try {
			Map<String, Object> result = us.selectAllUser(name, start, limit);
			List<User> userList = (List<User>) result.get("userList");
			for (User user : userList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", user.getId());
				jsonTemp.put("name", user.getName());
				jsonTemp.put("create_time", sf.format(user.getCreateTime()));
				jsonTemp.put("address", user.getAddress());
				jsonTemp.put("signature", user.getSignature());
				jsonTemp.put("update_time", sf.format(user.getUpdateTime()));
				jsonTemp.put("status", user.getStatus());
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

	// 更新
	@SuppressWarnings("unchecked")
	public String resetPassword() {
		String id = ServletActionContext.getRequest().getParameter("id");
		User user = us.selectUserById(id);
		JSONObject json = new JSONObject();
		if (user != null) {
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			try {
				us.resetUserPassword(id);
				json.put("success", "true");
				json.put("message", "操作成功！");
			} catch (Exception e) {
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
			json.put("message", "操作失败！");
		}

		return null;

	}

	public UserService getUs() {
		return us;
	}

	public void setUs(UserService us) {
		this.us = us;
	}

}
