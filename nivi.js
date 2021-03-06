$(function () {
	nivi.init();
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://mapny.ru/nivi/nivi.css?v=5';
    link.media = 'all';
    head.appendChild(link);
});

var nivi = {
	slideDownOnInit: true,
	init: function () {
		var sizeSelector = $('.nivi-toggle');
		function initBar () {
			nivi.appendBar();
			nivi.bindControls();
			if($.cookie('nivi_size') != undefined) {
				$('.nivi-bar li.' + $.cookie('nivi_size')).click();
			}
			if($.cookie('nivi_spacing') != undefined) {
				$('.nivi-bar li.' + $.cookie('nivi_spacing')).click();
			}
			if($.cookie('nivi_font') != undefined) {
				$('.nivi-bar li.' + $.cookie('nivi_font')).click();
			}
			if($.cookie('nivi_color') != undefined) {
				$('.nivi-bar li.' + $.cookie('nivi_color')).click();
			}
			if($.cookie('nivi_image_disable') != undefined) {
				$('.nivi-image-switcher').click();
			}
			if($.cookie('nivi_image_bw') != undefined) {
				$('.nivi-image-switcher').click();
			}
		}
		sizeSelector.click(initBar);
		if($.cookie('nivi_view') != undefined) {
			nivi.slideDownOnInit = false;
			initBar();
		}
	},
	bindControls: function () {
		var html = $('html');
		var bar = $('.nivi-bar');
		bar.find('.nivi-size-section li').each(function () {
			$(this).click(function () {
				bar.find('.nivi-size-section li.active').removeClass('active');
				$.cookie('nivi_size', $(this).attr('class'), {expires: 90, path: '/'});
				$(this).addClass('active');
				html.removeClass('nivi-normal nivi-medium nivi-large');
				html.addClass($(this).attr('data-classname'));
				window.dispatchEvent(new Event('resize'));
			});
		});
		bar.find('.nivi-spacing-section li').each(function () {
			$(this).click(function () {
				bar.find('.nivi-spacing-section li.active').removeClass('active');
				$.cookie('nivi_spacing', $(this).attr('class'), {expires: 90, path: '/'});
				$(this).addClass('active');
				html.removeClass('nivi-spacing-normal nivi-spacing-medium nivi-spacing-large');
				html.addClass($(this).attr('data-classname'));
				window.dispatchEvent(new Event('resize'));
			});
		});
		bar.find('.font-select li').each(function () {
			$(this).click(function () {
				bar.find('.font-select li.active').removeClass('active');
				$.cookie('nivi_font', $(this).attr('class'), {expires: 90, path: '/'});
				$(this).addClass('active');
				html.removeClass('nivi-font-times nivi-font-montserrat');
				html.addClass($(this).attr('data-classname'));
				window.dispatchEvent(new Event('resize'));
			});
		});
		bar.find('.nivi-color-section li').each(function () {
			$(this).click(function () {
				bar.find('.nivi-color-section li.active').removeClass('active');
				$.cookie('nivi_color', $(this).attr('class'), {expires: 90, path: '/'});
				$(this).addClass('active');
				html.removeClass('nivi-achromatic nivi-invert nivi-blue nivi-yellow nivi-brown');
				html.addClass($(this).attr('data-classname'));
			});
		});
		bar.find('.nivi-image-switcher').click(function () {
			if(!$(this).hasClass('active')) {
				$(this).addClass('active').html('');
				$.cookie('nivi_image_disable', 'on', {path: '/', expires: 30});
				html.addClass('nivi-no-image');
			}
			else {
				$(this).removeClass('active').html('');
				$.cookie('nivi_image_disable', 'off', {path: '/', expires: -5});
				html.removeClass('nivi-no-image');
			}
			window.dispatchEvent(new Event('resize'));
		});
		bar.find('.nivi-image-bw').click(function () {
			if(!$(this).hasClass('active')) {
				$(this).addClass('active').html('');
				$.cookie('nivi_image_disable', 'on', {path: '/', expires: 30});
				html.addClass('nivi-no-image');
			}
			else {
				$(this).removeClass('active').html('');
				$.cookie('nivi_image_disable', 'off', {path: '/', expires: -5});
				html.removeClass('nivi-no-image');
			}
			window.dispatchEvent(new Event('resize'));
		});
		$('.nivi-hide').off('click').click(function () {
			html.toggleClass('nivi-mini');
		});
		/*
		$('.nivi-mini .nivi-hide').off('click').click(function () {
			html.removeClass('nivi-mini');
		});
		*/
	},
	appendBar: function () {
		if($('.nivi-bar').length == 1) {
			return;
		}
		var html =
			'<div class="nivi-bar">' +
				'<div class="nivi-empty"></div>' +
				'<fieldset class="nivi-size-section">' +
					'<legend>????????????</legend>' +
					'<div class="nivi-size" data-classname="nivi-normal" data-title="????????????????????"></div>' +
					'<ul>' +
						'<li class="nivi-size-normal active" data-classname="nivi-normal" data-title="???????????????? ????????????"></li>' +
						'<li class="nivi-size-medium" data-classname="nivi-medium" data-title="??????????????????????"></li>' +
						'<li class="nivi-size-large" data-classname="nivi-large" data-title="??????????????"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-spacing-section">' +
					'<legend>????????????????</legend>' +
					/*
					'<div class="nivi-slider"></div>' +
					*/
					'<div class="nivi-spacing" data-classname="nivi-spacing-normal" data-title="???????????????????????? ????????????????"></div>' +
					'<ul>' +
						'<li class="nivi-spacing-normal active" data-classname="nivi-spacing-normal" data-title="???????????????? x1.5"></li>' +
						'<li class="nivi-spacing-medium" data-classname="nivi-spacing-medium" data-title="???????????????? x2.5"></li>' +
						'<li class="nivi-spacing-large" data-classname="nivi-spacing-large" data-title="???????????????? x3.5"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-color-section">' +
					'<legend>????????</legend>' +
					'<ul>' +
						'<li class="nivi-color-normal active" data-classname="nivi-achromatic" data-title="????????????????????????????">??</li>' +
						'<li class="nivi-color-invert" data-classname="nivi-invert" data-title="???????????????????????????? ????????????????">??</li>' +
						'<li class="nivi-color-blue" data-classname="nivi-blue" data-title="?????????????????????????? ??????????">??</li>' +
						'<li class="nivi-color-yellow" data-classname="nivi-yellow" data-title="??????????????">??</li>' +
						'<li class="nivi-color-brown" data-classname="nivi-brown" data-title="????????????">??</li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-image-section">' +
					'<legend>??????????????????????</legend>' +
					'<ul>' +
						'<li class="nivi-image-switcher" data-title="?????????????????? ??????????????????????"></li>' +
						'<li class="nivi-image-bw" data-title="??????????-?????????? ??????????????????????"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-speech-section">' +
					'<legend>??????????????</legend>' +
					'<ul>' +
						'<li id="playsound" class="nivi-speech-play" data-title="??????????????????????????"></li>' +
						/*
						'<li id="speech-control_stop" title="????????????????????"></li>' +
						*/
						'<li class="nivi-speech-speed" data-title="????????????????">2x</li>' +
						'<li id="speech-control_replay" class="nivi-speech-replay" data-title="??????????????????"></li>' +
					'</ul>' +
				'</fieldset>' +
				/*
				'<fieldset class="nivi-font-section">' +
					'<legend>??????????</legend>' +
					'<ul>' +
						'<li class="font-montserrat active" data-classname="nivi-font-montserrat">?????? ??????????????</li>' +
						'<li class="font-times" data-classname="nivi-font-times">?? ??????????????????</li>' +
					'</ul>' +
				'</fieldset>' +
				*/
				'<ul class="nivi-control"><li class="nivi-close"></li><li class="nivi-hide"></li></ul>' +
			'</div>' +
			'<ul class="nivi-settings">' +
				'<li class="nivi-compact">' +
						'<input type="checkbox" id="nivi-compact" name="nivi-compact" value="nivi-compact">' +
						'<label for="nivi-compact">????????????????????</label>' +
				'</li>' +
				'<li class="nivi-style-default">' +
						'<input type="radio" id="nivi-style-default" name="nivi-style" value="nivi-style-default" checked="">' +
						'<label for="nivi-style-default">??????????????????????</label>' +
				'</li>' +
				'<li class="nivi-style-circle">' +
						'<input type="radio" id="nivi-style-circle" name="nivi-style" value="nivi-style-circle">' +
						'<label for="nivi-style-circle">??????????????</label>' +
				'</li>' +
				'<li class="nivi-style-square">' +
						'<input type="radio" id="nivi-style-square" name="nivi-style" value="nivi-style-square">' +
						'<label for="nivi-style-square">????????????????????</label>' +
				'</li>' +
				'<li class="nivi-position-top">' +
						'<input type="radio" id="nivi-position-top" name="nivi-position" value="nivi-position-top" checked="">' +
						'<label for="nivi-position-top">????????????</label>' +
				'</li>' +
				'<li class="nivi-position-right">' +
						'<input type="radio" id="nivi-position-right" name="nivi-position" value="nivi-position-right">' +
						'<label for="nivi-position-right">????????????</label>' +
				'</li>' +
				'<li class="nivi-position-left">' +
						'<input type="radio" id="nivi-position-left" name="nivi-position" value="nivi-position-left">' +
						'<label for="nivi-position-left">??????????</label>' +
				'</li>' +
			'</ul>';
		$('body').prepend(html);
		$('.nivi-speech-play').on("click", function () {
			$(this).toggleClass('active');
			$("p, h1, h2, h3, h4, h5").before("<button class='nivi-speak'></button>");
			
			setTimeout(function(){
				$('.nivi-speak').each(function (index, value) { 
					$(this).attr('id', 'nivi-speak-item-' + index)
				});
			}, 500);
			
			setTimeout(function(){
				$('#nivi-speak-item-1').trigger('click');
			}, 1000);
			
		});

		if(nivi.slideDownOnInit) {
			$('.nivi-bar').hide().slideDown();
		}
		$('html').addClass('nivi-view nivi-normal nivi-achromatic');

		$('.nivi-toggle').off('click').click(function () {
			nivi.switchToNormal();
		});
		$('.nivi-close').off('click').click(function () {
			nivi.switchToNormal();
		});
		$.cookie('nivi_view', 'on', {expires: 90, path: '/'});
		$(window).resize();

		$('.nivi-settings li').click(function () {
			$('html').removeClass('nivi-style-default nivi-style-circle nivi-style-square')
			if ($('#nivi-style-default').is(':checked')) {
				$('html').addClass('nivi-style-default');
			}
			else
			if ($('#nivi-style-circle').is(':checked')) {
				$('html').addClass('nivi-style-circle');
			}
			else
			if ($('#nivi-style-square').is(':checked')) {
				$('html').addClass('nivi-style-square');
			}
			$('html').removeClass('nivi-position-top nivi-position-right nivi-position-left')
			if ($('#nivi-position-top').is(':checked')) {
				$('html').addClass('nivi-position-top');
			}
			else
			if ($('#nivi-position-right').is(':checked')) {
				$('html').addClass('nivi-position-right');
			}
			else
			if ($('#nivi-position-left').is(':checked')) {
				$('html').addClass('nivi-position-left');
			}
			$('html').removeClass('nivi-compact')
			if ($('#nivi-compact').is(':checked')) {
				$('html').addClass('nivi-compact');
			} else $('html').removeClass('nivi-compact');
		});
	},
	switchToNormal: function () {
		$('.nivi-bar').slideUp(function () {
			$(this).remove();
			$.cookie('nivi_view', 'off', {expires: -1, path: '/'});
			window.location.reload();
		});
	},
	isActive: function () {
		return $('html').hasClass('nivi-view')
	}
};










