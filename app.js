const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5500

// middleware
app.use(express.static(path.resolve(__dirname, 'client')))

// Отправка статического документа на клиент
app.get('/', (req,res)=>{
	res.sendFile(path.resolve(__dirname, 'client', 'form.html'))
})


app.listen(PORT, ()=>{
	console.log(`Server started at port ${PORT}`)
})