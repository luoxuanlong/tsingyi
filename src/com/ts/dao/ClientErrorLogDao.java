package com.ts.dao;

import java.util.List;

import com.ts.model.ClientErrorLog;

public interface ClientErrorLogDao {
	void addClientErrorLog(ClientErrorLog log);
	public List<ClientErrorLog> findByAccountId(String property);
	public List<ClientErrorLog> findBychannelId(String property);
	public List<ClientErrorLog> findBySystemType(String property);
}
