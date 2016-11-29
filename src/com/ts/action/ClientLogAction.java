package com.ts.action;

import java.io.PrintWriter;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.ts.model.ClientErrorLog;
import com.ts.service.ClientErrorLogService;


public class ClientLogAction extends ActionSupport {

	private ClientErrorLogService logService;
	
	public String execute() throws Exception{
		HttpServletResponse response = ServletActionContext.getResponse(); 
		response.setContentType("text/html;charset=UTF-8");
		
		ClientErrorLog log = new ClientErrorLog();
		logService.addClientErrorLog(log);
		System.out.println("DDDDXXXXXXXXXXXXDDDDDSFsgsgSGSGSGSD");
		PrintWriter out = response.getWriter();
		out.print("1");
		return null;
	}
	public String save() throws Exception{
		HttpServletRequest  request= (HttpServletRequest) ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
        String userid = request.getParameter("userid");//继承id
		String channelId = request.getParameter("channelId");//渠道id
		String version = request.getParameter("version");//客户端版本
		String system = request.getParameter("system");//系统类型
		Integer id= new Integer(request.getParameter("errorid"));
		int errorid = id.intValue();//错误id
		String errorlv = request.getParameter("errorlv");//等级
		String message = request.getParameter("message");//错误内容
		long realtime = System.currentTimeMillis();
		Timestamp tm = new Timestamp(realtime);
		ClientErrorLog log = new ClientErrorLog(0, userid, channelId, version,
				system, errorid, errorlv, message, tm);
		logService.addClientErrorLog(log);
		
		HttpServletResponse response = ServletActionContext.getResponse(); 
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print("SUCCESS");
		return null;
//		return SUCCESS;//必須在struts.xml的action里配置对应的result页面-<result name="success">index.jsp</result>
		
    }
	public ClientErrorLogService getLogService() {
		return logService;
	}
	public void setLogService(ClientErrorLogService logService) {
		this.logService = logService;
	} 
	
}
