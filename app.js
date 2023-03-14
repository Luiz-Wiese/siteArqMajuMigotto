//---Server Boilerplate---//

const express = require("express");
const app = express();
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const request = require("request");

const https = require("node:https");

const mailchimp = require('@mailchimp/mailchimp_marketing');

//---Server Start---//

app.listen(3000, function () {

  console.log("Server up and running @ port 3000");
});

//---Application  Start---//

// Página à ser enviada ao servidor
app.get("/", (req, res) => {

  res.sendFile(__dirname + "/consultoria.html");

});

// Coleta de dados do usuário


mailchimp.setConfig({
  apiKey: "834e6f63cabf17d5aeecb4d504f05889-us21",
  server: "us21",
});
const listId = "0e376fb650";

app.post("/", (postReq, postRes) => {

  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(listId, {
      members: [{
        email_address: postReq.body.EMAIL,
        status: "subscribed",
        merge_fields: {
          FNAME: postReq.body.FNAME,
          PHONE: postReq.body.PHONE,
        }
      }]
    });
    console.log(response);
    console.log(response.error_count);

    if (response.error_count > 0) {

      postRes.sendFile(__dirname + "/fail.html");
    }else{
      postRes.sendFile(__dirname + "/success.html");
    }



  };
  
  run();

});

//--- ---//

/*
// Informações cadastrais para Mailchimp
var mcServerPrefix = "us21";
var listId = "0e376fb650";
var mcApiKey = "7e70a3795a8c7faf553436c65cc05008-us21";

var listUrl = ("https://" + mcServerPrefix + ".api.mailchimp.com/3.0/lists/" + listId);

var opt = {
    method: "POST",
    auth: ("artioenvtech:" + mcApiKey)
}

// Coleta de dados da página de espera //
app.post("/", (req, res) => {

    var clientData = {
        members: [{

            email_address: req.body.clientEmail,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.clientName,
                PHONE: req.body.clientWhats,
            }
        }]
     };
    var jsonToMailchimp = JSON.stringify(clientData);

    const mcReq = https.request(listUrl, opt, (mcRes) => {
        mcReq.write(jsonToMailchimp);
        mcReq.end();

        mcRes.on("data", (mcData) => {
            console.log(mcData);
        })

    });

    console.log(req.body.clientName + " " + req.body.clientEmail + " " + req.body.clientWhats)
console.log();
})

Mailchimp API Keys

leadsMajuMigotto
834e6f63cabf17d5aeecb4d504f05889-us21

Mailchimp List ID
0e376fb650

*/

/*{
  "id": "string",
  "web_id": 0,
  "name": "string",
  "contact": {
    "company": "string",
    "address1": "string",
    "address2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string",
    "phone": "string"
  },
  "permission_reminder": "string",
  "use_archive_bar": false,
  "campaign_defaults": {
    "from_name": "string",
    "from_email": "string",
    "subject": "string",
    "language": "string"
  },
  "notify_on_subscribe": false,
  "notify_on_unsubscribe": false,
  "date_created": "2019-08-24T14:15:22Z",
  "list_rating": 0,
  "email_type_option": true,
  "subscribe_url_short": "string",
  "subscribe_url_long": "string",
  "beamer_address": "string",
  "visibility": "pub",
  "double_optin": false,
  "has_welcome": false,
  "marketing_permissions": false,
  "modules": [
    "string"
  ],
  "stats": {
    "member_count": 0,
    "total_contacts": 0,
    "unsubscribe_count": 0,
    "cleaned_count": 0,
    "member_count_since_send": 0,
    "unsubscribe_count_since_send": 0,
    "cleaned_count_since_send": 0,
    "campaign_count": 0,
    "campaign_last_sent": "2019-08-24T14:15:22Z",
    "merge_field_count": 0,
    "avg_sub_rate": 0,
    "avg_unsub_rate": 0,
    "target_sub_rate": 0,
    "open_rate": 0,
    "click_rate": 0,
    "last_sub_date": "2019-08-24T14:15:22Z",
    "last_unsub_date": "2019-08-24T14:15:22Z"
  },
  "_links": [
    {
      "rel": "string",
      "href": "string",
      "method": "GET",
      "targetSchema": "string",
      "schema": "string"
    }
  ]
}*/