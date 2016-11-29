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
        String userid = request.getParameter("userid");//�̳�id
		String channelId = request.getParameter("channelId");//����id
		String version = request.getParameter("version");//�ͻ��˰汾
		String system = request.getParameter("system");//ϵͳ����
		Integer id= new Integer(request.getParameter("errorid"));
		int errorid = id.intValue();//����id
		String errorlv = request.getParameter("errorlv");//�ȼ�
		String message = request.getParameter("message");//��������
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
//		return SUCCESS;//�����struts.xml��action�����ö�Ӧ��resultҳ��-<result name="success">index.jsp</result>
		
    }
	public ClientErrorLogService getLogService() {
		return logService;
	}
	public void setLogService(ClientErrorLogService logService) {
		this.logService = logService;
	} 
	
}
