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
import com.reader.core.model.Book;
import com.reader.core.model.Record;
import com.reader.core.model.User;
import com.reader.service.dao.BookService;
import com.reader.service.dao.RecordService;
import com.reader.service.dao.UserService;
import com.reader.service.impl.BookServiceImpl;
import com.reader.service.impl.RecordServiceImpl;
import com.reader.service.impl.UserServiceImpl;

public class RecordAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
	private RecordService rs = new RecordServiceImpl();
	private UserService us = new UserServiceImpl();
	private BookService bs = new BookServiceImpl();

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
			if (rs.deleteRecord(id)) {
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
		String userId = ServletActionContext.getRequest().getParameter(
				"user_id");
		String bookId = ServletActionContext.getRequest().getParameter(
				"book_id");
		int recordNum = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("record"));
		String evaluation = ServletActionContext.getRequest().getParameter(
				"evaluation");
		int score = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("score"));
		String share = ServletActionContext.getRequest().getParameter("share");
		Book book = bs.selectBookById(bookId);
		User user = us.selectUserById(userId);
		Record record = rs.selectRecordById(id);
		JSONObject json = new JSONObject();
		if (book != null && user != null && record != null) {
			record.setId(id);
			record.setUser(user);
			record.setBook(book);
			record.setRecord(recordNum);
			record.setEvaluation(evaluation);
			record.setScore(score);
			record.setShare(new Byte(share));
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				if (rs.updateRecord(record)) {
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
		String userId = ServletActionContext.getRequest().getParameter(
				"user_id");
		String bookId = ServletActionContext.getRequest().getParameter(
				"book_id");
		int recordNum = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("record"));
		String evaluation = ServletActionContext.getRequest().getParameter(
				"evaluation");
		int score = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("score"));
		String share = ServletActionContext.getRequest().getParameter("share");
		User user = us.selectUserById(userId);
		Book book = bs.selectBookById(bookId);
		JSONObject json = new JSONObject();
		if (book != null && user != null) {
			Record record = new Record();
			record.setUser(user);
			record.setBook(book);
			record.setRecord(recordNum);
			record.setEvaluation(evaluation);
			record.setScore(score);
			record.setShare(new Byte(share));
			try {
				ServletActionContext.getRequest().setCharacterEncoding("gbk");
				ServletActionContext.getResponse()
						.setCharacterEncoding("utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			try {
				if (rs.addRecord(record)) {
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
			Map<String, Object> result = rs.selectAllRecord(start, limit);
			List<Record> recordList = (List<Record>) result.get("recordList");
			for (Record record : recordList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", record.getId());
				jsonTemp.put("user_id", record.getUser().getId());
				jsonTemp.put("user_name", record.getUser().getName());
				jsonTemp.put("book_id", record.getBook().getId());
				jsonTemp.put("book_name", record.getBook().getName());
				jsonTemp.put("record", record.getRecord());
				jsonTemp.put("evaluation", record.getEvaluation());
				jsonTemp.put("score", record.getScore());
				jsonTemp.put("create_time", sf.format(record.getCreateTime()));
				jsonTemp.put("share", record.getShare());
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

	public RecordService getRs() {
		return rs;
	}

	public void setRs(RecordService rs) {
		this.rs = rs;
	}

	public UserService getUs() {
		return us;
	}

	public void setUs(UserService us) {
		this.us = us;
	}

	public BookService getBs() {
		return bs;
	}

	public void setBs(BookService bs) {
		this.bs = bs;
	}

}
