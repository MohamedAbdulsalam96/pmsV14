var id = $('#page_id').html();
function accept() {

			frappe.call({
					method: "pms.pms.doctype.proposal.proposal.sendaccmail",
					args: {
						id: id,
						location: window.location.href,
					},
					freeze: true,
					callback: (r) => {
						console.log(r.message)
						frappe.msgprint(__("Thanks for your acceptanance."));
						$('#acceptbtn').text('Accepted');
						$('#acceptbtn').addClass('disabled');
						$('#rejectbtn').hide();

					}
				});
}

function reject() {
			frappe.call({
					method: "pms.pms.doctype.proposal.proposal.sendrejmail",
					args: {
						id: id,
						location: window.location.href,
					},
					freeze: true,
					callback: (r) => {
						console.log(r.message)
						frappe.msgprint(__("Thanks for your response."));
						$('#rejectbtn').text('Rejected');
						$('#rejectbtn').addClass('disabled');
						$('#acceptbtn').hide();

					}
				});	
}

$(document).ready(function(){
    var a = $('#maindivi').height();
    $('#sidedive').css('height', a+100);
});

