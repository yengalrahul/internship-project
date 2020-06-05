
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/	
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').height());
	});
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("assets/img/backgrounds/2.jpg");
    $('.testimonials-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.about-us-container').backstretch("assets/img/backgrounds/2.jpg");
    $('.contact-container').backstretch("assets/img/backgrounds/3.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(){
    	$('.testimonials-container').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	
	/*
	    Contact form
	*/
	$('.c-form-1-box form').on('submit', function(e) {
		e.preventDefault();
	    var this_form_parent = $(this).parents('.c-form-1-box');
	    var postdata = $(this).serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	        	$('.c-form-1-box label[for="c-form-1-email"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.emailMessage != '') {
		                $(this).html('(' + json.emailMessage + ')').fadeIn('fast');
		            }
	        	});
	        	$('.c-form-1-box label[for="c-form-1-subject"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.subjectMessage != '') {
		                $(this).html('(' + json.subjectMessage + ')').fadeIn('fast');
		            }
	        	});
	        	$('.c-form-1-box label[for="c-form-1-message"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.messageMessage != '') {
		                $(this).html('(' + json.messageMessage + ')').fadeIn('fast');
		            }
	        	});
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	            	this_form_parent.find('.c-form-1-top').fadeOut('fast');
	            	this_form_parent.find('.c-form-1-bottom').fadeOut('fast', function() {
	            		this_form_parent.append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	            		$('.contact-container').backstretch("resize");
	                });
	            }
	        }
	    });
	});
	

});


jQuery(window).load(function() {
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
});
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
// $('#AgencyDetails').on('change',function(){
//     $('#result').html($(this).val());   
// });
var firebaseConfig = {
	apiKey: "AIzaSyACcMR9NDmmlQsuFCxeKPfVQf8zGgKnOlA",
	authDomain: "crisis-help.firebaseapp.com",
	databaseURL: "https://crisis-help.firebaseio.com",
	projectId: "crisis-help",
	storageBucket: "crisis-help.appspot.com",
	messagingSenderId: "284935242155",
	appId: "1:284935242155:web:2ac60d91a1450058f452ee",
	measurementId: "G-FVX727Q15Q"
};

// Initialize Firebase
let selectedValue;

function getValue(val) {
	selectedValue = val;

}

firebase.initializeApp(firebaseConfig);
var fireStore = firebase.firestore();
const database = fireStore.collection("donators");

const submitBtn = document.querySelector('#submitBtn');
let userName = document.querySelector('#username');
let Data = document.getElementById('#submitBtn');


submitBtn.addEventListener('click', function () {

	let userNameInput = username.value;
	let ReferredByInput = selectedValue;
	let now = new Date();
	console.log(now);
	console.log(username.value);
	database.doc().set({
		name: userNameInput,
		ReferredBy: ReferredByInput,
		Date_Time: now

	}).then(function () {
		selectedValue = "";
		userName.value = "";
	}).catch(function (error) {
		console.log(error);
	});
});
/////
const database1 = fireStore.collection("contacts");

function onContactFormSubmit() {
	const submitContact = document.querySelector('#contact_button');
	let email = document.querySelector('#email').value;
	let message = document.querySelector('#message').value;
	let subject = document.querySelector('#subject').value;

	alert("Thanks We appreciate that you’ve taken the time to write us. We’ll get back to you very as soon as possible ");
    

	database1.doc().set({
		created_at: new Date(),
		email: email,
		message: message,
		subject: subject

	}).then(function () {
		email.value = "";
		message.value = "";
		subject.value = "";
	}).catch(function (error) {
		console.log(error);
	});

}
