$(function() {
  var email = localStorage.getItem("email");
  var env = environment.getEnv();
	var url = env + "?method=showCampaignDetails&format=json&email="+email+"&currentPage=1";
	$("#listOfCampaigns tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showCampaignDetailsResponse) && response.showCampaignDetailsResponse.length) {
			var headRow = '<th style="text-align:center">Image</th><th style="text-align:center">Campaign Name</th><th style="text-align:center">Actual Amount</th><th style="text-align:center">Last Date</th>';
			$(headRow).appendTo("#listOfCampaigns thead");

			$.each(response.showCampaignDetailsResponse, function(i, campaignList) {
				if(campaignList.first_image_path!=="") {
					var imageName = campaignList.first_image_path;
				}
        var date = campaignList.lastDate;
				var dateSeparator = date.split("-");
				var yyyy = dateSeparator[0];
				var mm = dateSeparator[1];
        var daySeparator = dateSeparator[2].split(" ");
				var dd = daySeparator[0];
				var validUptoDate = dd+"/"+mm+"/"+yyyy;
        var envImage = environment.getImageEnv();
				var newRow = "<tr id=campaignId_"+campaignList.campaign_id+">" +
				'<td align="center" style="padding:5px"><img height="80px" width="80px" src="'+ envImage +'/campaign_images/' + imageName + '"/></td>' +
				'<td align="center" style="padding:5px">' + campaignList.campaignName + '</td>' +
				'<td align="center" style="padding:5px">' + campaignList.actualAmount + '</td>' +
				'<td align="center" style="padding:5px">' + validUptoDate + '</td>' +
        '<td align="center" style="padding:5px">' + "<button class=\'modbtn\' onclick= \'viewCampaign(\""+campaignList.campaign_id+"\", \""+campaignList.campaignName+"\", \""+campaignList.ngoName+"\", \""+campaignList.ngo_email+"\", \""+campaignList.actualAmount+"\", \""+campaignList.minimumAmount+"\", \""+campaignList.description+"\", \""+campaignList.lastDate+"\", \""+campaignList.collectedAmount+"\",  \""+campaignList.mobileno+"\", \""+campaignList.ngo_url+"\", \""+campaignList.postDate+"\", \""+campaignList.remainingAmount+"\", \""+campaignList.first_image_path+"\", \""+campaignList.second_image_path+"\", \""+campaignList.third_image_path+"\", event)\'>View Campaign</button>" + '</td>' +
				'<td align="center" style="padding:5px">' + "<button class=\'modbtn\' onclick= \'modifyCampaign(\""+campaignList.campaign_id+"\", \""+campaignList.campaignName+"\", \""+campaignList.ngoName+"\", \""+campaignList.ngo_email+"\", \""+campaignList.actualAmount+"\", \""+campaignList.minimumAmount+"\", \""+campaignList.description+"\", \""+campaignList.lastDate+"\", event)\'>Modify</button>" + '</td>' +
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteCampaign(\""+campaignList.campaign_id+"\", \""+campaignList.campaignName+"\", \""+campaignList.ngoName+"\", \""+campaignList.ngo_email+"\", \""+campaignList.lastDate+"\", \""+campaignList.mobileno+"\", event, this)\'>Delete</button>" + '</td>' +
				"</tr>";
				$(newRow).appendTo("#listOfCampaigns tbody");
			});
		}
		else {
			alert("No campaigns created yet!");
      var headRow = '<th style="text-align:center">No campaigns created yet!</th>';
			$(headRow).appendTo("#listOfCampaigns thead");
		}
	});
});

function viewCampaign(campaign_id, campaignName, ngoName, ngo_email, actualAmount, minimumAmount, description, lastDate, collectedAmount, mobileno, ngo_url, postDate, remainingAmount, first_image_path, second_image_path, third_image_path, event) {
  localStorage.setItem("campaign_id", campaign_id);
  localStorage.setItem("campaignName", campaignName);
  localStorage.setItem("ngoName", ngoName);
  localStorage.setItem("ngo_email", ngo_email);
  localStorage.setItem("actualAmount", actualAmount);
  localStorage.setItem("minimumAmount", minimumAmount);
  localStorage.setItem("description", description);
  localStorage.setItem("lastDate", lastDate);
  localStorage.setItem("collectedAmount", collectedAmount);
  localStorage.setItem("mobileno", mobileno);
  localStorage.setItem("ngo_url", ngo_url);
  localStorage.setItem("postDate", postDate);
  localStorage.setItem("remainingAmount", remainingAmount);
  localStorage.setItem("first_image_path", first_image_path);
  localStorage.setItem("second_image_path", second_image_path);
  localStorage.setItem("third_image_path", third_image_path);
  window.location.href = "view-campaign.html"
}

function modifyCampaign(campaign_id, campaignName, ngoName, ngo_email, actualAmount, minimumAmount, description, lastDate, event) {
  localStorage.setItem("campaign_id", campaign_id);
  localStorage.setItem("campaignName", campaignName);
  localStorage.setItem("ngoName", ngoName);
  localStorage.setItem("ngo_email", ngo_email);
  localStorage.setItem("actualAmount", actualAmount);
  localStorage.setItem("minimumAmount", minimumAmount);
  localStorage.setItem("description", description);
  localStorage.setItem("lastDate", lastDate);
  window.location.href = "modify-campaign.html"
}

function deleteCampaign(campaign_id, campaignName, ngoName, ngo_email, lastDate, mobileno, event, delrow) {
  var data = {
    campaignId : campaign_id,
    campaignName : campaignName,
    ngoName : ngoName,
    ngoEmail : ngo_email,
    lastDate : lastDate,
    userEmail : ngo_email,
    mobileNo : mobileno,
    method : "deleteCampaign",
    format : "json"
  };
  var env = environment.getEnv();
  $.post(env, JSON.stringify(data))
  .done(function(response) {
    if(response.deleteCampaignDetailsResponse==="EMAIL_SUCCESSFULLY_SENT_FOR_DELETE_CAMPAIGN") {
      alert('Email has been sent to admin for delete');
    }
    else {
      alert('There is error while delete');
    }
  }).fail(function(){
    alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
  });
}
