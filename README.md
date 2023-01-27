
# Invest-in-Change

Support for ethical investment and fund-raising.

## Website Publishing Process

Production website builds are automated using CI/CD. This lets non-technical staff push changes to the website without the need for a tech team member to manually build on production. There is still a strict process to follow to ensure that no glitches or typos make it to production:

1. Make your edits on a `feature/YYYY-MM/feature-summary` or `bugfix/YYYY-MM/bugfix-summary` branch.  
2. The CI will pick up commits to branches following this naming convention and build that branch on https://test.invest-in-change.com
3. Share the test link around - once you're happy with it, merge your branch into `release`. 
4. The CI will pick up commits to `release` and rebuild the website on the production server.
5. Double check the production website for any errors or glitches. If anything looks wrong and you can't figure out why, ping the sysadmin (@athomson0).

### Notes

* Unlike other GL projects, there is no `master` branch. RC features or bugfixes live in their own branch until they are ready to be released, at which point they are merged straight into the `release` branch.

* **Never** commit directly to `release`. Even minor typos can break templates for example. Always test your edits on the test server, then merge to release once you're happy with the changes.