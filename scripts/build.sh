#!/bin/sh

copy_to_clipboard() {
  if type pbcopy >/dev/null 2>&1; then
    pbcopy < dist/index.user.js;
    echo "[pbcopy] copied dist/index.user.js to clipboard.";
    return;
  fi

  if type clip >/dev/null 2>&1; then
    cat dist/index.user.js | clip;
    echo "[clip] copied dist/index.user.js to clipboard.";
    return;
  fi
}
copy_to_clipboard;
