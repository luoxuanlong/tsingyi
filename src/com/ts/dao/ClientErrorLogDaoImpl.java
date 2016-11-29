package com.ts.dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ts.model.ClientErrorLog;

public class ClientErrorLogDaoImpl extends HibernateDaoSupport implements ClientErrorLogDao{

	@Override
	public void addClientErrorLog(ClientErrorLog log) {
		this.getHibernateTemplate().save(log);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClientErrorLog> findByAccountId(String property) {
		return  this.getHibernateTemplate().find("from ClientErrorLog u where u.account_id='"+ property + "'");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClientErrorLog> findBychannelId(String property) {
		return  this.getHibernateTemplate().find("from ClientErrorLog u where u.channel_id='"+ property + "'");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClientErrorLog> findBySystemType(String property) {
		return  this.getHibernateTemplate().find("from ClientErrorLog u where u.system_type='"+ property + "'");
	}

}
