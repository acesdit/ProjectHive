# Django Simple Web Cart
**Contributor:** Tryxns

## Description
Simple Web Cart built on Django

Setup Steps:
1. Make sure your machines has installed Python3
2. Extract the folder into the desired directory
3. Open terminal, Enter the (extracted) folder directory via terminal
4. run this command for installation, please wait it unntil complete:
	pip install -r requirements.txt

5. Run this command to initiate the Databases:
	python manage.py migrate
	
6. Run this command for seeding (fill DB with initial data) the DB:
	python manage.py loaddata product_seed

7. Run this command to start the local web server:
	python manage.py runserver
	
8. After previous step, the application supposed to be usable & callable with url & port (http://localhost:8000)
You can get Available login account in file logins.txt

