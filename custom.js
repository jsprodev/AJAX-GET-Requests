// get data using Vanilla JS onload
document.querySelector("#jsOnload").addEventListener('click', function () {
  var xhr = new XMLHttpRequest;
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      dataObj = JSON.parse(xhr.responseText);
      loadDataInTablualrForm(dataObj);
    }
  }
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments?postId=1', true);
  xhr.send();
  document.querySelector("#jsOnload").disabled = true;
});

// get data using Vanilla JS onreadystatechange 
document.querySelector("#jsOnReadyStateChange").addEventListener('click', function () {
  var xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      dataObj = JSON.parse(xhr.responseText);
      loadDataInTablualrForm(dataObj);
    }
  }
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments?postId=2', true);
  xhr.send();
  document.querySelector("#jsOnReadyStateChange").disabled = true;
});

// get data using fetch
document.querySelector('#jsFetch').addEventListener('click', function() {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=3')
    .then(function(response) {
      response.json()
        .then(function(dataObj) {
          loadDataInTablualrForm(dataObj);
          document.querySelector("#jsFetch").disabled = true;
        });  
    });
});

// get data using jQuery AJAX
$('#jQueryAjax').one('click', function() {
  $.ajax('https://jsonplaceholder.typicode.com/comments?postId=4')
    .done(function(data, statusText, xhrObj) {
      var table = $('<table>').addClass('table table-striped table-bordered table-hover table-dark table-sm');
      var thead = $('<thead>').addClass('thead-light');
      var tbody = $('<tbody>');
      for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          thead.append('<th>'+key+'</th>')
        }
      }
      table.append(thead);
      $.each(data, function(index, value) {
        tbody.append('<tr><td>' + value.postId + '</td>' + '<td>' + value.id + '</td>' + '<td>' + value.name + '</td>' + '<td>' + value.email + '</td>' + '<td>' + value.body + '</td></tr>');
      });
      table.append(tbody);
      $('#table').html('');
      $('#table').append(table);
    })
    .fail(function() {
      console.log('fail');
    })
    .always(function() {
      console.log('complete');
    });
});

// get data using jQuery load
$('#jQueryLoad').one('click', function(){
  $('#table').load('https://jsonplaceholder.typicode.com/comments?postId=5', function(responseText, statusText, xhrObj) {
    var table = $('<table>').addClass('table table-striped table-bordered table-hover table-dark table-sm');
      var thead = $('<thead>').addClass('thead-light');
      var tbody = $('<tbody>');
      for (var key in JSON.parse(responseText)[0]) {
        if (JSON.parse(responseText)[0].hasOwnProperty(key)) {
          thead.append('<th>'+key+'</th>')
        }
      }
      table.append(thead);
      $.each(JSON.parse(responseText), function(index, value) {
        tbody.append('<tr><td>' + value.postId + '</td>' + '<td>' + value.id + '</td>' + '<td>' + value.name + '</td>' + '<td>' + value.email + '</td>' + '<td>' + value.body + '</td></tr>');
      });
      table.append(tbody);
      $('#table').html('');
      $('#table').append(table);
  });
});

// // get data using jQuery load
$('#jQueryGet').one('click', function(){
  $.get('https://jsonplaceholder.typicode.com/comments?postId=6', function(data, statusText) {
    var table = $('<table>').addClass('table table-striped table-bordered table-hover table-dark table-sm');
    var thead = $('<thead>').addClass('thead-light');
    var tbody = $('<tbody>');
    for (var key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        thead.append('<th>'+key+'</th>')
      }
    }
    table.append(thead);
    $.each(data, function(index, value) {
      tbody.append('<tr><td>' + value.postId + '</td>' + '<td>' + value.id + '</td>' + '<td>' + value.name + '</td>' + '<td>' + value.email + '</td>' + '<td>' + value.body + '</td></tr>');
    });
    table.append(tbody);
    $('#table').html('');
    $('#table').append(table);
  });
});

function loadDataInTablualrForm(dataObj) {
  var html = '';
  html += '<table class="table table-striped table-bordered table-hover table-dark table-sm"><thead class="thead-light"><tr>';
  for (var key in dataObj[0]) {
  if (dataObj[0].hasOwnProperty(key)) {
    html += '<th>'+key+'</th>'
  }
  }
  html += '</tr></thead><tbody>';
  for (var i = 0; i < dataObj.length; i ++) {
  html += '<tr><td>' + dataObj[i].postId + '</td>' + '<td>' + dataObj[i].id + '</td>' + '<td>' + dataObj[i].name + '</td>' + '<td>' + dataObj[i].email + '</td>' + '<td>' + dataObj[i].body + '</td></tr>';
  }      
  html += '</tbody></table>';
  document.querySelector('#table').innerHTML = html;
}