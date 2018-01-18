$(document).ready(function(){

    /** 
    Chances of getting an Ultra-Rare: 1%
    Chances of getting an Super-Super-Rare: 1%
    Chances of getting an Super-Rare: 1%
    Chances of getting an Rare: 1% 
    **/

    var currentgems = 0;
    var totalcards = 0;
    var UR = 0;
    var SSR = 0;
    var SR = 0;
    var R = 0;

    function getType(type) {
        if (type == 'UR') {
            return getRandomInt(1, 22);
        }
        else if (type == 'SR'){
            return getRandomInt(1, 68);
        }
        else if (type == 'SSR'){
            return getRandomInt(1, 8);
        }
        else {
            return getRandomInt(1, 20);
        }
    }

    function cardlists(type, unit) {
        var got = getType(type);
        console.log(type, got);
        $.ajax({
            url: 'http://schoolido.lu/api/cards/?page='+got+'&rarity='+type+'&main_unit='+unit,
            type: 'GET',
            dataType: 'json',
            success:function(msg){
                var num = getRandomInt(0, 10);
                if (msg['results'][num]['round_card_image'] != null) {
                    $('#cardresult').append('<img src="'+msg['results'][num]['round_card_image']+'" style="width: 60px; height: 60px;">');
                }
                else {
                    $('#cardresult').append('<img src="'+msg['results'][num]['round_card_idolized_image']+'" style="width: 60px; height: 60px;">');
                }
            }
        });
    };

    $('#scout1').click(function(e){
        e.preventDefault();
        spent(5);
        scout(1);
    });

    $('#scout11').click(function(e){
        e.preventDefault();
        spent(50);
        scout(11);
    });

    function scout(times) {
        for (var i = 1; i <= times; i++) {
            var rng = Math.random();
            totalcards = totalcards + 1;
            if (rng < 0.01) {
                cardlists('UR', 'μ%27s');
                addtolibrary('UR');
            }
            else if (rng < 0.15) {
                cardlists('SSR', 'μ%27s');
                addtolibrary('SSR');
            }
            else if (rng < 0.3) {
                cardlists('SR', 'μ%27s');
                addtolibrary('SR');
            }
            else {
                cardlists('R', 'μ%27s');
                addtolibrary('R');
            }
        }
        $('#result').append('<hr/>');
    }

    function spent(spent) {
        currentgems = currentgems + spent;
        document.getElementById('spent').innerHTML = currentgems;
    }

    function addtolibrary(type) {
        document.getElementById('cards').innerHTML = totalcards;
        if (type == 'UR') {
            UR = UR + 1;
            document.getElementById(type).innerHTML = '';
            document.getElementById(type).innerHTML = UR;
        }
        else if (type == 'SSR') {
            SSR = SSR + 1;
            document.getElementById(type).innerHTML = '';
            document.getElementById(type).innerHTML = SSR;
        }
        else if (type == 'SR') {
            SR = SR + 1;
            document.getElementById(type).innerHTML = '';
            document.getElementById(type).innerHTML = SR;
        }
        else {
            R = R + 1;
            document.getElementById(type).innerHTML = '';
            document.getElementById(type).innerHTML = R;
        }
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})