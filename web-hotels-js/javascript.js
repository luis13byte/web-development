
        //Llita dels hotels carregats del Json
        var llistatHotels;
        //Llita dels hotels resultat de la cerca
        var llistatHotelsSeleccionats;
        //Llita dels hotels resultat de la cerca i filtres
        var llistatHotelsSeleccionatsFiltrats;
        //llista d'habitacions seleccionades.Que necessitarem per calcular el preu total
        var llistaHabitacionsSeleccionades;

        //Funció per carregar Json
        function loadJSON(callback) {
            let xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            //Molt alerta! si la url es un fitxer local no ens funcionarà sense canviar els permisos del navegador. Per aquest motiu ho he pujat a un fitxer de gitHub.
            xobj.open('GET', 'https://raw.githubusercontent.com/RafelNadalMascaro/Hoteles/master/json.json', true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }

        //Functio per defecte per carregar el Json.
        function init() {
            loadJSON(function (response) {
                // Parse JSON string into object
                llistatHotels = JSON.parse(response);
            });
        }

        //Borram tots els resultats d'una cerca anterior.
        function borrarResultatsAnteriors() {
            document.getElementById("resultats").innerHTML = "";
        }

        //Desmarcam tots els filtres del lateral.
        function desmarcarTotsElsFiltresDelLateral() {
            //Seleccionam tots els filtre per la classe.
            var filtres = document.getElementsByClassName("filtre");
            for(filtre of filtres) {
                filtre.checked = false;
            }
        }

        //Per mostrar el div de més info.
        function mostrarElement(elementActual) {
            /*
             <div>
                <a href="mostrarElement()">Més informació</a>
                <div class="mesInfo">Mostrariem més informació</div>
             </div>
            */
            //Cercarem l'element sense id. Cercarem per classe de l'element pare
            var llistaElements = elementActual.parentElement.getElementsByClassName("mesInfo");
            //la llista d'elements ha de ser 1.
            llistaElements[0].style.display = "block";
        }

        //Quan cliquen al botó de carcam. Executam aquesta funció.
        function realitzarcerca() {
            //Si ja hem fet alguna cerca, ocultam els resultats anteriors.
            borrarResultatsAnteriors();
            //Camps de la cerca
            var temporadaAlta = false;
            var numIndividual = 0;
            var numDoble = 0;
            temporadaAlta = (getValorRadio("temporada") == "alta");
            numIndividual = document.getElementById("individual").value;
            numDoble = document.getElementById("doble").value;

            //Quan feim una nova cerca, desmarcam tots els filtres seleccionats del lateral.
            desmarcarTotsElsFiltresDelLateral();

            llistatHotelsSeleccionats = new Array();
            //Per cada hotel que tenim a la llista
            for (objHotel of llistatHotels.hoteles) {
                for (objHab of objHotel.habitacions) {
            //Comprovarem el filtre de llists. Si concorden els llits de l'habitació cercarem pels altres filtres.
                    if ((objHab.llit_individual == numIndividual) && (objHab.llit_doble == numDoble)) {
                        var preuMesBaix;
                        for (objPreu of objHab.preu) {
                        //Comparam pel valor de temporada alta. Si també coincideix. Mostrarem el resultat.
                            if (objPreu.temporada_alta == temporadaAlta) {
                                if (preuMesBaix == null) {
                                    preuMesBaix = objPreu
                                } else {
                                    if (objPreu.preu_total < preuMesBaix.preu_total) {
                                        preuMesBaix = objPreu;
                                    }
                                }
                            }
                        }
                        if (preuMesBaix != null) {
                            var objCerca = new Object();
                            objCerca.hotel = objHotel;
                            objCerca.hab = objHab;
                            objCerca.preu = preuMesBaix;
                            //Guardarem dins una llista les dades bàsiques per identificar l'hotel, habitació i preu.
                            llistatHotelsSeleccionats.push(objCerca);
                            var index = llistatHotelsSeleccionats.length;
                            pintarInformacioHotelHabPreu(objCerca, index);
                        }
                    }
                }
            }
        }

        function aplicarFiltres() {
            /*
             var objCerca = new Object();
            objCerca.hotel = objHotel;
            objCerca.hab = objHab;
            objCerca.preu = objPreu;
            */
            //Si la cerca no te resultats, no fa falta filtrar res.
            if (llistatHotelsSeleccionats != null && llistatHotelsSeleccionats.length > 0) {
                //Revisarem la llista de checksbox que tenim

                llistatHotelsSeleccionatsFiltrats = llistatHotelsSeleccionats;
                var llistaAuxiliar;
                for (oFiltre of document.getElementsByClassName("filtre")) {
                //Revisarem els que estan marcats.
                    if (oFiltre.checked) {
                        switch (oFiltre.id) {
                            case "filterGym":
                                //Com a l'exemple no tenc gym he fet un filtre damunt el nom. Per treure l'hotel Prova 3. Això només és per mostrar-vos un exemple.
                                if (llistatHotelsSeleccionatsFiltrats.length > 0) {
                                    llistaAuxiliar = new Array();
                                    for (hotelSeleccionat of llistatHotelsSeleccionatsFiltrats) {
                                        if (hotelSeleccionat.hotel.nom == "Prova 3") {
                                            llistaAuxiliar.push(hotelSeleccionat);
                                        }
                                    }
                                    llistatHotelsSeleccionatsFiltrats = llistaAuxiliar;
                                }

                                break;
                            case "habitacioMinibar":
                                /* if (llistatHotelsSeleccionatsFiltrats.length > 0) {
                                     llistaAuxiliar = new Array();
                                     for (hotelSeleccionat of llistatHotelsSeleccionatsFiltrats) {
                                         if (hotelSeleccionat.hab.minibar == true) {
                                             llistaAuxiliar.push(hotelSeleccionat);
                                         }
                                     }
                                     llistatHotelsSeleccionatsFiltrats = llistaAuxiliar;
                                 }*/
                                break;
                            case "servei":
                                /*if (llistatHotelsSeleccionatsFiltrats.length > 0) {
                                    llistaAuxiliar = new Array();
                                    for (hotelSeleccionat of llistatHotelsSeleccionatsFiltrats) {
                                        for (servei of hotelSeleccionat.hotel.serveis) {
                                            if (servei.valorDelServei == true) {
                                                llistaAuxiliar.push(hotelSeleccionat);
                                            }
                                        }
                                    }
                                    llistatHotelsSeleccionatsFiltrats = llistaAuxiliar;
                                }*/
                                break;
                            default:

                        }
                    }
                }

                borrarResultatsAnteriors();
                for (objCerca of llistatHotelsSeleccionatsFiltrats) {
                    pintarInformacioHotelHabPreu(objCerca);
                }

            }
        }

        //Pintar la informació al Html.
        //Del hotel no hem de consultar les habitacions, ja que la seleccionada la tenim com a parametre.
        //De la habitacio  no hem de consultar els  preus, ja que el seleccionat el tenim com parametre.
        function pintarInformacioHotelHabPreu(objInformacioElement) {
            /*
            var objCerca = new Object();
            objCerca.hotel = objHotel;
            objCerca.hab = objHab;
            objCerca.preu = objPreu;
            */
            var StrHtml = "<div class=\"habitacio\">";
            StrHtml += "<div class=\"imatgeHab\">";
            StrHtml += "<img class=\"imgMiniHab\" src=\"https://raw.githubusercontent.com/TomeuC/ProvaPerJon/master/1489763093510.jpg\" />";
            StrHtml += "</div>";
            StrHtml += "<div class=\"infoHab\">";
            StrHtml += "<h3 class=\"titolHotel\">" + objInformacioElement.hotel.nom + "</h3><div class=\"estrelles\">Estrelles: " + objInformacioElement.hotel.estrelles + "</div>";
            StrHtml += "<div class=\"hotelDescripcio\">";
            StrHtml += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum convallis nisl, ut cursus dui congue a. Aliquam aliquet dolor quis suscipit eleifend. Etiam et vehicula ipsum. Nulla facilisi. Vivamus aliquam condimentum magna, lacinia gravida orci tincidunt eget. Duis at ultrices est. Praesent aliquam, turpis vitae vestibulum dignissim, eros justo tempus felis, in interdum quam risus sed quam. In sit amet sodales neque. Cras leo velit, feugiat vehicula leo id, molestie molestie magna";
            StrHtml += "</div>";
            StrHtml += "</div>";
            StrHtml += "<div class=\"preuHab\">";
            StrHtml += "<div>Preu " + objInformacioElement.preu.valorNet + " " + objInformacioElement.preu.moneda + "</div>";
            StrHtml += "<div>Impostos " + objInformacioElement.preu.impostPercent + "% </div>";
            StrHtml += "<div>Preu Total " + objInformacioElement.preu.preu_total + " </div>";
            StrHtml += "</div>";
            StrHtml += "<div class=\"informacioExtesa\">";
            StrHtml += "<p onclick=\"mostrarElement(this)\">Més informació</p>";
            StrHtml += "<div class=\"mesInfo\">Mostrariem més informació</div>";
            StrHtml += "</div>";
            StrHtml += "<div class=\"seleccionar\">";
            StrHtml += "<label>Quantitat:</label>";
            StrHtml += "<input type=\"number\" id=\"" + objInformacioElement.hotel.id + "_" + objInformacioElement.hab.id + "_" + objInformacioElement.preu.temporada_alta + "_" + objInformacioElement.preu.nom_agr + "\" />";
            StrHtml += "<button type=\"button\" onclick=\"seleccionarHabitacio(" + objInformacioElement.hotel.id + "," + objInformacioElement.hab.id + "," + objInformacioElement.preu.temporada_alta + ",'" + objInformacioElement.preu.nom_agr + "'," + objInformacioElement.preu.preu_total + ")\" >Seleccionar. </button>";
            StrHtml += "</div>";
            StrHtml += "</div>";
            StrHtml += "";

            document.getElementById("resultats").innerHTML += StrHtml;
        }

        function seleccionarHabitacio(hotelId, habId, temporada_alta, preuProv, preuValor) {

            //Si la llista no esta inicialitzada la inicialitzam;
            if (llistaHabitacionsSeleccionades == null) {
                llistaHabitacionsSeleccionades = new Array();
            }

            var valorActual = parseFloat(document.getElementById("preuValor").innerText);
            var numHabActual = parseInt(document.getElementById("numHabitacions").innerText);

            var numHabSeleccionades = parseInt(document.getElementById(hotelId + "_" + habId + "_" + temporada_alta + "_" + preuProv).value);

            if (numHabSeleccionades > 0) {
                document.getElementById("numHabitacions").innerText = numHabActual + numHabSeleccionades;
                document.getElementById("preuValor").innerText = valorActual + (preuValor * numHabSeleccionades);

                var habitacioSeleccionada = new Object();
                habitacioSeleccionada.hotelId = hotelId;
                habitacioSeleccionada.habId = habId;
                habitacioSeleccionada.temporada_alta = temporada_alta;
                habitacioSeleccionada.preunom_agr = preuProv;
                habitacioSeleccionada.numHabSeleccionades = numHabSeleccionades;
                llistaHabitacionsSeleccionades.push(habitacioSeleccionada);

            } else {
                alert("Selecciona alguna habitació");
            }
        }

        /**************
        Funció genèrica per recuperar valors d'un radiobutton.
        nomRadio es el name del radio <input type="radio" name="aquest nom" id="id" />
        *********/
        function getValorRadio(nomRadio) {
            //obtenim la llista de inputs que tenen el mateix nom
            var radios = document.getElementsByName(nomRadio);
            //recorrem els inputs amb el mateix nom per recuperar el valor del seleccionat.
            for (radio of radios) {
            //si el radio està activat
                if (radio.checked) {
                    //retornam el seu valor
                    return radio.value;
                }
            }
            //En cas de no haver cap activat retornam "";
            return "";
        }

        function continuar() {
            if (llistaHabitacionsSeleccionades == null || llistaHabitacionsSeleccionades.length == 0) {
                alert("No hi ha cap habitació seleccionada");
            } else {
                var jsonString = JSON.stringify(llistaHabitacionsSeleccionades);
                document.getElementById("parJson").value = jsonString;
                document.getElementById("dispo").submit();
            }
        }
