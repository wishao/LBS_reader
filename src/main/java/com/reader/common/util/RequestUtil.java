package com.reader.common.util;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;


public class RequestUtil {
    public static String getString(HttpServletRequest request, String parm, String defaultValue) {
        String obj = request.getParameter(parm);
        if (obj == null) obj = request.getParameter("amp;" + parm);
        return obj == null ? defaultValue : obj;
    }

    public static String getString(HttpServletRequest request, String parm, String defaultValue, boolean urlEncode) {
        if (urlEncode) {
            return urlDecodeFromExtjs(getString(request, parm, defaultValue));
        } else {
            return getString(request, parm, defaultValue);
        }
    }

    public static long getLong(HttpServletRequest request, String parm, long defaultValue) {
        String obj = request.getParameter(parm);
        if (obj == null) obj = request.getParameter("amp;" + parm);
        try {
            return obj == null ? defaultValue : Long.parseLong(obj);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static int getInt(HttpServletRequest request, String parm, int defaultValue) {
        String obj = request.getParameter(parm);
        if (obj == null) obj = request.getParameter("amp;" + parm);
        try {
            return obj == null ? defaultValue : Integer.parseInt(obj);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static float getInt(HttpServletRequest request, String parm, float defaultValue) {
        String obj = request.getParameter(parm);
        try {
            return obj == null ? defaultValue : Float.parseFloat(obj);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static boolean getBoolean(HttpServletRequest request, String parm, boolean defaultValue) {
        String obj = request.getParameter(parm);
        try {
            return obj == null ? defaultValue : Boolean.parseBoolean(obj);
        } catch (Exception e) {
            return defaultValue;
        }
    }

    public static String urlDecodeFromExtjs(String str) {
        try {
            return java.net.URLDecoder.decode(new String(str.getBytes("iso8859-1"), "utf-8"),   "utf-8");
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }
}
