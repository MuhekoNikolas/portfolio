
tinymce.PluginManager.add('myembed', function (editor) {

    const getMyEmbedDialog = function(){
        var dialogConfig =  {
            title: 'Insert a site embed.',
            body: {
              type: 'panel',
              items: [
                {
                    type: 'urlinput', 
                    name: 'url_input', 
                    filetype: 'file', // allow any file types
                    label: 'Page url:', 
                    disabled: true // disabled state
                },
              ]
            },
            buttons: [
              {
                type: 'cancel',
                name: 'closeButton',
                text: 'Cancel'
              },
              {
                type: 'submit',
                name: 'submitButton',
                text: 'Submit blog.',
                buttonType: 'primary'
              }
            ],
    
            onSubmit: (api)=>{beginFetchingHtml(api, editor)}
        };
    
        return dialogConfig
    }
    
    
    var beginFetchingHtml = function(apiInfo, editor){
        data = apiInfo.getData()

        var urlRegex = new RegExp(/^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/)
        if(data.url_input.value.length<=11 || data.url_input.value.match(urlRegex)==null){
            editor.notificationManager.open({
                text: "Please enter a valid image url for the blog banner.",
                type: "error",
                timeout: 2500,
            });
            return
        }

        try{

            fetch(`/1/embed?url=${data.url_input.value}`)
            .then(_req=>_req.json()).then(data=>{
                console.log(data)
            })

        } catch(err){
            editor.notificationManager.open({
                text: "An error occured.",
                type: "error",
                timeout: 2500,
            });
            return
        }

    }

    editor.ui.registry.addButton('myembed', {
        icon: 'new-tab',
        tooltip: 'Open link',
        onAction: (api)=>{editor.windowManager.open(getMyEmbedDialog())},
        // onSetup: console.log
    });

    return {};
});


