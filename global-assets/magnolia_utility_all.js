//---------- Start- Call external JS and CSS to create Custom pop up for QNatal link ----------//
document.write("<link rel='stylesheet' type='text/css' href='/docroot/dgx/css/custompopup_style.css'/>");
document.write("<script type='text/javascript' src='/docroot/dgx/js/custompopup.js'></script>");
 
//---------- End- Call external JS and CSS to create Custom pop up for QNatal link  ----------//

//---------- Start Login dropdown code added on 11/20/2018 ----------//
function openWindow(){
        var selValue = $("#select-new").val();
        if(selValue != 0){
            window.open(selValue);
			$("select[name='select-login']").val('0');
        }
    }
//---------- End Login dropdown code added on 11/20/2018 ----------//

// --------------Start Video Code ------------------//

$(document).ready(function(){
	try{
		var d = $('video');
		for(i=0;i<d.length;i++){
			d[i].id="video_"+i;
		}
		setTimeout( function(){
			var k = $('video');
			for(j=0;j<k.length;j++){
				jwplayer(k[j].id).setup({
					'height': '480', 
					'width': '640', 
					'autostart':'true',
					'modes': [
						{ type: "flash", src: pageContextPath+"/docroot/dgx/js/player.swf" },
						{ type: "html5" },
						{ type: "download" }
					] 
				}); 
			}
		}, 500 );
	}catch(err){}
});

$(document).ready(function(){
	var url = document.location.pathname;
	var uri = url.substring(url.indexOf("/home")+6,url.length);

	if(uri.indexOf('/')>0)
	{
		uri = uri.substring(0,uri.indexOf("/"))
	}
	else if (uri.indexOf('.')>0)
	{
		uri=uri.substring(0,uri.indexOf("."))
	}
	else
	{
		uri=uri.substring(0,url.length)
	}
	
	
	if(uri=="patients"){$('#nav-patients a').addClass('active');}
	else if(uri=="physicians"){$('#nav-physicians a').addClass('active');}
	else if(uri=="companies"){$('#nav-companies a').addClass('active');}
	else if(uri=="contact"){$('#nav-contact a').addClass('active');}
	else{$('#nav-home a').addClass('active');}
});

$(document).ready(function(){
	var objHeight=0,objWidth=0;
	$('.jwbox').children().each(function(index, element){
		if(this.className=='jwboxPosterImg'){
			objHeight = $(this).height();
			objWidth = $(this).width();
		}
		if(this.className=='jwboxPlayButton'){
			if(objHeight>0){
				var topPoint = ((objHeight+$(this).height())/2)*(-1);
				$(this).css('top',topPoint+'px');}
			if(objWidth>0){
				var leftPoint = ((objWidth-$(this).width())/2);
				$(this).css('left',leftPoint+'px');}
		}
		if(this.className=='jwboxPlayButtonNew'){
			if(objHeight>0){
				var topPoint = ((objHeight-$(this).height())/2);
				$(this).css('top',topPoint+'px');}
			if(objWidth>0){
				var leftPoint = ((objWidth+$(this).width())/2)*(-1);
				$(this).css('left',leftPoint+'px');}
		}
	});
	setTimeout( function() {
		$('.jwboxPlayButton').css('display','block');
		$('.jwboxPlayButtonNew').css('display','block');
		$('.vidText').css('display','block');
	}, 500 );
});


// --------------Start Search Code ------------------//
function redirectToSearch(val){
	window.location=pageContextPath+"/home/search.html?keyWord="+encodeURIComponent(val);
}
function searchResult(){
	var ifr = document.getElementById('iframe-searchresults');
	var keyword = document.getElementById('header-search-text').value;
	ifr.src = pageContextPath+"/search/magnolia.action?keyWord="+keyword;
}
function parseURL(){
	var uri = document.location.search;
	uri=decodeURI(uri);
	var urlparam = (uri).replace("?","");
	if(urlparam.indexOf('&')>0){
	urlparam = urlparam.substring(0,urlparam.indexOf("&"));
	}
	if(uri.indexOf('?')<0){
		urlparam="keyWord=";
	}
	if(uri.indexOf('?keyWord=')>=0){
		document.getElementById('header-search-text').value = (urlparam).replace("keyWord=","");
	}
	var ifr = document.getElementById('iframe-searchresults');
	var keyword = document.getElementById('header-search-text').value;
	ifr.src = pageContextPath+"/search/magnolia.action?keyWord="+encodeURIComponent(keyword);
}

