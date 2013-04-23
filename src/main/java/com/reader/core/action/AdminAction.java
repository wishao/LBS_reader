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
import com.reader.core.model.Admin;
import com.reader.service.dao.AdminService;
import com.reader.service.impl.AdminServiceImpl;

public class AdminAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
	private AdminService as = new AdminServiceImpl();

	// 登录
	@SuppressWarnings("unchecked")
	public String login() {
		String name = ServletActionContext.getRequest().getParameter(
				"loginName");
		String password = ServletActionContext.getRequest().getParameter(
				"loginPassword");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		Admin admin = as.loginAdmin(name, password);
		JSONObject json = new JSONObject();
		if (admin != null) {
			json.put("result", true);
			json.put("msg", admin.getName() + "登陆成功");
			json.put("id", admin.getId());
			json.put("name", admin.getName());
			json.put("role", admin.getRole());
			json.put("createTime", sf.format(admin.getCreateTime()));
			json.put("status", admin.getStatus());
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
	@SuppressWarnings("unchecked")
	public String changePassword() {
		String name = ServletActionContext.getRequest().getParameter("name");
		String oldPwd = ServletActionContext.getRequest()
				.getParameter("oldPwd");
		String pwd = ServletActionContext.getRequest().getParameter("pwd");
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		Admin admin = as.loginAdmin(name, oldPwd);
		JSONObject json = new JSONObject();
		if (admin != null) {
			admin.setPassword(pwd);
			boolean result = as.updateAdmin(admin);
			if (result) {
				json.put("success", "true");
				json.put("message", "操作成功！");
			} else {
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
			as.deleteAdmin(id);
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
		String role = ServletActionContext.getRequest().getParameter("role");
		String status = ServletActionContext.getRequest()
				.getParameter("status");
		Admin admin = as.selectAdminById(id);
		JSONObject json = new JSONObject();
		if (admin != null) {
			admin.setId(id);
			admin.setName(name);
			admin.setRole(new Byte(role));
			admin.setStatus(new Byte(status));
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				if(as.updateAdmin(admin)){
					json.put("success", "true");
					json.put("message", "操作成功！");
				}else{
					json.put("message", "该管理员名已存在，操作失败！");
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
		String name = ServletActionContext.getRequest().getParameter("name");
		String role = ServletActionContext.getRequest().getParameter("role");
		String status = ServletActionContext.getRequest()
				.getParameter("status");
		Admin admin = new Admin();
		admin.setName(name);
		admin.setRole(new Byte(role));
		admin.setStatus(new Byte(status));
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		try {
			if(as.addAdmin(admin)){
				json.put("success", "true");
				json.put("message", "操作成功！");
			}else{
				json.put("message", "该管理员名已存在，操作失败！");
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
			Map<String, Object> result = as.selectAllAdmin(name, start, limit);
			List<Admin> adminList = (List<Admin>) result.get("adminList");
			for (Admin admin : adminList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", admin.getId());
				jsonTemp.put("name", admin.getName());
				jsonTemp.put("role", admin.getRole());
				jsonTemp.put("create_time", sf.format(admin.getCreateTime()));
				jsonTemp.put("status", admin.getStatus());
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
		Admin admin = as.selectAdminById(id);
		JSONObject json = new JSONObject();
		if (admin != null) {
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			try {
				as.resetAdminPassword(id);
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

	public AdminService getAs() {
		return as;
	}

	public void setAs(AdminService as) {
		this.as = as;
	}

}
