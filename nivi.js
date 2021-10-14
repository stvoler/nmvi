
    


$(function () {
	nivi.init();
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://iskraa.ru/nivi/nivi.css';
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
				'<div></div>' +
				'<fieldset class="nivi-size-section">' +
					'<legend>Размер</legend>' +
					'<div class="nivi-size" data-classname="nivi-normal" data-title="Нормальный"></div>' +
					'<ul>' +
						'<li class="nivi-size-normal active" data-classname="nivi-normal" data-title="Изменить размер"></li>' +
						'<li class="nivi-size-medium" data-classname="nivi-medium" data-title="Увеличенный"></li>' +
						'<li class="nivi-size-large" data-classname="nivi-large" data-title="Большой"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-spacing-section">' +
					'<legend>Интервал</legend>' +
					/*
					'<div class="nivi-slider"></div>' +
					*/
					'<div class="nivi-spacing" data-classname="nivi-spacing-normal" data-title="Межбуквенный интервал"></div>' +
					'<ul>' +
						'<li class="nivi-spacing-normal active" data-classname="nivi-spacing-normal" data-title="Интервал x1.5"></li>' +
						'<li class="nivi-spacing-medium" data-classname="nivi-spacing-medium" data-title="Интервал x2.5"></li>' +
						'<li class="nivi-spacing-large" data-classname="nivi-spacing-large" data-title="Интервал x3.5"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-color-section">' +
					'<legend>Цвет</legend>' +
					'<ul>' +
						'<li class="nivi-color-normal active" data-classname="nivi-achromatic" data-title="Ахроматический">А</li>' +
						'<li class="nivi-color-invert" data-classname="nivi-invert" data-title="Ахроматическая инверсия">А</li>' +
						'<li class="nivi-color-blue" data-classname="nivi-blue" data-title="Хроматический синий">А</li>' +
						'<li class="nivi-color-yellow" data-classname="nivi-yellow" data-title="Светлый">А</li>' +
						'<li class="nivi-color-brown" data-classname="nivi-brown" data-title="Тёмный">А</li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-image-section">' +
					'<legend>Изображения</legend>' +
					'<ul>' +
						'<li class="nivi-image-switcher" data-title="Отключить изображения"></li>' +
						'<li class="nivi-image-bw" data-title="Чёрно-белые изображения"></li>' +
					'</ul>' +
				'</fieldset>' +
				'<fieldset class="nivi-speech-section">' +
					'<legend>Озвучка</legend>' +
					'<ul>' +
						'<li id="playsound" class="nivi-speech-play" data-title="Воспроизвести"></li>' +
						/*
						'<li id="speech-control_stop" title="Остановить"></li>' +
						*/
						'<li class="nivi-speech-speed" data-title="Скорость">2x</li>' +
						'<li id="speech-control_replay" class="nivi-speech-replay" data-title="Повторить"></li>' +
					'</ul>' +
				'</fieldset>' +
				/*
				'<fieldset class="nivi-font-section">' +
					'<legend>Шрифт</legend>' +
					'<ul>' +
						'<li class="font-montserrat active" data-classname="nivi-font-montserrat">Без засечек</li>' +
						'<li class="font-times" data-classname="nivi-font-times">С засечками</li>' +
					'</ul>' +
				'</fieldset>' +
				*/
				'<ul class="nivi-control"><li class="nivi-close"></li><li class="nivi-hide"></li></ul>' +
			'</div>';
		$('body').prepend(html);
		$('.nivi-speech-play').on("click", function () {
			$(this).toggleClass('active');
			$("p, h1, h2, h3, h4, h5").before("<button class='nivi-speak'></button>")
		});

		if(nivi.slideDownOnInit) {
			$('.nivi-bar, .nivi-space').hide().slideDown();
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
	},
	switchToNormal: function () {
		$('.nivi-bar, .nivi-space').slideUp(function () {
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
  defaultVoice = voices.find((voice) => voice.name === "Google русский");

  wrapper.addEventListener("click", handleClick);
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
  U.rate = 0.9;
  U.pitch = 1.1;

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