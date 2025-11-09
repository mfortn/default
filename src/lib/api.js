// src/lib/api.js
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8086' // عدّل المنفذ حسب بيئتك

export const api = axios.create({
  baseURL: API,
  withCredentials: true,           // ضروري لـ Sanctum
  xsrfCookieName: 'XSRF-TOKEN',    // اسم كوكي CSRF الافتراضي في Laravel
  xsrfHeaderName: 'X-XSRF-TOKEN',  // الهيدر الذي يقرأه Laravel
})

// (اختياري) معالجات أخطاء عامة
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // مثال: لو 401 تقدر تنظّف جلسة المستخدم من هنا
    return Promise.reject(err)
  }
)
