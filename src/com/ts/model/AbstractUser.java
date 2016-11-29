package com.ts.model;

import java.sql.Timestamp;
import java.util.Date;

/**
 * AbstractUser entity provides the base persistence definition of the User
 * entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractUser implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String username;
	private String password;
	private Integer sex;
	private Date birthday;
	private String education;
	private String job;
	private String friends;
	private String pic;
	private String hobby;
	private String province;
	private String city;
	private String telphone;
	private String mobilephone;
	private String email;
	private String address;
	private Integer post;
	private String message;
	private Date regdatetime;

	// Constructors

	/** default constructor */
	public AbstractUser() {
	}

	/** full constructor */
	public AbstractUser(String username, String password, Integer sex,
			Date birthday, String education, String job, String friends,
			String pic, String hobby, String province, String city,
			String telphone, String mobilephone, String email, String address,
			Integer post, String message, Timestamp regdatetime) {
		this.username = username;
		this.password = password;
		this.sex = sex;
		this.birthday = birthday;
		this.education = education;
		this.job = job;
		this.friends = friends;
		this.pic = pic;
		this.hobby = hobby;
		this.province = province;
		this.city = city;
		this.telphone = telphone;
		this.mobilephone = mobilephone;
		this.email = email;
		this.address = address;
		this.post = post;
		this.message = message;
		this.regdatetime = regdatetime;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getSex() {
		return this.sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getEducation() {
		return this.education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getJob() {
		return this.job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public String getFriends() {
		return this.friends;
	}

	public void setFriends(String friends) {
		this.friends = friends;
	}

	public String getPic() {
		return this.pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public String getHobby() {
		return this.hobby;
	}

	public void setHobby(String hobby) {
		this.hobby = hobby;
	}

	public String getProvince() {
		return this.province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getTelphone() {
		return this.telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	public String getMobilephone() {
		return this.mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getPost() {
		return this.post;
	}

	public void setPost(Integer post) {
		this.post = post;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getRegdatetime() {
		return this.regdatetime;
	}

	public void setRegdatetime(Date date) {
		this.regdatetime = date;
	}

}