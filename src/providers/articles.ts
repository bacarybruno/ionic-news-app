import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

@Injectable()
export class Articles {
  bookmarksStorageName: string = "bookmarks";
  cacheStorageName: string = "cache";
  data: any;
  baseUrl: string = ""; // wp-api url
  per_page: number = 10;
  constructor(private http: Http, private socialSharing: SocialSharing, private toastCtrl: ToastController, private storage: Storage) {}

  loadData(id: number, page: number) {
    console.log("Loading data", id, page);
    return new Promise ((resolve, reject) => {
      let httpString = this.baseUrl + "posts?per_page=" + this.per_page + "&page=" + page + "&orderby=modified&_embed" + (id > 0 ? "&categories=" + id : "");
      this.http.get(httpString)
      .subscribe(data => {
          let json = data.json();
          json.map(j => this.formatArticle(j, id));
          resolve(json);
          this.setArticlesCache(json);
      }, (error) => {});
    });
  }

  formatArticle(j, id) {
    j.banner = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACgAQMAAACMtsMhAAAABlBMVEX19fX////R6i7PAAAAcklEQVR4Xu3SMQqAMBBEUW/m0Uyl18pRcoSUFourYGrZYmAj/F+/apglOyIiWv1pl7KjSFmNsS5lJmVXjHmRsiZlPcZMylzLSow1KTulzGLMtax+s2eJse18zEc1kcHay7dUlj8IjCPBeMjvGGz+iIjoBqGUX7zUrzEEAAAAAElFTkSuQmCC";
    if(j._embedded["wp:featuredmedia"] && j._embedded["wp:featuredmedia"][0] && j._embedded["wp:featuredmedia"]["0"].media_details) {
      j.banner = j._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url;
      j.thumbnail = j._embedded["wp:featuredmedia"]["0"].media_details.sizes.thumbnail.source_url;
    }
    j.category = this.loadCategory(id);
    j.author = j._embedded["author"]["0"];
    j.comments = j._embedded["replies"] || [];
    let adTagRegex = /^\((.*?)\)/;
    let decodedRegex = j.title.rendered.match(adTagRegex);
    j.adTag = decodedRegex ? decodedRegex[1] : null;
    j.title.rendered = j.title.rendered.replace(adTagRegex, "");
  }

  searchArticles(query: string, page: number) {
    return new Promise ((resolve, reject) => {
      return this.http.get(this.baseUrl + "posts?search=" + query + "&per_page=" + this.per_page + "&page=" + page + "&orderby=relevance&_embed").subscribe(data => {
          let json = data.json();
          json.map(j => {
            j.banner = j._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url;
            j.category = this.loadCategory(-1);
            j.author = j._embedded["author"]["0"];
            j.comments = j._embedded["replies"] || [];
          });
          resolve(json);
      });
    });
  }

  loadCategories() {
    return [{
        "id": 0,
        "name": "Accueil",
        "index": 0 
    },
    {
      "id": 10,
      "name": "Videos",
      "index": 7
    },
    {
        "id": 1,
        "name": "News",
        "index": 1
    },
    {
        "id": 2,
        "name": "Buzz",
        "index": 2
    },
    {
        "id": 5,
        "name": "People",
        "index": 3
    },
    {
        "id": 7,
        "name": "Sport",
        "index": 4
    },
    {
        "id": 8,
        "name": "Confessions",
        "index": 5
    },
    {
        "id": 35,
        "name": "International",
        "index": 6
    }];
  }

  loadCategory(id) {
    if(id === -3) return { "id": -3, "name": "Notification", "index": 10 };
    if(id === -2) return { "id": -2, "name": "Article similaire", "index": 9 }; 
    if(id === -1) return { "id": -1, "name": "Résultat de recherche", "index": 8 }; 
    if(id === 0) return { "id": 0, "name": "Accueil", "index": 0 }; 
    return this.loadCategories().find(category => category.id === id);
  }