// --------------Start Cookie Code ------------------//
function parseCookieURL(){
	var url = document.location.pathname;
	var uri = url.substring(url.indexOf("/home")+6,url.length);
	uri = (uri.indexOf('/')>0)?uri.substring(0,uri.indexOf("/")):uri.substring(0,uri.indexOf("."));
	if(uri=="patients" ||uri=="physicians")
	initDefaultHomeCookie("smartDefaultHomePage",uri);
}
function parseSpecialityURL(){
	var url = document.location.pathname;
	if(url.indexOf("/testing-services/condition")>=0){
		var uri = url.substring(url.indexOf("/testing-services/condition")+28,url.length);
		var spe = (uri.indexOf('/')>0)?uri.substring(0,uri.indexOf("/")):uri.substring(0,uri.indexOf("."));
		if(spe.length>0){createCookie("specialityIdentified",spe,365);}
	}
}
function createCookie(name,value,days){
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var patientHome=0, physicianHome=0;
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
function initDefaultHomeCookie(Cname,Pname) {
	var cookData = readCookie(Cname);
	if(!cookData){
		if(Pname=="patients")
			createCookie(Cname,"PhysicianHome-0_#_PatientHome-1",365);
		else if(Pname=="physicians")
			createCookie(Cname,"PhysicianHome-1_#_PatientHome-0",365);
		else
			createCookie(Cname,"PhysicianHome-0_#_PatientHome-0",365);
		return false;
	}
	var cookieData = cookData.split('_#_');
	for(var j=0; j < cookieData.length; j++) {
		var homeCookieData = cookieData[j].split('-');

		if(cookieData[j].indexOf("PhysicianHome")==0){physicianHome=parseInt(homeCookieData[1]);}
		if(cookieData[j].indexOf("PatientHome")==0){patientHome=parseInt(homeCookieData[1]);}
	}
	if(Pname=="patients" && patientHome < 5){
		patientHome ++;
		if((patientHome + physicianHome) > 5){physicianHome--;}
	}
	if(Pname=="physicians" && physicianHome < 5){
		physicianHome ++;
		if((physicianHome + patientHome) > 5){patientHome--;}
	}
	cookData = "";
	cookData = "PhysicianHome-"+physicianHome+"_#_PatientHome-"+patientHome;
	createCookie(Cname,cookData,365);
	return true;
}

parseCookieURL();
parseSpecialityURL();

// --------------Start Mail Code ------------------//

function sendmail(){
	var eml="";
	var bodyContent="Hello, %0D%0A\n%0D%0A\nHere is some great information I wanted to share with you from the Quest Diagnostics website. To read it, visit \n"
	var bod="&body="+bodyContent+document.location;
	var subj="?subject=I thought you might be interested in this information from the Quest Diagnostics website. \n" +document.location;
	location.href="mailto:"+eml+subj+bod;
}

// --------------Start External Link Code -----------//

 function extConfirmation(url,popupmessage){ 
   if(popupmessage=='ExternalLinkMessage')
   {
   var answer = confirm("You are now leaving the Quest Diagnostics web site. Quest Diagnostics does not control the site you are about to enter and accepts no responsibility for its content.");
   }
   //Custom pop up message - based on the argument received in the function users will be displayed custom pop up message.
   else if(popupmessage=='qNatalMessage')  
   {  	    
   	 Confirm('www.questdiagnostics.com', 'You are being directed to this third party website for QNatal Advanced test cost estimation.<br><br>Please note that the estimate provided by this third party is the best estimate of your out-of-pocket costs at this moment in time. It is based on the information provided by you, your health care provider, and your insurer.<br><br>Quest Diagnostics will not guarantee the accuracy of this out-of-pocket cost.<br><br>The best source of information for your out-of-pocket cost for this and any other laboratory test is your health insurance provider, who can be reached at the phone number on the back of your insurance ID card.<br><br>This Site may contain third-party-owned content (eg, articles, data feeds, abstracts, etc) and may also include hypertext links to third-party-owned websites. We provide such third-party content and links as a courtesy to our users. We have no control over any third-party-owned websites or content referenced, accessed by or made available and, therefore, we do not endorse, sponsor, recommend or otherwise accept any responsibility for such third-party websites or content or for the availability of such websites. IN PARTICULAR, WE DO NOT ACCEPT ANY LIABILITY ARISING OUT OF ANY ALLEGATION THAT ANY THIRD-PARTY-OWNED CONTENT (WHETHER PUBLISHED ON THIS, OR ANY OTHER, WEBSITE) INFRINGES THE INTELLECTUAL PROPERTY RIGHTS OF ANY PERSON OR ANY LIABILITY ARISING OUT OF ANY INFORMATION OR OPINION CONTAINED ON SUCH THIRD-PARTY WEBSITE OR CONTENT. If you link to third-party sites from Quest Diagnostics, we encourage you to consult the policy statements of each site you visit.', 'OK', 'Cancel', url);   
   }
   if (answer){
      var WinTest = window.open(url);
	  if (!WinTest){window.location.href=url;}
	}
 }

$('a').click(function(e){
	if($(this).attr('href')){
		var link=$(this).attr('href').toLowerCase();
		var hostname=window.location.hostname;
		if(!$(this).parents('div').hasClass('actions')){
			// Condition to determine the external URL is a questfamily link and not a custom pop up link inside 'qNatallink' array
			if((!(link.indexOf(hostname)>0) && lookInQuestFamily(link)) && !lookInqNatal(link)){
				var status=link.indexOf("http");
				if(status==0){
					e.preventDefault();
					extConfirmation($(this).attr('href'),'ExternalLinkMessage');
				}
			}
			
			// Condition to determine if the external URL should display the 'Eligible Use of Patient Data and Quest Diagnostics Data' Pop up
			if(!(link.indexOf(hostname)>0) && lookInqNatal(link)){
				var status=link.indexOf("http");
				if(status==0){
					e.preventDefault();
					extConfirmation($(this).attr('href'),'qNatalMessage');
				}
			}
		}
	}
});

$('a').click(function(e){
	if($(this).attr('href')){
		var link=$(this).attr('href').toLowerCase();
		if((link.indexOf('dms')>0) && (link.indexOf('.pdf')>0)){
			$(this).attr('target','_blank');
			e.stopImmediatePropagation();
		}
	}
});
/*$.getScript('https:localhost:8080/magnoliaAuthor/docroot/dgx/js/quest_fam.js', function()
{
    // script is now loaded and executed.

}); */
var questFamily = ['cloudfront.net','aptimaforher.com','questcognisense.com','quanumanalyticsportal.com','questdiagnostics.com','questdiagnostics1.webex.com','questdiagnostics2.webex.com','care360ehr.webex.com','questdiagnosticsfeedback.com','care360.com','zynite.com','examone.com','employersolutions.com','mygazelleapp.com','quest.airhealthgroup.com','questdiagnostics.co.uk','questdiagnostics.ie','questdiagnostics.mediaroom.com','survey1.burke.com','ameripath.com','associatedclinicallabs.com','athenadiagnostics.com','bhlinc.com','blueprintforwellness.com','care360tour.com','colovantage.com','compunetlab.com','corporate-ir.net','dermpath.com','dermpathdiagnostics.com','dlolab.com','doyouhavetheguts.com','drcsurveys.com','enterix.com.au','focusdx.com','hemocue.com','hemocue.se','insuretest.com','labcard.com','labcardselect.com','labone.com','labreference.com','macl1.com','medplus.com','MedPlusCentergy.com','mycare360health.com','mylabisquest.com','nicholsinstitute.com','omega-labs.com','oraldna.com','pathwaydx.com','quest4health.com','questcentralab.com','questdiagnostics.ie','questdiagnostics.in','sonoraquest.com','specialtylabs.com','vitamindtestfacts.com','careers-ext.questcareersite.com','celera.com','gazelleapp.com','myoraldna.com','questdiagnostics-ccf.com','questdiagnostics-qis.com','questdiagnostics-randoms.com','questdiagnostics-supplies.com','hwoshg.healthwise.net/questdiag','4myheart.com','www.pages02.net/questdiagnosticsinc/es/','www.employer-solutions-resources.com','zmags.com','questconnect.com','brcavantage.com','celiacanswers.com','questdiagnosticssurveys.com','www.q2labsolutions.com','www.questforhealthsystems.com','www.idexpertconnect.com','qdx.com','questforhealthsystems.com','quest50th.com','questhrsc.com','questpdm.com','questdrugmonitoring.com','questdrugmonitor.com','questtoxicology.com','questsouth.com','questdiagnostics.csod.com','questdiagnosticsfeedback.second-to-none.com','questforhealth.com','questisin.com','questeasypay.com','questonlineforpatients.com','testwithquest.com'];

function lookInQuestFamily(link){
  for(var i=0;i<questFamily.length;i++){
    var ret = link.indexOf(questFamily[i]);
	if(ret>0)
	{
	
	return false;
	}
  }
  return true;
}
// --------------End External Link Code -----------//

// --------- Start Custom message pop up Code - Eligible Use of Patient Data and Quest Diagnostics Data ---//

var qNatallink = ['calculator.eligible.com'];

// Below function traverses through qNatalLinks to display Custom pop up message other than the pop up received for external links
function lookInqNatal(link){
	
  for(var i=0;i<qNatallink.length;i++){
    var ret = link.indexOf(qNatallink[i]);
	if(ret>0)return true;
  }
  return false;
}

// --------- End Custom message pop up Code - Eligible Use of Patient Data and Quest Diagnostics Data ---//


// Updated xdomain.js script -- deals with matching mixed lower/upper case links for Quest Family sites - Lunametrics

(function($) {

function listenToClicks()
{
	var fileTypes=[".doc", ".xls", ".exe", ".zip", ".pdf", ".mov", ".mp3"];

	$('a[href]').each(function(index) {
 		var link = $(this);
		var href = link.attr('href');
		
		$.each(fileTypes, function(i) {
			if($(link).attr('href').indexOf(this)!=-1){
				valid = false;
				$(link).bind('click', function(c) {
					c.preventDefault();					
	                //_gat._getTrackerByName()._trackEvent('Download', 'Click - ' + $(link).attr('href'));	                
					setTimeout('document.location = "' + $(link).attr('href') + '"', 100);
	            });
			}
		});

		var valid = false;
		$.each(questFamily, function(j) {
				var lowerLink = $(link).attr('href').toLowerCase();
				if((lowerLink.indexOf(this)!=-1)&&(window.location.href.indexOf(this)==-1)){	
					valid = true;

					if (valid)
					{
						$(link).bind('click', function(l) {
							l.preventDefault();	
							setTimeout('document.location = "' + href + '"', 100);
							//_gat._getTrackerByName()._trackEvent('Quest Family Link', href);
						});
					}
				}			
		});

		var rootDomain = document.domain.split(".")[document.domain.split(".").length - 2] + "." + document.domain.split(".")[document.domain.split(".").length - 1];

		if ( (href.match(/^http/)) && (href.indexOf(rootDomain) == -1) && !valid) {
			$(link).bind('click', function(d) {
					d.preventDefault();
		      	//_gat._getTrackerByName()._trackEvent('Outbound Link', href);
		           
			    });			   
		}
	});
	
}

$(document).ready(function() {
	listenToClicks();
	/*remove class selector for login dropdown menu - start*/
	$(".login-dropdown div").removeClass("selector").addClass("dd-new-selector");
	$(".dd-new-selector").find('span').addClass('dd-active-span');
	$('span.dd-active-span').remove();
	/*remove class selector for login dropdown menu - end*/
});

} ) (jQuery);