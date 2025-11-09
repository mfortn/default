// src/stores/auth.js
import { defineStore } from 'pinia'
import { api } from '../lib/api'

const USER_ENDPOINT = '/api/user' // عدّلها إلى '/user' إن كان مسارك مختلف

function getCookie(name) {
    const m = document.cookie.match('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    return m ? decodeURIComponent(m[1]) : null
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
        error: '',
        ready: false,      // نستخدمها لمعرفة متى انتهى الفحص الأولي للجلسة
    }),

    getters: {
        isAuthenticated: (s) => !!s.user,
    },

    actions: {
        async csrf() {
            await api.get('/sanctum/csrf-cookie')
        },

        async fetchUser() {
            try {
                const { data } = await api.get(USER_ENDPOINT)
                this.user = data
                this.error = ''
            } catch (e) {
                this.user = null
            } finally {
                this.ready = true
            }
        },

        async initSession() {
            // يستدعى مرّة عند بدء التطبيق (بعد refresh)
            // بعض الإعدادات لا تحتاج csrf هنا، لكن لا يضر
            try { await this.csrf() } catch { }
            await this.fetchUser()
        },

        async login({ email, password, remember = false }) {
            this.loading = true
            this.error = ''
            try {
                await this.csrf()
                await api.post('/login', { email, password, remember }, {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    },
                })
                await this.fetchUser()
                return true
            } catch (e) {
                const status = e.response?.status
                const data = e.response?.data
                if (status === 422 && data?.errors) {
                    const first = Object.values(data.errors)[0]
                    this.error = Array.isArray(first) ? first[0] : data.message || 'خطأ تحقق'
                } else if (status === 419) {
                    this.error = 'CSRF token غير صالح. حدّث الصفحة.'
                } else if (status === 401) {
                    this.error = 'بيانات دخول غير صحيحة.'
                } else {
                    this.error = data?.message || 'تعذّر تسجيل الدخول.'
                }
                return false
            } finally {
                this.loading = false
            }
        },

        async register({ name, email, password, password_confirmation }) {
            this.loading = true
            this.error = ''
            try {
                await this.csrf()
                await api.post('/register', { name, email, password, password_confirmation }, {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    },
                })
                await this.fetchUser()
                return true
            } catch (e) {
                const status = e.response?.status
                const data = e.response?.data
                if (status === 422 && data?.errors) {
                    const first = Object.values(data.errors)[0]
                    this.error = Array.isArray(first) ? first[0] : data.message || 'خطأ تحقق'
                } else {
                    this.error = data?.message || 'تعذّر إنشاء الحساب.'
                }
                return false
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                // لضمان CSRF بعد refresh
                await this.csrf()
                await api.post('/logout', null, {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    },
                })
            } catch { }
            this.user = null
        },
    },
})
