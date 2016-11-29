package com.ts.model;

import java.sql.Timestamp;

public class ClientErrorLog extends AbstractClientErrorLog implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	
	public ClientErrorLog() {
	}

	
	public ClientErrorLog(long uniq_id, String account_id, String channel_id, String client_version,
			String system_type, int error_id, String error_lv, String error_info, Timestamp create_time) {
		super(uniq_id, account_id, channel_id, client_version, system_type, error_id, error_lv, error_info, create_time);
	}
}
