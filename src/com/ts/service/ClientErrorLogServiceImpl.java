package com.ts.service;

import java.util.ArrayList;
import java.util.List;

import com.ts.dao.ClientErrorLogDao;
import com.ts.model.ClientErrorLog;

public class ClientErrorLogServiceImpl implements ClientErrorLogService{

	private ClientErrorLogDao logDao;
	
	public ClientErrorLogDao getLogDao() {
		return logDao;
	}

	public void setLogDao(ClientErrorLogDao logDao) {
		this.logDao = logDao;
	}

	@Override
	public void addClientErrorLog(ClientErrorLog log) {
		logDao.addClientErrorLog(log);
	}

	@Override
	public List<ClientErrorLog> findByProperty(String propertyName, String value) {
		int key = Integer.parseInt(propertyName);
		switch(key){
		case 1:
			return logDao.findByAccountId(value);
		case 2:
			return logDao.findBychannelId(value);
		case 3:
			return logDao.findBySystemType(value);
		}
		return new ArrayList<>();
	}

}
