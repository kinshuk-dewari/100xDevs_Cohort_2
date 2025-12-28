const express = require("express");
const zod = require("zod");

const app = express();

const schema = zod.array(zod.number());
app.use(express.json());

let i=0;
function ctr(){
  i++;
}

app.post("/health-checkup",ctr, function (req, res) {
  const kidneys = req.body.kidneys;
  const kidneyLength = kidneys.length;
  const response = schema.safeParse(kidneys);

  if(!response.success){
    res.status(411).json({
        msd:"invalid input"
    })
  }
  else {
      //  res.render('index',{message : kidneyLength});
      res.send("your kidney is: "+kidneyLength +" "+ response);
      console.log(i);
  }
});
app.get("/show",function(req,res){
  const kidneys= req.body.kidney;
  const kidneyLength = kidneys.length;
  res.render('index',{message : kidneyLength});
})
// global catches
app.use(function(err,req,res,next){
    res.json({
        msg:"Sorry somthing went wrong with out website"
    })
})

app.listen(3000);