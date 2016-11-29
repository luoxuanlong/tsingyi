package com.ts.service;

import java.util.List;

import com.ts.model.ClientErrorLog;

public interface ClientErrorLogService {

	void addClientErrorLog(ClientErrorLog log);
	List<ClientErrorLog> findByProperty(String propertyName, String value);
}
