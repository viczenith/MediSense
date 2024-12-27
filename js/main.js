_i= 1;
document.getElementById('nav_toggle').addEventListener('click',()=>{
    $('a').toggle('slow');
    _this  = $('#nav_toggle');
    if(_i == 0){
            _this.html('<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="M360-120v-720h60v720h-60Zm175-181v-358l185 179-185 179Z"/></svg>')
            _i = 1;
    }else{
        _this.html('<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M425-301v-358L240-480l185 179Zm115 181h60v-720h-60v720Z"/></svg>')
        _i = 0;
    }

})
// make prompt
$(document).ready(()=>{
    $('#thinking').hide();


    
    $('#make_prompt').click(()=>{
        _prompt = $('#prompt').val();
        $('#thinking').show();
        _response_html = `<div class="response alert alert-light">${_prompt}</div>`
        document.querySelector('#response_container').innerHTML +=(_response_html);
        $.get('responses.txt',(data)=>{
            _data_obj  = JSON.parse(data);
            _x = Math.floor(Math.random()*_data_obj.length);

            
            // uniqe id for each response 
            _response_id =  Math.floor(Math.random()*9999999999);

            _response_html = `<div class="response alert alert-dark" > <div class='text-end p-1 '> 
            <button type='button' onclick="copy_response(`+_response_id+`)" class='btn btn-dark btn-sm'> copy</button> 
            </div> <div id=`+_response_id+` class='bg-light p-2 rounded'>` 
            + _data_obj[_x].text +`</div></div>
            `

            $('#thinking').hide();
            document.querySelector('#response_container').innerHTML +=_response_html;

            // Scroll to the bottom of the response container
            responseContainer = document.querySelector('#response_container');
            responseContainer.scrollTop = responseContainer.scrollHeight;
            $('#prompt').val('').focus();

        })        
    })

    // copy response 

    $('#copy_link').click(()=>{

        var link = $('#link').val();
        navigator.clipboard.writeText(link).then(()=> {
            alert("Link Copied to"+link);
        })
    })
  
})

function copy_response(_elt_id){
      _elt = $('#'+_elt_id).html();
        navigator.clipboard.writeText(_elt).then(()=> {
        alert("Copied \n"+_elt);
    })
}

