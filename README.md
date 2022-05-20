# Shopify-Inventory-App-Challenge
An inventory web app to demonstrate my back end skills made for the Shopify intern hiring challenge

## Description

Hey there! This project is a simple web based app that can track your inventory. It includes features to add , delete , edit , view and create shipments. 
I haved used Express JS framework to implement a js based backend . The database is deployed online through MongoDB Atlas. I have used Mongoose for connecting Express and MongoDB. 

## Getting Started
The entry point file to run the program has been named app.js on GitHub . If you access it through the below provided link on Replit , it has been renamed to index.js since Replit requires it.

### Home Page

* This page contains an index of all the navigable pages namely "View" , "Add" , "Delete" , "Update" , "Ship Items" .
* View : To view a list of all items in inventory
* Add : To add items to the inventory
* Delete : To delete items from the inventory
* Update : To update items in the inventory
* Ship Items : To create a shipment and ship items 

### View

* A list view of all items in the inventory
* It contains fields Serial_No(Unique identification key) , Name (of product) , Quantity(No of units in inventory) , Category, Price(of 1 unit), Seller(Seller of the product)

### Delete

* Enter the serial number of the product that you wish to delete by referring to the view page
* Click on the delete button to delete the product from the database

### Update 

* Enter the serial no. of the product you want to update
* It is mandatory to enter the name field which can be substituted for some other field in the future
* The quantity and seller fields are not compulsory to be updated
* There is no option to update Category or Price as these are inherent to a product. 

### Ship Items

* This is a feature that allows the user to create a shipment of maximum 10 different products and ship them. 
* Enter the serial nos for each product along with their quantity to be shipped . 
* If the quantity is higher than the present inventory then the shipment will not proceed for the particular item.
* If the desired shipping quantity is equal to the existing inventory then the product will be deleted after the shipment.

## Try the app here:
https://replit.com/@JayKay7/Shopify-Inventory-App-Challenge#index.js

## Authors

Feel free to connect here:

Jayant Kishnani   
[(https://twitter.com/LMAOpartyay)]
