import { initStyle } from "./style"
import { initHotKey } from "./hotkey"
import { initOptions } from "./options"
import { initTranslate } from "./translate"


jQuery(document).ready(function() {
  initStyle()
  initHotKey()
  initOptions()
  initTranslate()

  if (document.cookie.includes('locale=zh_CN') === false) {
    document.cookie = "locale=zh_CN"
    location.href = location.href
  }

})
