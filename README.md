# Contact App

This project is build by using React Native with Expo. Some of the libraries that I used in this project are:
- Expo
- React Navigation, for routing
- @tanstack/react-query, as data fetcher
- UI Kitten, as UI kit
- Zustand, for state management

## The reason behind the tools

* Zustand
I use Zustand over Redux because of its simplicity. I can persisted the state just using single line of code. The code
structure in Zustand is very simple, also its really lightweight

* @tanstack/react-query
For data-fetching library, I use react-query. It simple, straighforward and battery-included. I can manage cache
easily with react-query. Also, it already provide pending / loading state

## Issues

I faced several issues when working with the API.
I can't update the data by using `PUT`, also can't delete the data by using `DELETE`. Because of that issue, I looking for some
workaround to make this app can working smoothly. For `Edit` and `Delete` features, I just delete the state locally, for now - since
the API is not working well

## Missing Feature

I still not completing the unit test, but will completed it later

## Screenshoot

- Home Page
![Home Page](https://github.com/andreepratama27/contact-app/blob/main/screnshots/home-page.PNG)

- Detail Contact Page
![Detail Contact Page](https://github.com/andreepratama27/contact-app/blob/main/screnshots/detail-page.PNG)

- Detail Contact Page (Favorited)
![Detail Contact Favorited Page](https://github.com/andreepratama27/contact-app/blob/main/screnshots/detail-page-favorited.PNG)

- Create Contact Page
![Create Contact app](https://github.com/andreepratama27/contact-app/blob/main/screnshots/create-page.PNG)

- Edit Contact Page
![Edit Contact Page](https://github.com/andreepratama27/contact-app/blob/main/screnshots/edit-page.PNG)

- Favorited Page
![Favorite Page](https://github.com/andreepratama27/contact-app/blob/main/screnshots/favorite-page.PNG)

## How to Install

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
