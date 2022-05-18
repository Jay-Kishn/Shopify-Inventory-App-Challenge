const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose, Schema } = require("mongoose");
const { forEach } = require("async");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const products=[];

mongoose.connect("mongodb+srv://Jay-Kishnani:passworde@cluster0.mrm71.mongodb.net/productsDB",{useNewUrlParser:true})

const productsSchema = new mongoose.Schema({
    Serial_No: {
        type: Number,
        unique: [true,'This serial no is already used'],
        required:[true , 'Please enter a serial no']
    },
    Name : String,
    Quantity: Number,
    Category: { 
        type: String, 
        enum : ['Clothing','Electronics','Home']
    }, 
    Price:Number,
    Seller:String
});

const Product = mongoose.model("Product",productsSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/add",function(req,res){
    res.render('add')
});

app.get("/view",function(req,res){
    console.log("View log has loaded");
    Product.find(function(err,foundItems){
        if(err){
            console.log(err);
        }else{
            res.render("view",{Products:foundItems})
        }
    })
   
});

app.get("/delete",function(req,res){
    res.render('delete')
});

app.get("/update",function(req,res){
    res.render("update")
});

app.get("/shipment",function(req,res){
    res.render("shipment");
});



app.post("/add",function(req,res){
    const product = new Product({Serial_No:req.body.postSerialNo,
        Name: req.body.postName,Quantity:req.body.postQuantity,Category:req.body.postCategory,Price:req.body.postPrice,Seller:req.body.postSeller});

    product.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/add");
        }
    })
});

app.post("/delete",function(req,res){
    const serial = req.body.postSerialNo;

    Product.findOneAndDelete({ Serial_No: serial },function(err){
        if(err){
            console.log("An error occured please try again!")
        }else{
            console.log("Item deleted")
            res.redirect("/delete")
        }
    })
})

app.post("/update",function(req,res){
    const serial = req.body.postSerialNo;
    const name = req.body.postName;
    const qty = req.body.postQuantity;
    const seller = req.body.postSeller;

    if(name != ""){
    Product.findOneAndUpdate({Serial_No: serial},{Name : name},function(err){
        if(err){
            console.log("An error occured please try again")
        }else{
            console.log("Posted Successfully")
            res.redirect("/update")
        }
    })
    }

    if(qty != ""){
        Product.findOneAndUpdate({Serial_No: serial},{Quantity : qty},function(err){
            if(err){
                console.log("An error occured please try again")
            }else{
                console.log("Posted Successfully")
                res.redirect("/update")
            }
        })
        }

    if(seller != ""){
    Product.findOneAndUpdate({Serial_No: serial},{Seller : seller},function(err){
        if(err){
            console.log("An error occured please try again")
        }else{
            console.log("Posted Successfully")
            res.redirect("/update")
        }
    })
    }    

})

app.post("/shipment",function(req,res){
    function nullfunction(a,b){
     if(a !== ""){
          b = a;
     }
     else{
         b = 0;
    }
    return b;
    }
    let sn1, sn2, sn3,sn4,sn5,sn6,sn7,sn8,sn9;
    let qty1,qty2,qty3,qty4,qty5,qty6,qty7,qty8,qty9;

    sn1 = nullfunction(req.body.postSerialNo1, sn1);
    sn2 = nullfunction(req.body.postSerialNo2, sn2);
    sn3 = nullfunction(req.body.postSerialNo3, sn3);
    sn4 = nullfunction(req.body.postSerialNo4, sn4);
    sn5 = nullfunction(req.body.postSerialNo5, sn5);
    sn6 = nullfunction(req.body.postSerialNo6, sn6);
    sn7 = nullfunction(req.body.postSerialNo7, sn7);
    sn8 = nullfunction(req.body.postSerialNo8, sn8);
    sn9 = nullfunction(req.body.postSerialNo9, sn9);

    qty1 = req.body.postQty1;
    qty2 = req.body.postQty2;
    qty3 = req.body.postQty3;
    qty4 = req.body.postQty4;
    qty5 = req.body.postQty5;
    qty6 = req.body.postQty6;
    qty7 = req.body.postQty7;
    qty8 = req.body.postQty8;
    qty9 = req.body.postQty9;

    const Serials = [sn1,sn2,sn3,sn4,sn5,sn6,sn7,sn8,sn9];
    const Quantities = [qty1, qty2, qty3, qty4, qty5, qty6, qty7, qty8, qty9];
    const Orig_Quant =[]
    let qu;



for(let i = 0;i<Serials.length ; i++){
    let orig_qty;
        if(Serials[i]!=0){
            Product.findOne({Serial_No:Serials[i]},{_id:0,Quantity:1},function(err,doc){
                if(err){
                    console.log(err);
                }else{
                    orig_qty = doc.Quantity;
                    let new_qty = orig_qty - Quantities[i] ;
                    if(new_qty < 0){
                      console.log("The shipment cannot be completed due to stock shortage");
                    }
                    else if(new_qty == 0){
                        Product.findOneAndDelete({ Serial_No: Serials[i] },function(err){
                            if(err){
                                console.log("An error occured please try again!")
                            }else{
                                console.log("Item deleted")
                            }
                        })
                    } else{
                    Product.findOneAndUpdate({Serial_No:Serials[i]},{Quantity:new_qty},function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Shipped Item");
                           
                        }
                    })
                }
            }
        }
)}
    }

    res.redirect("/shipment");
});           
            
        

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

