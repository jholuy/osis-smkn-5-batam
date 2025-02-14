// Emailjs
const btn = document.getElementById('button');

document.getElementById('email-form').addEventListener('submit', function(event){
	event.preventDefault();

	btn.value = 'sending...';
	
	const serviceID = 'service_2381jiv';
	const templateID = 'template_9z0983g';
	
	emailjs.sendForm(serviceID, templateID, this).then(() => {
		btn.value = 'Send Email';
		alert('Email Berhasil Terkirim');
	}, (err) => {
		btn.value = 'Send Email';
		alert(JSON.stringify(err));
	});
});