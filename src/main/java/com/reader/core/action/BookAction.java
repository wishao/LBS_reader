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
import com.reader.service.dao.BookService;
import com.reader.service.impl.BookServiceImpl;

public class BookAction extends ActionSupport {
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;
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
			if (bs.deleteBook(id)) {
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
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String id = ServletActionContext.getRequest().getParameter("id");
		String name = ServletActionContext.getRequest().getParameter("name");
		String author = ServletActionContext.getRequest()
				.getParameter("author");
		String content = ServletActionContext.getRequest().getParameter(
				"content");
		String recommend = ServletActionContext.getRequest().getParameter(
				"recommend");
		String cover = ServletActionContext.getRequest().getParameter("cover");
		String catalog = ServletActionContext.getRequest().getParameter(
				"catalog");
		String status = ServletActionContext.getRequest()
				.getParameter("status");

		Book book = bs.selectBookById(id);
		JSONObject json = new JSONObject();
		if (book != null) {
			book.setId(id);
			book.setName(name);
			book.setAuthor(author);
			book.setContent(content);
			book.setRecommend(recommend);
			book.setCover(cover);
			book.setCatalog(catalog);
			book.setStatus(new Byte(status));

			try {
				if (bs.updateBook(book)) {
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
		String name = ServletActionContext.getRequest().getParameter("name");
		String author = ServletActionContext.getRequest()
				.getParameter("author");
		String content = ServletActionContext.getRequest().getParameter(
				"content");
		String recommend = ServletActionContext.getRequest().getParameter(
				"recommend");
		String cover = ServletActionContext.getRequest().getParameter("cover");
		String catalog = ServletActionContext.getRequest().getParameter(
				"catalog");
		String status = ServletActionContext.getRequest()
				.getParameter("status");
		Book book = new Book();
		book.setName(name);
		book.setAuthor(author);
		book.setContent(content);
		book.setRecommend(recommend);
		book.setCover(cover);
		book.setCatalog(catalog);
		book.setStatus(new Byte(status));
		try {
			ServletActionContext.getRequest().setCharacterEncoding("gbk");
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		try {
			if (bs.addBook(book)) {
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
			Map<String, Object> result = bs.selectAllBook(name, start, limit);
			List<Book> bookList = (List<Book>) result.get("bookList");
			for (Book book : bookList) {
				JSONObject jsonTemp = new JSONObject();
				jsonTemp.put("id", book.getId());
				jsonTemp.put("name", book.getName());
				jsonTemp.put("author", book.getAuthor());
				jsonTemp.put("content", book.getContent());
				jsonTemp.put("create_time", sf.format(book.getCreateTime()));
				jsonTemp.put("update_time", sf.format(book.getUpdateTime()));
				jsonTemp.put("recommend", book.getRecommend());
				jsonTemp.put("cover", book.getCover());
				jsonTemp.put("reader", book.getReader());
				jsonTemp.put("focus", book.getFocus());
				jsonTemp.put("catalog", book.getCatalog());
				jsonTemp.put("score", book.getScore());
				jsonTemp.put("status", book.getStatus());
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

	public BookService getBs() {
		return bs;
	}

	public void setBs(BookService bs) {
		this.bs = bs;
	}

}
