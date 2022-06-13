const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51L9mEeSJC9GjB0MpEcCuBiGtKTyMNESm5uHnsdNazEy2IPHpX1TvX0UsSMmgYTksDZ0XVwx9loOcc4ie8TqO5nd700TlXymPBl'
var Secret_Key = 'sk_test_51L9mEeSJC9GjB0Mpr1rRH5mLjWaOIgYc0IYTGCrn2Z4wsVNKu6UcGQ8GCKQeHPYltL7TOBj5nKFdD2h49RULROT700EsHH6cff'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Bompally Harish', 
        address: { 
            line1: 'Main Road, Opposite Gramapanchayat', 
            postal_code: '503114', 
            city: 'Gandhari', 
            state: 'Telangana', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 70,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

app.listen(port, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})