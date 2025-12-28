import {z} from "zod";
const express = require("express");

const app = expres();

const schema = z.array(Zod.number());

app.use(express.json());

app.post("/health-checkup",function(req,res){
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    res.send({
        response
    })
});

app.listen(3000);
