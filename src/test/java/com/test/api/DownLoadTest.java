package com.test.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class DownLoadTest {

	/**
	 * @param args
	 * @throws MalformedURLException
	 */
	public static void main(String[] args) throws MalformedURLException {
		String url = "http://read.qidian.com/BookReader/2524770.aspx";
		//String url = "http://read.qidian.com/BookReader/2524770,44100214.aspx";
		String content = "";
		HttpURLConnection conn = null;
		try {
			conn = (HttpURLConnection) (new URL(url).openConnection());
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					conn.getInputStream(), "UTF-8"));
			String temp = null;
			StringBuffer buffer = new StringBuffer();
			while ((temp = reader.readLine()) != null) {
				buffer.append(temp);
				//System.out.println(buffer.toString());
			}
			content = buffer.toString();
			System.out.println(content);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != conn)
				conn.disconnect();
		}
	}
}
