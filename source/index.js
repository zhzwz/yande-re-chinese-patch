import { initStyle } from "./style"
import { initHotKey } from "./hotkey"
import { initOptions } from "./options"
import { initTranslate } from "./translate"


jQuery(document).ready(function() {
  initStyle()
  initHotKey()
  initOptions()
  initTranslate()

})
