(function () {
  if (window.__PHAETEX_CHAT_WIDGET_LOADED__) return;
  window.__PHAETEX_CHAT_WIDGET_LOADED__ = true;

  function getScriptEl() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var s = scripts[i];
      if (s && s.src && s.src.indexOf("/widget.js") !== -1) return s;
    }
    return document.currentScript;
  }

  var scriptEl = getScriptEl();
  var backendUrl = (scriptEl && scriptEl.getAttribute("data-backend-url")) || "";
  if (!backendUrl) {
    try {
      var u = new URL(scriptEl.src);
      backendUrl = u.origin;
    } catch (e) {
      backendUrl = "http://localhost:4000";
    }
  }

  var title = (scriptEl && scriptEl.getAttribute("data-title")) || "Chat with Phaetex";
  var position = ((scriptEl && scriptEl.getAttribute("data-position")) || "right").toLowerCase();
  if (position !== "left") position = "right";

  var root = document.createElement("div");
  root.id = "phaetex-chat-widget";
  root.style.all = "initial";
  root.style.position = "fixed";
  root.style.zIndex = "2147483647";
  root.style.bottom = "18px";
  root.style[position] = "18px";
  document.body.appendChild(root);

  var style = document.createElement("style");
  style.textContent =
    "#phaetex-chat-widget *{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}" +
    ".pxw-bubble{width:56px;height:56px;border-radius:999px;background:#2a63ff;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25);}" +
    ".pxw-panel{width:340px;max-width:calc(100vw - 36px);height:460px;max-height:calc(100vh - 120px);border-radius:14px;overflow:hidden;box-shadow:0 18px 55px rgba(0,0,0,.35);border:1px solid rgba(0,0,0,.12);background:#0b1220;color:#e9eefc;display:flex;flex-direction:column;}" +
    ".pxw-header{padding:12px 12px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.12);}" +
    ".pxw-title{font-size:13px;font-weight:600;opacity:.95;}" +
    ".pxw-close{background:transparent;border:0;color:#e9eefc;cursor:pointer;font-size:18px;line-height:1;opacity:.8;}" +
    ".pxw-log{padding:12px;display:flex;flex-direction:column;gap:10px;overflow:auto;flex:1;}" +
    ".pxw-msg{padding:10px 10px;border-radius:12px;max-width:88%;font-size:13px;line-height:1.35;}" +
    ".pxw-me{align-self:flex-end;background:rgba(42,99,255,.22);border:1px solid rgba(42,99,255,.35);}" +
    ".pxw-bot{align-self:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);}" +
    ".pxw-links{margin-top:8px;display:flex;flex-direction:column;gap:6px;}" +
    ".pxw-link{color:#a8c1ff;text-decoration:none;font-size:12px;opacity:.95;}" +
    ".pxw-form{display:flex;gap:8px;padding:10px;background:rgba(0,0,0,.22);border-top:1px solid rgba(255,255,255,.12);}" +
    ".pxw-input{flex:1;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:rgba(0,0,0,.25);color:#e9eefc;padding:10px 10px;outline:none;font-size:13px;}" +
    ".pxw-send{border-radius:10px;border:1px solid rgba(255,255,255,.18);background:#2a63ff;color:#fff;padding:10px 12px;cursor:pointer;font-size:13px;}";
  document.head.appendChild(style);

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var open = false;

  var bubble = el("div", "pxw-bubble");
  bubble.setAttribute("aria-label", "Open chat");
  bubble.innerHTML =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 3C7.03 3 3 6.58 3 11c0 2.27 1.06 4.33 2.78 5.78L5 21l4.56-1.7c.77.22 1.59.34 2.44.34 4.97 0 9-3.58 9-8s-4.03-8.64-9-8.64Z" fill="currentColor"/>' +
    "</svg>";

  var panel = el("div", "pxw-panel");
  panel.style.display = "none";
  var header = el("div", "pxw-header");
  var headerTitle = el("div", "pxw-title", title);
  var closeBtn = el("button", "pxw-close", "×");
  closeBtn.addEventListener("click", function () {
    setOpen(false);
  });
  header.appendChild(headerTitle);
  header.appendChild(closeBtn);

  var log = el("div", "pxw-log");

  var form = el("div", "pxw-form");
  var input = el("input", "pxw-input");
  input.setAttribute("placeholder", "Ask a question…");
  var send = el("button", "pxw-send", "Send");
  form.appendChild(input);
  form.appendChild(send);

  panel.appendChild(header);
  panel.appendChild(log);
  panel.appendChild(form);

  root.appendChild(bubble);
  root.appendChild(panel);

  function addMsg(kind, text, links) {
    var m = el("div", "pxw-msg " + (kind === "me" ? "pxw-me" : "pxw-bot"), text);
    if (links && links.length) {
      var linksEl = el("div", "pxw-links");
      for (var i = 0; i < links.length; i++) {
        var a = el("a", "pxw-link", "For more info: " + (links[i].title || links[i].url));
        a.href = links[i].url;
        a.target = "_blank";
        a.rel = "noreferrer";
        linksEl.appendChild(a);
      }
      m.appendChild(linksEl);
    }
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  async function sendMessage() {
    var msg = (input.value || "").trim();
    if (!msg) return;
    input.value = "";
    addMsg("me", msg);
    send.disabled = true;
    try {
      var res = await fetch(backendUrl.replace(/\/$/, "") + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      var data = await res.json();
      if (!res.ok) throw new Error(data && data.error ? data.error : "Request failed");
      addMsg("bot", data.answer || "Ok.", data.moreInfo || []);
    } catch (e) {
      addMsg("bot", "Sorry — I had trouble connecting to chat.");
    } finally {
      send.disabled = false;
    }
  }

  function setOpen(v) {
    open = v;
    panel.style.display = open ? "flex" : "none";
    bubble.style.display = open ? "none" : "flex";
    if (open) {
      if (!log.childElementCount) addMsg("bot", "Hi! Upload PDFs in admin, then ask me anything.");
      setTimeout(function () {
        input.focus();
      }, 50);
    }
  }

  bubble.addEventListener("click", function () {
    setOpen(true);
  });
  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();

