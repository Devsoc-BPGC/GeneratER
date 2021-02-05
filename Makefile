APP_NAME=GeneratER

# Git commands

# Merge upstream with fork
even:
	git fetch upstream
	git merge upstream/main
	git push origin main

# Push code to local fork.
push:
	git add --all
	git commit
	git push origin main

# Amend files to latest commit
# You have to git add the necessary files before!
amend:
	git commit --amend --no-edit
	git push origin --force
