package com.ts.action;

import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.ts.model.ClientErrorLog;
import com.ts.service.ClientErrorLogService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;

public class QueryClientLogAction extends ActionSupport{

	private ClientErrorLogService logService;
	
	public String query() throws Exception{
		HttpServletRequest  request= (HttpServletRequest) ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
		String key = request.getParameter("key");//继承id
		String value = request.getParameter("value");//继承id
		
		List<ClientErrorLog> logs = logService.findByProperty(key, value);
		
		HttpServletResponse response = ServletActionContext.getResponse(); 
		response.setContentType("text/html;charset=UTF-8");
		JSONArray array = new JSONArray();
		for(ClientErrorLog log :logs){
			JSONObject object = new JSONObject();
			object.put("userid", log.getAccount_id());
			object.put("channelId", log.getChannel_id());
			object.put("version", log.getClient_version());
			object.put("system", log.getSystem_type());
			object.put("errorid", log.getError_id());
			object.put("errorlv", log.getError_lv());
			object.put("message", log.getError_info());
			object.put("creatime", log.getCreate_time());
			array.add(object);
		}
//		XMLSerializer xmlSerial = new XMLSerializer();  
//        String xml = xmlSerial.write(array);
		PrintWriter out = response.getWriter();
		out.print(array.toString());
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
