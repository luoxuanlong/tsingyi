package com.ts.core;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;

import org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter;

public class AppFilterInit extends StrutsPrepareAndExecuteFilter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		try {
			super.init(filterConfig);
			System.out.println("DDDDDDDDDDDDDDDSFsgsgSGSGSGSD");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
