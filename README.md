# Angular Installation
Before installing Angular, please make sure that you have the following installed on your system:

Angular CLI version 16.0.1
Node.js version 18.10.0
npm package manager version 8.19.2
To install Angular, you can use the following command:

`npm install -g @angular/cli@16.0.1`

This will install Angular CLI globally on your system.

After that, run `npm install` to install the required dependencies for your Angular project. Once the installation is complete, you can start the development server by running `ng serve` or `npm run start` command in your terminal. This will compile your project and serve it on `http://localhost:4200/`. You can then open your web browser and navigate to this URL to view your Angular application in action.

# Environment

The application has two local environments: development and staging, both of which can be accessed at `http://localhost:4200`. To switch between the two environments, simply modify the `environment.prod.ts` file in the `src/environments` folder, respectively.

In addition to the local environments, the application is also deployed to a production environment, which can be accessed at `https://inspiring-tanuki-6c7233.netlify.app`. This environment is automatically built and deployed whenever a new commit is pushed to the main branch on GitHub.

To build the application for production, run the following command:

`npm run build-production`

This will compile the application and generate a set of static files in the `dist\employee` folder, which can then be uploaded to a hosting provider or served using a static file server.

For more information on how to develop and deploy Angular applications, please refer to the Angular documentation or the community.

# Admin Login

To access the admin panel, please use the following credentials:

Username: admin
Password: P@ssw0rd

These credentials are case-sensitive and should be used for demonstration purposes only. It is recommended that you change the username and password before deploying your application to a production environment to ensure security.

