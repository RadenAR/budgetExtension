$(function () {
  chrome.storage.sync.get(['limit', 'total'], function (budget) {
    $('#total').text(budget.total)
    $('#limit').text(budget.limit)
  })
  $('#spendAmount').click(function () {
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
      var newTotal = 0
      if (budget.total) {
        newTotal += budget.total
      }

      var amount = $('#amount').val()
      if (amount) {
        newTotal += parseInt(amount)
      }

      chrome.storage.sync.set({'total': newTotal}, function () {
        if (amount && newTotal >= budget.limit) {
          var notifOptions = {
            type: 'basic',
            title: 'Limit reached!',
            iconUrl: 'icon48.png',
            message: 'Looks like you have reached your limit!'
          }
          chrome.notifications.create('limitNotif', notifOptions)
        }
      })

      $('#total').text(newTotal)
      $('#amount').val('')
    })
  })
})
