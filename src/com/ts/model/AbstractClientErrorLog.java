package com.ts.model;

import java.io.Serializable;
import java.sql.Timestamp;


public abstract class AbstractClientErrorLog implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long uniq_id;

	private String account_id;
	
	private String channel_id;
	
	private String client_version;
	
	private String system_type;

	private int error_id;
	
	private String error_lv;
	
	private String error_info;
	
	private Timestamp create_time;

	public AbstractClientErrorLog() {
	}

	
	
	public AbstractClientErrorLog(Long uniq_id, String account_id, String channel_id, String client_version,
			String system_type, int error_id, String error_lv, String error_info, Timestamp create_time) {
		super();
		this.uniq_id = uniq_id;
		this.account_id = account_id;
		this.channel_id = channel_id;
		this.client_version = client_version;
		this.system_type = system_type;
		this.error_id = error_id;
		this.error_lv = error_lv;
		this.error_info = error_info;
		this.create_time = create_time;
	}



	public Long getUniq_id() {
		return uniq_id;
	}

	public void setUniq_id(Long uniq_id) {
		this.uniq_id = uniq_id;
	}

	public String getAccount_id() {
		return account_id;
	}

	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}

	public String getChannel_id() {
		return channel_id;
	}

	public void setChannel_id(String channel_id) {
		this.channel_id = channel_id;
	}

	public String getClient_version() {
		return client_version;
	}

	public void setClient_version(String client_version) {
		this.client_version = client_version;
	}

	public String getSystem_type() {
		return system_type;
	}

	public void setSystem_type(String system_type) {
		this.system_type = system_type;
	}

	public int getError_id() {
		return error_id;
	}

	public void setError_id(int error_id) {
		this.error_id = error_id;
	}

	public String getError_lv() {
		return error_lv;
	}

	public void setError_lv(String error_lv) {
		this.error_lv = error_lv;
	}

	public String getError_info() {
		return error_info;
	}

	public void setError_info(String error_info) {
		this.error_info = error_info;
	}

	public Timestamp getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Timestamp create_time) {
		this.create_time = create_time;
	}

}