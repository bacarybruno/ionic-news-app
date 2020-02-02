<h1 align="center">Welcome to ionic-news-app 👋</h1>

> A news app built with Ionic/Angular and using Wordpress REST API

<div style="text-align: center">
    <table>
        <tr>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-01.png" height="400">
            </td>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-02.png" height="400">
            </td>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-03.png" height="400">
            </td>
        </tr>
            <tr>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-04.png" height="400">
            </td>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-05.png" height="400">
            </td>
            <td style="text-align: center">
                <img src="https://github.com/bacarybruno/ionic-news-app/blob/master/screenshots/ionic-news-app-06.png" height="400">
            </td>
        </tr>
    </table>
</div>

## Install

```sh
npm install
```

## Configuration

Open the `articles.ts` file inside `src/app/providers` folder.

```ts
baseUrl: string = ""; // wp-api url
```

Enter the value of your wordpress website base url in the following format : `<ROOT_URL>/wp-json/wp/v2/`.

Then on the same file, replace the `loadCategories` method by returning the categories you want to display in the app.

```ts
return [{
   "id": 0,
   "name": "Accueil",
   "index": 0 
}]
```

Your can get your wordpress blog category list by browsing this url : `<ROOT_URL>/wp-json/wp/v2/categories/`.

## Usage

**Build**

```sh
npm run ionic:build
```

**Run**

```sh
npm run ionic:serve
```

## Author

👤 **bacarybruno**

* Github: [@bacarybruno](https://github.com/bacarybruno)
* LinkedIn: [@bacarybruno](https://linkedin.com/in/bacarybruno)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2017 [bacarybruno](https://github.com/bacarybruno).<br />

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_