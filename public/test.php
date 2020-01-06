<!DOCTYPE html>
<html>
<head>
    <title>gis</title>
</head>
<body>
<div>
        <script type="text/javascript">
        function Ajax(){
        var xmlHttp;
            try{    
                xmlHttp=new XMLHttpRequest();// Firefox, Opera 8.0+, Safari
            }
            catch (e){
                try{
                    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
                }
                catch (e){
                    try{
                        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e){
                        alert("No AJAX!?");
                        return false;
                    }
                }
            }

        xmlHttp.onreadystatechange=function(){
            if(xmlHttp.readyState==4){
                document.getElementById('ReloadThis').innerHTML=xmlHttp.responseText;
                setTimeout('Ajax()',1000);
            }
        }
        xmlHttp.open("GET","test-data.php",true);
        xmlHttp.send(null);
        }

        window.onload=function(){
            setTimeout('Ajax()',0);
        }
        </script>

        <div id="ReloadThis"></div>
        
    </div>
</body>
</html>