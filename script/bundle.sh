# clear
echo "\033[2J"
# version
yarn version --no-git-tag-version --patch
# rollup
yarn rollup --config config/rollup.config.js

node script/replace.js

# copy
if (type pbcopy >/dev/null 2>&1) then
  pbcopy < bundle/index.user.js
  echo "\033[32mcopied \033[1;36mbundle/valkyrie.user.js \033[0;32mto clipboard.\033[0m"
fi
# end
echo ""
