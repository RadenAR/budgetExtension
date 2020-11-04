$(function () {

  chrome.storage.sync.get('limit', function (budget) {
    $('#limit').val(budget.limit)
  })

  $('#saveLimit').click(function () {
    var limit = $('#limit').val()
    if (limit) {
      chrome.storage.sync.set({'limit': limit}, function () {
        close()
      })
    }
  })

  $('#resetTotal').click(function () {
    chrome.storage.sync.set({'total': 0}, function () {
      var notifLimit = {
        type: 'basic',
        title: 'Total Reset!',
        iconUrl: 'icon48.png',
        message: 'You have reset the total to 0!'
      }
      chrome.notifications.create('resetNotif', notifLimit)
    })
  })
})