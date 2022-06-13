---
name: Token icon request
about: Issue to request token icon change
title: add token icon
labels: ''
assignees: ''

---

# Request token icon change

- In `src/assets/assetIcons` add your token icon in 64x64 size (only png)
- In `src/assets/assetIcons.index.ts` add and import from icon using token lowercase name and replacing spaces by underscore. Eg: Token Up -> import token_up from "./up-coin.png"
- In icons object add the key and value from your import
