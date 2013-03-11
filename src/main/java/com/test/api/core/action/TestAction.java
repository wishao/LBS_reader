package com.test.api.core.action;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.test.api.common.action.BaseAction;
import com.test.api.common.util.RequestUtil;
import com.test.api.core.service.TestService;


@Controller
public class TestAction extends BaseAction{
	
	
	private TestService testService;

	@Resource
	public void setTestService(TestService testService) {
		this.testService = testService;
	}


	public String execute(){
		//基本参数
		String format = RequestUtil.getString(request, "test", "JSON");
		
		return NONE;
	}
	
}
