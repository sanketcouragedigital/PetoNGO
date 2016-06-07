$(function() {
  var email = localStorage.getItem("email");

  var firstImageData = "";
  var firstImageName = "";
  var secondImageData = "";
  var secondImageName = "";
  var thirdImageData = "";
  var thirdImageName = "";

  $('#first-image-cropit-image-input').change(function() {
    firstImageName = getDate();
  });

  $('#second-image-cropit-image-input').change(function() {
    secondImageName = getDate();
  });

  $('#third-image-cropit-image-input').change(function() {
    thirdImageName = getDate();
  });

  jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {

      if($('#first-image-cropper').cropit('export') != null) {
        firstImageData = $('#first-image-cropper').cropit('export');
      }
      if($('#second-image-cropper').cropit('export') != null) {
        secondImageData = $('#second-image-cropper').cropit('export');
      }
      if($('#third-image-cropper').cropit('export') != null) {
        thirdImageData = $('#third-image-cropper').cropit('export');
      }

  		var campaignName = $("#campaignName").val();
  		var ngoName=$("#ngoName").val();
  		var actualAmount = $("#actualAmount").val();
  		var minimumAmount=$("#minimumAmount").val();
  		var description = $("#description").val();
  		var date=$("#lastDate").val();
      var dateSeparator = date.split("/");
      var dd = dateSeparator[0];
      var mm = dateSeparator[1];
      var yyyy = dateSeparator[2];
      var lastDate = yyyy+"-"+mm+"-"+dd+" 00:00:00";

      var data = {
            email : email,
            campaignName : campaignName,
            ngoName : ngoName,
            actualAmount : actualAmount,
            minimumAmount : minimumAmount,
            description : description,
            lastDate : lastDate,
            firstCampaignImage: firstImageData,
            firstCampaignImageName : firstImageName,
            secondCampaignImage: secondImageData,
            secondCampaignImageName : secondImageName,
            thirdCampaignImage: thirdImageData,
            thirdCampaignImageName : thirdImageName,
            method : "CreateCampaignFromDesktop",
            format : "json"
          };

      var env = environment.getEnv();

      $.post(env, data)
      .done(function(response) {
        if(response.saveCampaignDetailsResponse==="CAMPAIGN_DETAILS_SAVED") {
          alert('You are successfully Created.');
          window.location.href = "campaign-list.html";
        }
        else {
          alert('Campaign is not created. Please try again..');
        }
      })
      .fail(function(){
        alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
      });
    }
  });

  $("#createCampaignForm").validate({
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

  function getDate() {
    var currentdate = new Date();
    var year    = currentdate.getFullYear();
    var month   = currentdate.getMonth()+1;
    var day     = currentdate.getDate();
    var hour    = currentdate.getHours();
    var minute  = currentdate.getMinutes();
    var second  = currentdate.getSeconds();
    if(month.toString().length == 1) {
      var month = '0' + month;
    }
    if(day.toString().length == 1) {
        var day = '0' + day;
    }
    if(hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if(second.toString().length == 1) {
        var second = '0' + second;
    }
    var datetime = year + "" + month + "" + day + "_" + hour + "" + minute + "" + second;
    return datetime;
  }
});
