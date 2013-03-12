package com.reader.core.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.reader.common.action.BaseAction;
import com.reader.common.util.RequestUtil;
import com.reader.core.service.TestService;

@Controller
public class TestAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5514917824647614358L;
	private TestService testService;

	@Resource
	public void setTestService(TestService testService) {
		this.testService = testService;
	}

	public String execute() {
		// 基本参数
		String format = RequestUtil.getString(request, "test", "JSON");

		return NONE;
	}

}
