import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "https://localhost:44310/api/Product/";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  _productsArray: Array<any>;
  _http: HttpClient;
  _produceID: Number;
  _description: String;
  _price: Number;
  _editableDescription: String = "";
  _editablePrice: Number = 0;
  _errorMessage: String = "";
  _editId: Number = null;
  _singleProductNumber: Number = null;
  _singleProductName: string = "";
  _singleProductPrice: Number = 0;
  _firstName: string;
  _lastName: string;

  // Since we are using a provider above we can receive 
  // an instance through a constructor.
  constructor(private http: HttpClient) {
    this._http = http;
    this.getAllProducts();
    this.getFirstLast();
  }

  getAllProducts() {
    let url = BASE_URL
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this._productsArray = result;
      },

        error => {
          // Let user know about the error.
          this._errorMessage = JSON.stringify(error);
        })
  }

  getProduct(id) {
    let url = BASE_URL + id;

    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this._singleProductName = result.description;
        this._singleProductNumber = result.produceID;
        this._singleProductPrice = result.price;
      },

        error => {
          // Let user know about the error.
          this._errorMessage = JSON.stringify(error);
        })
  }

  createProduct() {
    // This free online service receives post submissions.
    this.http.post(BASE_URL,
      {
        Description: this._description,
        Price: this._price,
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getAllProducts();

        },
        // An error occurred. Data is not received. 
        error => {
          this._errorMessage = JSON.stringify(error);
        });
  }

  deleteProduct(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = BASE_URL + _id;
    this.http.delete(url, httpOptions)
      .subscribe(
        // Data is received from the post request.
        (data) => {
          this._errorMessage = data["errorMessage"];
          this.getAllProducts();
        },
        // An error occurred. Data is not received. 
        error => {
          this._errorMessage = JSON.stringify(error);
        });
  }

  updateProduct() {
    // This free online service receives post submissions.
    this.http.put(BASE_URL + "MyEdit",
      {
        ProduceID: this._editId,
        Description: this._editableDescription,
        Price: this._editablePrice,
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("PUT call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getAllProducts();
        },
        // An error occurred. Data is not received. 
        error => {
          this._errorMessage = JSON.stringify(error);
        });
  }

  getFirstLast() {
    let url = BASE_URL + "GetFirstLast"
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this._firstName = result.firstName;
        this._lastName = result.lastName;
      },

        error => {
          // Let user know about the error.
          this._errorMessage = JSON.stringify(error);
        });
  }
}
