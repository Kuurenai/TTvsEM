//créeation du plateau de jeu
$(function(){
	$("#plateau").attr("cellspacing","0");
	for(j = 0; j < 7; j++)
	{
		$("#plateau").append("<tr id="+ j +"></tr>");
		for(i = 0; i < 10; i++)
		{
			$("#plateau tr#"+ j +"").append("<td class='"+ i +"' style='width: 50px; height: 50px;' >&nbsp;</tb>");
		}
	}
	
	nouvellePartie();
});

function joueurTT(){
//Fonction click des TT et du totem BN
	var focus;
	$(".TT, #BN").click(function () 
	{
		var myClass = $(this).attr("class").split(' ');
 		var myId = $(this).closest("tr").attr("id");
		$(this).css('background','#fef5b2');
		
		//Cases libres en blanc
		for (i = 0; i < 7; i++)
		{
			for(j = 0; j < 10; j++)
			{
				resClass = $("#plateau tr#"+ i + " td."+j).attr("class").split(' ');
				resId = $("#plateau tr#"+ i + " td."+j).attr("id");
				if(!resId && !resClass[1])
				{
					$("#plateau tr#"+ i + " td."+j).css('background', 'white')/*.removeClass('C')*/;
					//$("#plateau tr#"+ i + " td."+j).removeClass('C');
				}
			}
		}
		
		
		//Si y'a une deuxième classe (TT)
		if(myClass[1])
		{
			for (var i = 0; i < 3; i++)
			{
				for (var y = 0; y < 3; y++)
				{
					var curID = (myId - 1 + i);
					var curClass= (myClass[0] - 1 + y);
					if(curID != myId || curClass != myClass[0])
					{
						var attr = $("tr#"+curID+" td."+curClass).attr("class").split(' ');
						var id = $("tr#"+curID+" td."+curClass).attr("id");
						if(!attr[1] && !id)
							$("tr#"+curID+" td."+curClass).css('background', '#c3d196');
					}
				}
			}
		}
		//Sinon (BN)
		else
		{
			for (var i = 0; i < 5; i++)
			{
				for (var y = 0; y < 5; y++)
				{
					var curID = (myId - 2 + i);
					var curClass= (myClass[0] - 2 + y);
					if(curID != myId || curClass != myClass[0])
					{
						if (curID >= 0 && curClass >= 0)
						{
							var attr = $("tr#"+curID+" td."+curClass).attr("class").split(' ');
							var id = $("tr#"+curID+" td."+curClass).attr("id");
							if(!attr[1] && !id)
							{
								$("tr#"+curID+" td."+curClass).css('background', '#c3d196')/*.addClass('C')*/;
								//$("tr#"+curID+" td."+curClass).addClass('C');
							}
						}
					}
				}
			}
		}
		
		if(focus)
		{
			if (focus.attr('id') == "BN")
				$(focus).css('background','#9a6e63');
			else
				$(focus).css('background','#eb6762');
		}
		focus = $(this);
		
		/*$(".C").click(function () 
		{
		});*/
	});
	
	
	
}

function joueurEM(){
//Fonction click des EM et du totem EH
	var focus;
	$(".EM, #EH").click(function () 
	{
		var myClass = $(this).attr("class").split(' ');
 		var myId = $(this).closest("tr").attr("id");
		$(this).css('background','#fef5b2');
		
		//Cases libres en blanc
		for (i = 0; i < 7; i++)
		{
			for(j = 0; j < 10; j++)
			{
				resClass = $("#plateau tr#"+ i + " td."+j).attr("class").split(' ');
				resId = $("#plateau tr#"+ i + " td."+j).attr("id");
				if(!resId && !resClass[1])
				{
					$("#plateau tr#"+ i + " td."+j).css('background', 'white');
				}
			}
		}
		
		
		//Si y'a une deuxième classe (EM)
		if(myClass[1])
		{
			for (var i = 0; i < 3; i++)
			{
				for (var y = 0; y < 3; y++)
				{
					var curID = (myId - 1 + i);
					var curClass= (myClass[0] - 1 + y);
					if(curID != myId || curClass != myClass[0])
					{
						var attr = $("tr#"+curID+" td."+curClass).attr("class").split(' ');
						var id = $("tr#"+curID+" td."+curClass).attr("id");
						if(!attr[1] && !id)
							$("tr#"+curID+" td."+curClass).css('background', '#c3d196');
					}
				}
			}
		}
		//Sinon (EH)
		else
		{
			for (var i = 0; i < 5; i++)
			{
				for (var y = 0; y < 5; y++)
				{
					var curID = (myId - 2 + i);
					var curClass= (myClass[0] - 2 + y);
					if(curID != myId || curClass != myClass[0])
					{
						if (curID >= 0 && curClass >= 0)
						{
						var attr = $("tr#"+curID+" td."+curClass).attr("class").split(' ');
						var id = $("tr#"+curID+" td."+curClass).attr("id");
						if(!attr[1] && !id)
							$("tr#"+curID+" td."+curClass).css('background', '#c3d196');
						}
					}
				}
			}
		}
		
		if(focus)
		{
			if (focus.attr('id') == "EH")
				$(focus).css('background','#3f689e');
			else
				$(focus).css('background','#abdfde');
		}
		focus = $(this);
	});
}

function nouvellePartie(){

	//Ajout des id des totems
	$("#plateau tr#3 td.0").attr('id', "BN");
	$("#plateau tr#3 td.9").attr('id', "EH");
	
	//Ajout des classes TT(Col. 1) et EM(Col. 8) de la case 1 à 6
	for(t = 1; t < 6; t++)
	{
		$("#plateau tr#"+ t +" td.1").addClass("TT");
		$("#plateau tr#"+ t +" td.8").addClass("EM");
	}
	jouerTour(1);
}

function jouerTour(joueur){

	if(joueur == 1){
		joueurTT();
		jouerTour(2);
	}/*
	else{
		joueurEM();
		jouerTour(1);
	}*/
}

function deplacement(pion,choix){

}