let voices = speechSynthesis.getVoices();
let defaultVoice;

speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
  defaultVoice = voices.find((voice) => voice.name === "Google ??????????????");

  wrni.addEventListener("click", handleClick);
  window.addEventListener("keydown", handleKeydown);
};

const PLAY = "nivi-speak";
const PAUSE = "nivi-speak pause";
const RESUME = "nivi-speak resume";

function handleClick({ target }) {
  switch (target.className) {
    case PLAY:
      speechSynthesis.cancel();

      const { textContent } = target.nextElementSibling;

      textContent.split(".").forEach((text) => {
        const trimmed = text.trim();
        if (trimmed) {
          const U = getUtterance(target, text);
          speechSynthesis.speak(U);
        }
      });
      break;
    case PAUSE:
      target.className = RESUME;
      speechSynthesis.pause();
      break;
    case RESUME:
      target.className = PAUSE;
      speechSynthesis.resume();
      break;
    default:
      break;
  }
}

function handleKeydown({ code }) {
  switch (code) {
    case "Escape":
      return speechSynthesis.cancel();
    default:
      break;
  }
}

function getUtterance(target, text) {
  const U = new SpeechSynthesisUtterance(text);
  U.voice = defaultVoice;
  U.lang = defaultVoice.lang;
  U.volume = 1;
  U.rate = 1;
  U.pitch = 1;

  U.onstart = () => {
    console.log("Started");
    target.className = PAUSE;
  };
  U.onend = () => {
    console.log("Finished");
    target.className = nivi-speak;
  };
  U.onerror = (err) => console.error(err);

  return U;
}