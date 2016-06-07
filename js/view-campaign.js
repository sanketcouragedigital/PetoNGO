$(function() {
  var campaign_id = localStorage.getItem("campaign_id");
  var campaignName = localStorage.getItem("campaignName");
  var ngoName = localStorage.getItem("ngoName");
  var ngo_email = localStorage.getItem("ngo_email");
  var actualAmount = localStorage.getItem("actualAmount");
  var minimumAmount = localStorage.getItem("minimumAmount");
  var description = localStorage.getItem("description");
  var lastDate = localStorage.getItem("lastDate");
  var collectedAmount = localStorage.getItem("collectedAmount");
  var mobileno = localStorage.getItem("mobileno");
  var ngo_url = localStorage.getItem("ngo_url");
  var postDate = localStorage.getItem("postDate");
  var remainingAmount = localStorage.getItem("remainingAmount");
  var first_image_path = localStorage.getItem("first_image_path");
  var second_image_path = localStorage.getItem("second_image_path");
  var third_image_path = localStorage.getItem("third_image_path");

  var envImage = environment.getImageEnv();

  $("#firstCampaignImage").hide();
  $("#secondCampaignImage").hide();
  $("#thirdCampaignImage").hide();

  if(first_image_path !== null && first_image_path !== "") {
    var firstImageName = first_image_path;
    $("img").show();
    $("#firstCampaignImage").attr('src',envImage + "/campaign_images/" + firstImageName);
  }
  if(second_image_path !== null && second_image_path !== "") {
    var secondImageName = second_image_path;
    $("img").show();
    $("#secondCampaignImage").attr('src',envImage + "/campaign_images/" + secondImageName);
  }
  if(third_image_path !== null && third_image_path !== "") {
    var thirdImageName = third_image_path;
    $("img").show();
    $("#thirdCampaignImage").attr('src',envImage + "/campaign_images/" + thirdImageName);
  }

  $("#campaignName").append("<b>Campaign Name: </b>" + campaignName);
  $("#ngoName").append("<b>NGO Name: </b>" + ngoName);
  $("#actualAmount").append("<b>Actual Amount: </b>" + actualAmount);
  if(!minimumAmount) {
    $("#minimumAmount").append("<b>Minimum Amount: </b>" + minimumAmount);
  }
  else {
    $("#minimumAmount").append("<b>Minimum Amount: </b>N/A");
  }
  $("#postDate").append("<b>Post Date: </b>" + postDate);
  $("#lastDate").append("<b>Last Date: </b>" + lastDate);
  if(!collectedAmount) {
    $("#collectedAmount").append("<b>Collected Amount: </b>" + collectedAmount);
  }
  else {
    $("#collectedAmount").append("<b>Collected Amount: </b>N/A");
  }
  if(!remainingAmount) {
    $("#remainingAmount").append("<b>Remaining Amount: </b>" + remainingAmount);
  }
  else {
    $("#remainingAmount").append("<b>Remaining Amount: </b>N/A");
  }
  $("#description").append("<b>Description: </b>" + description);
  $("#ngoEmail").append("<b>NGO Email: </b>" + ngo_email);
  $("#mobileno").append("<b>Mobile No: </b>" + mobileno);
  $("#ngoURL").append("<b>NGO Url: </b>" + ngo_url);
});
