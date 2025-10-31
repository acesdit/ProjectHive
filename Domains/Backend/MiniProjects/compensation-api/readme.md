# Compensation API
**Contributor:** Tryxns

## Description
Compensation API is a mini API which consume data from CSV file & present it as JSON.

## Tech Stack
1. **Node.js** 

## ✨ Main Features ✨
1. Stand-alone API: this API can work independently without any database.
2. Filter by multiple field values: It able to filter dataset by values of multiple fields
3. Sorting: Currently you can sort only a single field (any single field, you choose one)
4. Field selection: You are able to choose the shown / displayed fields in the JSON response
5. Automatic query parameters mapping: This API can adapt any new column / field in the csv file and generate an URL-friendly query parameter for it. This feature makes this API easy to extend in the future, no need to touch the code just for parameter mapping adjustment.

## ⚙️ The Available Query Parameters
All column headers of the CSV dataset are the available query parameters, they complied the following naming convention:
   - replace space (" ") character with underscore ("_")
   - remove all punctuations
   - lowercase all characters

## 🚀 Getting Started / How to use
1. Clone this repository into your local
   ```bash  
   git clone git@github.com:Tryxns/compensation-api.git
   ```  
2. Install the prerequisites

   Enter the project directory and run this command:
   ```bash  
   npm install
   ``` 
3. Turn on the API
   ```bash  
   npm start
   ```
4. Usage with examples
   - Base URL default response (**Sample dataset: salary_survey-2.csv**)

     [http://localhost:3000/compensation]
     <img width="1919" height="911" alt="Screenshot from 2025-07-14 10-18-50" src="https://github.com/user-attachments/assets/e36c408c-f863-4c6a-8147-7111d3417745" />

   - Filters(multi-fields)

     [http://localhost:3000/compensation?employment_type=Contractor&are_you_happy_at_your_current_position=Yes&industry_in_company=IT]
     <img width="1920" height="912" alt="Screenshot from 2025-07-14 10-24-39" src="https://github.com/user-attachments/assets/aad08a28-73fd-45bc-bd7b-3c705915bf3e" />

   - Sorting (ascending only)

     [http://localhost:3000/compensation?sort=total_base_salary_in_2018_in_usd]
     <img width="1920" height="871" alt="Screenshot from 2025-07-14 10-32-55" src="https://github.com/user-attachments/assets/d463ccbf-5397-4dac-b24f-b0908332dd60" />

   - Field Selection
     
     [http://localhost:3000/compensation?fields=job_title_in_company,years_experience_in_industry,job_ladder,job_level]
     <img width="1920" height="871" alt="Screenshot from 2025-07-14 10-39-32" src="https://github.com/user-attachments/assets/e92024df-24ed-4068-ac86-7eeb9fa482b8" />

   - All feature stacked (the result complies with all applied constraints) 

     [http://localhost:3000/compensation?employment_type=Contractor&sort=total_base_salary_in_2018_in_usd&fields=job_title_in_company,employment_type,total_base_salary_in_2018_in_usd]
     <img width="1920" height="867" alt="Screenshot from 2025-07-14 10-49-57" src="https://github.com/user-attachments/assets/1ff37ca7-189a-4274-88fb-033b08d10a92" />

