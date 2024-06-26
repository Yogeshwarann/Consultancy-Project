const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Stripe = require('stripe')

const app = express()
app.use(cors())

app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery' , false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        unique : true
    },
    password : String,
    confirmPassword : String,
    image : String
})

//model
const userModel = mongoose.model("user", userSchema)

//api

app.get("/" , (req, res) =>{
    res.send("Server is running")
})

//signup api
app.post("/signup", async(req, res)=>{
    console.log(req.body)
    const {email} = req.body


    try{
        const result = await userModel.findOne({email : email})

        console.log(result)

        if(result){
            res.send({message : "Email id is already registered", alert : false})
        }
        else{
            const data = userModel(req.body)
            const save = await data.save()
            res.send({message : "Successfully signed up", alert: true})
        }
    }
    catch(err){
        console.log(err)
    }
})

// api login
app.post("/login", async(req, res) =>{
    console.log(req.body)
    const {email} = req.body 
    try{
    const result = await userModel.findOne({email : email})
        if(result){
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            console.log(dataSend)
            res.send({message : "Successfuly Logged In" , alert : true, data : dataSend})
        }
        else{
            res.send({message : "Email not Registered! Please Sign up." , alert : false})
        }
    }
    catch(err){
        console.log(err)
    }
})

// product section
const productSchema = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : Number,
    description : String,
})

const productModel = mongoose.model("product", productSchema)

// save product in database
// api
app.post("/uploadProduct", async(req, res) =>{
    console.log(req.body)
    const data = await productModel(req.body)
    const dataSave = await data.save()

    res.send({message : "Added"})
})

// 
app.get("/product", async(req, res) =>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// Payment Gateway
// console.log(process.env.STRIPE_SECRET_KEY)

console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1NaZ3QSGLPNiaLBBQHWElQ8P"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})
app.delete("/users/:id", async (req, res) => {
    const email = req.params.email;
    try {
        await userModel.findOneAndDelete({ email: email });
        res.send("User deleted successfully");
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal server error");
    }
});
app.delete("/product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        await productModel.findByIdAndDelete(productId);
        res.send("Product deleted successfully");
        console.log("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal server error");
    }
});



app.get("/product", async(req, res) =>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})
app.get("/users",async(req,res)=>{
    const data=await userModel.find({})
    res.send(JSON.stringify(data))
})
// Endpoint to update a product
app.patch("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const updatedFields = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedFields, { new: true });
        res.send(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Internal server error");
    }
});
app.patch("/users/:id",async(req,res)=>{
    const userId=req.params.id;
    const updatedFields=req.body;
    try{
        const updateUser=await userModel.findByIdAndUpdate(userId,updatedFields,{new:true});
        res.send(updateUser);
    }
    catch(err){
        console.error("Error in updating the details");
        res.status(500).send("Internal server error");
    }
})


app.listen(PORT, () => console.log("Server is running at port : " + PORT))