export const SPLASH_SEEN_STORAGE_KEY = "milagros-splash-seen";
export const SPLASH_SEEN_ATTRIBUTE = "data-splash-seen";
export const SPLASH_VISIBLE_DURATION_MS = 500;
export const SPLASH_SEEN_SCRIPT = `try{if(sessionStorage.getItem("${SPLASH_SEEN_STORAGE_KEY}")){document.documentElement.setAttribute("${SPLASH_SEEN_ATTRIBUTE}","")}}catch(e){}`;
