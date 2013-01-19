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
		$(this).addClass("select");
		
		//Cases libres en blanc
		for (i = 0; i < 7; i++)
		{
			for(j = 0; j < 10; j++)
			{
				resClass = $("#plateau tr#"+ i + " td."+j).attr("class").split(' ');
				resId = $("#plateau tr#"+ i + " td."+j).attr("id");
				if(!resId && !resClass[1])
				{
					$(".C").off('click');
					$(".C").removeClass('C');
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
						{
							$("tr#"+curID+" td."+curClass).addClass('C');
						}
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
								$("tr#"+curID+" td."+curClass).addClass('C');
							}
						}
					}
				}
			}
		}
		
		if(focus)
		{
			if (focus.attr('id') == "BN")
				$(focus).removeClass("select");
			else
				$(focus).removeClass("select");
		}
		focus = $(this);
		
		//fonction click des cases de déplacement
		$(".C").click(function () 
		{
			deplacement(focus,$(this),1);
		});
	});
}

function joueurEM(){
//Fonction click des EM et du totem EH
	var focus;
	$(".EM, #EH").click(function () 
	{
		var myClass = $(this).attr("class").split(' ');
 		var myId = $(this).closest("tr").attr("id");
		$(this).addClass("select");
		
		//Cases libres en blanc
		for (i = 0; i < 7; i++)
		{
			for(j = 0; j < 10; j++)
			{
				resClass = $("#plateau tr#"+ i + " td."+j).attr("class").split(' ');
				resId = $("#plateau tr#"+ i + " td."+j).attr("id");
				if(!resId && !resClass[1])
				{
					$(".C").off('click');
					$(".C").removeClass('C');
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
						{
							$("tr#"+curID+" td."+curClass).addClass('C');
						}
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
							{
								$("tr#"+curID+" td."+curClass).addClass('C');
							}
						}
					}
				}
			}
		}
		
		if(focus)
		{
			if (focus.attr('id') == "EH")
				$(focus).removeClass("select");
			else
				$(focus).removeClass("select");
		}
		focus = $(this);
		
		//fonction click des cases de déplacement
		$(".C").click(function () 
		{
			deplacement(focus,$(this),2);
		});
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

	if(joueur == 1){ //tour du joueur 1 (TT)
		console.log("joueur 1");
		joueurTT();
	}
	else{ //tour du joueur 2 (EM)
		console.log("joueur 2");
		joueurEM();
	}
}

function deplacement(pion,choix,joueur){
	resId = $(pion).attr("id");//si le pion est un totem
	if(joueur == 1){
		if(resId){//déplacement du totem
			$(choix).removeClass('C').attr('id','BN');
			$(pion).removeClass('select').removeAttr('id').addClass('C');
		}else{//déplacement du pion
			$(choix).removeClass('C').addClass('TT');
			$(pion).removeClass('TT select').addClass('C');
		}
		$(".C, .TT, #BN").off('click');
		joueur=2;
	}else{
		if(resId){//déplacement du totem
			$(choix).removeClass('C').attr('id','EH');
			$(pion).removeClass('select').removeAttr('id').addClass('C');
		}else{//déplacement du pion
			$(choix).removeClass('C').addClass('EM');
			$(pion).removeClass('EM select').addClass('C');
		}
		$(".C, .EM, #EH").off('click');
		joueur=1;
	}
	$(".C").removeClass('C');
	jouerTour(joueur); //tour du joueur suivant
}