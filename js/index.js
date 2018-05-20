window.onload = function () {
    if(webExtensionWallet){
        $$("#addbtn").show();
        setTimeout(() => {
            getMyNotes();
          }, 10);
    }else{
        $$("#addbtn").hide();
        $$("#cards").html("Please install<a href='https://github.com/ChengOrangeJu/WebExtensionWallet' class='external'>WebExtensionWallet</a>")
    }
}

function initForm() {
  var curDate = new Date();
  $$("#dateTime").val(curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + (curDate.getDay() + 1))
}

function closeForm() {
  mainView.router.back();
}

function save() {
  var text = $$("#content").val();
  if (text && text.length > 10 && text.length < 500) {
    let api = new NoteContractApi();
    api.add($$("#content").val(), () => {
      mainView.router.back();
    });
  } else {
    app.dialog.alert('content between 10 and 500');
  }

}

function getMyNotes() {
  var ele = $$("#cards").empty();
  let api = new NoteContractApi();
  api.getByWallet(resp => {
    if (resp.result) {
      var template = "";
      let notes = JSON.parse(resp.result);
      console.log("notes----")
      console.log(notes)
      for (const note of notes) {
        template += generateTemplate(note);
      }
      ele.html(template);
    }
  })
}

function generateTemplate(note) {
  var d = new Date(note.date);
  return "<div class='card'>" +
    "<div class='card-content card-content-padding'>" + note.text +
    "</div>" +
    "<div class='card-footer card_footer_custome'>" + d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + (d.getDay() + 1) + "日" + "</div>" +
    "</div>"
}
