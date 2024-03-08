# Getting Started with Create React App

Hope you're a Developer..


Step - 1 : Open cookbook folder in your preferred IDE

Step - 2 : Open terminal and run npm i : this will install all required packages

Step - 3 : Since you're working in search engine - Install docker application (Search on google and download latest version)

Step - 4 : Open docker / demo aplicatiom in backgroud (FYI: docker compose is an alternative of kubernetics)

Step - 5 : Go back to your IDE, you will see a "docker-compose-typesense.yml", did you found it.

Step - 6 : Great!.. Now Open terminal/ CMD in the above mentioned file location, then run "docker 
    	    pull typesense/typesense:0.25.1" in CMD

Step - 7 : We're confgering typsense server - run "docker-compose up" in CMD

Step - 8 : Good word soldier, You got a server up and running (if there're no issues)

Step - 9 : then uncommend the line 91 to 120 in server.js file 

Step - 10 : then run "npm start"- this will automatically create   
            two collections with recipe name and ingredents -> check config.js file

Step - 11 : Check console (in localhost:3000), you'll see indexed response

Step - 12 : comment the line 91 to 120 in server.js file 

Step - 13 : Make sure step - 12 is done

Step - 14 : For any doubts "https://typesense.org/"


Happy coding !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





