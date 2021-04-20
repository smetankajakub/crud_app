$("#add_user").submit( function(event){
    alert("Data inserted sucessfully");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url": 'http://localhost:3000/api/users/${data.id}',
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(){
        alert('user was updated succesfully');
    });
})