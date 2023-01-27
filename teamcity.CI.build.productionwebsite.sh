#!/bin/bash
#
# The website is a bit different to other services. On production, release lives on the `release` branch,
# however the latest wwappbase code lives on master. So, all we need to do is:
#
# 1. Checkout `master` in wwappbase, git pull
# 2. Checkout `release` in website, git pull
# 3. Run jerbil
#
# TODO: integrate this into the main build script for alerting if builds fail etc.
cd /home/winterwell/invest-in-change && git checkout release && git pull && jerbil