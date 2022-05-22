# ProMan


ProMan is a collaborative work management app designed to track team projects, through the use of cards, assisting team towards completion.

## Tech

ProMan uses a number of open source projects to work properly:

- [JS]
- [HTML]
- [CSS]
- [Python]
- [Flask]
- [PostgreSQL]

## Installation

1. Clone the repo
     ```sh
    git clone git@github.com:R0bert196/ProMan.git
    ```
2. Create a .env from the .env.template and add your details.
   - You will need to get the keys for the Google OAuth2 

3. Create a virual environment
    ```sh
    virtualenv venv
    ```
    
4. Activate the venv
      ```sh
      source venv/bin/activate
      ```

5. Install the requirements
    ```sh
    pip3 install -r requirements.txt
    ```
    
6. Run the proman_sample_data.sql on your newly created DB

7. Run the App and enjoy!
    ```sh
    python3 main.py
    ```





[JS]: https://www.javascript.com/
[HTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[Python]: https://www.python.org/
[Flask]: https://flask.palletsprojects.com/en/2.1.x/
[PostgreSQL]: https://www.postgresql.org/ 

