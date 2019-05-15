import cookie from 'react-cookies';

const SESSION_ID_KEY = 'session_id';

class Cookie {
  get(key) {
    return cookie.load(key);
  }

  set(key, value) {
    cookie.save(key, value, { path: '/' });
  }

  del(key) {
    cookie.remove(key, { path: '/' });
  }

  getSessionId() {
    return this.get(SESSION_ID_KEY);
  }

  setSessionId(sessionId) {
    this.set(SESSION_ID_KEY, sessionId);
  }

  clearSessionId() {
    this.setSessionId(null);
    this.del(SESSION_ID_KEY);
  }

}

export default new Cookie();