  share(item) {
    this.socialSharing.share(item.title.rendered.decodeHtml(), "SunuBuzz", null, item.link).then(() => {
       let toast = this.toastCtrl.create({
          message: "Article partagé.",
          duration: 3000
        });
        toast.present();
    }).catch(() => {
        let toast = this.toastCtrl.create({
          message: "Erreur lors du partage.",
          duration: 3000
        });
        toast.present();
    });
  }



  getBookmarks() {
    return new Promise((resolve, reject) => {
      return this.storage.get(this.bookmarksStorageName).then(res => {
        res = res || [];
        if(!Array.isArray(res)) res = Array(res);
        resolve(res);
      });
    });
  }

  getArticlesCache() {
    return new Promise((resolve, reject) => {
      return this.storage.get(this.cacheStorageName).then(res => {
        res = res || [];
        resolve(res);
      });
    });
  }

  setArticlesCache(cache) {
    return new Promise((resolve, reject) => {
      return this.storage.set(this.cacheStorageName, cache).then(res => {
        resolve();
      });
    });
  }


  // Save an article
  save(item) {
    return new Promise ((resolve, reject) => {
       this.getBookmarks().then((bookmarks: any) => {
          bookmarks.push(item);
          return this.storage.set(this.bookmarksStorageName, bookmarks);
       }).then(() => {
          let toast = this.toastCtrl.create({
            message: "Article sauvegardé",
            duration: 3000
          });
          toast.present();
          resolve ("Article sauvegardé");
       });
    });
  }

  // Unsave an article
  remove(item) {
    return new Promise ((resolve, reject) => {
       this.getBookmarks().then((bookmarks: any) => {
          let bookmark = bookmarks.find(b => b.id !== item.id);
          return this.storage.set(this.bookmarksStorageName, bookmark);
       }).then(() => {
          let toast = this.toastCtrl.create({
            message: "Article retiré",
            duration: 3000
          });
          toast.present();
          resolve ("Article retiré");
       });
    });
  }

  comment(postId, name, email, comment) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + "comments", {
        "author_email": email,
        "author_name": name,
        "content": comment,
        "date": new Date().toISOString(),
        "date_gmt": new Date().toISOString(),
        "post": postId
      }).map(res => res.json()).subscribe((result) => {
          resolve(result);
      }, (error) => {
          let result = JSON.parse(error._body);
          let messageErreur = "";
          if(result.data.params.author_email) messageErreur = result.data.params.author_email.decodeHtml();
          else if(result.data.params.date) messageErreur = result.data.params.date.decodeHtml();
          else if(result.data.params.date_gmt) messageErreur = result.data.params.date_gmt.decodeHtml();
          else if(result.message) messageErreur = result.message.decodeHtml();
          reject(messageErreur);
      });
    })
  }

  sendMail(argName, argFrom, argMessage) {
    return new Promise((resolve, reject) => {
      this.http.post("", {
        name: argName,
        from: argFrom,
        message: argMessage
      })
      .map(res => res.json())
      .subscribe(() => {
        resolve("success");
      });
    });
  }


  getRelatedPosts(argPost) {
    return new Promise((resolve, reject) => {
      if(argPost.tags.length === 0) return reject("No tags");
      this.http.get(this.baseUrl + "posts?&_embed&tags=" + argPost.tags.join())
      .map(res => res.json())
      .subscribe(data => {
        data = data.filter(d => d.id !== argPost.id);
        data.map(d => this.formatArticle(d, -2));
        if(data.length === 0) return reject("No related posts");
        return resolve(data);
      }, () => {
        return reject("uncaugh error");
      });
    });
  }

  getPost(argId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "posts/" + argId + "?&_embed")
      .map(res => res.json())
      .subscribe(data => {
        if(data.length === 0) return reject("No related posts");
        this.formatArticle(data, -3);
        console.log(data);
        return resolve(data);
      }, err => {
        return reject(err);
      });
    });
  }
}
