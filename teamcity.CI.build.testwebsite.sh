#!/bin/bash
ssh winterwell@baker.good-loop.com bash <<EOF 
/home/winterwell/config/build-scripts/builder.sh \
BUILD_TYPE="CI" \
PROJECT_NAME="invest-in-change" \
GIT_REPO_URL="github.com:good-loop/invest-in-change" \
PROJECT_ROOT_ON_SERVER="/home/winterwell/invest-in-change" \
PROJECT_USES_BOB="no" \
PROJECT_USES_NPM="no" \
PROJECT_USES_WEBPACK="no" \
PROJECT_USES_JERBIL="yes" \
PROJECT_USES_WWAPPBASE_SYMLINK="no"
EOF
