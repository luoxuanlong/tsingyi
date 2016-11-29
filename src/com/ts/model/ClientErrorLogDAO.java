package com.ts.model;

import java.util.List;
import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A data access object (DAO) providing persistence and search support for User
 * entities. Transaction control of the save(), update() and delete() operations
 * can directly support Spring container-managed transactions or they can be
 * augmented to handle user-managed Spring transactions. Each of these methods
 * provides additional information for how to configure it for the desired type
 * of transaction control.
 * 
 * @see com.shop.model.User
 * @author MyEclipse Persistence Tools
 */

public class ClientErrorLogDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory.getLogger(ClientErrorLogDAO.class);
	// property constants
	public static final String ACCOUNT_ID = "account_id";
	public static final String CHANNEL_ID = "channel_id";
	public static final String CLIENT_VERSION = "client_version";
	public static final String SYSTEM_TYPE = "system_type";
	public static final String ERROR_ID = "error_id";
	public static final String ERROR_LV = "error_lv";
	public static final String ERROR_INFO = "error_info";

	public void save(ClientErrorLog transientInstance) {
		log.debug("saving ErrorLog instance");
		try {
			getSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(ClientErrorLog persistentInstance) {
		log.debug("deleting User instance");
		try {
			getSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public ClientErrorLog findById(java.lang.Integer id) {
		log.debug("getting User instance with id: " + id);
		try {
			ClientErrorLog instance = (ClientErrorLog) getSession().get("com.ts.model.ClientErrorLog", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding User instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from User as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByUsername(Object username) {
		return findByProperty(CHANNEL_ID, username);
	}

	public List findByPassword(Object password) {
		return findByProperty(ERROR_ID, password);
	}

	public List findByMessage(Object message) {
		return findByProperty(ERROR_INFO, message);
	}

	public List findAll() {
		log.debug("finding all User instances");
		try {
			String queryString = "from User";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public ClientErrorLog merge(ClientErrorLog detachedInstance) {
		log.debug("merging User instance");
		try {
			ClientErrorLog result = (ClientErrorLog) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(ClientErrorLog instance) {
		log.debug("attaching dirty User instance");
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

}