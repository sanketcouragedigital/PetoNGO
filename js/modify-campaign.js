$(function() {
  var campaign_id = localStorage.getItem("campaign_id");
  var campaignName = localStorage.getItem("campaignName");
  var ngoName = localStorage.getItem("ngoName");
  var ngo_email = localStorage.getItem("ngo_email");
  var actualAmount = localStorage.getItem("actualAmount");
  var minimumAmount = localStorage.getItem("minimumAmount");
  var description = localStorage.getItem("description");
  var lastDate = localStorage.getItem("lastDate");

  var dateSeparator = lastDate.split(" ");
  var date = dateSeparator[0];

  $("#campaignName").val(campaignName);
  $("#ngoName").val(ngoName);
  $("#actualAmount").val(actualAmount);
  $("#minimumAmount").val(minimumAmount);
  $("#description").val(description);
  $("#lastDate").val(date);

  jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {
  		var campaignName = $("#campaignName").val();
  		var ngoName=$("#ngoName").val();
  		var actualAmount = $("#actualAmount").val();
  		var minimumAmount=$("#minimumAmount").val();
  		var description = $("#description").val();
  		var tempDate=$("#lastDate").val();
      var lastDate = tempDate+" 00:00:00"

      var data = {
        campaignId : campaign_id,
        campaignName : campaignName,
        ngoName : ngoName,
        email : ngo_email,
        actualAmount : actualAmount,
        minimumAmount : minimumAmount,
        description : description,
        lastDate : lastDate,
        method : "ModifyCampaign",
        format : "json"
      };
      var env = environment.getEnv();
      $.post(env, JSON.stringify(data))
      .done(function(response) {
        if(response.saveModifiedCampaignDetailsResponse==="CAMPAIGN_DETAILS_UPDATED") {
          alert('Campaign is modified!');
          window.location.href = "campaign-list.html"
        }
        else {
          alert('There is error while modify');
        }
      }).fail(function(){
        alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
      });
    }
  });

  $("#campaignModifyForm").validate({
     rules: {
        campaignName: {
           required: true,
        },
        ngoName: {
           required: true,
        },
        actualAmount: {
           required: true,
        },
        minimumAmount: {
           required: true,
        },
        description: {
           required: true,
        },
        lastDate: {
           required: true,
        }
     },
     messages: {
        campaignName: {
           required: "Campaign name required",
        },
        ngoName: {
           required: "NGO name required",
        },
        actualAmount: {
           required: "Actual Amount required",
        },
        minimumAmount: {
           required: "Minimum Amount required",
        },
        description: {
           required: "Description required",
        },
        lastDate: {
           required: "Last Date required",
        }
      },
   errorElement : 'form',
   errorLabelContainer: 'Error'
  });
});
