$(function(){
	$("#plateau").attr("cellspacing","0");
	for(j = 0; j<7; j++)
	{
		$("#plateau").append("<tr id="+ j +"></tr>");
		for(i = 0; i < 10; i++)
		{
			$("#plateau tr#"+ j +"").append("<td class='"+ i +"' style='width: 50px; height: 50px;' >&nbsp;</tb>");
		}
	}
	$("#plateau tr#3 td.0").attr('id', "BN");
	$("#plateau tr#3 td.9").attr('id', "EH");
	for(t = 1; t < 6; t++)
	{
		$("#plateau tr#"+ t +" td.1").addClass("TT");
		$("#plateau tr#"+ t +" td.8").addClass("EM");
	}
	var focus;
	$(".TT, #BN").click(function () 
	{
		var myClass = $(this).attr("class").split(' ');
 		var myId = $(this).closest("tr").attr("id");
 		alert("Colone " + myClass[0] + " & Ligne " + myId + ". C'est un " + myClass[1]);
		// focus = $(this);
		$(this).css('background','yellow');
		if(focus)
		$(focus).css('background','#FF0000');
		focus = $(this);
		//alert("ok");
	});
});