const express = require('express')
const app = express()
const port = 3002
const router = express.Router();
const path = require('path')
const cors = require('cors')
const axios = require('axios')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))





router.get('/', (req, res) => {
    res.render('initpay.ejs')
})

router.post('/initpay', async (req, res) => {
    const { amount, phone, email, ref } = req.body;
    let token = "Lu2o6W1zNnQ0K9l8wEO7QDIl0F7yi5FoAayiXFdS";
    try {
        const response = await axios.post(
            `https://c7drkx2ege.execute-api.eu-west-2.amazonaws.com/payment/initiate?id=w2eOWDJ9be09noJkVQrOKBjDgyNmqd8qXAZMzRxW2w1l647GP53aAYEXLzb35nN4&amount=${amount}&phone=${phone}&email=${email}&backend_url=https://MAIN-DOMIN/[ControllerName]/[Endpoint]&frontend_url=https://www.YOUR_STORE_DOMAIN.com/Redirect_Success_Page&custom_ref=${ref}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        console.log(response.data);
        
        if (response.status === 200) {
            res.redirect(response.data.url);
        } else {
            res.redirect('https://www.google.com');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => console.log(`listening on port ${port}!`))