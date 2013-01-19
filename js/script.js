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

// classe joueur
function Joueurs(id,pion,totem,mvTotem) {
	this.id=id;
	this.pion=pion;
	this.totem=totem;
	this.mvTotem=mvTotem;
}
var j=1;

function jouerTour(ja,jp){ //ja = joueur actif - jp = joueur passif
//Fonction click des pions et du totem
	var focus;
	var option = "."+ja.pion+", #"+ja.totem ;
	if(ja.mvTotem == 0)
		option = "."+ja.pion;
	$(option).click(function () 
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
		
		
		//Si y'a une deuxième classe (pion)
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
		//Sinon (totem)
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
						if (curID >= 0 && curClass >= 0 && curID <= 6 && curClass <= 9)
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
			if (focus.attr('id') == ja.totem)
				$(focus).removeClass("select");
			else
				$(focus).removeClass("select");
		}
		focus = $(this);
		
		//fonction click des cases de déplacement
		$(".C").click(function () 
		{
			deplacement(focus,$(this),ja);
			jouerPartie(jp,ja);
		});
	});
	
}

function nouvellePartie(){
	//initialisation des joueurs
	joueur1=new Joueurs(1,'TT','BN',3);
	joueur2=new Joueurs(2,'EM','EH',3);

	//Ajout des id des totems
	$("#plateau tr#3 td.0").attr('id', "BN");
	$("#plateau tr#3 td.9").attr('id', "EH");
	
	//Ajout des classes TT(Col. 1) et EM(Col. 8) de la case 1 à 6
	for(t = 1; t < 6; t++)
	{
		$("#plateau tr#"+ t +" td.1").addClass("TT");
		$("#plateau tr#"+ t +" td.8").addClass("EM");
	}
	jouerPartie(joueur1,joueur2);
}

function jouerPartie(j1,j2){
	jouerTour(j1,j2);
}

function deplacement(pion,choix,joueur){
	resId = $(pion).attr("id");//si le pion est un totem
		if(resId){//déplacement du totem
			$(choix).removeClass('C').attr('id',joueur.totem);
			$(pion).removeClass('select').removeAttr('id').addClass('C');
			joueur.mvTotem--;
		}else{//déplacement du pion
			$(choix).removeClass('C').addClass(joueur.pion);
			$(pion).removeClass(joueur.pion+' select').addClass('C');
		}
		$(".C, ."+joueur.pion+", #"+joueur.totem).off('click');
		$(".C").removeClass('C');
}