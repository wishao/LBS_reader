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
import com.reader.core.model.Reader;
import com.reader.core.model.User;
import com.reader.service.dao.ReaderService;
import com.reader.service.dao.UserService;
import com.reader.service.impl.ReaderServiceImpl;
import com.reader.service.impl.UserServiceImpl;

public class ReaderAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
	private ReaderService rs = new ReaderServiceImpl();
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
			if (rs.deleteReader(id)) {
				json.put("success", "true");
				json.put("message", "操作成功！");
			} else {
				json.put("message", "操作失败！");
			}
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
		String userId = ServletActionContext.getRequest().getParameter(
				"user_id");
		String font = ServletActionContext.getRequest().getParameter("font");
		String backgroundColor = ServletActionContext.getRequest()
				.getParameter("background_color");
		String fontColor = ServletActionContext.getRequest().getParameter(
				"font_color");
		Reader reader = rs.selectReaderById(id);
		User user = us.selectUserById(userId);
		JSONObject json = new JSONObject();
		if (reader != null && user != null) {
			reader.setId(id);
			reader.setUser(user);
			reader.setFont(font);
			reader.setBackgroundColor(backgroundColor);
			reader.setFontColor(fontColor);
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				if (rs.updateReader(reader)) {
					json.put("success", "true");
					json.put("message", "操作成功！");
				} else {
					json.put("message", "操作失败！");
				}
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
		String userId = ServletActionContext.getRequest().getParameter(
				"user_id");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		try {
			User user = us.selectUserById(userId);
			if (user != null) {
				if (rs.addReader(userId)) {
					json.put("success", "true");
					json.put("message", "操作成功！");
				} else {
					json.put("message", "操作失败！");
				}
			} else {
				json.put("message", "操作失败！");
			}
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
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		JSONArray rows = new JSONArray();
		try {
			Map<String, Object> result = rs.selectAllReader(start, limit);
			List<Reader> readerList = (List<Reader>) result.get("readerList");
			for (Reader reader : readerList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", reader.getId());
				jsonTemp.put("user_id", reader.getUser().getId());
				jsonTemp.put("user_name", reader.getUser().getName());
				jsonTemp.put("font", reader.getFont());
				jsonTemp.put("background_color", reader.getBackgroundColor());
				jsonTemp.put("font_color", reader.getFontColor());
				jsonTemp.put("create_time", sf.format(reader.getCreateTime()));
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

	public ReaderService getRs() {
		return rs;
	}

	public void setRs(ReaderService rs) {
		this.rs = rs;
	}

	public UserService getUs() {
		return us;
	}

	public void setUs(UserService us) {
		this.us = us;
	}

}
