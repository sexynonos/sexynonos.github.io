(function () {
    if (_V_ && _V_.player) {
        var type = vjsExt_ad.type;
        var src = vjsExt_ad.src;
        var width = vjsExt_ad.width;
        var height = vjsExt_ad.height;
        var link = vjsExt_ad.link;

        if (_V_.player.buildBigPlayButton) {
            /*
            * replace the default method
            */
            _V_.player.buildBigPlayButton = function () {
                /* Creating this HTML
                <div class="vjsext-picture-ad"><span></span></div>
                */
               this.pictureAd = _V_.createElement("div", {
                    className: "vjsext-picture-ad", //"vjs-big-play-button",
                    innerHTML: "<a target='_blank' href='" + link + "' " +
						"style='display:block;position:absolute;left:0px;top:0px;width:100%;height:100%;'>" +
                        "<span><img src='" + src + "' width='" + width + "' height='" + height + "'/></span></a>" +
                        "<div onClick='onClickClose();' "+
                              "class='vjsext-picture-ad-close' onMouseOver='onMouseOnClose();' onMouseOut='onMouseOutClose();'></div>"
                });
                this.box.appendChild(this.pictureAd);
                this.activateElement(this.pictureAd, "pictureAd");
            }
            _V_.player.newBehavior("pictureAd", function (element) {
                if (!this.elements.pictureAds) {
                    this.elements.pictureAds = [];
                    this.onPause(this.pictureAdOnPause);
                    this.onPlay(this.pictureAdOnPlay);
                }
                this.elements.pictureAds.push(element);
                element.style.display = "block";
                element.style.width = width + "px";
                element.style.height = height + "px";
                element.style.marginTop = "-" + parseInt(height / 2) + "px";
                element.style.marginLeft = "-" + parseInt(width / 2) + "px";
                /*element.style.backgroundImage="url(" + src +")";*/
            }, {
                pictureAdOnPause: function (event) {
                    this.showPictureAds();
                },
                pictureAdOnPlay: function (event) {
                    this.hidePictureAds();
                },
                showPictureAds: function () {
                    this.each(this.elements.pictureAds, function (element) {
                        element.style.display = "block";
                    });
                },
                hidePictureAds: function () {
                    this.each(this.elements.pictureAds, function (element) {
                        element.style.display = "none";
                    });
                }
            });
        }
    }else if(_V_ && _V_.BigPlayButton){
	var type = vjsExt_ad.type;
        var src = vjsExt_ad.src;
        var width = vjsExt_ad.width;
        var height = vjsExt_ad.height;
        var link = vjsExt_ad.link;
	 _V_.BigPlayButton =  _V_.Button.extend({
		init:function(player, options){
	    		this._super(player, options);
			this.el.style.width = width + "px";
               		this.el.style.height = height + "px";
              		this.el.style.marginTop = "-" + parseInt(height / 2) + "px";
               		this.el.style.marginLeft = "-" + parseInt(width / 2) + "px"
		 	this.el.style.display="block";
		 	//player.addEvent("loadstart",  _V_.proxy(this, this.show));
	    		player.addEvent("pause", _V_.proxy(this, this.show));
	    		player.addEvent("play", _V_.proxy(this, this.hide));
		},
		createElement:function(){
			return this._super("div", {
				className:"vjsext-picture-ad",
				innerHTML:"<a target='_blank' href='" + link + "' " +
						"style='display:block;position:absolute;left:0px;top:0px;width:100%;height:100%;'>" +
                       				 "<span><img src='" + src + "' width='" + width + "' height='" + height + "'/></span></a>" +
                       				 "<div onClick='onClickClose();' "+
                              			"class='vjsext-picture-ad-close' onMouseOver='onMouseOnClose();' onMouseOut='onMouseOutClose();'></div>"
				});
		}
	});	 
    }

})();

function getElementsByClassName(Name) {
    var nodes = [];
    var els = document.getElementsByTagName("div");
    var elem;
    for (elem in els) {
        if (els[elem].nodeType == 1 && els[elem].className == Name) {
            nodes.push(els[elem]);
        }
        return nodes;
    }
}

function onMouseOnClose() {
  var x = document.getElementsByClassName("vjsext-picture-ad-close");
   x[0].style.backgroundPosition = "-20px 0px";
};

function onMouseOutClose() {
    var x = document.getElementsByClassName("vjsext-picture-ad-close");
   x[0].style.backgroundPosition = "0px 0px";
};

function onClickClose() {
    var x = document.getElementsByClassName("vjsext-picture-ad");
    x[0].style.display = "none";
};
